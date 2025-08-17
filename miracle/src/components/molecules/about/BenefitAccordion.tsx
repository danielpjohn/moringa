import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Benefit {
  title: string;
  icon: string;
  details: string[];
}

interface BenefitAccordionProps {
  benefits: Benefit[];
}

const BenefitAccordion: React.FC<BenefitAccordionProps> = ({ benefits }) => {
  return (
    <>
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
    </>
  );
};

export default BenefitAccordion;
