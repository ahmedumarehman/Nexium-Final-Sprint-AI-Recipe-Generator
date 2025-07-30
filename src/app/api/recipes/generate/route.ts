import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Recipe, RecipeRequest } from '@/types';
import { generateMockRecipe } from '@/lib/recipeDatabase';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        // Get user from Supabase auth (optional for demo purposes)
        const authHeader = request.headers.get('Authorization');
        let user = null;

        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);

            if (!authError && authUser) {
                user = authUser;
            }
        }

        const recipeRequest: RecipeRequest = await request.json();

        // Validate request
        if (!recipeRequest.ingredients || recipeRequest.ingredients.length === 0) {
            return NextResponse.json({ error: 'Ingredients are required' }, { status: 400 });
        }

        // Generate recipe using OpenAI
        const generatedRecipe = await generateRecipeWithAI(recipeRequest);

        // Create recipe object
        const recipe: Recipe = {
            ...generatedRecipe,
            id: new Date().getTime().toString(),
            userId: user?.id || 'anonymous',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Save to Supabase database if user is authenticated
        if (user) {
            try {
                const { error: dbError } = await supabase
                    .from('recipes')
                    .insert({
                        id: recipe.id,
                        title: recipe.title,
                        description: recipe.description,
                        ingredients: recipe.ingredients,
                        instructions: recipe.instructions,
                        prep_time: recipe.prepTime,
                        cook_time: recipe.cookTime,
                        servings: recipe.servings,
                        difficulty: recipe.difficulty,
                        cuisine: recipe.cuisine,
                        dietary_restrictions: recipe.dietaryRestrictions,
                        nutrition_info: recipe.nutritionInfo,
                        image_url: recipe.imageUrl,
                        youtube_search_term: recipe.youtubeSearchTerm,
                        user_id: recipe.userId,
                        created_at: recipe.createdAt.toISOString(),
                        updated_at: recipe.updatedAt.toISOString()
                    })
                    .select()
                    .single();

                if (dbError) {
                    console.error('Supabase error:', dbError);
                    // Continue without saving to database
                }
            } catch (dbError) {
                console.error('Database error:', dbError);
                // Continue without saving to database
            }
        }

        return NextResponse.json({ recipe });
    } catch (error) {
        console.error('Error generating recipe:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

async function generateRecipeWithAI(request: RecipeRequest): Promise<Omit<Recipe, 'id' | 'userId' | 'createdAt' | 'updatedAt'>> {
    console.log('OpenAI API Key present:', !!process.env.OPENAI_API_KEY);

    if (!process.env.OPENAI_API_KEY) {
        console.log('No OpenAI key, using mock recipe');
        return generateMockRecipe(request);
    }

    try {
        console.log('Generating recipe with OpenAI for:', request.ingredients);
        const prompt = createRecipePrompt(request);

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a professional chef and recipe developer. Create detailed, practical recipes based on the user's request. Extract the dish name from their question and create a complete recipe with proper ingredients, measurements, and detailed cooking instructions. Always return valid JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const recipeText = completion.choices[0]?.message?.content;
        console.log('OpenAI response received:', !!recipeText);

        if (!recipeText) {
            throw new Error('No recipe generated');
        }

        // Parse the JSON response
        let parsedRecipe;
        try {
            parsedRecipe = JSON.parse(recipeText);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            console.log('Raw response:', recipeText);
            throw new Error('Invalid JSON response from OpenAI');
        }

        // Validate and format the recipe
        return formatRecipeResponse(parsedRecipe, request);

    } catch (error) {
        console.error('OpenAI API Error:', error);
        // Fallback to mock recipe on error
        return generateMockRecipe(request);
    }
}

function createRecipePrompt(request: RecipeRequest): string {
    const userInput = request.ingredients[0] || '';
    const { dietaryRestrictions, cuisine, difficulty, servings } = request;

    return `The user asked: "${userInput}"

Please create a complete recipe based on this request. Extract the dish name and create a detailed recipe with:
- Proper ingredient list with specific amounts and measurements
- Detailed step-by-step cooking instructions
- Realistic cooking times and serving information
- Nutritional information

Requirements:
- Servings: ${servings || 4}
- Difficulty: ${difficulty || 'easy'}
- Cuisine: ${cuisine || 'any'}
- Dietary restrictions: ${dietaryRestrictions?.length ? dietaryRestrictions.join(', ') : 'none'}

Return ONLY a valid JSON object with this exact structure:
{
  "title": "Proper dish name (e.g., Anday Wala Burger)",
  "description": "Brief description of the dish",
  "ingredients": [
    {"name": "specific ingredient", "amount": 2, "unit": "pieces"},
    {"name": "another ingredient", "amount": 1, "unit": "cup"}
  ],
  "instructions": [
    "Detailed step 1 with specific instructions",
    "Detailed step 2 with cooking methods and times",
    "More detailed steps..."
  ],
  "prepTime": 15,
  "cookTime": 25,
  "servings": 4,
  "difficulty": "easy",
  "cuisine": "relevant cuisine",
  "dietaryRestrictions": [],
  "nutritionInfo": {
    "calories": 450,
    "protein": 20,
    "carbs": 35,
    "fat": 18,
    "fiber": 4,
    "sugar": 6,
    "sodium": 800
  },
  "youtubeSearchTerm": "how to make [dish name] recipe"
}`;
}

function formatRecipeResponse(parsedRecipe: unknown, request: RecipeRequest): Omit<Recipe, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {
    const recipe = parsedRecipe as Record<string, unknown>;

    // Default values
    const defaultIngredients = request.ingredients.map(ingredient => ({
        name: ingredient,
        amount: 1,
        unit: 'piece',
    }));

    const defaultNutrition = {
        calories: 350,
        protein: 20,
        carbs: 40,
        fat: 12,
        fiber: 6,
        sugar: 8,
        sodium: 500,
    };

    return {
        title: (recipe.title as string) || 'Generated Recipe',
        description: (recipe.description as string) || 'A delicious recipe created just for you.',
        ingredients: (recipe.ingredients as typeof defaultIngredients) || defaultIngredients,
        instructions: (recipe.instructions as string[]) || ['Prepare and enjoy your meal!'],
        prepTime: (recipe.prepTime as number) || 15,
        cookTime: (recipe.cookTime as number) || 30,
        servings: (recipe.servings as number) || request.servings || 4,
        difficulty: (recipe.difficulty as 'easy' | 'medium' | 'hard') || request.difficulty || 'easy',
        cuisine: (recipe.cuisine as string) || request.cuisine || 'International',
        dietaryRestrictions: (recipe.dietaryRestrictions as string[]) || request.dietaryRestrictions || [],
        nutritionInfo: (recipe.nutritionInfo as typeof defaultNutrition) || defaultNutrition,
    };
}
