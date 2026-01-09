# Project Architecture

## Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for managing university academic resources. The application follows a three-tier architecture with clear separation of concerns.

## Technology Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication mechanism
- **Multer**: File upload handling
- **bcryptjs**: Password hashing

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **date-fns**: Date manipulation
- **React Toastify**: Notifications

## Project Structure

```
university-resources-mern/
├── server/                      # Backend application
│   ├── config/                  # Configuration files
│   │   └── database.js         # MongoDB connection
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js             # User model
│   │   ├── Filiere.js          # Academic program model
│   │   ├── Class.js            # Class model
│   │   ├── Subject.js          # Subject/Course model
│   │   ├── Resource.js         # Educational resource model
│   │   ├── CalendarEvent.js    # Calendar event model
│   │   └── Notification.js     # Notification model
│   ├── controllers/             # Business logic
│   │   ├── authController.js   # Authentication logic
│   │   ├── userController.js   # User management
│   │   ├── filiereController.js
│   │   ├── classController.js
│   │   ├── subjectController.js
│   │   ├── resourceController.js
│   │   ├── calendarController.js
│   │   └── notificationController.js
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── filiereRoutes.js
│   │   ├── classRoutes.js
│   │   ├── subjectRoutes.js
│   │   ├── resourceRoutes.js
│   │   ├── calendarRoutes.js
│   │   └── notificationRoutes.js
│   ├── middleware/              # Custom middleware
│   │   ├── auth.js             # JWT authentication
│   │   ├── upload.js           # File upload handling
│   │   └── errorHandler.js     # Error handling
│   ├── utils/                   # Utility functions
│   │   ├── generateToken.js    # JWT generation
│   │   └── notificationHelper.js
│   ├── uploads/                 # Uploaded files (gitignored)
│   ├── .env                     # Environment variables
│   ├── .env.example            # Example environment file
│   ├── package.json
│   └── server.js               # Entry point
│
├── client/                      # Frontend application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── PrivateRoute.js
│   │   │   ├── Navbar.js
│   │   │   └── ResourceCard.js
│   │   ├── pages/              # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Home.js
│   │   │   ├── Resources.js
│   │   │   ├── Calendar.js
│   │   │   └── Notifications.js
│   │   ├── context/            # React Context
│   │   │   ├── AuthContext.js
│   │   │   └── NotificationContext.js
│   │   ├── services/           # API services
│   │   │   └── api.js
│   │   ├── styles/             # CSS files
│   │   │   ├── index.css
│   │   │   ├── App.css
│   │   │   ├── Navbar.css
│   │   │   ├── Auth.css
│   │   │   ├── Home.css
│   │   │   ├── Resources.css
│   │   │   ├── ResourceCard.css
│   │   │   ├── Calendar.css
│   │   │   └── Notifications.css
│   │   ├── App.js              # Main component
│   │   └── index.js            # Entry point
│   └── package.json
│
├── .gitignore
├── package.json                 # Root package file
├── README.md
├── API_DOCUMENTATION.md
├── ARCHITECTURE.md
└── DEPLOYMENT.md
```

## Architecture Patterns

### Backend Architecture

#### 1. MVC Pattern (Model-View-Controller)

The backend follows the MVC pattern:

- **Models**: Define data structure and business rules
- **Controllers**: Handle business logic and data processing
- **Routes**: Define API endpoints (act as the "View" layer)

#### 2. Middleware Layer

Custom middleware for:
- Authentication (JWT verification)
- Authorization (role-based access)
- File upload handling
- Error handling
- Rate limiting
- Security headers

#### 3. Service Layer Pattern

Utility functions and helpers are separated into a service layer for reusability.

### Frontend Architecture

#### 1. Component-Based Architecture

React components organized by:
- **Pages**: Top-level route components
- **Components**: Reusable UI components
- **Context**: Global state management

#### 2. Context API for State Management

Using React Context for:
- Authentication state
- Notification management
- User data

#### 3. Service Layer

API calls abstracted into service modules for clean separation.

## Data Flow

### Authentication Flow

```
1. User submits credentials → Frontend
2. Frontend sends POST /api/auth/login → Backend
3. Backend validates credentials
4. Backend generates JWT token
5. Backend returns token + user data → Frontend
6. Frontend stores token in localStorage
7. Frontend sets Authorization header for future requests
8. Protected routes verify token via middleware
```

### Resource Upload Flow (Admin)

```
1. Admin uploads file + metadata → Frontend
2. Frontend creates FormData with multipart/form-data
3. Frontend sends POST /api/resources → Backend
4. Middleware validates JWT and role
5. Multer middleware processes file upload
6. Controller saves file metadata to database
7. Controller creates notifications for students
8. Backend returns resource data → Frontend
9. Students receive notifications
```

### Resource Access Flow (Student)

```
1. Student requests resources → Frontend
2. Frontend sends GET /api/resources?filters → Backend
3. Middleware validates JWT
4. Controller filters resources by student's class
5. Backend returns filtered resources → Frontend
6. Frontend displays resources
7. Student clicks download
8. Frontend sends GET /api/resources/:id/download
9. Backend increments download count
10. Backend streams file → Frontend
```

## Database Schema

### Entity Relationships

```
Filiere (1) ──< (M) Subject
Filiere (1) ──< (M) Class
Filiere (1) ──< (M) User (Student)

Class (1) ──< (M) User (Student)
Class (1) ──< (M) Resource
Class (1) ──< (M) CalendarEvent
Class (M) ──< (M) Subject

Subject (1) ──< (M) Resource
Subject (1) ──< (M) CalendarEvent

User (1) ──< (M) Resource (uploadedBy)
User (1) ──< (M) CalendarEvent (createdBy)
User (1) ──< (M) Notification

Resource (1) ──< (M) Notification
CalendarEvent (1) ──< (M) Notification
```

### Indexes

Indexes are strategically placed for performance:

```javascript
// Class indexes
{ filiere: 1, level: 1, academicYear: 1 }

// Subject indexes
{ filiere: 1, level: 1, semester: 1 }

// Resource indexes
{ subject: 1, class: 1, type: 1 }
{ uploadDate: -1 }

// CalendarEvent indexes
{ class: 1, startDate: 1 }
{ startDate: 1, endDate: 1 }

// Notification indexes
{ user: 1, isRead: 1, createdAt: -1 }
```

## Security Measures

### 1. Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Token expiration

### 2. API Security

- Rate limiting (100 requests per 10 minutes)
- CORS configuration
- Helmet.js for security headers
- Input validation
- File type validation
- File size limits

### 3. Data Security

- Password field excluded from queries by default
- Mongoose schema validation
- MongoDB injection prevention
- XSS protection

## Performance Optimization

### Backend

1. **Database Optimization**
   - Strategic indexing
   - Lean queries where appropriate
   - Population only when needed

2. **File Handling**
   - Streaming for downloads
   - File size limits
   - Efficient storage structure

3. **Caching Strategy**
   - Static file caching
   - Query result caching (can be implemented)

### Frontend

1. **Code Splitting**
   - Route-based code splitting with React.lazy (can be implemented)

2. **State Management**
   - Context API for minimal overhead
   - Local state where appropriate

3. **API Optimization**
   - Pagination for large datasets
   - Filtering at server level
   - Debouncing search inputs

## Scalability Considerations

### Horizontal Scaling

- Stateless API design
- JWT tokens (no server-side session)
- File storage can be moved to S3/CloudStorage

### Vertical Scaling

- PM2 cluster mode for multi-core usage
- MongoDB replica sets for high availability
- Load balancing with Nginx

### Microservices Evolution

The current monolithic structure can be split into:
- Authentication Service
- Resource Management Service
- Notification Service
- File Storage Service

## Error Handling

### Backend

1. **Global Error Handler**
   - Catches all errors
   - Formats error responses
   - Logs errors

2. **Specific Error Types**
   - Validation errors
   - Cast errors (invalid ObjectId)
   - Duplicate key errors
   - Custom errors

### Frontend

1. **Toast Notifications**
   - User-friendly error messages
   - Success confirmations

2. **Error Boundaries** (can be implemented)
   - Catch React component errors
   - Fallback UI

## Testing Strategy

### Backend Testing

- Unit tests for controllers
- Integration tests for API endpoints
- Database mocking with MongoDB Memory Server

### Frontend Testing

- Component unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Cypress (can be implemented)

## Future Enhancements

1. **Real-time Features**
   - WebSocket integration for live notifications
   - Real-time collaboration

2. **Advanced Features**
   - Search with Elasticsearch
   - Analytics dashboard
   - Email notifications
   - Mobile application

3. **DevOps**
   - CI/CD pipeline
   - Automated testing
   - Monitoring and logging (ELK stack)
   - Container orchestration (Kubernetes)

## Best Practices Implemented

1. **Code Organization**
   - Separation of concerns
   - DRY principle
   - Modular structure

2. **API Design**
   - RESTful conventions
   - Consistent naming
   - Proper HTTP status codes

3. **Security**
   - Environment variables
   - No sensitive data in code
   - Input validation
   - Security headers

4. **Documentation**
   - Comprehensive README
   - API documentation
   - Deployment guide
   - Code comments where needed

5. **Version Control**
   - Meaningful commit messages
   - Feature branches
   - .gitignore for sensitive files
