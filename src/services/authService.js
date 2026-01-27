import config from '../config/config';
import toast from 'react-hot-toast';

const API_BASE_URL = config.API_BASE_URL;

class AuthService {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userType', data.user.role.toLowerCase());
      return data;
    } else {
      throw new Error(data.error || 'Login failed');
    }
  }

  async register(email, password, firstName, lastName) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userType', 'customer');
      return data;
    } else {
      throw new Error(data.error || 'Registration failed');
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      return data.token;
    } else {
      this.logout();
      throw new Error('Token refresh failed');
    }
  }

  async apiCall(url, options = {}) {
    let token = localStorage.getItem('token');
    
    const makeRequest = async (authToken) => {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${authToken}`,
        },
      });
    };

    let response = await makeRequest(token);
    
    if (response.status === 401) {
      try {
        token = await this.refreshToken();
        response = await makeRequest(token);
      } catch (error) {
        this.logout();
        throw error;
      }
    }
    
    return response;
  }

  async getCurrentUser() {
    try {
      const response = await this.apiCall(`${API_BASE_URL}/auth/me`);
      if (response.ok) {
        return await response.json();
      } else {
        this.logout();
        return null;
      }
    } catch (error) {
      this.logout();
      return null;
    }
  }

  async logout() {
    try {
      await this.apiCall(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
      toast.success('Logged out successfully');
    } catch (error) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      window.location.href = '/';
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();