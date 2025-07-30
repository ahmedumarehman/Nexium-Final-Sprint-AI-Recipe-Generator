# RecipeAI - Wireframes

## Design System

### Color Palette
- **Primary:** Orange (#EA580C, #FB923C)
- **Secondary:** Yellow (#EAB308, #FDE047)
- **Neutral:** Gray (#374151, #6B7280, #9CA3AF)
- **Background:** Warm gradients (orange-50 to yellow-50)

### Typography
- **Headings:** Inter, Bold
- **Body:** Inter, Regular
- **Code:** JetBrains Mono

### Components
- **Buttons:** Rounded-full, gradient backgrounds
- **Inputs:** Rounded-full, border focus states
- **Cards:** Rounded-2xl, subtle shadows
- **Icons:** Lucide React, Heroicons

## Page Wireframes

### 1. Homepage (/)
```
+----------------------------------+
|              RecipeAI             |
|        [Chef Hat Icon]           |
+----------------------------------+
|                                  |
|   Transform your ingredients     |
|   into culinary masterpieces    |
|                                  |
|   [Email Input] [Get Started]    |
|                                  |
|   ✨ AI-Powered                 |
|   ⏰ Instant Results             |
|   👥 10k+ Users                 |
|                                  |
+----------------------------------+
|          Features Section        |
|                                  |
|   [AI Icon]  [Speed Icon]       |
|   AI-Powered  Instant Results   |
|                                  |
|   [Star Icon]                   |
|   Personalized                  |
|                                  |
+----------------------------------+
|          Call to Action         |
|                                  |
|   Ready to Transform Cooking?   |
|   [Start Cooking Smarter]       |
|                                  |
+----------------------------------+
```

### 2. Authentication (/auth)
```
+----------------------------------+
|              RecipeAI             |
|        [Chef Hat Icon]           |
+----------------------------------+
|                                  |
|        Sign In to Continue       |
|                                  |
|   [Email Input Field]            |
|   [Send Magic Link Button]       |
|                                  |
|   Or sign in with:               |
|   [Google] [GitHub] [Apple]      |
|                                  |
|   By signing in, you agree to    |
|   our Terms & Privacy Policy     |
|                                  |
+----------------------------------+
```

### 3. Dashboard (/dashboard)
```
+----------------------------------+
|  RecipeAI  [Profile] [Logout]    |
+----------------------------------+
|                                  |
|        Welcome back, User!       |
|                                  |
|   [Generate New Recipe]          |
|                                  |
|   Your Recent Recipes:           |
|   +----------------------------+ |
|   | [Recipe Image] Title       | |
|   | Ingredients • Time         | |
|   | [View] [Favorite] [Delete] | |
|   +----------------------------+ |
|                                  |
|   [Load More Recipes]            |
|                                  |
+----------------------------------+
```

### 4. Recipe Generator (/generate)
```
+----------------------------------+
|  RecipeAI  [Back] [Profile]      |
+----------------------------------+
|                                  |
|        Generate Recipe           |
|                                  |
|   Available Ingredients:         |
|   [Ingredient Chips]             |
|   [+ Add Ingredient]             |
|                                  |
|   Dietary Restrictions:          |
|   [Vegetarian] [Vegan] [GF]      |
|                                  |
|   Cuisine Preference:            |
|   [Dropdown: Italian, Mexican...] |
|                                  |
|   Preparation Time:              |
|   [< 30 min] [30-60 min] [1h+]   |
|                                  |
|   [Generate Recipe] [Loading...]  |
|                                  |
+----------------------------------+
```

### 5. Recipe View (/recipe/[id])
```
+----------------------------------+
|  RecipeAI  [Back] [Profile]      |
+----------------------------------+
|                                  |
|   [Recipe Hero Image]            |
|                                  |
|   Recipe Title                   |
|   ⭐⭐⭐⭐⭐ • Italian • 30min  |
|                                  |
|   [Save] [Share] [Print]         |
|                                  |
|   Ingredients (4 servings):      |
|   • 2 cups pasta                 |
|   • 1 cup tomato sauce           |
|   • 1/2 cup parmesan             |
|                                  |
|   Instructions:                  |
|   1. Boil water in large pot     |
|   2. Add pasta and cook 8-10 min |
|   3. Drain and mix with sauce    |
|                                  |
|   Nutrition Facts:               |
|   [Calories] [Protein] [Carbs]   |
|                                  |
+----------------------------------+
```

### 6. Profile (/profile)
```
+----------------------------------+
|  RecipeAI  [Back] [Settings]     |
+----------------------------------+
|                                  |
|   [User Avatar]                  |
|   User Name                      |
|   user@example.com               |
|                                  |
|   Dietary Preferences:           |
|   [Vegetarian] [Gluten-Free]     |
|   [Edit Preferences]             |
|                                  |
|   Recipe Statistics:             |
|   📊 25 Recipes Generated        |
|   ⭐ 15 Favorites                |
|   🍳 8 Cooked This Week         |
|                                  |
|   Account Settings:              |
|   [Change Email]                 |
|   [Privacy Settings]             |
|   [Delete Account]               |
|                                  |
+----------------------------------+
```

## Mobile Responsive Design

### Mobile Navigation
- Hamburger menu for mobile
- Bottom navigation for key actions
- Swipe gestures for recipe cards
- Touch-friendly button sizes (min 44px)

### Mobile Adaptations
- Stack layouts vertically
- Larger touch targets
- Condensed information display
- Slide-out panels for filters

## Interaction Patterns

### Animations
- Fade in/out transitions
- Slide animations for panels
- Scale animations for buttons
- Loading spinners for AI generation

### Micro-interactions
- Button hover effects
- Input focus states
- Recipe card hover preview
- Ingredient selection feedback

## Accessibility Features

### Screen Reader Support
- Proper ARIA labels
- Semantic HTML structure
- Alt text for images
- Keyboard navigation support

### Color Contrast
- WCAG AA compliant colors
- High contrast mode support
- Color-blind friendly palette

### Navigation
- Skip to main content link
- Consistent navigation patterns
- Clear heading hierarchy
- Focus indicators

## Responsive Breakpoints

- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+
- **Large Desktop:** 1440px+

## Loading States

### Recipe Generation
- Skeleton loading for recipe cards
- Progress indicator for AI processing
- Animated placeholders
- Error states with retry options

### Data Loading
- Shimmer effects for content
- Progressive loading for images
- Optimistic updates for interactions
- Offline state indicators
