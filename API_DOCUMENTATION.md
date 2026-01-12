# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
```
POST /auth/register
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student",
  "studentNumber": "2023001",
  "filiere": "filiere_id",
  "level": "1",
  "semester": "S1"
}
```

### Login
```
POST /auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```
GET /auth/me
```
*Requires Authentication*

---

## Filiere Endpoints

### Get All Filieres
```
GET /filieres
```
*Requires Authentication*

### Get Filiere by ID
```
GET /filieres/:id
```
*Requires Authentication*

### Create Filiere
```
POST /filieres
```
*Requires Admin Role*

**Body:**
```json
{
  "name": "Computer Science",
  "code": "CS",
  "description": "Computer Science Program",
  "duration": 3
}
```

### Update Filiere
```
PUT /filieres/:id
```
*Requires Admin Role*

### Delete Filiere
```
DELETE /filieres/:id
```
*Requires Admin Role*

---

## Class Endpoints

### Get All Classes
```
GET /classes?filiere=<filiere_id>&level=<level>
```
*Requires Authentication*

### Get Class by ID
```
GET /classes/:id
```
*Requires Authentication*

### Create Class
```
POST /classes
```
*Requires Admin Role*

**Body:**
```json
{
  "name": "CS 1A",
  "code": "CS1A",
  "filiere": "filiere_id",
  "level": "1",
  "semester": "S1",
  "academicYear": "2023-2024",
  "subjects": ["subject_id1", "subject_id2"]
}
```

### Update Class
```
PUT /classes/:id
```
*Requires Admin Role*

### Delete Class
```
DELETE /classes/:id
```
*Requires Admin Role*

### Add Student to Class
```
POST /classes/:id/students
```
*Requires Admin Role*

**Body:**
```json
{
  "studentId": "student_id"
}
```

### Remove Student from Class
```
DELETE /classes/:id/students/:studentId
```
*Requires Admin Role*

---

## Subject Endpoints

### Get All Subjects
```
GET /subjects?filiere=<filiere_id>&level=<level>&semester=<semester>
```
*Requires Authentication*

### Get Subject by ID
```
GET /subjects/:id
```
*Requires Authentication*

### Create Subject
```
POST /subjects
```
*Requires Admin Role*

**Body:**
```json
{
  "name": "Data Structures",
  "code": "CS101",
  "description": "Introduction to data structures",
  "filiere": "filiere_id",
  "level": "1",
  "semester": "S1",
  "credits": 3,
  "coefficient": 2,
  "instructor": "Prof. Smith"
}
```

### Update Subject
```
PUT /subjects/:id
```
*Requires Admin Role*

### Delete Subject
```
DELETE /subjects/:id
```
*Requires Admin Role*

---

## Resource Endpoints

### Get All Resources
```
GET /resources?subject=<subject_id>&type=<type>&class=<class_id>
```
*Requires Authentication*

**Query Parameters:**
- `subject`: Filter by subject ID
- `type`: Filter by resource type (course, tp, td, homework, exam, project, other)
- `class`: Filter by class ID (admin only)

### Get Resource by ID
```
GET /resources/:id
```
*Requires Authentication*

### Create Resource
```
POST /resources
```
*Requires Admin Role*

**Content-Type:** `multipart/form-data`

**Form Data:**
- `file`: The file to upload
- `title`: Resource title
- `description`: Resource description
- `type`: Resource type
- `subject`: Subject ID
- `class`: Class ID
- `tags`: JSON array of tags

### Update Resource
```
PUT /resources/:id
```
*Requires Admin Role*

**Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "type": "course",
  "isVisible": true,
  "tags": ["algorithms", "sorting"]
}
```

### Delete Resource
```
DELETE /resources/:id
```
*Requires Admin Role*

### Download Resource
```
GET /resources/:id/download
```
*Requires Authentication*

---

## Calendar Endpoints

### Get Calendar Events
```
GET /calendar?startDate=<date>&endDate=<date>&type=<type>&class=<class_id>
```
*Requires Authentication*

**Query Parameters:**
- `startDate`: Filter events from this date (ISO format)
- `endDate`: Filter events until this date (ISO format)
- `type`: Filter by event type
- `class`: Filter by class ID (admin only)

### Get Calendar Event by ID
```
GET /calendar/:id
```
*Requires Authentication*

### Create Calendar Event
```
POST /calendar
```
*Requires Admin Role*

**Body:**
```json
{
  "title": "Midterm Exam",
  "description": "Data Structures midterm examination",
  "type": "exam",
  "startDate": "2024-03-15T10:00:00Z",
  "endDate": "2024-03-15T12:00:00Z",
  "subject": "subject_id",
  "class": "class_id",
  "location": "Room 101",
  "isAllDay": false,
  "color": "#ef4444"
}
```

### Update Calendar Event
```
PUT /calendar/:id
```
*Requires Admin Role*

### Delete Calendar Event
```
DELETE /calendar/:id
```
*Requires Admin Role*

---

## Notification Endpoints

### Get User Notifications
```
GET /notifications?isRead=<boolean>
```
*Requires Authentication*

**Query Parameters:**
- `isRead`: Filter by read status (true/false)

### Get Unread Count
```
GET /notifications/unread-count
```
*Requires Authentication*

### Mark Notification as Read
```
PUT /notifications/:id/read
```
*Requires Authentication*

### Mark All Notifications as Read
```
PUT /notifications/mark-all-read
```
*Requires Authentication*

### Delete Notification
```
DELETE /notifications/:id
```
*Requires Authentication*

---

## Error Responses

All endpoints return standard error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

---

## Models

### User
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  role: String (student/admin),
  studentNumber: String,
  filiere: ObjectId (ref: Filiere),
  level: String (1-5),
  semester: String (S1-S10),
  class: ObjectId (ref: Class),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Filiere
```javascript
{
  _id: ObjectId,
  name: String,
  code: String,
  description: String,
  duration: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Class
```javascript
{
  _id: ObjectId,
  name: String,
  code: String,
  filiere: ObjectId (ref: Filiere),
  level: String,
  semester: String,
  academicYear: String,
  students: [ObjectId] (ref: User),
  subjects: [ObjectId] (ref: Subject),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Subject
```javascript
{
  _id: ObjectId,
  name: String,
  code: String,
  description: String,
  filiere: ObjectId (ref: Filiere),
  level: String,
  semester: String,
  credits: Number,
  coefficient: Number,
  instructor: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Resource
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  type: String (course/tp/td/homework/exam/project/other),
  subject: ObjectId (ref: Subject),
  class: ObjectId (ref: Class),
  filePath: String,
  fileName: String,
  fileSize: Number,
  mimeType: String,
  uploadedBy: ObjectId (ref: User),
  uploadDate: Date,
  isVisible: Boolean,
  downloadCount: Number,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### CalendarEvent
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  type: String (exam/deadline/homework/lecture/holiday/other),
  startDate: Date,
  endDate: Date,
  subject: ObjectId (ref: Subject),
  class: ObjectId (ref: Class),
  location: String,
  createdBy: ObjectId (ref: User),
  isAllDay: Boolean,
  color: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Notification
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  title: String,
  message: String,
  type: String (resource/calendar/announcement/system),
  resource: ObjectId (ref: Resource),
  calendarEvent: ObjectId (ref: CalendarEvent),
  isRead: Boolean,
  readAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```
