'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles, Clock, Users, Loader, Youtube, Volume2, VolumeX, ExternalLink, Menu, Search, Heart, Filter, Info } from 'lucide-react';
import { Recipe } from '@/types';
import RecipeSidebar from '@/components/RecipeSidebar';
import { RecipeCategory, RecipeSubcategory } from '@/lib/recipeCategories';

export default function GenerateRecipe() {
    const [prompt, setPrompt] = useState('');
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isReading, setIsReading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // New search and filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [nutritionExpanded, setNutritionExpanded] = useState(false);
    const [filters, setFilters] = useState({
        difficulty: '',
        cookTime: '',
        cuisine: '',
        dietary: ''
    });

    // Load favorites from localStorage
    useEffect(() => {
        const storedFavorites = localStorage.getItem('recipe-favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    // Save favorites to localStorage
    const toggleFavorite = (recipeId: string) => {
        const newFavorites = favorites.includes(recipeId)
            ? favorites.filter(id => id !== recipeId)
            : [...favorites, recipeId];

        setFavorites(newFavorites);
        localStorage.setItem('recipe-favorites', JSON.stringify(newFavorites));
    };

    const isFavorite = (recipeId: string) => favorites.includes(recipeId);

    const handleCategorySelect = (category: RecipeCategory) => {
        setPrompt(category.name);
    };

    const handleSubcategorySelect = (subcategory: RecipeSubcategory) => {
        setPrompt(subcategory.name);
    };
    const generateRecipe = async () => {
        if (!prompt.trim()) {
            setError('Please enter what you want to cook!');
            return;
        }

        setLoading(true);
        setError('');
        setRecipe(null);

        try {
            const response = await fetch('/api/recipes/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredients: [prompt], // Simple approach for now
                    servings: 4,
                    difficulty: 'easy',
                    dietaryRestrictions: [],
                    cuisine: 'any',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate recipe');
            }

            const data = await response.json();
            setRecipe(data.recipe);
        } catch (err) {
            setError('Sorry, something went wrong. Please try again!');
            console.error('Recipe generation error:', err);
        } finally {
            setLoading(false);
        }
    };

    const readRecipeAloud = () => {
        if (!recipe) return;

        if (isReading) {
            speechSynthesis.cancel();
            setIsReading(false);
            return;
        }

        const text = `
      Recipe: ${recipe.title}. 
      ${recipe.description}
      
      Ingredients: ${recipe.ingredients.map(ing => `${ing.amount} ${ing.unit} of ${ing.name}`).join(', ')}.
      
      Instructions: ${recipe.instructions.join('. ')}.
      
      Prep time: ${recipe.prepTime} minutes. 
      Cook time: ${recipe.cookTime} minutes. 
      Serves: ${recipe.servings} people.
    `;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1;

        utterance.onstart = () => setIsReading(true);
        utterance.onend = () => setIsReading(false);
        utterance.onerror = () => setIsReading(false);

        speechSynthesis.speak(utterance);
    };

    const openYouTubeSearch = () => {
        if (!recipe?.youtubeSearchTerm && !recipe?.title) return;

        const searchTerm = recipe.youtubeSearchTerm || `how to make ${recipe.title} recipe`;
        const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
        window.open(youtubeUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <ChefHat className="h-8 w-8 text-orange-600 mr-3" />
                            <h1 className="text-2xl font-bold text-gray-900">AI Recipe Generator</h1>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <RecipeSidebar
                    onCategorySelect={handleCategorySelect}
                    onSubcategorySelect={handleSubcategorySelect}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main Content */}
                <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Recipe Input Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-lg p-8 mb-8"
                    >
                        <div className="text-center mb-6">
                            <Sparkles className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                What Would You Like to Cook?
                            </h2>
                            <p className="text-gray-600">
                                Just tell me what you want to cook and I&apos;ll create a perfect recipe for you!
                            </p>
                        </div>

                        {/* Search and Filters */}
                        <div className="space-y-4 mb-6">
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search recipes or ingredients..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            {/* Filter Toggle */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
                                >
                                    <Filter className="h-5 w-5" />
                                    <span>Filters</span>
                                </button>
                                <div className="text-sm text-gray-500">
                                    {favorites.length} favorites saved
                                </div>
                            </div>

                            {/* Filters Panel */}
                            {showFilters && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-gray-50 rounded-lg p-4 space-y-4"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Difficulty
                                            </label>
                                            <select
                                                value={filters.difficulty}
                                                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            >
                                                <option value="">Any</option>
                                                <option value="easy">Easy</option>
                                                <option value="medium">Medium</option>
                                                <option value="hard">Hard</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Cook Time
                                            </label>
                                            <select
                                                value={filters.cookTime}
                                                onChange={(e) => setFilters({ ...filters, cookTime: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            >
                                                <option value="">Any</option>
                                                <option value="quick">Under 30 min</option>
                                                <option value="medium">30-60 min</option>
                                                <option value="long">Over 60 min</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Cuisine
                                            </label>
                                            <select
                                                value={filters.cuisine}
                                                onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            >
                                                <option value="">Any</option>
                                                <option value="italian">Italian</option>
                                                <option value="asian">Asian</option>
                                                <option value="mexican">Mexican</option>
                                                <option value="indian">Indian</option>
                                                <option value="american">American</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Dietary
                                            </label>
                                            <select
                                                value={filters.dietary}
                                                onChange={(e) => setFilters({ ...filters, dietary: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            >
                                                <option value="">Any</option>
                                                <option value="vegetarian">Vegetarian</option>
                                                <option value="vegan">Vegan</option>
                                                <option value="gluten-free">Gluten-Free</option>
                                                <option value="dairy-free">Dairy-Free</option>
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Try: 'Can you tell me recipe of burger' or 'I want to make chocolate cake' or 'Quick pasta dinner'"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                                    rows={3}
                                />
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={generateRecipe}
                                disabled={loading}
                                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="h-5 w-5 animate-spin mr-2" />
                                        Creating Your Recipe...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-5 w-5 mr-2" />
                                        Generate Recipe
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Recipe Display */}
                    {recipe && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            {/* Recipe Image */}
                            {recipe.imageUrl && (
                                <div className="w-full h-64 md:h-80 relative">
                                    <Image
                                        src={recipe.imageUrl}
                                        alt={recipe.title}
                                        fill
                                        className="object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            )}

                            <div className="p-8">
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
                                            <p className="text-gray-600">{recipe.description}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            {/* Favorite Button */}
                                            <motion.button
                                                onClick={() => toggleFavorite(recipe.id || 'temp-id')}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`relative flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl ${isFavorite(recipe.id || 'temp-id')
                                                        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                                                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                                                    }`}
                                                title={isFavorite(recipe.id || 'temp-id') ? "Remove from favorites" : "Add to favorites"}
                                            >
                                                <Heart className={`h-4 w-4 ${isFavorite(recipe.id || 'temp-id') ? 'fill-current' : ''}`} />
                                            </motion.button>

                                            {/* Read Aloud Button */}
                                            <motion.button
                                                onClick={readRecipeAloud}
                                                whileHover={{ scale: 1.02, y: -1 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`group relative flex items-center px-6 py-3 text-white rounded-xl font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl ${isReading
                                                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                                                    }`}
                                                title={isReading ? "Stop reading recipe aloud" : "Read recipe aloud"}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="relative flex items-center">
                                                    {isReading ? (
                                                        <>
                                                            <VolumeX className="h-4 w-4 mr-2 animate-pulse" />
                                                            <span>Stop Reading</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Volume2 className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                                                            <span>Read Aloud</span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                                            </motion.button>

                                            {/* YouTube Button */}
                                            <motion.button
                                                onClick={openYouTubeSearch}
                                                whileHover={{ scale: 1.02, y: -1 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="group relative flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                                                title="Watch video tutorial on YouTube"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="relative flex items-center">
                                                    <Youtube className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                                    <span>Watch Tutorial</span>
                                                    <ExternalLink className="h-3 w-3 ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                                                </div>
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                                            </motion.button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            Prep: {recipe.prepTime}min
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            Cook: {recipe.cookTime}min
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-1" />
                                            Serves: {recipe.servings}
                                        </div>
                                        <div className="px-2 py-1 bg-orange-100 text-orange-700 rounded">
                                            {recipe.difficulty}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Ingredients */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h4>
                                        <ul className="space-y-2">
                                            {recipe.ingredients.map((ingredient, index) => (
                                                <li key={index} className="flex justify-between text-gray-800">
                                                    <span className="text-gray-900">{ingredient.name}</span>
                                                    <span className="text-gray-500">
                                                        {ingredient.amount} {ingredient.unit}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Nutrition */}
                                    {recipe.nutritionInfo && (
                                        <div>
                                            <button
                                                onClick={() => setNutritionExpanded(!nutritionExpanded)}
                                                className="flex items-center justify-between w-full text-left mb-3 group"
                                            >
                                                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                                    Nutrition Information (per serving)
                                                </h4>
                                                <Info className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${nutritionExpanded ? 'rotate-180' : ''}`} />
                                            </button>

                                            {nutritionExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="bg-orange-50 rounded-lg p-4 space-y-3"
                                                >
                                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-orange-600">
                                                                {recipe.nutritionInfo.calories}
                                                            </div>
                                                            <div className="text-sm text-gray-600">Calories</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-blue-600">
                                                                {recipe.nutritionInfo.protein}g
                                                            </div>
                                                            <div className="text-sm text-gray-600">Protein</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-green-600">
                                                                {recipe.nutritionInfo.carbs}g
                                                            </div>
                                                            <div className="text-sm text-gray-600">Carbs</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-purple-600">
                                                                {recipe.nutritionInfo.fat}g
                                                            </div>
                                                            <div className="text-sm text-gray-600">Fat</div>
                                                        </div>
                                                    </div>

                                                    {/* Additional nutrition details */}
                                                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-orange-200">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Fiber:</span>
                                                            <span className="font-semibold">{recipe.nutritionInfo.fiber}g</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Sugar:</span>
                                                            <span className="font-semibold">{recipe.nutritionInfo.sugar}g</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Sodium:</span>
                                                            <span className="font-semibold">{recipe.nutritionInfo.sodium}mg</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Instructions */}
                                <div className="mt-8">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h4>
                                    <ol className="space-y-3">
                                        {recipe.instructions.map((step, index) => (
                                            <li key={index} className="flex">
                                                <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-800">{step}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
