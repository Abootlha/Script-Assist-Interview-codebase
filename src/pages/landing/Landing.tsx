import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Card,
  SimpleGrid,
  ThemeIcon,
  useMantineTheme,
  createStyles,
  keyframes,
  Box,
} from '@mantine/core';
import { IconDatabase, IconSearch, IconUserCircle, IconRocket } from '@tabler/icons-react';
import useAuthStore from '../../store/app.store';
import bgImage from '../../assets/bg.jpg';

interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: IconDatabase,
    title: 'Comprehensive Database',
    description: 'Access detailed information about characters, planets, starships, and more from the Star Wars universe.',
  },
  {
    icon: IconSearch,
    title: 'Advanced Search',
    description: 'Powerful search and filtering capabilities to help you find exactly what you\'re looking for.',
  },
  {
    icon: IconUserCircle,
    title: 'User Accounts',
    description: 'Secure authentication system to keep track of your searches and favorite items.',
  },
  {
    icon: IconRocket,
    title: 'Real-time Updates',
    description: 'Stay up to date with the latest additions to the Star Wars universe.',
  },
];

const glow = keyframes({
  '0%': { boxShadow: '0 0 5px rgba(255, 232, 31, 0.7)' },
  '50%': { boxShadow: '0 0 20px rgba(255, 165, 0, 0.9)' },
  '100%': { boxShadow: '0 0 5px rgba(255, 232, 31, 0.7)' },
});

const parallax = keyframes({
  '0%': { transform: 'translateY(0)' },
  '100%': { transform: 'translateY(-20px)' }, 
});

const iconBackgroundColors = ['#FFE81F', '#FFA500', '#FFD700', '#F0E68C'];

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    padding: Number(theme.spacing.xl) * 2,
    //backgroundImage: 'url(https://i.imgur.com/HKR8R8N.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    animation: `${parallax} 30s linear infinite alternate`, 

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)', 
      zIndex: 0,
    },
  },

  backgroundContainer: { 
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: -1, 
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    animation: `${parallax} 30s linear infinite alternate`, 
  },

  inner: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
  },

  title: {
    color: theme.white,
    fontWeight: 900,
    fontSize: '4rem',
    marginBottom: theme.spacing.md,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
    [theme.fn.smallerThan('sm')]: {
      fontSize: '3rem',
    },
  },

  description: {
    color: theme.colors.gray[2],
    fontSize: '1.2rem',
    maxWidth: '700px',
    margin: '0 auto',
    marginBottom: theme.spacing.xl,
  },

  button: {
    background: theme.fn.linearGradient(45, '#FFE81F', '#FFA500'),
    fontSize: '1.1rem',
    padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    animation: `${glow} 2s ease-in-out infinite`, 

    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 12px rgba(0, 0, 0, 0.4)',
    },
  },

  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    borderRadius: theme.radius.md,

    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 10px rgba(0, 0, 0, 0.4)',
    },
  },

  featureIcon: {
  },

  featureTitle: {
    color: theme.white,
    fontWeight: 600,
    fontSize: '1.1rem',
  },

  featureDescription: {
    color: theme.colors.gray[3],
    fontSize: '0.9rem',
  },

  poweredBy: {
    color: theme.colors.gray[5],
    marginTop: theme.spacing.xl,
  },
}));

export default function LandingPage() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/resources');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={classes.wrapper}>
      <Box className={classes.backgroundContainer}>
        <img
          src={bgImage}
          alt="Star Wars Background"
          className={classes.backgroundImage}
        />
      </Box>

      <Container size="xl">
        <div className={classes.inner}>
          <Title order={1} className={classes.title}>
            Star Wars API Explorer
          </Title>
          <Text className={classes.description}>
            Unleash the Force of Data! Dive deep into the Star Wars galaxy with our comprehensive API explorer.
            Explore characters, planets, vehicles, and more – all at your fingertips.
          </Text>
          <Group position="center">
            <Button size="xl" className={classes.button} onClick={handleGetStarted}>
              Explore the Galaxy
            </Button>
          </Group>
        </div>

        <SimpleGrid
          cols={2}
          spacing="xl"
          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
          style={{ marginTop: '4rem' }}
        >
          {features.map((feature, index) => (
            <Card key={feature.title} p="xl" className={classes.featureCard}>
              <ThemeIcon
                size={50}
                radius="md"
                style={{ backgroundColor: iconBackgroundColors[index % iconBackgroundColors.length] }}
              >
                <feature.icon size={26} />
              </ThemeIcon>
              <Text mt="md" className={classes.featureTitle}>
                {feature.title}
              </Text>
              <Text color="dimmed" mt="sm" className={classes.featureDescription}>
                {feature.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        <Text className={classes.poweredBy} align="center">
          Powered by SWAPI - The Star Wars API
        </Text>
      </Container>
    </div>
  );
}