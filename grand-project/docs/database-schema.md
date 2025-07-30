# Database Schema & SQL Queries

## Supabase (PostgreSQL) Setup

### 1. Enable RLS (Row Level Security)

```sql
-- Enable Row Level Security on auth.users (already enabled by default)
-- This ensures users can only access their own data

-- Create a function to get the current user ID
CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claim.sub', true),
    (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')
  )::uuid
$$ LANGUAGE sql STABLE;
```

### 2. Create User Profiles Table

```sql
-- Create user profiles table
CREATE TABLE public.user_profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  dietary_preferences text[] DEFAULT '{}',
  allergens text[] DEFAULT '{}',
  favorite_cuisines text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### 3. Create Recipe Favorites Table

```sql
-- Create recipe favorites table
CREATE TABLE public.recipe_favorites (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipe_id text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.recipe_favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own favorites" ON public.recipe_favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON public.recipe_favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON public.recipe_favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Create unique constraint to prevent duplicate favorites
CREATE UNIQUE INDEX recipe_favorites_user_recipe_unique ON public.recipe_favorites(user_id, recipe_id);
```

### 4. Create Recipe History Table

```sql
-- Create recipe history table
CREATE TABLE public.recipe_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipe_data jsonb NOT NULL,
  ingredients_used text[] NOT NULL,
  dietary_restrictions text[] DEFAULT '{}',
  cuisine_type text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.recipe_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own history" ON public.recipe_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own history" ON public.recipe_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own history" ON public.recipe_history
  FOR DELETE USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX recipe_history_user_id_created_at_idx ON public.recipe_history(user_id, created_at DESC);
```

### 5. Create User Preferences Table

```sql
-- Create user preferences table for AI learning
CREATE TABLE public.user_preferences (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  preference_type text NOT NULL, -- 'ingredient', 'cuisine', 'dietary', 'cooking_time'
  preference_value text NOT NULL,
  weight integer DEFAULT 1, -- How much the user likes this preference
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own preferences" ON public.user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Create unique constraint to prevent duplicate preferences
CREATE UNIQUE INDEX user_preferences_unique ON public.user_preferences(user_id, preference_type, preference_value);
```

### 6. Setup Magic Link Authentication

```sql
-- Configure auth settings (run in Supabase SQL editor)
-- Enable email confirmations
UPDATE auth.config SET 
  enable_signup = true,
  double_confirm_changes = false,
  enable_manual_linking = false;

-- Set magic link expiration (3600 seconds = 1 hour)
UPDATE auth.config SET 
  magic_link_expiry_time = 3600;
```

## MongoDB Schema

### Collections Setup

```javascript
// Connect to MongoDB and create collections
use('recipe-generator');

// Create recipes collection with schema validation
db.createCollection('recipes', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'ingredients', 'instructions', 'userId', 'createdAt'],
      properties: {
        _id: { bsonType: 'objectId' },
        id: { bsonType: 'string' },
        title: { bsonType: 'string', minLength: 1, maxLength: 200 },
        description: { bsonType: 'string', maxLength: 1000 },
        ingredients: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['name', 'amount', 'unit'],
            properties: {
              name: { bsonType: 'string' },
              amount: { bsonType: 'number' },
              unit: { bsonType: 'string' },
              notes: { bsonType: 'string' }
            }
          }
        },
        instructions: {
          bsonType: 'array',
          items: { bsonType: 'string' }
        },
        prepTime: { bsonType: 'int', minimum: 0 },
        cookTime: { bsonType: 'int', minimum: 0 },
        servings: { bsonType: 'int', minimum: 1 },
        difficulty: { enum: ['easy', 'medium', 'hard'] },
        cuisine: { bsonType: 'string' },
        dietaryRestrictions: {
          bsonType: 'array',
          items: { bsonType: 'string' }
        },
        nutritionInfo: {
          bsonType: 'object',
          properties: {
            calories: { bsonType: 'int' },
            protein: { bsonType: 'number' },
            carbs: { bsonType: 'number' },
            fat: { bsonType: 'number' },
            fiber: { bsonType: 'number' },
            sugar: { bsonType: 'number' },
            sodium: { bsonType: 'number' }
          }
        },
        imageUrl: { bsonType: 'string' },
        userId: { bsonType: 'string' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Create indexes for better performance
db.recipes.createIndex({ userId: 1, createdAt: -1 });
db.recipes.createIndex({ 'ingredients.name': 1 });
db.recipes.createIndex({ cuisine: 1 });
db.recipes.createIndex({ dietaryRestrictions: 1 });
db.recipes.createIndex({ difficulty: 1 });

// Create ai_requests collection for tracking AI usage
db.createCollection('ai_requests', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'ingredients', 'createdAt'],
      properties: {
        _id: { bsonType: 'objectId' },
        userId: { bsonType: 'string' },
        ingredients: {
          bsonType: 'array',
          items: { bsonType: 'string' }
        },
        dietaryRestrictions: {
          bsonType: 'array',
          items: { bsonType: 'string' }
        },
        cuisine: { bsonType: 'string' },
        difficulty: { enum: ['easy', 'medium', 'hard'] },
        requestData: { bsonType: 'object' },
        responseData: { bsonType: 'object' },
        processingTime: { bsonType: 'int' },
        success: { bsonType: 'bool' },
        errorMessage: { bsonType: 'string' },
        createdAt: { bsonType: 'date' }
      }
    }
  }
});

// Create index for ai_requests
db.ai_requests.createIndex({ userId: 1, createdAt: -1 });
db.ai_requests.createIndex({ success: 1 });
```

## Environment Variables Setup

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipe-generator?retryWrites=true&w=majority

# AI Configuration
OPENAI_API_KEY=your-openai-api-key
N8N_API_URL=https://your-n8n-instance.com
N8N_API_KEY=your-n8n-api-key

# Application Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

## Initial Data Setup

### Sample Cuisines

```sql
-- Insert sample cuisines (for Supabase reference table)
CREATE TABLE public.cuisines (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamp with time zone DEFAULT now()
);

INSERT INTO public.cuisines (name, description) VALUES
  ('Italian', 'Traditional Italian cuisine with pasta, pizza, and Mediterranean flavors'),
  ('Mexican', 'Spicy and flavorful Mexican dishes with beans, rice, and peppers'),
  ('Asian', 'Diverse Asian cuisines including Chinese, Thai, Japanese, and Korean'),
  ('American', 'Classic American comfort food and BBQ'),
  ('Mediterranean', 'Healthy Mediterranean diet with olive oil, fish, and vegetables'),
  ('Indian', 'Aromatic Indian cuisine with curry, spices, and rice'),
  ('French', 'Elegant French cuisine with butter, wine, and refined techniques'),
  ('Greek', 'Fresh Greek cuisine with feta, olives, and herbs');
```

### Sample Dietary Restrictions

```sql
-- Insert sample dietary restrictions
CREATE TABLE public.dietary_restrictions (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamp with time zone DEFAULT now()
);

INSERT INTO public.dietary_restrictions (name, description) VALUES
  ('vegetarian', 'No meat, but may include dairy and eggs'),
  ('vegan', 'No animal products whatsoever'),
  ('gluten-free', 'No wheat, barley, rye, or other gluten-containing grains'),
  ('dairy-free', 'No milk, cheese, butter, or other dairy products'),
  ('nut-free', 'No tree nuts or peanuts'),
  ('low-carb', 'Minimal carbohydrates, typically under 20-50g per day'),
  ('keto', 'Very low carb, high fat diet'),
  ('paleo', 'No grains, legumes, dairy, or processed foods'),
  ('halal', 'Following Islamic dietary laws'),
  ('kosher', 'Following Jewish dietary laws');
```

## Running the Queries

1. **For Supabase**: Copy and paste the SQL queries in the Supabase SQL Editor
2. **For MongoDB**: Use MongoDB Compass or the mongo shell to run the JavaScript commands
3. **Test the setup** by creating a user account and generating a recipe

## Backup & Maintenance

```sql
-- Create backup script for Supabase
-- Run this periodically to backup user data
COPY (
  SELECT * FROM public.user_profiles
) TO '/tmp/user_profiles_backup.csv' WITH CSV HEADER;

COPY (
  SELECT * FROM public.recipe_favorites
) TO '/tmp/recipe_favorites_backup.csv' WITH CSV HEADER;
```

This database schema provides a robust foundation for your AI-powered recipe generator with proper security, performance optimization, and scalability considerations.
