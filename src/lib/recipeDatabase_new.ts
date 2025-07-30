// Comprehensive recipe database with authentic recipes from around the world
import { Recipe, RecipeRequest } from '@/types';

// Helper function to standardize recipe creation
function createRecipe(
    dishName: string,
    cuisine: string,
    prepTime: number,
    cookTime: number,
    servings: number,
    ingredients: { name: string; amount: number; unit: string }[],
    instructions: string[],
    nutritionInfo: { calories: number; protein: number; carbs: number; fat: number; fiber: number; sugar: number; sodium: number },
    difficulty: 'easy' | 'medium' | 'hard' = 'easy'
) {
    return {
        title: dishName,
        description: `An authentic and delicious ${dishName.toLowerCase().replace(/🍫|🥙|🍕|🍜|🍣|🌮|🍛|🥘|🥗|🍲/g, '')} with traditional flavors and detailed preparation steps.`,
        ingredients,
        instructions,
        prepTime,
        cookTime,
        servings,
        difficulty,
        cuisine,
        dietaryRestrictions: [],
        nutritionInfo,
        youtubeSearchTerm: `how to make ${dishName.replace(/🍫|🥙|🍕|🍜|🍣|🌮|🍛|🥘|🥗|🍲/g, '')} recipe authentic`
    };
}

export function generateMockRecipe(request: RecipeRequest): Omit<Recipe, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {
    const userInput = request.ingredients[0] || '';
    const input = userInput.toLowerCase();

    // COMPREHENSIVE RECIPE DATABASE - Covers dishes from around the world
    if (input.includes('chicken shawarma') || input.includes('shawarma')) {
        return createRecipe(
            '🥙 Chicken Shawarma',
            'Middle Eastern',
            30,
            20,
            4,
            [
                { name: 'chicken thighs (boneless)', amount: 2, unit: 'lbs (900g)' },
                { name: 'plain Greek yogurt', amount: 0.5, unit: 'cup' },
                { name: 'lemon juice', amount: 3, unit: 'tbsp' },
                { name: 'olive oil', amount: 3, unit: 'tbsp' },
                { name: 'garlic cloves (minced)', amount: 4, unit: 'pieces' },
                { name: 'ground cumin', amount: 2, unit: 'tsp' },
                { name: 'paprika', amount: 2, unit: 'tsp' },
                { name: 'ground coriander', amount: 1, unit: 'tsp' },
                { name: 'turmeric', amount: 1, unit: 'tsp' },
                { name: 'cinnamon', amount: 0.5, unit: 'tsp' },
                { name: 'cayenne pepper', amount: 0.25, unit: 'tsp' },
                { name: 'salt', amount: 1.5, unit: 'tsp' },
                { name: 'black pepper', amount: 0.5, unit: 'tsp' },
                { name: 'pita bread', amount: 4, unit: 'pieces' },
                { name: 'red onion (sliced)', amount: 0.5, unit: 'medium' },
                { name: 'cucumber (diced)', amount: 1, unit: 'medium' },
                { name: 'tomatoes (diced)', amount: 2, unit: 'medium' },
                { name: 'tahini sauce', amount: 0.25, unit: 'cup' }
            ],
            [
                'In a bowl, mix yogurt, lemon juice, olive oil, garlic, and all spices to make marinade.',
                'Cut chicken into thin strips and marinate for at least 30 minutes (or overnight).',
                'Heat a large skillet or grill pan over medium-high heat.',
                'Cook marinated chicken for 6-8 minutes until golden and cooked through.',
                'Warm pita bread in a dry pan or oven.',
                'Slice chicken into smaller pieces if needed.',
                'Fill pita bread with chicken, onions, cucumber, and tomatoes.',
                'Drizzle with tahini sauce and serve immediately.',
                'Serve with pickles and hot sauce on the side.'
            ],
            { calories: 420, protein: 35, carbs: 25, fat: 22, fiber: 3, sugar: 8, sodium: 890 }
        );
    } else if (input.includes('chicken') && (input.includes('pizza') || input.includes('cheese pizza'))) {
        return createRecipe(
            '🍕 Chicken Supreme Pizza',
            'Italian-American',
            20,
            15,
            4,
            [
                { name: 'pizza dough', amount: 1, unit: 'ball (store-bought or homemade)' },
                { name: 'tomato sauce', amount: 0.5, unit: 'cup' },
                { name: 'mozzarella cheese (shredded)', amount: 2, unit: 'cups' },
                { name: 'cheddar cheese (shredded)', amount: 0.5, unit: 'cup' },
                { name: 'cooked chicken breast (diced)', amount: 1.5, unit: 'cups' },
                { name: 'red onion (sliced)', amount: 0.25, unit: 'medium' },
                { name: 'bell peppers (sliced)', amount: 0.5, unit: 'cup' },
                { name: 'mushrooms (sliced)', amount: 0.5, unit: 'cup' },
                { name: 'olive oil', amount: 2, unit: 'tbsp' },
                { name: 'garlic powder', amount: 1, unit: 'tsp' },
                { name: 'Italian seasoning', amount: 1, unit: 'tsp' },
                { name: 'salt', amount: 0.5, unit: 'tsp' },
                { name: 'black pepper', amount: 0.25, unit: 'tsp' }
            ],
            [
                'Preheat oven to 475°F (245°C).',
                'Roll out pizza dough on a floured surface to desired thickness.',
                'Transfer dough to a pizza pan or baking sheet.',
                'Brush dough with olive oil and sprinkle with garlic powder.',
                'Spread tomato sauce evenly, leaving a border for crust.',
                'Sprinkle mozzarella cheese over the sauce.',
                'Add diced chicken, onions, bell peppers, and mushrooms.',
                'Top with cheddar cheese and season with Italian seasoning, salt, and pepper.',
                'Bake for 12-15 minutes until crust is golden and cheese is bubbly.',
                'Let cool for 2-3 minutes before slicing and serving.'
            ],
            { calories: 320, protein: 18, carbs: 35, fat: 12, fiber: 2, sugar: 4, sodium: 720 }
        );
    } else if (input.includes('chocolate cake') || (input.includes('cake') && input.includes('chocolate'))) {
        return createRecipe(
            '🍫 Chocolate Cake',
            'American',
            15,
            30,
            8,
            [
                { name: 'all-purpose flour', amount: 1.75, unit: 'cups (220g)' },
                { name: 'unsweetened cocoa powder', amount: 0.75, unit: 'cup (65g)' },
                { name: 'granulated sugar', amount: 2, unit: 'cups (400g)' },
                { name: 'baking powder', amount: 1.5, unit: 'tsp' },
                { name: 'baking soda', amount: 1.5, unit: 'tsp' },
                { name: 'salt', amount: 0.5, unit: 'tsp' },
                { name: 'large eggs', amount: 2, unit: 'pieces' },
                { name: 'whole milk', amount: 1, unit: 'cup (240ml)' },
                { name: 'vegetable oil', amount: 0.5, unit: 'cup (120ml)' },
                { name: 'vanilla extract', amount: 2, unit: 'tsp' },
                { name: 'boiling water (or hot coffee)', amount: 1, unit: 'cup (240ml)' }
            ],
            [
                'Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.',
                'In a large bowl, whisk together flour, cocoa powder, sugar, baking powder, baking soda, and salt.',
                'Add eggs, milk, oil, and vanilla. Beat on medium speed for 2 minutes.',
                'Slowly stir in the boiling water (batter will be thin).',
                'Divide batter into prepared pans and bake for 25–30 minutes.',
                'Cool in pans for 10 minutes, then transfer to wire racks.',
                'Frost when completely cool.'
            ],
            { calories: 360, protein: 5, carbs: 50, fat: 15, fiber: 3, sugar: 35, sodium: 280 }
        );
    } else if (input.includes('beef burger') || input.includes('classic burger') || input.includes('hamburger')) {
        return createRecipe(
            '🍔 Classic Beef Burger',
            'American',
            15,
            15,
            4,
            [
                { name: 'ground beef (80/20)', amount: 1.5, unit: 'lbs (680g)' },
                { name: 'burger buns', amount: 4, unit: 'pieces' },
                { name: 'American cheese slices', amount: 4, unit: 'pieces' },
                { name: 'lettuce leaves', amount: 4, unit: 'pieces' },
                { name: 'tomato (sliced)', amount: 1, unit: 'large' },
                { name: 'red onion (sliced)', amount: 0.5, unit: 'medium' },
                { name: 'dill pickles', amount: 8, unit: 'slices' },
                { name: 'mayonnaise', amount: 3, unit: 'tbsp' },
                { name: 'ketchup', amount: 2, unit: 'tbsp' },
                { name: 'mustard', amount: 1, unit: 'tbsp' },
                { name: 'salt', amount: 1, unit: 'tsp' },
                { name: 'black pepper', amount: 0.5, unit: 'tsp' },
                { name: 'garlic powder', amount: 0.5, unit: 'tsp' },
                { name: 'onion powder', amount: 0.5, unit: 'tsp' },
                { name: 'olive oil or butter', amount: 1, unit: 'tbsp' }
            ],
            [
                'Divide ground beef into 4 equal portions and form into patties slightly larger than buns.',
                'Season both sides of patties with salt, pepper, garlic powder, and onion powder.',
                'Heat a grill pan or skillet over medium-high heat and add oil or butter.',
                'Cook burger patties for 3-4 minutes on first side without pressing down.',
                'Flip patties and cook for another 3-4 minutes for medium doneness.',
                'In the last minute, place cheese slices on patties to melt.',
                'Toast burger buns cut-side down in the same pan until golden.',
                'Spread mayonnaise on bottom bun, add lettuce leaf.',
                'Place cooked beef patty with melted cheese on lettuce.',
                'Add tomato slices, onion, and pickles.',
                'Spread ketchup and mustard on top bun, close burger.',
                'Serve immediately with fries or onion rings.'
            ],
            { calories: 540, protein: 28, carbs: 35, fat: 32, fiber: 3, sugar: 6, sodium: 920 }
        );
    } else if (input.includes('chicken burger') || input.includes('grilled chicken burger')) {
        return createRecipe(
            '🍗 Grilled Chicken Burger',
            'American',
            20,
            15,
            4,
            [
                { name: 'chicken breast (boneless)', amount: 4, unit: 'pieces (6oz each)' },
                { name: 'burger buns', amount: 4, unit: 'pieces' },
                { name: 'Swiss cheese slices', amount: 4, unit: 'pieces' },
                { name: 'lettuce leaves', amount: 4, unit: 'pieces' },
                { name: 'tomato (sliced)', amount: 1, unit: 'large' },
                { name: 'red onion (sliced)', amount: 0.5, unit: 'medium' },
                { name: 'avocado (sliced)', amount: 1, unit: 'large' },
                { name: 'mayonnaise', amount: 3, unit: 'tbsp' },
                { name: 'olive oil', amount: 2, unit: 'tbsp' },
                { name: 'lemon juice', amount: 1, unit: 'tbsp' },
                { name: 'garlic powder', amount: 1, unit: 'tsp' },
                { name: 'paprika', amount: 1, unit: 'tsp' },
                { name: 'salt', amount: 1, unit: 'tsp' },
                { name: 'black pepper', amount: 0.5, unit: 'tsp' },
                { name: 'dried thyme', amount: 0.5, unit: 'tsp' }
            ],
            [
                'Pound chicken breasts to even 1/2-inch thickness.',
                'Mix olive oil, lemon juice, garlic powder, paprika, thyme, salt, and pepper.',
                'Marinate chicken in the mixture for at least 15 minutes.',
                'Heat grill pan or skillet over medium-high heat.',
                'Cook chicken for 6-7 minutes per side until internal temp reaches 165°F.',
                'In the last minute, place cheese on chicken to melt.',
                'Toast burger buns until golden.',
                'Spread mayonnaise on both sides of buns.',
                'Layer bottom bun with lettuce, grilled chicken with melted cheese.',
                'Add tomato slices, red onion, and avocado.',
                'Top with upper bun and serve immediately.',
                'Serve with sweet potato fries or coleslaw.'
            ],
            { calories: 420, protein: 35, carbs: 32, fat: 18, fiber: 3, sugar: 5, sodium: 780 }
        );
    } else if (input.includes('burger') || input.includes('anday wala')) {
        return createRecipe(
            'Anday Wala Burger (Egg Burger)',
            'Pakistani',
            15,
            25,
            4,
            [
                { name: 'burger buns', amount: 4, unit: 'pieces' },
                { name: 'eggs', amount: 4, unit: 'pieces' },
                { name: 'onion (sliced)', amount: 1, unit: 'medium' },
                { name: 'tomato (sliced)', amount: 1, unit: 'medium' },
                { name: 'lettuce leaves', amount: 4, unit: 'pieces' },
                { name: 'cheese slices', amount: 4, unit: 'pieces' },
                { name: 'mayonnaise', amount: 3, unit: 'tbsp' },
                { name: 'ketchup', amount: 2, unit: 'tbsp' },
                { name: 'butter', amount: 2, unit: 'tbsp' },
                { name: 'salt', amount: 1, unit: 'tsp' },
                { name: 'black pepper', amount: 0.5, unit: 'tsp' },
                { name: 'oil for frying', amount: 2, unit: 'tbsp' }
            ],
            [
                'Heat oil in a non-stick pan over medium heat.',
                'Crack eggs and season with salt and pepper. Cook sunny-side up.',
                'Toast burger buns with butter until golden.',
                'Slice onions and tomatoes. Wash lettuce leaves.',
                'Spread mayonnaise on bottom bun, ketchup on top bun.',
                'Layer: lettuce, cooked egg, cheese, onion, tomato.',
                'Cover with top bun and serve immediately.'
            ],
            { calories: 450, protein: 20, carbs: 35, fat: 18, fiber: 4, sugar: 6, sodium: 800 }
        );
    } else if (input.includes('biryani')) {
        return createRecipe(
            'Chicken Biryani',
            'Pakistani/Indian',
            30,
            45,
            6,
            [
                { name: 'basmati rice', amount: 2, unit: 'cups' },
                { name: 'chicken (cut in pieces)', amount: 1, unit: 'kg' },
                { name: 'yogurt', amount: 0.5, unit: 'cup' },
                { name: 'ginger-garlic paste', amount: 2, unit: 'tbsp' },
                { name: 'red chili powder', amount: 1, unit: 'tsp' },
                { name: 'turmeric powder', amount: 0.5, unit: 'tsp' },
                { name: 'garam masala', amount: 1, unit: 'tsp' },
                { name: 'onions (fried)', amount: 1, unit: 'cup' },
                { name: 'fresh mint leaves', amount: 0.5, unit: 'cup' },
                { name: 'saffron soaked in milk', amount: 0.25, unit: 'cup' },
                { name: 'ghee/oil', amount: 4, unit: 'tbsp' },
                { name: 'salt', amount: 2, unit: 'tsp' }
            ],
            [
                'Marinate chicken with yogurt, ginger-garlic paste, and spices for 30 minutes.',
                'Soak rice for 30 minutes, then drain.',
                'Cook marinated chicken until 70% done.',
                'Boil water with whole spices and cook rice until 70% done.',
                'Layer chicken and rice in a heavy-bottomed pot.',
                'Top with fried onions, mint, and saffron milk.',
                'Cover tightly and cook on high for 3-4 minutes, then low for 45 minutes.',
                'Rest for 10 minutes before serving.'
            ],
            { calories: 480, protein: 25, carbs: 65, fat: 12, fiber: 2, sugar: 8, sodium: 900 },
            'medium'
        );
    } else if (input.includes('fried rice')) {
        return createRecipe(
            'Chicken Fried Rice',
            'Chinese',
            15,
            15,
            4,
            [
                { name: 'cooked rice (day-old)', amount: 4, unit: 'cups' },
                { name: 'chicken breast (diced)', amount: 2, unit: 'pieces' },
                { name: 'eggs', amount: 3, unit: 'pieces' },
                { name: 'soy sauce', amount: 4, unit: 'tbsp' },
                { name: 'sesame oil', amount: 2, unit: 'tbsp' },
                { name: 'vegetable oil', amount: 3, unit: 'tbsp' },
                { name: 'garlic (minced)', amount: 3, unit: 'cloves' },
                { name: 'ginger (minced)', amount: 1, unit: 'tbsp' },
                { name: 'green onions (chopped)', amount: 4, unit: 'stalks' },
                { name: 'frozen peas and carrots', amount: 1, unit: 'cup' },
                { name: 'salt', amount: 0.5, unit: 'tsp' },
                { name: 'white pepper', amount: 0.25, unit: 'tsp' }
            ],
            [
                'Heat 1 tbsp oil in a large wok over high heat.',
                'Scramble eggs and set aside.',
                'Cook diced chicken until golden. Set aside.',
                'Add remaining oil, garlic, and ginger. Stir-fry for 30 seconds.',
                'Add rice and break up clumps. Stir-fry for 3-4 minutes.',
                'Add peas and carrots, cook for 2 minutes.',
                'Return chicken and eggs to the pan.',
                'Add soy sauce, sesame oil, salt, and pepper. Toss together.',
                'Garnish with green onions and serve hot.'
            ],
            { calories: 380, protein: 22, carbs: 45, fat: 12, fiber: 2, sugar: 6, sodium: 920 }
        );
    } else if (input.includes('pad thai')) {
        return createRecipe(
            'Pad Thai',
            'Thai',
            20,
            15,
            4,
            [
                { name: 'rice noodles (dried)', amount: 8, unit: 'oz' },
                { name: 'shrimp or chicken', amount: 200, unit: 'grams' },
                { name: 'eggs', amount: 2, unit: 'pieces' },
                { name: 'bean sprouts', amount: 1, unit: 'cup' },
                { name: 'green onions', amount: 3, unit: 'stalks' },
                { name: 'garlic (minced)', amount: 3, unit: 'cloves' },
                { name: 'tamarind paste', amount: 2, unit: 'tbsp' },
                { name: 'fish sauce', amount: 3, unit: 'tbsp' },
                { name: 'brown sugar', amount: 2, unit: 'tbsp' },
                { name: 'lime juice', amount: 2, unit: 'tbsp' },
                { name: 'vegetable oil', amount: 3, unit: 'tbsp' },
                { name: 'crushed peanuts', amount: 0.25, unit: 'cup' },
                { name: 'lime wedges', amount: 4, unit: 'pieces' }
            ],
            [
                'Soak rice noodles in warm water until soft.',
                'Mix tamarind paste, fish sauce, brown sugar, and lime juice.',
                'Heat oil in a wok over high heat.',
                'Add garlic and protein, stir-fry until cooked.',
                'Push to one side, scramble eggs on the other side.',
                'Add drained noodles and sauce mixture.',
                'Stir-fry for 2-3 minutes until noodles are coated.',
                'Add bean sprouts and green onions, toss briefly.',
                'Serve with crushed peanuts and lime wedges.'
            ],
            { calories: 450, protein: 20, carbs: 55, fat: 15, fiber: 3, sugar: 12, sodium: 1200 }
        );
    } else {
        // Enhanced fallback system with smart ingredient detection
        const cleanInput = userInput.replace(/how to make|recipe|ingredients|\?/gi, '').trim();
        const dishName = cleanInput ? `${cleanInput.charAt(0).toUpperCase() + cleanInput.slice(1)} Recipe` : 'Delicious Recipe';

        // Smart cuisine and ingredient detection
        if (input.includes('indian') || input.includes('curry') || input.includes('masala') || input.includes('tandoori')) {
            return createRecipe(
                dishName,
                'Indian',
                20,
                30,
                4,
                [
                    { name: cleanInput || 'main ingredient', amount: 500, unit: 'grams' },
                    { name: 'onions (chopped)', amount: 2, unit: 'medium' },
                    { name: 'tomatoes (chopped)', amount: 2, unit: 'medium' },
                    { name: 'ginger-garlic paste', amount: 1, unit: 'tbsp' },
                    { name: 'cumin seeds', amount: 1, unit: 'tsp' },
                    { name: 'turmeric powder', amount: 0.5, unit: 'tsp' },
                    { name: 'red chili powder', amount: 1, unit: 'tsp' },
                    { name: 'garam masala', amount: 0.5, unit: 'tsp' },
                    { name: 'cooking oil', amount: 3, unit: 'tbsp' },
                    { name: 'salt', amount: 1, unit: 'tsp' }
                ],
                [
                    'Heat oil in a pan and add cumin seeds until they sizzle.',
                    'Add onions and cook until golden brown.',
                    'Stir in ginger-garlic paste and cook for 1 minute.',
                    'Add tomatoes, turmeric, red chili powder, and garam masala. Cook until soft.',
                    'Add main ingredient and cook until tender.',
                    'Season with salt and serve with rice or naan.'
                ],
                { calories: 400, protein: 15, carbs: 20, fat: 25, fiber: 5, sugar: 6, sodium: 800 }
            );
        } else if (input.includes('chinese') || input.includes('stir fry') || input.includes('asian')) {
            return createRecipe(
                dishName,
                'Chinese',
                15,
                15,
                4,
                [
                    { name: cleanInput || 'main ingredient', amount: 400, unit: 'grams' },
                    { name: 'soy sauce', amount: 3, unit: 'tbsp' },
                    { name: 'sesame oil', amount: 1, unit: 'tbsp' },
                    { name: 'garlic (minced)', amount: 3, unit: 'cloves' },
                    { name: 'ginger (minced)', amount: 1, unit: 'tbsp' },
                    { name: 'green onions', amount: 3, unit: 'stalks' },
                    { name: 'vegetable oil', amount: 2, unit: 'tbsp' },
                    { name: 'cornstarch', amount: 1, unit: 'tbsp' },
                    { name: 'salt', amount: 0.5, unit: 'tsp' }
                ],
                [
                    'Marinate main ingredient with soy sauce and cornstarch for 15 minutes.',
                    'Heat vegetable oil in a wok over high heat.',
                    'Add garlic and ginger, stir-fry for 30 seconds.',
                    'Add main ingredient and stir-fry until cooked through.',
                    'Add green onions and sesame oil, toss for 1 minute.',
                    'Season with salt and serve hot.'
                ],
                { calories: 350, protein: 20, carbs: 15, fat: 20, fiber: 3, sugar: 5, sodium: 900 }
            );
        } else if (input.includes('italian') || input.includes('pasta') || input.includes('sauce')) {
            return createRecipe(
                dishName,
                'Italian',
                15,
                25,
                4,
                [
                    { name: cleanInput || 'main ingredient', amount: 400, unit: 'grams' },
                    { name: 'olive oil', amount: 3, unit: 'tbsp' },
                    { name: 'garlic (minced)', amount: 4, unit: 'cloves' },
                    { name: 'onion (diced)', amount: 1, unit: 'medium' },
                    { name: 'tomatoes (canned)', amount: 400, unit: 'grams' },
                    { name: 'fresh basil', amount: 0.25, unit: 'cup' },
                    { name: 'parmesan cheese', amount: 0.5, unit: 'cup' },
                    { name: 'salt', amount: 1, unit: 'tsp' },
                    { name: 'black pepper', amount: 0.5, unit: 'tsp' }
                ],
                [
                    'Heat olive oil in a pan and sauté onion and garlic until soft.',
                    'Add tomatoes and simmer for 15 minutes.',
                    'Cook main ingredient (e.g., pasta) according to package instructions.',
                    'Combine sauce with main ingredient and stir in basil.',
                    'Season with salt and pepper.',
                    'Top with parmesan cheese and serve.'
                ],
                { calories: 400, protein: 12, carbs: 50, fat: 15, fiber: 4, sugar: 8, sodium: 700 }
            );
        } else {
            // Default international recipe
            return createRecipe(
                dishName,
                'International',
                15,
                25,
                4,
                [
                    { name: cleanInput || 'main ingredient', amount: 2, unit: 'cups' },
                    { name: 'onion (chopped)', amount: 1, unit: 'medium' },
                    { name: 'garlic (minced)', amount: 2, unit: 'cloves' },
                    { name: 'cooking oil', amount: 2, unit: 'tbsp' },
                    { name: 'salt', amount: 1, unit: 'tsp' },
                    { name: 'black pepper', amount: 0.5, unit: 'tsp' }
                ],
                [
                    'Prepare all ingredients by washing, chopping, and measuring them.',
                    'Heat oil in a large pan over medium heat.',
                    'Add onions and cook until softened, about 3-4 minutes.',
                    'Add garlic and cook for another minute until fragrant.',
                    'Add the main ingredients and cook according to their requirements.',
                    'Season with salt and pepper to taste.',
                    'Cook until ingredients are tender and flavors are well combined.',
                    'Adjust seasoning if needed and serve hot.'
                ],
                { calories: 350, protein: 15, carbs: 40, fat: 12, fiber: 4, sugar: 6, sodium: 500 }
            );
        }
    }
}
