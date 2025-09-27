// Fake auth service - replace with real API calls later

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountType: 'user' | 'vendor';
  companyName?: string;
  businessType?: string;
  phone?: string;
  description?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthMonth: string;
  birthYear: string;
  accountType: 'user' | 'vendor';
  companyName?: string;
  businessType?: string;
  phone?: string;
  description?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    accountType: 'user',
  },
  {
    id: '2',
    email: 'vendor@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    accountType: 'vendor',
    companyName: 'Event Masters',
    businessType: 'event-planning',
    phone: '+1234567890',
    description: 'Professional event planning services',
  },
];

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    await delay(1000); // Simulate API call

    // Find user by email
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // In real implementation, verify password hash
    if (credentials.password !== 'password123') {
      throw new Error('Invalid email or password');
    }

    return {
      access_token: `fake_access_token_${user.id}_${Date.now()}`,
      refresh_token: `fake_refresh_token_${user.id}_${Date.now()}`,
      user,
    };
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
    await delay(1000); // Simulate API call

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Validate password match
    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      accountType: data.accountType,
      ...(data.accountType === 'vendor' && {
        companyName: data.companyName,
        businessType: data.businessType,
        phone: data.phone,
        description: data.description,
      }),
    };

    // Add to mock database
    mockUsers.push(newUser);

    return {
      access_token: `fake_access_token_${newUser.id}_${Date.now()}`,
      refresh_token: `fake_refresh_token_${newUser.id}_${Date.now()}`,
      user: newUser,
    };
  },

  async getCurrentUser(): Promise<User> {
    await delay(500); // Simulate API call

    // In real implementation, validate token and return user data
    // For now, return the first user as a mock
    const user = mockUsers[0];
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },

  async logout(): Promise<void> {
    await delay(500); // Simulate API call
    // In real implementation, invalidate refresh token on server
    console.log('User logged out');
  },

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    await delay(500); // Simulate API call

    // In real implementation, validate refresh token and return new access token
    return {
      access_token: `refreshed_access_token_${Date.now()}`,
    };
  },
};