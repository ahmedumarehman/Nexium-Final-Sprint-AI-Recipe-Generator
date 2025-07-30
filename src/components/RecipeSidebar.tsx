'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { recipeCategories, RecipeCategory, RecipeSubcategory } from '@/lib/recipeCategories';

interface RecipeSidebarProps {
    onCategorySelect: (category: RecipeCategory) => void;
    onSubcategorySelect: (subcategory: RecipeSubcategory) => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function RecipeSidebar({
    onCategorySelect,
    onSubcategorySelect,
    isOpen,
    onClose
}: RecipeSidebarProps) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleCategoryClick = (category: RecipeCategory) => {
        toggleCategory(category.id);
        onCategorySelect(category);
    };

    const handleSubcategoryClick = (subcategory: RecipeSubcategory) => {
        onSubcategorySelect(subcategory);
        onClose();
    };

    const CategoryContent = () => (
        <div className="p-4 space-y-2">
            {recipeCategories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                        onClick={() => handleCategoryClick(category)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{category.icon}</span>
                            <span className="font-medium text-gray-900">{category.name}</span>
                        </div>
                        <motion.div
                            animate={{ rotate: expandedCategories.includes(category.id) ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {expandedCategories.includes(category.id) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-gray-200 bg-gray-50"
                            >
                                <div className="p-2 space-y-1">
                                    {category.subcategories.map((subcategory) => (
                                        <button
                                            key={subcategory.id}
                                            onClick={() => handleSubcategoryClick(subcategory)}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white hover:text-orange-600 rounded-md transition-colors duration-200 flex items-center space-x-2"
                                        >
                                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                                            <span>{subcategory.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                        onClick={onClose}
                    />
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
                <div className="h-full bg-white border-r border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">Recipe Categories</h2>
                        <p className="text-sm text-gray-600 mt-1">Browse recipes by category</p>
                    </div>
                    <div className="overflow-y-auto h-full pb-20">
                        <CategoryContent />
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <motion.div
                initial={false}
                animate={{ x: isOpen ? 0 : -300 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden"
            >
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Recipe Categories</h2>
                    <p className="text-sm text-gray-600 mt-1">Browse recipes by category</p>
                </div>
                <div className="overflow-y-auto h-full pb-20">
                    <CategoryContent />
                </div>
            </motion.div>
        </>
    );
}
