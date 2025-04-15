import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/About.css';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import jj from '../../assets/images/jj.png';
import heo from '../../assets/images/heo.png';
import makyra from '../../assets/images/makyra.png';   
import min from '../../assets/images/min.png';
import tae2 from '../../assets/images/tae.png';
import yejune from '../../assets/images/yejune.png';
import elisha from '../../assets/images/elisha.png';

const AboutPage = () => {
  return (
    <Box
      className="home-container"
      sx={{
        paddingTop: 8,
        fontFamily: 'Rubik, sans-serif',
        backgroundColor: '#FFEDD2',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Navbar />

      <Container sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: 'bold', marginBottom: 2 }}
        >
          Meet Our Team
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ maxWidth: 600, margin: '0 auto', marginBottom: 4 }}
        >
            As we continue to grow, our focus remains on blending cutting-edge technology with a passion for community. Join us as we innovate and pave the way for the future of online commerce.

        </Typography>

        <Grid container spacing={4}>
          {/* Team Member 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardMedia
                component="img"
                height="300"
                image={jj}
                alt="JJ"
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  JJ Oh
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  ECE
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Member 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardMedia
                component="img"
                height="300"
                image={heo}
                alt="June"
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  Yejune Heo
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  ECE
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Member 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardMedia
                component="img"
                height="300"
                image={makyra}
                alt="Ronald Richards"
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  Makyra Kim
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  Computer Science
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Member 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardMedia
                component="img"
                height="300"
                image={min}
                alt="Floyd Miles"
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  Minkyu Kim
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  Psychology
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Member 5 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardMedia
                component="img"
                height="300"
                image={yejune}
                alt="Yejune Kim"
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  Yejune Kim
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  Data Science & Math
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Member 6 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardMedia
                component="img"
                height="300"
                image={tae2}
                alt="Robert Fox"
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  Taehee Kim
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  RTF
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Member 7 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardMedia
                component="img"
                height="300"
                image={elisha}
                alt="Taegang Kim"
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  Taegang Kim
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  Computer Science
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default AboutPage;
