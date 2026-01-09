const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Filiere = require('./models/Filiere');
const Class = require('./models/Class');
const Subject = require('./models/Subject');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Filiere.deleteMany({});
    await Class.deleteMany({});
    await Subject.deleteMany({});

    console.log('Creating admin user...');
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@university.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin user created');

    console.log('Creating filieres...');
    const filieres = await Filiere.insertMany([
      {
        name: 'Computer Science',
        code: 'CS',
        description: 'Bachelor of Computer Science',
        duration: 3,
      },
      {
        name: 'Mathematics',
        code: 'MATH',
        description: 'Bachelor of Mathematics',
        duration: 3,
      },
      {
        name: 'Physics',
        code: 'PHYS',
        description: 'Bachelor of Physics',
        duration: 3,
      },
    ]);
    console.log('Filieres created');

    console.log('Creating subjects...');
    const subjects = await Subject.insertMany([
      {
        name: 'Data Structures and Algorithms',
        code: 'CS101',
        description: 'Introduction to fundamental data structures and algorithms',
        filiere: filieres[0]._id,
        level: '1',
        semester: 'S1',
        credits: 6,
        coefficient: 2,
        instructor: 'Prof. Smith',
      },
      {
        name: 'Database Systems',
        code: 'CS102',
        description: 'Relational and NoSQL databases',
        filiere: filieres[0]._id,
        level: '1',
        semester: 'S2',
        credits: 6,
        coefficient: 2,
        instructor: 'Prof. Johnson',
      },
      {
        name: 'Web Development',
        code: 'CS103',
        description: 'Modern web technologies and frameworks',
        filiere: filieres[0]._id,
        level: '2',
        semester: 'S3',
        credits: 6,
        coefficient: 2,
        instructor: 'Prof. Williams',
      },
      {
        name: 'Calculus I',
        code: 'MATH101',
        description: 'Differential and integral calculus',
        filiere: filieres[1]._id,
        level: '1',
        semester: 'S1',
        credits: 6,
        coefficient: 2,
        instructor: 'Prof. Davis',
      },
      {
        name: 'Linear Algebra',
        code: 'MATH102',
        description: 'Vector spaces and linear transformations',
        filiere: filieres[1]._id,
        level: '1',
        semester: 'S2',
        credits: 6,
        coefficient: 2,
        instructor: 'Prof. Brown',
      },
    ]);
    console.log('Subjects created');

    console.log('Creating classes...');
    const classes = await Class.insertMany([
      {
        name: 'CS 1A',
        code: 'CS1A',
        filiere: filieres[0]._id,
        level: '1',
        semester: 'S1',
        academicYear: '2023-2024',
        subjects: [subjects[0]._id],
      },
      {
        name: 'CS 2A',
        code: 'CS2A',
        filiere: filieres[0]._id,
        level: '2',
        semester: 'S3',
        academicYear: '2023-2024',
        subjects: [subjects[2]._id],
      },
      {
        name: 'MATH 1A',
        code: 'MATH1A',
        filiere: filieres[1]._id,
        level: '1',
        semester: 'S1',
        academicYear: '2023-2024',
        subjects: [subjects[3]._id],
      },
    ]);
    console.log('Classes created');

    console.log('Creating sample students...');
    await User.insertMany([
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@university.com',
        password: 'student123',
        role: 'student',
        studentNumber: '2023001',
        filiere: filieres[0]._id,
        level: '1',
        semester: 'S1',
        class: classes[0]._id,
      },
      {
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob@university.com',
        password: 'student123',
        role: 'student',
        studentNumber: '2023002',
        filiere: filieres[0]._id,
        level: '2',
        semester: 'S3',
        class: classes[1]._id,
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'charlie@university.com',
        password: 'student123',
        role: 'student',
        studentNumber: '2023003',
        filiere: filieres[1]._id,
        level: '1',
        semester: 'S1',
        class: classes[2]._id,
      },
    ]);
    console.log('Sample students created');

    console.log('\n=== Seed Data Summary ===');
    console.log('Admin credentials:');
    console.log('  Email: admin@university.com');
    console.log('  Password: admin123');
    console.log('\nSample student credentials:');
    console.log('  Email: alice@university.com');
    console.log('  Password: student123');
    console.log('\nSeed completed successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
