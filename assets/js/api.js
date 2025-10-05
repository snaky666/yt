
const api = {
  async getCourses(category = '') {
    try {
      const url = category && category !== 'all' 
        ? `/api/courses?category=${category}` 
        : '/api/courses';
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  },

  async getCourse(id) {
    try {
      const response = await fetch(`/api/courses/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  },

  async getBooks(category = '') {
    try {
      const url = category && category !== 'all' 
        ? `/api/books?category=${category}` 
        : '/api/books';
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  },

  async getResources(type = '') {
    try {
      const url = type && type !== 'all' 
        ? `/api/resources?type=${type}` 
        : '/api/resources';
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching resources:', error);
      return [];
    }
  },

  async register(userData) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (data.success) {
        alert('Registration successful!');
      } else {
        alert(data.error || 'Registration failed');
      }
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, error: 'Registration failed' };
    }
  },

  async login(credentials) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (data.success) {
        alert('Login successful!');
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        alert(data.error || 'Login failed');
      }
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'Login failed' };
    }
  },

  async getStats() {
    try {
      const response = await fetch('/api/stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { courses: 0, books: 0, resources: 0, users: 0 };
    }
  }
};

window.api = api;
