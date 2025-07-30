// Helper functions for recipe database operations
import { supabase } from '@/lib/supabase';
import { Recipe } from '@/types';

export async function getUserRecipes(userId: string): Promise<Recipe[]> {
    const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user recipes:', error);
        return [];
    }

    return data.map(transformSupabaseRecipe);
}

export async function getAllRecipes(limit = 50): Promise<Recipe[]> {
    const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }

    return data.map(transformSupabaseRecipe);
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
    const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching recipe:', error);
        return null;
    }

    return transformSupabaseRecipe(data);
}

export async function deleteRecipe(id: string, userId: string): Promise<boolean> {
    const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

    if (error) {
        console.error('Error deleting recipe:', error);
        return false;
    }

    return true;
}

// Transform Supabase column names to TypeScript interface
function transformSupabaseRecipe(data: Record<string, unknown>): Recipe {
    return {
        id: data.id as string,
        title: data.title as string,
        description: data.description as string,
        ingredients: data.ingredients as Recipe['ingredients'],
        instructions: data.instructions as string[],
        prepTime: data.prep_time as number,
        cookTime: data.cook_time as number,
        servings: data.servings as number,
        difficulty: data.difficulty as Recipe['difficulty'],
        cuisine: data.cuisine as string,
        dietaryRestrictions: (data.dietary_restrictions as string[]) || [],
        nutritionInfo: data.nutrition_info as Recipe['nutritionInfo'],
        imageUrl: data.image_url as string | undefined,
        youtubeSearchTerm: data.youtube_search_term as string | undefined,
        userId: data.user_id as string,
        createdAt: new Date(data.created_at as string),
        updatedAt: new Date(data.updated_at as string)
    };
}
