export interface RecipeCategory {
    id: string;
    name: string;
    icon: string;
    subcategories: RecipeSubcategory[];
}

export interface RecipeSubcategory {
    id: string;
    name: string;
    searchTerms: string[];
}

export const recipeCategories: RecipeCategory[] = [
    {
        id: 'appetizers',
        name: 'Appetizers & Snacks',
        icon: '🥗',
        subcategories: [
            {
                id: 'dips',
                name: 'Dips & Spreads',
                searchTerms: ['hummus', 'guacamole', 'salsa', 'dip', 'spread', 'tapenade']
            },
            {
                id: 'finger-foods',
                name: 'Finger Foods',
                searchTerms: ['wings', 'meatballs', 'kebabs', 'skewers', 'croquettes', 'patties']
            },
            {
                id: 'salads',
                name: 'Salads',
                searchTerms: ['salad', 'coleslaw', 'potato salad', 'caesar', 'greek salad']
            }
        ]
    },
    {
        id: 'main-dishes',
        name: 'Main Dishes',
        icon: '🍖',
        subcategories: [
            {
                id: 'chicken',
                name: 'Chicken',
                searchTerms: ['chicken', 'poultry', 'wings', 'drumsticks', 'breast', 'thighs']
            },
            {
                id: 'beef',
                name: 'Beef',
                searchTerms: ['beef', 'steak', 'burger', 'meatballs', 'roast', 'brisket']
            },
            {
                id: 'lamb',
                name: 'Lamb',
                searchTerms: ['lamb', 'mutton', 'leg of lamb', 'lamb chops', 'lamb curry']
            },
            {
                id: 'pork',
                name: 'Pork',
                searchTerms: ['pork', 'ham', 'bacon', 'sausage', 'pork chops']
            },
            {
                id: 'seafood',
                name: 'Seafood',
                searchTerms: ['fish', 'salmon', 'tuna', 'shrimp', 'prawns', 'seafood', 'cod']
            },
            {
                id: 'vegetarian',
                name: 'Vegetarian',
                searchTerms: ['vegetarian', 'veggie', 'tofu', 'beans', 'lentils', 'quinoa']
            }
        ]
    },
    {
        id: 'pasta-rice',
        name: 'Pasta & Rice',
        icon: '🍝',
        subcategories: [
            {
                id: 'pasta',
                name: 'Pasta',
                searchTerms: ['pasta', 'spaghetti', 'penne', 'lasagna', 'fettuccine', 'ravioli']
            },
            {
                id: 'rice',
                name: 'Rice Dishes',
                searchTerms: ['rice', 'biryani', 'risotto', 'pilaf', 'fried rice', 'paella']
            },
            {
                id: 'noodles',
                name: 'Noodles',
                searchTerms: ['noodles', 'ramen', 'pad thai', 'lo mein', 'pho', 'udon']
            }
        ]
    },
    {
        id: 'soups-stews',
        name: 'Soups & Stews',
        icon: '🍲',
        subcategories: [
            {
                id: 'soups',
                name: 'Soups',
                searchTerms: ['soup', 'broth', 'bisque', 'gazpacho', 'minestrone', 'chowder']
            },
            {
                id: 'stews',
                name: 'Stews',
                searchTerms: ['stew', 'chili', 'goulash', 'bourguignon', 'curry', 'tagine']
            }
        ]
    },
    {
        id: 'international',
        name: 'International Cuisine',
        icon: '🌍',
        subcategories: [
            {
                id: 'asian',
                name: 'Asian',
                searchTerms: ['chinese', 'japanese', 'korean', 'thai', 'indian', 'vietnamese']
            },
            {
                id: 'mediterranean',
                name: 'Mediterranean',
                searchTerms: ['greek', 'italian', 'spanish', 'mediterranean', 'middle eastern']
            },
            {
                id: 'latin-american',
                name: 'Latin American',
                searchTerms: ['mexican', 'tacos', 'burritos', 'enchiladas', 'quesadillas', 'salsa']
            },
            {
                id: 'european',
                name: 'European',
                searchTerms: ['french', 'german', 'british', 'irish', 'scandinavian', 'russian']
            }
        ]
    },
    {
        id: 'bread-pizza',
        name: 'Bread & Pizza',
        icon: '🍕',
        subcategories: [
            {
                id: 'bread',
                name: 'Bread',
                searchTerms: ['bread', 'rolls', 'baguette', 'sourdough', 'focaccia', 'naan']
            },
            {
                id: 'pizza',
                name: 'Pizza',
                searchTerms: ['pizza', 'margherita', 'pepperoni', 'flatbread', 'calzone']
            }
        ]
    },
    {
        id: 'desserts',
        name: 'Desserts',
        icon: '🍰',
        subcategories: [
            {
                id: 'cakes',
                name: 'Cakes',
                searchTerms: ['cake', 'cheesecake', 'cupcake', 'torte', 'layer cake', 'bundt']
            },
            {
                id: 'cookies',
                name: 'Cookies',
                searchTerms: ['cookies', 'biscuits', 'macarons', 'brownies', 'bars', 'squares']
            },
            {
                id: 'pies-tarts',
                name: 'Pies & Tarts',
                searchTerms: ['pie', 'tart', 'quiche', 'galette', 'cobbler', 'crumble']
            },
            {
                id: 'frozen',
                name: 'Frozen Desserts',
                searchTerms: ['ice cream', 'gelato', 'sorbet', 'popsicles', 'frozen yogurt']
            },
            {
                id: 'chocolate',
                name: 'Chocolate',
                searchTerms: ['chocolate', 'fudge', 'truffle', 'mousse', 'ganache', 'cocoa']
            }
        ]
    },
    {
        id: 'beverages',
        name: 'Beverages',
        icon: '🥤',
        subcategories: [
            {
                id: 'smoothies',
                name: 'Smoothies & Shakes',
                searchTerms: ['smoothie', 'shake', 'milkshake', 'protein shake', 'frappuccino']
            },
            {
                id: 'hot-drinks',
                name: 'Hot Beverages',
                searchTerms: ['coffee', 'tea', 'hot chocolate', 'latte', 'cappuccino', 'chai']
            },
            {
                id: 'cold-drinks',
                name: 'Cold Beverages',
                searchTerms: ['lemonade', 'iced tea', 'cocktail', 'mocktail', 'juice', 'soda']
            }
        ]
    },
    {
        id: 'breakfast',
        name: 'Breakfast',
        icon: '🥞',
        subcategories: [
            {
                id: 'pancakes-waffles',
                name: 'Pancakes & Waffles',
                searchTerms: ['pancakes', 'waffles', 'french toast', 'crepes', 'flapjacks']
            },
            {
                id: 'eggs',
                name: 'Egg Dishes',
                searchTerms: ['eggs', 'omelet', 'scrambled', 'benedict', 'quiche', 'frittata']
            },
            {
                id: 'cereals',
                name: 'Cereals & Grains',
                searchTerms: ['oatmeal', 'granola', 'muesli', 'porridge', 'cereal', 'grits']
            }
        ]
    },
    {
        id: 'healthy',
        name: 'Healthy Options',
        icon: '🥬',
        subcategories: [
            {
                id: 'low-carb',
                name: 'Low Carb',
                searchTerms: ['keto', 'low carb', 'atkins', 'paleo', 'cauliflower rice']
            },
            {
                id: 'gluten-free',
                name: 'Gluten Free',
                searchTerms: ['gluten free', 'celiac', 'wheat free', 'gluten-free bread']
            },
            {
                id: 'vegan',
                name: 'Vegan',
                searchTerms: ['vegan', 'plant based', 'dairy free', 'egg free', 'no meat']
            }
        ]
    }
];

export function getCategoryBySearchTerm(searchTerm: string): RecipeCategory | null {
    const term = searchTerm.toLowerCase();

    for (const category of recipeCategories) {
        for (const subcategory of category.subcategories) {
            if (subcategory.searchTerms.some(searchTerm => term.includes(searchTerm))) {
                return category;
            }
        }
    }

    return null;
}

export function getSubcategoryBySearchTerm(searchTerm: string): RecipeSubcategory | null {
    const term = searchTerm.toLowerCase();

    for (const category of recipeCategories) {
        for (const subcategory of category.subcategories) {
            if (subcategory.searchTerms.some(searchTerm => term.includes(searchTerm))) {
                return subcategory;
            }
        }
    }

    return null;
}
