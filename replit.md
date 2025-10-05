# NovaAcademy

## Overview
NovaAcademy is a modern educational platform website built with HTML, CSS, and JavaScript. It features a clean, responsive design with a warm brown-to-beige color scheme and supports 10 languages through an integrated i18n system.

## Project Structure
```
.
├── index.html          # Homepage with hero section and featured courses
├── server.py           # Flask server (frontend + backend API)
├── populate_db.py      # Database population script
├── novaacademy.db      # SQLite database (auto-generated)
├── pages/              # All page templates
│   ├── courses.html    # All courses listing page (dynamic loading)
│   ├── course-detail.html  # Individual course details page
│   ├── dashboard.html  # Learning dashboard
│   ├── profile.html    # User profile page
│   ├── login.html      # User login page
│   ├── register.html   # User registration page
│   └── library.html    # Knowledge library page (dynamic loading)
├── assets/
│   ├── css/
│   │   └── style.css   # Main stylesheet with animations
│   └── js/
│       ├── script.js   # JavaScript for interactivity
│       ├── i18n.js     # Multi-language internationalization system
│       └── api.js      # API communication layer (NEW)
└── images/
    ├── logo-new.jpg    # Custom circular logo
    ├── hero.svg        # Hero section illustration
    ├── course-*.jpg    # Real course images (18+ photos)
    └── book-*.jpg      # Real book cover images
```

## Features
- **Responsive Design**: Mobile-friendly layout with sidebar navigation on small screens and header navigation on desktop
- **Multi-Language Support**: Complete i18n system supporting 10 languages (English, Arabic, Spanish, French, German, Chinese, Japanese, Russian, Portuguese, Italian)
- **Interactive UI**: Smooth animations and transitions with warm brown-to-beige color palette
- **Course Catalog**: Display of educational courses with cards
- **Knowledge Library**: Browse books, videos, articles, and guides with category filtering
- **User Authentication**: Login and registration forms (frontend only, demo mode)

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python Flask with REST API
- **Database**: SQLite (file-based, included in repository)
- **Server**: Flask development server (integrated frontend + backend)
- **Deployment**: Configured for Replit autoscale deployment

## Recent Changes (Oct 5, 2025)

### Latest Update - Backend Integration & Real Content (Oct 5, 2025)
- **Backend API with Flask**: Built complete backend server with integrated API
  - Merged frontend and backend into single Flask server (server.py)
  - Created SQLite database with tables for courses, books, resources, and users
  - Implemented REST API endpoints: /api/courses, /api/books, /api/resources, /api/register, /api/login, /api/stats
  - Added real diverse content: 12 courses, 12 books, 8 resources across multiple fields
  
- **Real Stock Images**: Downloaded and integrated 18+ real stock images
  - Professional images for all courses (programming, design, marketing, business, health, arts, etc.)
  - Authentic book cover images for all library books
  - Images stored in /images directory with proper naming
  
- **Dynamic Content Loading**: Updated all pages to load content from API
  - index.html: Loads featured courses dynamically
  - courses.html: Displays all courses with filtering
  - library.html: Shows books and resources with category filtering
  - Created assets/js/api.js for API communication
  
- **Animated Logo & Background**: Enhanced visual experience
  - Replaced SVG logo with custom circular logo image with floating animation
  - Added background gradient animation with particle effects
  - Logo pulses on hover for interactive feel
  
- **Diverse Content Areas**: Courses and books in multiple fields:
  - Programming: Web Dev, Python, Machine Learning, Data Science
  - Business: Strategy, Marketing, Finance, Entrepreneurship  
  - Creative: Design, Photography, Writing, Music
  - Personal Development: Yoga, Self-Help, Psychology, Spirituality

### Previous Update - Replit Environment Setup
- **GitHub Import Configuration**: Successfully set up project to run in Replit environment
  - Installed Python 3.11 and Flask for backend server
  - Created `server.py` with cache-control headers to prevent browser caching issues
  - Configured workflow "Server" to run on port 5000 with webview output
  - Set up autoscale deployment configuration for production
  - Verified all pages load correctly
  - Server configured to bind to 0.0.0.0:5000 for development and use $PORT for production

### Responsive Design Enhancement
- **Improved Organization Across All Devices**: Comprehensive responsive design improvements
  - Enhanced responsive breakpoints: 1200px, 1024px, 768px, 640px, 480px
  - Optimized container max-width (1200px) with better padding scaling
  - Fluid typography using clamp() for smooth text scaling across devices
  - Improved grid layouts with auto-fit and better spacing
  - Enhanced cards display with consistent heights using flexbox
  - Better mobile navigation with optimized sidebar (280px on mobile)
  - Improved forms with larger touch targets and better spacing (2.5rem padding)
  - Enhanced footer hierarchy with better color usage (beige headings)
  - Optimized stats grid with better responsive behavior
  - Improved hero section with better proportions (1.2fr 1fr grid)

### Multi-Language System & Design Refresh
- **Color Scheme Update**: Changed entire design to warm brown-to-beige gradient palette
  - Updated CSS variables: primary (#8B4513), secondary (#D2691E), beige (#F5DEB3)
  - Applied warm neutral tones throughout (dark: #3E2723, gray: #8D6E63, light: #F5F5DC)
- **Multi-Language System**: Implemented complete i18n framework supporting 10 languages
  - Created `assets/js/i18n.js` with translations for English, Arabic, Spanish, French, German, Chinese, Japanese, Russian, Portuguese, and Italian
  - Added language selectors in both header and sidebar navigation
  - Integrated localStorage to persist language preferences
  - Applied `data-i18n` attributes throughout all pages for dynamic content translation
- **New Library Page**: Created `pages/library.html` featuring:
  - Knowledge library with books, videos, articles, and guides
  - Category filtering system (All Resources, Books, Articles, Videos, Guides)
  - Brown gradient hero section with beige accents
  - Consistent styling with rest of the site
- **All Pages Updated**: Refreshed all 8 pages with new design system
  - index.html, courses.html, dashboard.html, profile.html
  - login.html, register.html, course-detail.html, library.html
  - Added consistent navigation with Library link
  - Integrated language switchers on all pages
  - Applied new brown-to-beige color palette throughout

### GitHub Import Setup
- Fresh import from GitHub repository
- Fixed asset paths in pages folder (added ../ prefix for correct relative paths)
- Installed Python 3.11 for HTTP server
- Configured workflow to serve on port 5000 for development
- Set up autoscale deployment with `$PORT` environment variable for production
- All pages tested and verified working correctly

### Previous Changes
- Fixed duplicate variable declarations in JavaScript
- Cleaned up CSS syntax errors and duplicate styles  
- Removed duplicate HTML elements and fixed navigation structure
- Added .gitignore for Python environment
- Restored header navigation for desktop view
- Modernized typography and improved spacing
- Enhanced all UI elements (buttons, cards, forms) with professional styling
- Added gradient effects and improved shadows for better visual depth
- Improved responsive design with better mobile experience

## Development
The site runs on Python's built-in HTTP server on port 5000. The workflow automatically starts the server when the project is run.

### Running Locally
The server is configured to start automatically. Access the site at the Replit webview.

### Deployment
The site is configured for autoscale deployment using Python's HTTP server. The deployment uses the `$PORT` environment variable to bind to Replit's assigned port.

## User Preferences
None documented yet.

## Notes
- Forms currently show demo alerts as backend is not connected
- Site now supports 10 languages with full i18n system and language selectors in header and sidebar
- Language preference is stored in browser localStorage
- Navigation is visible in header on desktop, sidebar menu on mobile
- All pages feature consistent brown-to-beige color scheme
- Library page includes interactive category filtering
