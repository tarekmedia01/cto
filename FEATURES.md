# Features Documentation

## Overview

This document provides detailed information about all features implemented in the University Academic Resource Management System.

---

## 1. User Authentication & Authorization

### Features

#### Registration
- Students and admins can create accounts
- Required fields validation
- Email uniqueness check
- Password hashing with bcrypt
- Automatic JWT token generation upon registration

#### Login
- Email and password authentication
- JWT token generation
- Token stored in localStorage
- Automatic authentication state management

#### Authorization
- Role-based access control (RBAC)
- Two roles: `admin` and `student`
- Protected routes for authenticated users only
- Admin-only routes for management functions

### User Roles

**Admin:**
- Upload and manage resources
- Create and manage calendar events
- Manage filieres, classes, and subjects
- View all students and resources
- Manage user accounts

**Student:**
- View resources for their class
- Download resources
- View calendar events for their class
- Receive notifications
- View their profile

---

## 2. Resource Management

### Features

#### For Admins

**Upload Resources:**
- Support for multiple file types (PDF, Word, Excel, PowerPoint, images, archives)
- File size limit (10MB by default, configurable)
- Metadata: title, description, type, subject, class
- Tags for better organization
- Automatic notification creation for students

**Resource Types:**
- Course materials
- TP (Practical work)
- TD (Directed work)
- Homework
- Exams
- Projects
- Other

**Manage Resources:**
- Edit resource metadata
- Delete resources (file also deleted from server)
- Toggle visibility
- View download statistics

#### For Students

**Browse Resources:**
- View all resources for their class
- Filter by subject
- Filter by type
- View resource details (title, description, uploader, date)

**Download Resources:**
- One-click download
- Download count tracking
- File served with original filename

### Technical Details

- Files stored on server filesystem
- File metadata stored in MongoDB
- Multer middleware for file upload handling
- Stream-based file downloads for efficiency
- Automatic file deletion when resource is removed

---

## 3. Academic Organization

### Filiere Management

**What is a Filiere?**
A filiere represents an academic program or field of study (e.g., Computer Science, Mathematics).

**Features:**
- Create, read, update, delete filieres
- Fields: name, code, description, duration (in years)
- Active/inactive status
- Used to organize classes and subjects

### Class Management

**What is a Class?**
A class represents a group of students in a specific year and program.

**Features:**
- Create, read, update, delete classes
- Fields: name, code, filiere, level, semester, academic year
- Associate subjects with classes
- Add/remove students to/from classes
- View class roster with student details

### Subject Management

**What is a Subject?**
A subject represents a course or module taught in a program.

**Features:**
- Create, read, update, delete subjects
- Fields: name, code, description, filiere, level, semester
- Credits and coefficient for grading
- Instructor information
- Filter subjects by filiere, level, or semester

---

## 4. Calendar System

### Features

#### Event Types
- Exams
- Deadlines
- Homework submissions
- Lectures
- Holidays
- Other events

#### Event Management (Admin)

**Create Events:**
- Title and description
- Event type
- Start and end date/time
- Associated subject (optional)
- Target class
- Location
- All-day event option
- Custom color coding

**Manage Events:**
- Edit event details
- Delete events
- View all events across classes

#### Event Viewing (All Users)

**Calendar View:**
- Events grouped by date
- Month navigation (previous/next)
- Filter events by type
- Events displayed with color coding
- Detailed event information

**Event Details:**
- Title and description
- Subject association
- Date and time
- Location
- Event type

### Technical Details

- Events stored with MongoDB
- Date range queries for efficient retrieval
- Automatic notifications sent to class students
- Indexed for performance (class + date)

---

## 5. Notification System

### Features

#### Automatic Notifications

Notifications are automatically created when:
- New resource is uploaded to a class
- New calendar event is created for a class
- Announcements are made (system-level)

#### Notification Types
- Resource notifications
- Calendar event notifications
- Announcements
- System notifications

#### Notification Management

**For Students:**
- View all notifications
- Filter by read/unread status
- Mark individual notifications as read
- Mark all notifications as read
- Delete notifications
- Unread count badge in navigation

**Notification Details:**
- Title and message
- Type indicator
- Timestamp
- Link to related resource/event
- Read/unread status

### Technical Details

- Push-style notifications (created on server)
- Polling for unread count (every 30 seconds)
- Notifications indexed by user and read status
- Efficient queries for notification lists

---

## 6. User Interface

### Design Features

**Responsive Design:**
- Works on desktop, tablet, and mobile
- Flexible grid layouts
- Mobile-friendly navigation

**Color-Coded Elements:**
- Resource types have unique colors
- Calendar events color-coded by type
- Notification badges for unread items
- Status indicators (active/inactive)

**Navigation:**
- Fixed navbar with quick access
- User menu with profile and logout
- Breadcrumb navigation (can be enhanced)
- Contextual actions based on role

### Pages

**Common Pages:**
- Login
- Register
- Home/Dashboard
- Resources
- Calendar
- Notifications
- Profile

**Admin-Specific:**
- Resource upload form
- Event creation form
- Management dashboards for:
  - Filieres
  - Classes
  - Subjects
  - Users

### User Experience

**Toast Notifications:**
- Success confirmations
- Error messages
- User-friendly messages
- Auto-dismiss with manual close option

**Loading States:**
- Loading indicators for async operations
- Skeleton screens (can be enhanced)
- Disabled buttons during processing

**Form Validation:**
- Client-side validation
- Server-side validation
- Error message display
- Field-level feedback

---

## 7. Search and Filtering

### Resource Filtering
- By subject
- By resource type
- Clear filters option

### Calendar Filtering
- By date range
- By event type
- By class (admin only)

### User Filtering (Admin)
- By role
- By filiere
- By level
- By class

### Subject Filtering
- By filiere
- By level
- By semester

---

## 8. Security Features

### Authentication Security
- Password hashing with bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- Token expiration (7 days by default)
- Secure password requirements (minimum 6 characters)

### Authorization Security
- Middleware-based route protection
- Role verification for admin routes
- User ownership verification for personal data
- Class-based access control for students

### API Security
- Rate limiting (100 requests per 10 minutes)
- CORS configuration
- Helmet.js security headers
- Input validation with express-validator
- File type and size validation
- Protection against NoSQL injection

### Data Security
- Password fields excluded from queries
- Mongoose schema validation
- Unique email enforcement
- Active/inactive user status

---

## 9. File Management

### Supported File Types
- Documents: PDF, Word (.doc, .docx)
- Spreadsheets: Excel (.xls, .xlsx)
- Presentations: PowerPoint (.ppt, .pptx)
- Images: JPEG, PNG, GIF
- Archives: ZIP, RAR
- Text: Plain text (.txt)

### File Handling
- Server-side storage
- Organized upload directory
- Unique filename generation (timestamp + random)
- File metadata tracking (size, type, original name)
- Download count tracking
- Efficient streaming for downloads

### Storage
- Local filesystem storage
- Configurable upload path
- Easy migration to cloud storage (S3, etc.)

---

## 10. Performance Features

### Database Optimization
- Strategic indexing on frequently queried fields
- Compound indexes for complex queries
- Lean queries where appropriate
- Selective population of referenced documents

### API Optimization
- Pagination support (ready for implementation)
- Filtered queries at database level
- Only necessary fields returned
- Efficient aggregation queries

### Frontend Optimization
- Context API for efficient state management
- Conditional rendering
- Lazy loading (can be enhanced)
- Debouncing for search inputs (can be implemented)

---

## 11. Admin Dashboard Features

### Quick Actions
- Upload new resource
- Create calendar event
- Manage filieres
- Manage classes
- Manage subjects
- View all users

### Statistics (Can be Enhanced)
- Total resources uploaded
- Total students
- Active classes
- Upcoming events

### Management Capabilities
- Full CRUD operations for all entities
- Bulk operations (can be implemented)
- Export data (can be implemented)
- Advanced filtering and search

---

## 12. Student Dashboard Features

### Overview
- Welcome message with user info
- Student number, filiere, level display
- Class information

### Recent Activity
- Latest uploaded resources (last 5)
- Upcoming events (next 5)
- Quick access to full lists

### Personal Information
- Profile view
- Class assignment
- Enrolled subjects

---

## 13. Additional Features

### Email Validation
- Regex-based email validation
- Unique email enforcement
- Proper error messages

### Error Handling
- Global error handler
- Specific error messages
- User-friendly error display
- Proper HTTP status codes

### Logging
- Morgan middleware for request logging
- Console logging for errors
- Development vs production modes

### Environment Configuration
- Separate .env files for client and server
- Example .env files provided
- Easy configuration management

---

## Future Enhancement Ideas

### Short-term
1. Email notifications via SendGrid/Nodemailer
2. Advanced search with Elasticsearch
3. Pagination for large datasets
4. User profile editing
5. Password reset functionality

### Medium-term
1. Real-time notifications with WebSockets
2. Discussion forums per subject
3. Assignment submission system
4. Grade management
5. Attendance tracking

### Long-term
1. Mobile applications (React Native)
2. Video content support
3. Live streaming for lectures
4. AI-powered recommendations
5. Analytics dashboard
6. Multi-language support
7. Learning management features (quizzes, assignments)

---

## Technical Specifications

### API Rate Limiting
- 100 requests per 10 minutes per IP
- Applies to all `/api` routes
- Configurable via environment variables

### File Upload Limits
- Maximum file size: 10MB (configurable)
- Simultaneous uploads: 1 file at a time
- Automatic file cleanup on error

### Database Indexes
See ARCHITECTURE.md for detailed index specifications

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## Conclusion

This system provides a comprehensive solution for managing academic resources with a focus on security, performance, and user experience. The modular architecture allows for easy extension and customization based on specific institutional needs.
