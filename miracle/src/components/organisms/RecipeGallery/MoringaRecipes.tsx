import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from '../Navbar/navbar';
import RecipesPageHeader from '../../molecules/recipe/RecipesPageHeader';
import RecipeCard from '../../molecules/recipe/RecipeCard';
import { API_ENDPOINTS } from '../../../constants/api';

interface Recipe {
  id: number;
  title: string;
  image: string;
  onClick: () => void;
  ingredients: string[];
  instructions: string[];
  benefits: string;
}

const MoringaRecipes = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.RECIPES}`);
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        const mapped: Recipe[] = (data || []).map((r: any) => ({
          id: r.id,
          title: r.title,
          image: r.image ? (r.image.startsWith('http') ? r.image : `${API_ENDPOINTS.BASE_URL}${r.image}`) : '',
          onClick: () => {},
          ingredients: r.ingredients || [],
          instructions: r.instructions || [],
          benefits: r.benefits || ''
        }));
        setRecipes(mapped);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error loading recipes');
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ 
        py: 8, 
        background: '#ffffff',
        color: '#16312a'
      }}>
        <RecipesPageHeader 
          title="🥗 Recipes with Miracle Root Moringa"
          description="Fuel your body with vibrant, delicious meals powered by Moringa! Whether you're starting your day, recharging midday, or unwinding in the evening, these recipes help you add a healthy dose of nutrients—without compromising flavor."
        />
        
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
            mt: 4
          }}>
            {loading ? (
              <div className="col-span-full text-center text-gray-500 py-8">Loading recipes...</div>
            ) : error ? (
              <div className="col-span-full text-center text-red-600 py-8">{error}</div>
            ) : recipes.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-8">No recipes found</div>
            ) : (
              recipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  ingredients={recipe.ingredients}
                  instructions={recipe.instructions}
                  benefits={recipe.benefits}
                  onClick={recipe.onClick}
                />
              ))
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MoringaRecipes;