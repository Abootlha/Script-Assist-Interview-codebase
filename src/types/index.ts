export interface User {
    username: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (credentials: LoginCredentials) => boolean;
    logout: () => void;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
 
  export interface SWAPIResource {
    name: string;
    created: string;
    edited: string;
    url: string;
    [key: string]: any;
  }
  
  export interface Planet extends SWAPIResource {
    climate: string;
    population: string;
    terrain: string;
    diameter: string;
    gravity: string;
    orbital_period: string;
    rotation_period: string;
    surface_water: string;
  }
  
  export interface Character extends SWAPIResource {
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    homeworld: string;
    skin_color: string;
  }
  
  export interface Starship extends SWAPIResource {
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    starship_class: string;
  }
  
  export interface ApiResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  }
  
  export type ResourceType = 'people' | 'planets' | 'starships';
  
  export interface PrivateRouteProps {
    children: React.ReactNode;
  }
  
  export interface LayoutProps {
    children: React.ReactNode;
  }
  
  export interface Feature {
    icon: React.FC<any>;
    title: string;
    description: string;
  }