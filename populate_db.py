import sqlite3
import os

DATABASE = 'novaacademy.db'

def populate_database():
    if os.path.exists(DATABASE):
        os.remove(DATABASE)
    
    db = sqlite3.connect(DATABASE)
    cursor = db.cursor()
    
    cursor.execute('''
        CREATE TABLE courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category TEXT,
            level TEXT,
            duration TEXT,
            lessons INTEGER,
            rating REAL,
            image TEXT,
            instructor TEXT,
            language TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT,
            description TEXT,
            category TEXT,
            pages INTEGER,
            rating REAL,
            image TEXT,
            language TEXT,
            published_year INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE resources (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            type TEXT,
            description TEXT,
            category TEXT,
            duration TEXT,
            image TEXT,
            url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            full_name TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    courses = [
        ('100 Days of Code: Python Pro Bootcamp', 'Build 100 projects including games, websites, data science, and automation', 'Programming', 'Beginner', '60 hours', 120, 4.9, 'course-python.jpg', 'Dr. Angela Yu', 'English'),
        ('The Complete JavaScript Course 2025', 'From Zero to Expert - Modern ES6+, OOP, async JavaScript, real projects', 'Programming', 'Intermediate', '68.5 hours', 137, 4.7, 'course-web-dev.jpg', 'Jonas Schmedtmann', 'English'),
        ('Python and Django Full Stack Web Developer', 'HTML, CSS, Bootstrap, JavaScript, jQuery, Python 3, Django - Build complete websites', 'Programming', 'Intermediate', '30 hours', 60, 4.7, 'course-python.jpg', 'Jose Portilla', 'English'),
        ('The Web Developer Bootcamp 2024', 'HTML, CSS, JavaScript, Node.js, MongoDB, authentication - Complete full-stack', 'Programming', 'Beginner', '70 hours', 140, 4.7, 'course-web-dev.jpg', 'Colt Steele', 'English'),
        ('CS50: Introduction to Programming with Python', 'Harvard University - Fundamentals to advanced Python programming', 'Programming', 'Beginner', '30 hours', 60, 4.9, 'course-python.jpg', 'Harvard University', 'English'),
        ('CS50: Introduction to AI with Python', 'Machine learning, neural networks, and game-playing AI', 'AI & ML', 'Intermediate', '25 hours', 50, 4.9, 'course-ml.jpg', 'Harvard University', 'English'),
        ('The Art & Science of Drawing', 'Learn to draw any shape, form, and subject - basic to advanced techniques', 'Arts', 'Beginner', '4.5 hours', 9, 4.6, 'course-design.jpg', 'Brent Eviston', 'English'),
        ('UX/UI Design Fundamentals', 'User research, wireframing, prototyping, and information architecture', 'Design', 'Beginner', '20 hours', 40, 4.7, 'course-design.jpg', 'Google Career Certificates', 'English'),
        ('Introduction to Project Management', 'Project scoping, scheduling, budgeting, risk management, and Agile', 'Business', 'Beginner', '15 hours', 30, 4.6, 'course-business.jpg', 'IBM', 'English'),
        ('Business Analytics with Tableau', 'Foundational skills in Tableau, data visualization, business intelligence', 'Business', 'Intermediate', '18 hours', 36, 4.7, 'course-datascience.jpg', 'Tableau', 'English'),
        ('Google Digital Marketing & E-commerce', 'Full marketing funnel, SEO, social media, Google Ads, email marketing, analytics', 'Marketing', 'Beginner', '35 hours', 70, 4.8, 'course-marketing.jpg', 'Google Career Certificates', 'English'),
        ('The Complete Digital Marketing Course', 'SEO, social media, PPC, affiliate marketing, analytics - Build online business', 'Marketing', 'Intermediate', '23.5 hours', 47, 4.7, 'course-marketing.jpg', 'Rob Percival', 'English'),
    ]
    
    cursor.executemany('''
        INSERT INTO courses (title, description, category, level, duration, lessons, rating, image, instructor, language)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', courses)
    
    books = [
        ('Clean Code', 'Robert C. Martin', 'A handbook of agile software craftsmanship - Top-rated programming book', 'Programming', 464, 4.9, 'book-cleancode.jpg', 'English', 2008),
        ('Atomic Habits', 'James Clear', '#1 New York Times bestseller - Guide to building good habits and breaking bad ones', 'Self-Help', 320, 4.9, 'book-atomichabits.jpg', 'English', 2018),
        ('Thinking, Fast and Slow', 'Daniel Kahneman', 'Insights into human psychology and decision making', 'Psychology', 499, 4.8, 'book-thinking.jpg', 'English', 2011),
        ('The 7 Habits of Highly Effective People', 'Stephen Covey', 'Personal and professional effectiveness', 'Self-Help', 381, 4.8, 'book-7habits.jpg', 'English', 1989),
        ('Rich Dad Poor Dad', 'Robert Kiyosaki', 'Decades-long bestseller - Building wealth beyond 9-5 jobs', 'Finance', 336, 4.7, 'book-richdad.jpg', 'English', 1997),
        ('The Lean Startup', 'Eric Ries', 'How constant innovation creates successful businesses', 'Business', 336, 4.7, 'book-leanstartup.jpg', 'English', 2011),
        ('Zero to One', 'Peter Thiel', 'Notes on startups and building the future', 'Business', 224, 4.7, 'book-zerotoone.jpg', 'English', 2014),
        ('The Design of Everyday Things', 'Don Norman', 'Principles of good design and user experience', 'Design', 368, 4.8, 'book-design.jpg', 'English', 1988),
        ('Deep Work', 'Cal Newport', 'Rules for focused success in a distracted world', 'Productivity', 296, 4.7, 'book-deepwork.jpg', 'English', 2016),
        ('The Power of Now', 'Eckhart Tolle', 'A guide to spiritual enlightenment', 'Spirituality', 236, 4.8, 'book-powernow.jpg', 'English', 1997),
        ('Sapiens', 'Yuval Noah Harari', 'A brief history of humankind', 'History', 443, 4.7, 'book-sapiens.jpg', 'English', 2011),
        ('The Art of War', 'Sun Tzu', 'Ancient Chinese military strategy and philosophy', 'Philosophy', 273, 4.6, 'book-artofwar.jpg', 'English', -500),
    ]
    
    cursor.executemany('''
        INSERT INTO books (title, author, description, category, pages, rating, image, language, published_year)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', books)
    
    resources = [
        ('Introduction to AI', 'Video', 'Comprehensive overview of artificial intelligence', 'AI & ML', '45 min', 'resource-ai-video.jpg', 'https://www.coursera.org/learn/ai-for-everyone'),
        ('Marketing Analytics Guide', 'Article', 'Data-driven marketing strategies and metrics', 'Marketing', '15 min', 'resource-marketing-article.jpg', 'https://www.hubspot.com/marketing-statistics'),
        ('Photography Lighting Tips', 'Guide', 'Professional lighting techniques for photographers', 'Arts', '20 min', 'resource-photo-guide.jpg', 'https://www.adobe.com/creativecloud/photography/discover/photography-lighting.html'),
        ('Financial Planning Checklist', 'Guide', 'Step-by-step personal finance planning', 'Finance', '10 min', 'resource-finance-guide.jpg', 'https://www.investopedia.com/financial-planning-guide-4845087'),
        ('Web Development Tools', 'Article', 'Essential tools for modern web developers', 'Programming', '12 min', 'resource-webdev-article.jpg', 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing'),
        ('Design Thinking Workshop', 'Video', 'Creative problem-solving methodology', 'Design', '60 min', 'resource-design-video.jpg', 'https://www.ideo.com/post/design-thinking-for-educators'),
        ('Business Model Canvas', 'Guide', 'Framework for developing business models', 'Business', '25 min', 'resource-business-guide.jpg', 'https://www.strategyzer.com/canvas/business-model-canvas'),
        ('Meditation Techniques', 'Video', 'Guided meditation for stress relief', 'Health', '30 min', 'resource-meditation-video.jpg', 'https://www.headspace.com/meditation/techniques'),
    ]
    
    cursor.executemany('''
        INSERT INTO resources (title, type, description, category, duration, image, url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', resources)
    
    db.commit()
    db.close()
    print(f'Database populated successfully with {len(courses)} courses, {len(books)} books, and {len(resources)} resources!')

if __name__ == '__main__':
    populate_database()
