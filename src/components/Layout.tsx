import { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  Button,
  UnstyledButton,
  ThemeIcon,
} from '@mantine/core';
import { IconHome, IconDatabase, IconLogout } from '@tabler/icons-react';
import useAuthStore from '../store/app.store';
import { LayoutProps } from '../types';

interface NavButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

const NavButton: FC<NavButtonProps> = ({ icon: Icon, label, onClick }) => (
  <UnstyledButton onClick={onClick} style={{ display: 'flex', alignItems: 'center', padding: '8px 12px' }}>
    <ThemeIcon size="lg" variant="light">
      <Icon size={18} />
    </ThemeIcon>
    <Text size="sm" ml="md">
      {label}
    </Text>
  </UnstyledButton>
);

const Layout: FC<LayoutProps> = ({ children }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, setOpened] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLandingPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

  if (isLandingPage || isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        isAuthenticated ? (
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Navbar.Section>
              <NavButton
                icon={IconHome}
                label="Home"
                onClick={() => navigate('/')}
              />
              <NavButton
                icon={IconDatabase}
                label="Resources"
                onClick={() => navigate('/resources')}
              />
            </Navbar.Section>
          </Navbar>
        ) : undefined
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Group position="apart" style={{ height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
            <Text>My Application</Text>
            <Button onClick={handleLogout} variant="outline" color="red" size="xs">
              <IconLogout size={16} />
              Logout
            </Button>
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;