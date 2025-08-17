import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Recipe {
  icon: string;
  title: string;
  subtitle: string;
  ingredients: string[];
  instructions: string[];
  benefits: string;
}

interface RecipeAccordionSectionProps {
  recipes: Recipe[];
  title: string;
  description: string;
}

const RecipeAccordionSection: React.FC<RecipeAccordionSectionProps> = ({ 
  recipes, 
  title, 
  description 
}) => {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h4" sx={{
        fontWeight: 'bold',
        mb: 2,
        background: 'linear-gradient(45deg, #2e7d32, #81c784)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {title}
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        {description}
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
  );
};

export default RecipeAccordionSection;
