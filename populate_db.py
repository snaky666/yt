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
        ('Web Development Fundamentals', 'Learn HTML, CSS, and JavaScript from scratch', 'Programming', 'Beginner', '12 hours', 24, 4.8, 'course-web-dev.jpg', 'Sarah Johnson', 'English'),
        ('Advanced Python Programming', 'Master Python with data structures and algorithms', 'Programming', 'Advanced', '20 hours', 40, 4.9, 'course-python.jpg', 'Michael Chen', 'English'),
        ('Digital Marketing Mastery', 'Complete guide to SEO, social media, and analytics', 'Marketing', 'Intermediate', '15 hours', 30, 4.7, 'course-marketing.jpg', 'Emma Williams', 'English'),
        ('Graphic Design Essentials', 'Learn design principles, typography, and color theory', 'Design', 'Beginner', '18 hours', 36, 4.6, 'course-design.jpg', 'David Rodriguez', 'English'),
        ('Financial Planning 101', 'Personal finance, investing, and wealth management', 'Finance', 'Beginner', '10 hours', 20, 4.5, 'course-finance.jpg', 'Jessica Lee', 'English'),
        ('Photography Masterclass', 'From camera basics to advanced techniques', 'Arts', 'Intermediate', '14 hours', 28, 4.8, 'course-photography.jpg', 'Robert Kim', 'English'),
        ('Business Strategy & Planning', 'Strategic thinking and business model development', 'Business', 'Advanced', '16 hours', 32, 4.7, 'course-business.jpg', 'Linda Martinez', 'English'),
        ('Data Science with R', 'Statistical analysis and machine learning with R', 'Data Science', 'Intermediate', 22, 44, 4.9, 'course-datascience.jpg', 'Dr. Ahmed Hassan', 'English'),
        ('Creative Writing Workshop', 'Fiction, poetry, and storytelling techniques', 'Writing', 'Beginner', '12 hours', 24, 4.6, 'course-writing.jpg', 'Emily Thompson', 'English'),
        ('Music Theory Fundamentals', 'Understanding harmony, melody, and composition', 'Music', 'Beginner', '16 hours', 32, 4.7, 'course-music.jpg', 'Carlos Santana', 'English'),
        ('Yoga & Meditation Guide', 'Mindfulness practices for physical and mental wellness', 'Health', 'Beginner', '8 hours', 16, 4.8, 'course-yoga.jpg', 'Priya Sharma', 'English'),
        ('Machine Learning Foundations', 'Introduction to AI and machine learning algorithms', 'AI & ML', 'Intermediate', '25 hours', 50, 4.9, 'course-ml.jpg', 'Dr. James Wilson', 'English'),
    ]
    
    cursor.executemany('''
        INSERT INTO courses (title, description, category, level, duration, lessons, rating, image, instructor, language)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', courses)
    
    books = [
        ('Clean Code', 'Robert C. Martin', 'A handbook of agile software craftsmanship', 'Programming', 464, 4.8, 'book-cleancode.jpg', 'English', 2008),
        ('The Art of War', 'Sun Tzu', 'Ancient Chinese military strategy and philosophy', 'Philosophy', 273, 4.6, 'book-artofwar.jpg', 'English', -500),
        ('Sapiens', 'Yuval Noah Harari', 'A brief history of humankind', 'History', 443, 4.7, 'book-sapiens.jpg', 'English', 2011),
        ('Atomic Habits', 'James Clear', 'Tiny changes, remarkable results', 'Self-Help', 320, 4.9, 'book-atomichabits.jpg', 'English', 2018),
        ('The Lean Startup', 'Eric Ries', 'How constant innovation creates successful businesses', 'Business', 336, 4.5, 'book-leanstartup.jpg', 'English', 2011),
        ('Thinking, Fast and Slow', 'Daniel Kahneman', 'Insights into human psychology and decision making', 'Psychology', 499, 4.8, 'book-thinking.jpg', 'English', 2011),
        ('The Design of Everyday Things', 'Don Norman', 'Principles of good design and user experience', 'Design', 368, 4.6, 'book-design.jpg', 'English', 1988),
        ('Rich Dad Poor Dad', 'Robert Kiyosaki', 'Financial education and wealth building', 'Finance', 336, 4.7, 'book-richdad.jpg', 'English', 1997),
        ('The 7 Habits of Highly Effective People', 'Stephen Covey', 'Personal and professional effectiveness', 'Self-Help', 381, 4.8, 'book-7habits.jpg', 'English', 1989),
        ('Zero to One', 'Peter Thiel', 'Notes on startups and building the future', 'Business', 224, 4.6, 'book-zerotoone.jpg', 'English', 2014),
        ('Deep Work', 'Cal Newport', 'Rules for focused success in a distracted world', 'Productivity', 296, 4.7, 'book-deepwork.jpg', 'English', 2016),
        ('The Power of Now', 'Eckhart Tolle', 'A guide to spiritual enlightenment', 'Spirituality', 236, 4.8, 'book-powernow.jpg', 'English', 1997),
    ]
    
    cursor.executemany('''
        INSERT INTO books (title, author, description, category, pages, rating, image, language, published_year)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', books)
    
    resources = [
        ('Introduction to AI', 'Video', 'Comprehensive overview of artificial intelligence', 'AI & ML', '45 min', 'resource-ai-video.jpg', 'https://example.com/ai-intro'),
        ('Marketing Analytics Guide', 'Article', 'Data-driven marketing strategies and metrics', 'Marketing', '15 min', 'resource-marketing-article.jpg', 'https://example.com/marketing-analytics'),
        ('Photography Lighting Tips', 'Guide', 'Professional lighting techniques for photographers', 'Arts', '20 min', 'resource-photo-guide.jpg', 'https://example.com/lighting-guide'),
        ('Financial Planning Checklist', 'Guide', 'Step-by-step personal finance planning', 'Finance', '10 min', 'resource-finance-guide.jpg', 'https://example.com/finance-checklist'),
        ('Web Development Tools', 'Article', 'Essential tools for modern web developers', 'Programming', '12 min', 'resource-webdev-article.jpg', 'https://example.com/webdev-tools'),
        ('Design Thinking Workshop', 'Video', 'Creative problem-solving methodology', 'Design', '60 min', 'resource-design-video.jpg', 'https://example.com/design-thinking'),
        ('Business Model Canvas', 'Guide', 'Framework for developing business models', 'Business', '25 min', 'resource-business-guide.jpg', 'https://example.com/business-canvas'),
        ('Meditation Techniques', 'Video', 'Guided meditation for stress relief', 'Health', '30 min', 'resource-meditation-video.jpg', 'https://example.com/meditation'),
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
