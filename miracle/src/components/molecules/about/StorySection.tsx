import { Box, Typography, useTheme } from '@mui/material';

interface StorySectionProps {
  paragraphs: string[];
  conclusion?: string;
  className?: string;
}

const StorySection = ({ paragraphs, conclusion, className = "" }: StorySectionProps) => {
  const theme = useTheme();
  
  return (
    <Box sx={{
      my: 4,
      p: { xs: 2, md: 4 },
      borderRadius: 2,
      background: '#ffffff',
      boxShadow: '0px 4px 20px rgba(46, 125, 50, 0.1)'
    }} className={className}>
      {paragraphs.map((paragraph, index) => (
        <Typography
          key={index}
          paragraph
          sx={{
            mb: 3,
            lineHeight: 1.8,
            color: theme.palette.grey[700],
            fontSize: '1.1rem'
          }}
        >
          {paragraph}
        </Typography>
      ))}

      {conclusion && (
        <Typography
          sx={{
            mt: 4,
            fontWeight: 'medium',
            fontStyle: 'italic',
            textAlign: 'center',
            color: theme.palette.primary.dark,
            fontSize: '1.2rem'
          }}
        >
          {conclusion}
        </Typography>
      )}
    </Box>
  );
};

export default StorySection;
