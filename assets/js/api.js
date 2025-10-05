
const api = {
  async getCourses(category = '') {
    try {
      const response = await fetch('assets/data/courses.json');
      const courses = await response.json();
      
      if (category && category !== 'all') {
        return courses.filter(course => course.category === category);
      }
      
      return courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  },

  async getCourse(id) {
    try {
      const response = await fetch('assets/data/courses.json');
      const courses = await response.json();
      return courses.find(course => course.id === parseInt(id));
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  },

  async getBooks(category = '') {
    try {
      const response = await fetch('assets/data/books.json');
      const books = await response.json();
      
      if (category && category !== 'all') {
        return books.filter(book => book.category === category);
      }
      
      return books;
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  },

  async getResources(type = '') {
    try {
      const response = await fetch('assets/data/resources.json');
      const resources = await response.json();
      
      if (type && type !== 'all') {
        return resources.filter(resource => resource.type === type);
      }
      
      return resources;
    } catch (error) {
      console.error('Error fetching resources:', error);
      return [];
    }
  },

  async register(userData) {
    console.log('Registration data:', userData);
    alert('تم التسجيل بنجاح! (Demo Mode - البيانات لن تُحفظ)');
    return { success: true, message: 'Registration successful (demo)' };
  },

  async login(credentials) {
    console.log('Login credentials:', credentials);
    alert('تم تسجيل الدخول بنجاح! (Demo Mode)');
    return { success: true, message: 'Login successful (demo)' };
  },

  async getStats() {
    try {
      const [courses, books, resources] = await Promise.all([
        this.getCourses(),
        this.getBooks(),
        this.getResources()
      ]);
      
      return {
        courses: courses.length,
        books: books.length,
        resources: resources.length,
        users: 1250
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { courses: 0, books: 0, resources: 0, users: 0 };
    }
  }
};

window.api = api;
