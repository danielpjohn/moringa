import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';
import Navbar from '../Navbar/navbar';

const About = () => {
  const theme = useTheme();
  
  return (
    <><Navbar /><Container maxWidth="md" sx={{
          py: 8,
          background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)'
      }}>
          <Box sx={{
              textAlign: 'center',
              mb: 6,
              px: { xs: 2, md: 0 }
          }}>
              <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #2e7d32, #81c784)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                      letterSpacing: 1.2,
                      mb: 2
                  }}
              >
                  Our Story
              </Typography>
              <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                      color: theme.palette.grey[600],
                      fontStyle: 'italic',
                      mb: 4
                  }}
              >
                  The Miracle Root Moringa Journey
              </Typography>
          </Box>

          <Box sx={{
              my: 4,
              p: { xs: 2, md: 4 },
              borderRadius: 2,
              background: '#ffffff',
              boxShadow: '0px 4px 20px rgba(46, 125, 50, 0.1)'
          }}>
              {[
                  "At Miracle Root Moringa, we believe true wellness starts with what you feed your body—and your soul. Our journey began with a deep respect for nature's healing power and a mission to share one of the world's most nutrient-rich superfoods with those seeking clean, natural nourishment.",

                  "Sourced from the pristine farms of India, our Moringa powder is made from hand-picked leaves, naturally dried, and carefully processed to retain maximum nutrients. It's rich in essential vitamins, minerals, amino acids, and antioxidants—crafted to support your energy, immunity, and overall vitality.",

                  "But Miracle Root Moringa is more than just a superfood. It's a commitment to purity, sustainability, and community. We work closely with local farmers, use eco-conscious practices, and uphold the highest standards in quality from soil to shelf.",

                  "Whether you're starting your day with a green smoothie or adding a nutritional boost to your wellness routine, Miracle Root Moringa helps you reconnect with the power of nature."
              ].map((paragraph, index) => (
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
                  Join us on a journey to revitalize your body and nourish your soul—naturally.
              </Typography>
          </Box>

          {/* YouTube Video Container */}
          <Box sx={{
              my: 6,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
              <Typography variant="h5" component="h3" sx={{
                  textAlign: 'center',
                  mb: 2,
                  color: theme.palette.primary.dark,
                  fontWeight: 'bold'
              }}>
                  Discover the Power of Moringa
              </Typography>
              <Box sx={{
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden'
              }}>
                  <iframe
                      width="100%"
                      height="100%"
                      style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none'
                      }}
                      src="https://www.youtube.com/embed/BqFZfQ3no4Y" 
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                  ></iframe>
              </Box>
              <Typography variant="body2" sx={{
                  textAlign: 'center',
                  mt: 1,
                  color: theme.palette.grey[600],
                  fontStyle: 'italic'
              }}>
                  Learn more about the amazing benefits of Moringa
              </Typography>
          </Box>
      </Container></>
  );
};

export default About;