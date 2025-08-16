import {
  Box,
  Typography,
  Container,
  Paper
} from '@mui/material';
import Navbar from '../Navbar/navbar';

const MoringaRecipes = () => {
  const recipes = [
    {
      icon: "🍃",
      title: "Green Moringa Smoothie",
      subtitle: "A perfect morning energy booster!",
      ingredients: [
        "1 banana (ripe)",
        "1 cup spinach",
        "1 cup almond or oat milk",
        "1/2 apple or 1/2 cup frozen pineapple",
        "1 tsp Miracle Root Moringa powder",
        "1 tbsp chia seeds (optional)",
        "Ice cubes as needed"
      ],
      instructions: [
        "Add all ingredients to a blender.",
        "Blend on high until smooth and creamy.",
        "Pour into a glass and serve chilled."
      ],
      benefits: "Energy boost, detox support, fiber-rich"
    },
    {
      icon: "🍵",
      title: "Moringa Detox Tea",
      subtitle: "Calming, cleansing, and caffeine-free",
      ingredients: [
        "1 tsp Miracle Root Moringa powder or 1 Moringa tea bag",
        "1 cup hot water (not boiling)",
        "1/2 tsp honey or lemon (optional)"
      ],
      instructions: [
        "Stir the Moringa powder into hot water until fully dissolved.",
        "Let it steep for 3–5 minutes.",
        "Add honey or lemon to taste. Sip slowly."
      ],
      benefits: "Detox, digestion, antioxidant-rich"
    },
    {
      icon: "🥑",
      title: "Moringa Guacamole",
      subtitle: "A nutrient-packed twist on a party favorite",
      ingredients: [
        "2 ripe avocados",
        "1 small tomato, finely chopped",
        "1/2 red onion, finely chopped",
        "1 tsp Miracle Root Moringa powder",
        "Juice of 1 lime",
        "Salt and pepper to taste",
        "Chopped cilantro (optional)"
      ],
      instructions: [
        "Mash avocados in a bowl.",
        "Add onion, tomato, Moringa powder, lime juice, and seasoning.",
        "Mix well and chill before serving."
      ],
      benefits: "Healthy fats, anti-inflammatory, rich in vitamins"
    },
    {
      icon: "🌿",
      title: "Moringa Hummus",
      subtitle: "A vibrant green dip with earthy, savory flavor",
      ingredients: [
        "1 can (15 oz) chickpeas, drained",
        "2 tbsp tahini",
        "2 cloves garlic",
        "Juice of 1 lemon",
        "1 tsp Miracle Root Moringa powder",
        "2 tbsp olive oil",
        "Salt to taste",
        "Water to adjust consistency"
      ],
      instructions: [
        "Blend all ingredients in a food processor until smooth.",
        "Add water 1 tbsp at a time to achieve desired consistency.",
        "Garnish with a drizzle of olive oil and paprika."
      ],
      benefits: "Plant-based protein, fiber, iron"
    },
    {
      icon: "🍲",
      title: "Moringa Soup for Immunity",
      subtitle: "Comforting, warming, and immunity-boosting",
      ingredients: [
        "1 tbsp olive oil",
        "1 onion, chopped",
        "2 cloves garlic, minced",
        "1-inch ginger, grated",
        "1 carrot, chopped",
        "1/2 cup cooked lentils (or split peas)",
        "3 cups vegetable broth",
        "1 tsp Miracle Root Moringa powder",
        "Salt, pepper, and turmeric to taste",
        "Lemon juice to finish"
      ],
      instructions: [
        "Sauté onion, garlic, and ginger in oil.",
        "Add carrot and lentils; cook for 3–4 mins.",
        "Add broth and simmer for 10 mins.",
        "Stir in Moringa powder, season, and blend (optional).",
        "Finish with lemon juice before serving."
      ],
      benefits: "Immune support, gut health, anti-inflammatory"
    },
    {
      icon: "🍳",
      title: "Moringa Omelette",
      subtitle: "A protein-packed breakfast with a green superfood twist",
      ingredients: [
        "2 eggs",
        "1/4 small onion, chopped",
        "1/4 cup spinach or chopped herbs",
        "1/2 small tomato, diced",
        "1/2 tsp Miracle Root Moringa powder",
        "Salt and pepper to taste",
        "1 tsp olive oil or butter"
      ],
      instructions: [
        "Beat eggs with Moringa powder, salt, and pepper.",
        "Heat oil in a non-stick pan. Sauté onion and tomato until soft.",
        "Add spinach and cook briefly.",
        "Pour in egg mixture and cook on low until set.",
        "Fold and serve hot."
      ],
      benefits: "High in protein, antioxidants, iron"
    },
    {
      icon: "🥗",
      title: "Moringa Salad Dressing",
      subtitle: "Elevate any salad with this nutrient-packed dressing",
      ingredients: [
        "1/4 cup olive oil",
        "2 tbsp lemon juice",
        "1 tsp Miracle Root Moringa powder",
        "1 tsp honey or maple syrup",
        "1 small garlic clove, minced",
        "1/2 tsp Dijon mustard",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Whisk all ingredients together in a small bowl.",
        "Adjust seasoning to taste.",
        "Drizzle over your favorite salad and toss to combine."
      ],
      benefits: "Antioxidant-rich, supports nutrient absorption"
    },
    {
      icon: "🍪",
      title: "Moringa Energy Balls",
      subtitle: "Perfect for on-the-go snacking",
      ingredients: [
        "1 cup dates, pitted",
        "1/2 cup almonds",
        "1/2 cup rolled oats",
        "1 tbsp chia seeds",
        "1 tsp Miracle Root Moringa powder",
        "1 tbsp almond butter",
        "1/2 tsp vanilla extract",
        "Pinch of salt",
        "Desiccated coconut for rolling (optional)"
      ],
      instructions: [
        "Process all ingredients in a food processor until sticky.",
        "Roll into small balls (about 1 tbsp each).",
        "Optional: Roll in coconut for extra texture.",
        "Chill for 30 minutes before serving."
      ],
      benefits: "Sustained energy, fiber, healthy fats"
    }
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ 
        py: 8, 
        background: '#ffffff',
        color: '#16312a'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center',
            color: '#16312a'
          }}>
            🥗 Recipes with Miracle Root Moringa
          </Typography>

          <Typography variant="body1" sx={{ 
            mb: 5, 
            color: '#16312a',
            opacity: 0.7,
            textAlign: 'center',
            maxWidth: 800,
            mx: 'auto'
          }}>
            Fuel your body with vibrant, delicious meals powered by Moringa! Whether you're starting your day,
            recharging midday, or unwinding in the evening, these recipes help you add a healthy dose of nutrients—without compromising flavor.
          </Typography>

          {recipes.map((recipe, index) => (
            <Paper 
              key={index} 
              elevation={3} 
              sx={{ 
                mb: 4, 
                p: 3, 
                borderRadius: 3,
                border: '1px solid #16312a',
                backgroundColor: '#ffffff'
              }}
            >
              <Typography variant="h5" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                fontWeight: 'bold',
                color: '#16312a',
                mb: 2
              }}>
                <Box component="span" sx={{ mr: 2, fontSize: '1.5rem' }}>{recipe.icon}</Box>
                {recipe.title}
              </Typography>
              
              <Typography variant="subtitle1" sx={{ 
                mb: 3, 
                color: '#16312a',
                opacity: 0.6,
                fontStyle: 'italic'
              }}>
                {recipe.subtitle}
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                mb: 3
              }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ 
                    mb: 1.5, 
                    fontWeight: 'bold',
                    color: '#16312a'
                  }}>
                    Ingredients
                  </Typography>
                  {recipe.ingredients.map((ingredient, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography sx={{ mr: 1, color: '#16312a', fontWeight: 'bold' }}>•</Typography>
                      <Typography variant="body1" sx={{ color: '#16312a' }}>{ingredient}</Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ 
                    mb: 1.5, 
                    fontWeight: 'bold',
                    color: '#16312a'
                  }}>
                    Instructions
                  </Typography>
                  {recipe.instructions.map((instruction, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography sx={{ mr: 1, color: '#16312a', fontWeight: 'bold', minWidth: 24 }}>
                        {i + 1}.
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#16312a' }}>{instruction}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: '#16312a',
                color: '#ffffff'
              }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 'bold', 
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Box component="span" sx={{ mr: 1 }}>🌟</Box>
                  Benefits: {recipe.benefits}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Container>
      </Box>
    </>
  );
};

export default MoringaRecipes;