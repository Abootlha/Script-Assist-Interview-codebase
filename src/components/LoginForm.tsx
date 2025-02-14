import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Title, Container, createStyles, Image, Text, Divider } from '@mantine/core';
import { useGoogleLogin } from '@react-oauth/google';
import useAuthStore from '../store/app.store';
import starWarsBackground from '../assets/login_banner.png';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundImage: `url(${starWarsBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formPaper: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: theme.white,
    border: `1px solid ${theme.colors.gray[7]}`,
  },
  title: {
    color: theme.colors.yellow[5], 
    fontFamily: 'Starjedi, sans-serif', 
    marginBottom: theme.spacing.xl,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  button: {
    backgroundColor: theme.white,
    color: theme.black,
    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },
  logo: {
    marginBottom: theme.spacing.xl,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  googleIcon: {
    marginRight: theme.spacing.md,
  }
}));

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { classes } = useStyles();
  const [userEmail, setUserEmail] = useState<string>('');
  const [showEmail, setShowEmail] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        }).then(res => res.json());

        setUser({
          id: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture
        });

        setUserEmail(userInfo.email);
        setShowEmail(true);

        setTimeout(() => {
          navigate('/resources');
        }, 1500);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => {
      console.error('Login Failed');
    },
    flow: 'implicit'
  });

  return (
    <div className={classes.wrapper}>
      <Container size={420} my={40}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png"
          alt="Star Wars Logo"
          width={200}
          className={classes.logo}
        />

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.formPaper}>
          <Title align="center" className={classes.title}>
            Star Wars API Explorer
          </Title>
          
          <Text align="center" size="lg" mb="xl">
            Sign in to explore the galaxy
          </Text>

          <Button 
            fullWidth 
            leftIcon={
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
            }
            className={classes.button}
            onClick={() => login()}
          >
            Continue with Google
          </Button>

          {showEmail && (
            <Text align="center" mt="md" size="md" color="white">
              <span style={{ fontWeight: 'bold' }}>G</span> {userEmail}
            </Text>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default LoginForm;