import React from 'react';
import { Typography, Container } from '@mui/material';

interface RecipesPageHeaderProps {
  title: string;
  description: string;
}

const RecipesPageHeader: React.FC<RecipesPageHeaderProps> = ({ title, description }) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{
        fontWeight: 'bold',
        mb: 3,
        textAlign: 'center',
        color: '#16312a',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
      }}>
        {title}
      </Typography>

      <Typography variant="body1" sx={{ 
        mb: 5, 
        color: '#16312a',
        opacity: 0.7,
        textAlign: 'center',
        maxWidth: 800,
        mx: 'auto',
        fontSize: { xs: '0.875rem', sm: '1rem' },
        px: { xs: 2, sm: 0 }
      }}>
        {description}
      </Typography>
    </Container>
  );
};

export default RecipesPageHeader;
