import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getUserRecipes, getAllRecipes } from '@/lib/recipes';

export async function GET(request: NextRequest) {
    try {
        // Get user from Supabase auth
        const authHeader = request.headers.get('Authorization');
        let user = null;

        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);

            if (!authError && authUser) {
                user = authUser;
            }
        }

        const { searchParams } = new URL(request.url);
        const userOnly = searchParams.get('userOnly') === 'true';

        let recipes;
        if (userOnly && user) {
            recipes = await getUserRecipes(user.id);
        } else {
            recipes = await getAllRecipes();
        }

        return NextResponse.json({ recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return NextResponse.json(
            { error: 'Failed to fetch recipes' },
            { status: 500 }
        );
    }
}
