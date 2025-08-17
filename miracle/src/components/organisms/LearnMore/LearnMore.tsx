import { Box, Container } from '@mui/material';
import LearnMoreHeader from '../../molecules/learnmore/LearnMoreHeader';
import BenefitAccordion from '../../molecules/about/BenefitAccordion';
import NutrientSummaryTable from '../../molecules/learnmore/NutrientSummaryTable';
import RecipeAccordionSection from '../../molecules/recipe/RecipeAccordionSection';
import LearnMoreImageSection from '../../molecules/learnmore/LearnMoreImageSection';

const LearnMore = () => {
  // Using static images from public directory
  const moringaImage = '/images/moringa-placeholder.jpg'; // Make sure these files exist in your public/images directory
  const recipeImage = '/images/recipe-placeholder.jpg';

  const benefits = [
    { 
      title: 'Rich in Nutrients', 
      icon: '🌿',
      details: ['Moringa leaves are packed with vitamins A, C, and E, calcium, potassium, and protein.'] 
    },
    { 
      title: 'Antioxidant Powerhouse', 
      icon: '✨',
      details: ['Contains antioxidants that help protect cells from damage and reduce inflammation.'] 
    },
    { 
      title: 'Lowers Blood Sugar', 
      icon: '📉',
      details: ['Studies show moringa can help lower blood sugar levels and reduce complications in diabetes.'] 
    },
    { 
      title: 'Anti-inflammatory Effects', 
      icon: '❄️',
      details: ['The isothiocyanates in moringa have potent anti-inflammatory properties.'] 
    },
    { 
      title: 'Supports Brain Health', 
      icon: '🧠',
      details: ['Antioxidants and neuro-enhancers in moringa support brain health and cognitive function.'] 
    },
    { 
      title: 'Protects the Liver', 
      icon: '🛡️',
      details: ['Moringa contains high concentrations of polyphenols that protect the liver from damage.'] 
    }
  ];


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
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <LearnMoreHeader
          title="Discover the Power of Moringa"
          subtitle="Nature's Miracle Tree"
          description="Moringa oleifera, also known as the 'Miracle Tree', is a nutrient-dense superfood that has been used for centuries in traditional medicine. Packed with vitamins, minerals, and antioxidants, moringa offers numerous health benefits and culinary uses."
        />

        <Box sx={{ my: 8 }}>
          <BenefitAccordion benefits={benefits} />
        </Box>

        <Box sx={{ my: 8 }}>
          <NutrientSummaryTable
            categories={[
              {
                category: 'Vitamins',
                nutrients: [
                  { name: 'Vitamin C', amount: '42mg', dailyValue: '47' },
                  { name: 'Vitamin A', amount: '378mcg', dailyValue: '42' },
                  { name: 'Vitamin E', amount: '10.8mg', dailyValue: '72' },
                ]
              },
              {
                category: 'Minerals',
                nutrients: [
                  { name: 'Calcium', amount: '185mg', dailyValue: '14' },
                  { name: 'Potassium', amount: '337mg', dailyValue: '7' },
                  { name: 'Iron', amount: '4.0mg', dailyValue: '22' },
                ]
              },
              {
                category: 'Other',
                nutrients: [
                  { name: 'Protein', amount: '8.2g', dailyValue: '16' },
                  { name: 'Fiber', amount: '2.0g', dailyValue: '7' },
                ]
              }
            ]}
            servingSize="2 tbsp (10g)"
            servingsPerContainer="about 10"
            calories={25}
          />
        </Box>

        <Box sx={{ my: 8 }}>
          <RecipeAccordionSection 
            recipes={recipes}
            title="Delicious Moringa Recipes"
            description="Try these nutritious and tasty recipes featuring moringa as a key ingredient."
          />
        </Box>

        <Box sx={{ my: 8 }}>
          <LearnMoreImageSection
            images={[
              {
                src: moringaImage,
                alt: 'Fresh moringa leaves and powder',
              },
              {
                src: recipeImage,
                alt: 'Delicious moringa recipes',
              },
              {
                src: '/images/moringa-tree.jpg',
                alt: 'Moringa tree',
              }
            ]}
            title="Moringa in Action"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default LearnMore;