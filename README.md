# University Academic Resource Management System

A comprehensive MERN stack application for managing academic resources, enabling universities to organize and distribute educational materials to students efficiently.

## Features

- **Resource Management**: Upload and manage courses, TPs, homework, and other academic materials
- **Organization**: Resources organized by filiere (field of study), level/semester, and class
- **Student Classification**: Students grouped by classes with subject-specific access
- **Notifications**: Real-time notifications when new resources are uploaded
- **Calendar**: Track exams, deadlines, and homework submissions
- **Download Resources**: Easy access and download of academic materials
- **Role-Based Access**: Separate interfaces for administrators and students

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer

## Architecture

```
├── server/                 # Backend application
│   ├── config/            # Configuration files
│   ├── models/            # Mongoose schemas
│   ├── controllers/       # Business logic
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   └── server.js          # Entry point
│
└── client/                # Frontend application
    └── src/
        ├── components/    # Reusable components
        ├── pages/         # Page components
        ├── context/       # React context
        ├── services/      # API services
        ├── utils/         # Utility functions
        └── styles/        # CSS/styling
```

## Quick Start

⚡ **Want to get started quickly?** Check out the [Quick Start Guide](./QUICKSTART.md) for a 5-minute setup!

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Configure environment variables
```bash
# Create .env file in server directory
cp server/.env.example server/.env
# Update the variables with your configuration
```

5. Start MongoDB service

6. Seed the database (optional)
```bash
cd server
npm run seed
```

This will create:
- An admin user (email: admin@university.com, password: admin123)
- Sample filieres (Computer Science, Mathematics, Physics)
- Sample classes and subjects
- Sample student users

7. Run the application

**Development mode:**
```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm start
```

**Production mode:**
```bash
# Build frontend
cd client
npm run build

# Start server
cd ../server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/:id` - Get resource by ID
- `POST /api/resources` - Upload new resource (Admin only)
- `PUT /api/resources/:id` - Update resource (Admin only)
- `DELETE /api/resources/:id` - Delete resource (Admin only)

### Calendar
- `GET /api/calendar` - Get calendar events
- `POST /api/calendar` - Create calendar event (Admin only)
- `PUT /api/calendar/:id` - Update calendar event (Admin only)
- `DELETE /api/calendar/:id` - Delete calendar event (Admin only)

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read

## Documentation

- 📖 [Quick Start Guide](./QUICKSTART.md) - Get started in 5 minutes
- 🎯 [Features Documentation](./FEATURES.md) - Detailed feature descriptions
- 🏗️ [Architecture Guide](./ARCHITECTURE.md) - System architecture and design patterns
- 🔌 [API Documentation](./API_DOCUMENTATION.md) - Complete API reference
- 🚀 [Deployment Guide](./DEPLOYMENT.md) - Production deployment instructions
- 🤝 [Contributing Guide](./CONTRIBUTING.md) - How to contribute to the project

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:
- Code of conduct
- Development workflow
- Coding standards
- Pull request process

Quick steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
