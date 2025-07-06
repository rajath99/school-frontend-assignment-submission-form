// Home.js
import React from 'react';
import { Container, Typography,Grid2, Card, CardContent, Box, Paper } from '@mui/material';
import Carousel from './carousel/Carousel';
import Gallery from './gallery/Gallery';


const Home = () => {
  return (
    <Box sx={{width:'100%'}}>
      {/* Carousel Section */}
      <Carousel />

    
   
      {/* Programs Section */}
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Our Programs
        </Typography>
        <Grid2 container spacing={3} justifyContent="center">
          {['Elementary School', 'Middle School', 'High School'].map((program) => (
            <Grid2 item xs={12} sm={6} md={4} key={program}>
             <Card
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 2, sm: 3 },
                }}
             >

                <CardContent>
                  <Typography variant="h6" textAlign="center" fontSize={{ xs: '1rem', sm: '1.2rem', md: '1.5rem' }}>
                    {program}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Gallery Section */}
     
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
           Registerd Schools
        </Typography>
        <Gallery />
      </Box>

   
    </Box>
  );
};

export default Home;
