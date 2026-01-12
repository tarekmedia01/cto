# Quick Start Guide

Get the University Resources Management System up and running in 5 minutes!

## Prerequisites

- Node.js v14+ installed
- MongoDB running locally or MongoDB Atlas account
- Git

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd university-resources-mern

# Install all dependencies (backend + frontend)
npm run install-all
```

## Step 2: Configure Environment

```bash
# Copy the example environment file
cp server/.env.example server/.env

# Edit server/.env with your settings
# Minimum required:
# - MONGODB_URI=mongodb://localhost:27017/university_resources
# - JWT_SECRET=your_secret_key_here
```

**Quick MongoDB Setup:**

**Option A - Local MongoDB:**
```bash
# Ubuntu/Debian
sudo systemctl start mongod

# macOS with Homebrew
brew services start mongodb-community
```

**Option B - MongoDB Atlas (Cloud):**
1. Create free account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Use in MONGODB_URI

## Step 3: Seed Database

```bash
cd server
npm run seed
```

This creates:
- ✅ Admin account: `admin@university.com` / `admin123`
- ✅ Sample student: `alice@university.com` / `student123`
- ✅ Sample filieres, classes, and subjects

## Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
App opens at http://localhost:3000

## Step 5: Login and Explore

### Login as Admin
- Email: `admin@university.com`
- Password: `admin123`

**What you can do:**
- Upload resources (courses, TPs, homework)
- Create calendar events
- Manage filieres, classes, subjects
- View all students

### Login as Student
- Email: `alice@university.com`
- Password: `student123`

**What you can do:**
- Browse and download resources
- View calendar events
- Check notifications
- See your class information

## Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
sudo systemctl status mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process or change port in `.env`
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9

# Or change PORT in server/.env
PORT=5001
```

### JWT Secret Not Set
```
Error: JWT_SECRET is not defined
```
**Solution:** Set JWT_SECRET in `server/.env`
```
JWT_SECRET=your_very_long_secret_key_min_32_chars
```

## Next Steps

### Customize the Application

1. **Add Your Filieres:**
   - Login as admin
   - Navigate to admin panel
   - Create your university's programs

2. **Create Classes:**
   - Add classes for each year/semester
   - Assign subjects to classes

3. **Register Students:**
   - Students can self-register
   - Or admin can create accounts

4. **Upload Resources:**
   - Upload course materials
   - Students get notified automatically

### Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- VPS deployment (DigitalOcean, AWS EC2)
- Heroku deployment
- Docker deployment
- SSL configuration
- Security best practices

## Documentation

- **[README.md](./README.md)** - Complete overview
- **[FEATURES.md](./FEATURES.md)** - Feature documentation
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API reference
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guide

## Development Tips

### Hot Reload
Both backend (nodemon) and frontend (React) support hot reload. Changes are reflected automatically.

### API Testing
Use Postman or cURL to test API endpoints:
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@university.com","password":"admin123"}'
```

### Database Inspection
```bash
# MongoDB shell
mongosh university_resources

# View collections
show collections

# View users
db.users.find().pretty()
```

### Reset Database
```bash
cd server
npm run seed  # This clears and reseeds the database
```

## Support

Having issues? Check:
1. MongoDB is running
2. All dependencies installed (`npm run install-all`)
3. Environment variables set correctly
4. Ports 3000 and 5000 are available

For more help:
- Open an issue on GitHub
- Check existing issues
- Review documentation

## What's Next?

Explore the features:
- ✨ Upload your first resource
- 📅 Create a calendar event
- 🔔 Check the notification system
- 👥 Add more users and classes

---

**Congratulations!** 🎉 Your University Resources Management System is ready to use!
