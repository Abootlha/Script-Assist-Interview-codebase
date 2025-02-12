import { FC, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Paper, Title, Container, createStyles, Image } from '@mantine/core';
import useAuthStore from '../store/app.store';
import { LoginCredentials } from '../types';
import starWarsBackground from '../assets/freepik__upload__44163.png';

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
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: theme.colors.gray[7],
    color: theme.white,
    '&:focus': {
      borderColor: theme.colors.yellow[5],
    },
  },
  button: {
    backgroundColor: theme.colors.yellow[5],
    color: theme.black,
    '&:hover': {
      backgroundColor: theme.colors.yellow[7],
    },
  },
  logo: {
    marginBottom: theme.spacing.xl,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const { classes } = useStyles();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(credentials)) {
      navigate('/resources');
    }
  };

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
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Username"
              placeholder="Enter your username"
              required
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              classNames={{ input: classes.input }}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              required
              mt="md"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              classNames={{ input: classes.input }}
            />
            <Button fullWidth mt="xl" type="submit" className={classes.button}>
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginForm;