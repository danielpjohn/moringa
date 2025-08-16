import {
  Box,
  Typography,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from 'react';
import defaultMoringaImage from '../images/moringa.jpg';
import defaultRecipeImage from '../images/recipe.jpg';

const LearnMore = () => {
  const [moringaImage, setMoringaImage] = useState(defaultMoringaImage);
  const [recipeImage, setRecipeImage] = useState(defaultRecipeImage);
  const [isLoading, setIsLoading] = useState({
    moringa: true,
    recipe: true
  });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(prev => ({ ...prev, moringa: true, recipe: true }));
        const response = await fetch('http://127.0.0.1:8000/get-all-images/');

        if (response.ok) {
          const data = await response.json();
          // console.log('API Response:', data);

          if (Array.isArray(data) && data.length > 0) {
            // Find moringa image (case insensitive search)
            const moringaImg = data.find(item =>
              item.image.toLowerCase().includes('moringa')
            );
            if (moringaImg) {
              console.log('Found Moringa image:', moringaImg.image);
              setMoringaImage(moringaImg.image);
            }

            // Find recipe image (case insensitive search)
            const recipeImg = data.find(item =>
              item.image.toLowerCase().includes('recipe')
            );
            if (recipeImg) {
              console.log('Found Recipe image:', recipeImg.image);
              setRecipeImage(recipeImg.image);
            }
          } else {
            console.log('Empty response array');
          }
        } else {
          console.log('API request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setIsLoading(prev => ({ ...prev, moringa: false, recipe: false }));
      }
    };

    fetchImages();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, imageType: 'moringa' | 'recipe') => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    console.error(`${imageType} image failed to load:`, target.src);
    target.src = imageType === 'moringa' ? defaultMoringaImage : defaultRecipeImage;
  };

  const benefits = [
    {
      title: "Immunity Booster",
      icon: "🌿",
      details: [
        "High in Vitamin C, Vitamin A, Zinc, and Iron",
        "Boosts white blood cell production",
        "Helps fight infection and inflammation",
        "Reference: Gopalakrishnan et al., 2016 – Food Science and Human Wellness"
      ]
    },
    {
      title: "Natural Energy Support",
      icon: "⚡",
      details: [
        "Rich in B-vitamins for sustained energy",
        "Iron content helps combat fatigue",
        "Natural amino acids support muscle function",
        "Reference: Vergara-Jimenez et al., 2017 – Journal of Food and Nutrition Research"
      ]
    },
    {
      title: "Heart Health Support",
      icon: "❤️",
      details: [
        "Potassium helps regulate blood pressure",
        "Antioxidants support cardiovascular health",
        "Omega-3 fatty acids for heart function",
        "Reference: Mbikay, 2012 – Frontiers in Pharmacology"
      ]
    },
    {
      title: "Skin & Hair Health",
      icon: "✨",
      details: [
        "Vitamin E and C for collagen production",
        "Antioxidants protect against free radicals",
        "Biotin supports healthy hair growth",
        "Reference: Paikra et al., 2017 – International Journal of Current Microbiology"
      ]
    }
  ];

  const nutrients = [
    { nutrient: "Vitamin C", function: "Immune support, skin health" },
    { nutrient: "Iron", function: "Energy production, oxygen transport" },
    { nutrient: "Calcium", function: "Bone health, muscle function" },
    { nutrient: "Zinc", function: "Immunity, wound healing" },
    { nutrient: "Amino Acids", function: "Muscle recovery, enzyme function" },
    { nutrient: "Antioxidants", function: "Fights aging and oxidative stress" }
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
    <>
      <Box sx={{ py: 8, background: 'linear-gradient(to bottom, #f5f9f5, #ffffff)' }}>
        <Container maxWidth="lg">
          <Button
            component={Link}
            to="/why-moringa"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
          >
            Back to Why Moringa
          </Button>

          {/* Main Flex Container */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 6,
              flexDirection: { xs: 'column', md: 'row' }
            }}
          >
            {/* Text Content - Left Side */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" sx={{
                fontWeight: 'bold',
                mb: 3,
                background: 'linear-gradient(45deg, #2e7d32, #81c784)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Health Benefits
              </Typography>

              <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
                Why Moringa is the Miracle Tree
              </Typography>

              <Typography paragraph sx={{ mb: 4 }}>
                Moringa oleifera, also known as the Miracle Tree, has been used in traditional medicine for centuries—and now, science is catching up. Our 100% pure Moringa powder is rich in vitamins, minerals, antioxidants, and essential amino acids that help support your health from the inside out.
              </Typography>

              {benefits.map((benefit, index) => (
                <Accordion key={index} elevation={2} sx={{ mb: 2, borderRadius: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box component="span" sx={{ mr: 2 }}>{benefit.icon}</Box>
                      {benefit.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {benefit.details.map((detail, i) => (
                        <ListItem key={i} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {i < benefit.details.length - 1 ? (
                              <CheckCircleIcon color="primary" />
                            ) : (
                              <Typography variant="caption" color="text.secondary">📚</Typography>
                            )}
                          </ListItemIcon>
                          <Typography
                            variant={i < benefit.details.length - 1 ? 'body1' : 'caption'}
                            color={i < benefit.details.length - 1 ? 'text.primary' : 'text.secondary'}
                          >
                            {detail}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}

              {/* Key Nutrients Section */}
              <Box sx={{ mt: 6, mb: 6 }}>
                <Typography variant="h4" sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  background: 'linear-gradient(45deg, #2e7d32, #81c784)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Summary of Key Nutrients in Moringa
                </Typography>

                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'primary.light' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Nutrient</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Function</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {nutrients.map((row, index) => (
                        <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                          <TableCell sx={{ fontWeight: 'medium' }}>{row.nutrient}</TableCell>
                          <TableCell>{row.function}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Recipes Section */}
              <Box sx={{ mt: 6 }}>
                <Typography variant="h4" sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  background: 'linear-gradient(45deg, #2e7d32, #81c784)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  🥗 Recipes with Miracle Root Moringa
                </Typography>

                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                  Fuel your body with vibrant, delicious meals powered by Moringa! Whether you're starting your day,
                  recharging midday, or unwinding in the evening, these recipes help you add a healthy dose of nutrients—without compromising flavor.
                </Typography>

                {recipes.map((recipe, index) => (
                  <Accordion key={index} elevation={2} sx={{ mb: 2, borderRadius: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box component="span" sx={{ mr: 2 }}>{recipe.icon}</Box>
                        {`${index + 1}. ${recipe.title}`}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2, color: 'text.secondary' }}>
                        {recipe.subtitle}
                      </Typography>

                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>Ingredients:</Typography>
                      <List sx={{ mb: 2 }}>
                        {recipe.ingredients.map((ingredient, i) => (
                          <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <Typography variant="body2">•</Typography>
                            </ListItemIcon>
                            <Typography variant="body2">{ingredient}</Typography>
                          </ListItem>
                        ))}
                      </List>

                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>Instructions:</Typography>
                      <List sx={{ mb: 2 }}>
                        {recipe.instructions.map((instruction, i) => (
                          <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{i + 1}.</Typography>
                            </ListItemIcon>
                            <Typography variant="body2">{instruction}</Typography>
                          </ListItem>
                        ))}
                      </List>

                      <Box sx={{
                        bgcolor: 'success.light',
                        p: 2,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'success.main'
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.dark' }}>
                          Benefits: {recipe.benefits}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>

            {/* Image - Right Side */}
            <Box sx={{ flex: 1 }}>
              {/* Moringa Image */}
              <Paper elevation={6} sx={{ borderRadius: 3, overflow: 'hidden', position: 'sticky', top: 20, mb: 24 }}>
                {isLoading.moringa ? (
                  <Box sx={{
                    width: '100%',
                    height: 400,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography>Loading Moringa image...</Typography>
                  </Box>
                ) : (
                  <Box
                    component="img"
                    src={moringaImage}
                    alt="Organic Moringa Powder"
                    onError={(e) => handleImageError(e, 'moringa')}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      transition: 'opacity 0.3s ease',
                      opacity: isLoading.moringa ? 0 : 1
                    }}
                  />
                )}
                <Box sx={{
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  p: 2,
                  textAlign: 'center'
                }}>
                  <Typography variant="h6">Organic Moringa Powder</Typography>
                </Box>
              </Paper>

              {/* Recipe Image */}
              <Paper elevation={6} sx={{ borderRadius: 3, overflow: 'hidden', position: 'sticky', top: 30 }}>
                {isLoading.recipe ? (
                  <Box sx={{
                    width: '100%',
                    height: 300,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography>Loading Recipe image...</Typography>
                  </Box>
                ) : (
                  <Box
                    component="img"
                    src={recipeImage}
                    alt="Moringa Recipes"
                    onError={(e) => handleImageError(e, 'recipe')}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      transition: 'opacity 0.3s ease',
                      opacity: isLoading.recipe ? 0 : 1
                    }}
                  />
                )}
                <Box sx={{
                  bgcolor: 'rgba(46, 125, 50, 0.9)',
                  color: 'white',
                  p: 2,
                  textAlign: 'center'
                }}>
                  <Typography variant="h6">Delicious Moringa Recipes</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Transform your meals with the power of Moringa
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LearnMore;