from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

DATABASE = 'novaacademy.db'

def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if path.startswith('pages/') or path.startswith('assets/') or path.startswith('images/'):
        return send_from_directory('.', path)
    return send_from_directory('.', path)

@app.route('/api/courses', methods=['GET'])
def get_courses():
    category = request.args.get('category')
    db = get_db()
    cursor = db.cursor()
    
    if category and category != 'all':
        cursor.execute('SELECT * FROM courses WHERE category = ?', (category,))
    else:
        cursor.execute('SELECT * FROM courses ORDER BY rating DESC')
    
    courses = [dict(row) for row in cursor.fetchall()]
    db.close()
    return jsonify(courses)

@app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM courses WHERE id = ?', (course_id,))
    course = cursor.fetchone()
    db.close()
    
    if course:
        return jsonify(dict(course))
    return jsonify({'error': 'Course not found'}), 404

@app.route('/api/books', methods=['GET'])
def get_books():
    category = request.args.get('category')
    db = get_db()
    cursor = db.cursor()
    
    if category and category != 'all':
        cursor.execute('SELECT * FROM books WHERE category = ?', (category,))
    else:
        cursor.execute('SELECT * FROM books ORDER BY rating DESC')
    
    books = [dict(row) for row in cursor.fetchall()]
    db.close()
    return jsonify(books)

@app.route('/api/resources', methods=['GET'])
def get_resources():
    resource_type = request.args.get('type')
    db = get_db()
    cursor = db.cursor()
    
    if resource_type and resource_type != 'all':
        cursor.execute('SELECT * FROM resources WHERE type = ?', (resource_type,))
    else:
        cursor.execute('SELECT * FROM resources')
    
    resources = [dict(row) for row in cursor.fetchall()]
    db.close()
    return jsonify(resources)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    
    try:
        cursor.execute('''
            INSERT INTO users (username, email, password, full_name)
            VALUES (?, ?, ?, ?)
        ''', (data['username'], data['email'], data['password'], data.get('full_name', '')))
        db.commit()
        db.close()
        return jsonify({'message': 'User registered successfully', 'success': True})
    except sqlite3.IntegrityError:
        db.close()
        return jsonify({'error': 'Username or email already exists', 'success': False}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('SELECT * FROM users WHERE email = ? AND password = ?', 
                   (data['email'], data['password']))
    user = cursor.fetchone()
    db.close()
    
    if user:
        return jsonify({'message': 'Login successful', 'success': True, 'user': dict(user)})
    return jsonify({'error': 'Invalid credentials', 'success': False}), 401

@app.route('/api/stats', methods=['GET'])
def get_stats():
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('SELECT COUNT(*) as count FROM courses')
    courses_count = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM books')
    books_count = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM resources')
    resources_count = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM users')
    users_count = cursor.fetchone()['count']
    
    db.close()
    
    return jsonify({
        'courses': courses_count,
        'books': books_count,
        'resources': resources_count,
        'users': users_count
    })

if __name__ == '__main__':
    if not os.path.exists(DATABASE):
        print("Database not found. Please run populate_db.py first.")
        exit(1)
    
    PORT = int(os.environ.get('PORT', 5000))
    print(f"Server running at http://0.0.0.0:{PORT}/")
    print(f"API available at http://0.0.0.0:{PORT}/api/")
    app.run(host='0.0.0.0', port=PORT, debug=False)
