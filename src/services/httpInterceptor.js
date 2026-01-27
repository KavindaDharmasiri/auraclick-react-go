import config from '../config/config';

const API_BASE_URL = config.API_BASE_URL;

class HttpInterceptor {
  constructor() {
    this.setupInterceptor();
  }

  setupInterceptor() {
    // Override fetch globally
    const originalFetch = window.fetch;
    
    window.fetch = async (url, options = {}) => {
      // Add authorization header to all requests
      const token = localStorage.getItem('token');
      
      const modifiedOptions = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      };

      try {
        const response = await originalFetch(url, modifiedOptions);
        
        // Handle 401 responses
        if (response.status === 401) {
          // Try to refresh token
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const refreshResponse = await originalFetch(`${API_BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken })
              });

              if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                localStorage.setItem('token', data.token);
                
                // Retry original request with new token
                modifiedOptions.headers.Authorization = `Bearer ${data.token}`;
                return await originalFetch(url, modifiedOptions);
              }
            } catch (error) {
              console.error('Token refresh failed:', error);
            }
          }
          
          // Clear auth data and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          localStorage.removeItem('userType');
          window.location.href = '/login';
          return response;
        }

        return response;
      } catch (error) {
        console.error('Request failed:', error);
        throw error;
      }
    };
  }
}

export default new HttpInterceptor();