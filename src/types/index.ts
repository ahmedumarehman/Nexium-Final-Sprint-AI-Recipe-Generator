export interface Recipe {
    id: string;
    title: string;
    description: string;
    ingredients: Ingredient[];
    instructions: string[];
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: 'easy' | 'medium' | 'hard';
    cuisine: string;
    dietaryRestrictions: string[];
    nutritionInfo?: NutritionInfo;
    imageUrl?: string;
    youtubeSearchTerm?: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export interface Ingredient {
    name: string;
    amount: number;
    unit: string;
    notes?: string;
}

export interface NutritionInfo {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
}

export interface User {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    dietaryPreferences: string[];
    allergens: string[];
    favoriteRecipes: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface RecipeRequest {
    ingredients: string[];
    dietaryRestrictions: string[];
    cuisine?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    prepTime?: number;
    servings?: number;
    mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface AIResponse {
    recipe: Recipe;
    confidence: number;
    suggestions: string[];
}
