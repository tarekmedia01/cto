# Contributing to University Resources Management System

Thank you for considering contributing to this project! This document provides guidelines for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git
- A code editor (VS Code recommended)

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/university-resources-mern.git
cd university-resources-mern
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/original-owner/university-resources-mern.git
```

4. Install dependencies:
```bash
npm run install-all
```

5. Configure environment variables:
```bash
cp server/.env.example server/.env
# Edit server/.env with your configuration
```

6. Seed the database:
```bash
cd server
npm run seed
```

7. Start development servers:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

## Development Workflow

### Branching Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes

### Creating a New Feature

1. Update your local repository:
```bash
git checkout develop
git pull upstream develop
```

2. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit:
```bash
git add .
git commit -m "feat: add your feature description"
```

4. Push to your fork:
```bash
git push origin feature/your-feature-name
```

5. Create a Pull Request

## Coding Standards

### Backend (Node.js/Express)

#### File Naming
- Use camelCase for file names: `userController.js`
- Model files should be PascalCase: `User.js`

#### Code Style
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use meaningful variable names
- Add comments for complex logic

#### Example:
```javascript
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### API Design
- Follow RESTful conventions
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Use appropriate HTTP status codes
- Include error messages in responses
- Validate input data

### Frontend (React)

#### File Naming
- Component files: PascalCase (`UserProfile.js`)
- Utility files: camelCase (`apiHelpers.js`)
- CSS files: Match component name (`UserProfile.css`)

#### Component Structure
```javascript
import React, { useState, useEffect } from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Side effects
  }, []);

  const handleAction = () => {
    // Handler logic
  };

  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

#### React Best Practices
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Use PropTypes or TypeScript for type checking
- Keep components small and focused
- Use meaningful component and prop names

### CSS

- Use BEM naming convention or similar
- Mobile-first responsive design
- Use CSS variables for colors and common values
- Organize CSS properties logically

```css
.component-name {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Spacing */
  padding: 20px;
  margin: 10px 0;
  
  /* Visual */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(auth): add password reset functionality

Implement password reset via email with token validation.
Includes email service integration and new API endpoints.

Closes #123
```

```
fix(resources): resolve file upload error for large files

Increased file size limit and improved error handling for
uploads exceeding the maximum allowed size.

Fixes #456
```

### Scope

Common scopes:
- `auth` - Authentication/authorization
- `resources` - Resource management
- `calendar` - Calendar functionality
- `notifications` - Notification system
- `ui` - User interface
- `api` - API changes
- `db` - Database changes

## Pull Request Process

### Before Submitting

1. **Test Your Changes**
   - All existing tests pass
   - Add new tests for new features
   - Test manually in the browser

2. **Update Documentation**
   - Update README.md if needed
   - Add JSDoc comments for new functions
   - Update API documentation

3. **Code Quality**
   - No console.log statements (unless intentional)
   - No commented-out code
   - Follow coding standards
   - Run linter if available

### Submitting a Pull Request

1. **Title**: Clear and descriptive
   - Good: "feat: add email notifications for new resources"
   - Bad: "update code"

2. **Description**: Include:
   - What changes were made
   - Why the changes were necessary
   - Any breaking changes
   - Screenshots (for UI changes)
   - Related issue numbers

3. **Template**:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
```

### Review Process

1. At least one maintainer must approve
2. All CI checks must pass
3. Resolve all review comments
4. Squash commits if requested
5. Maintainer will merge

## Testing

### Backend Testing

```bash
cd server
npm test
```

Test structure:
```javascript
describe('User Controller', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      // Test implementation
    });

    it('should return error for duplicate email', async () => {
      // Test implementation
    });
  });
});
```

### Frontend Testing

```bash
cd client
npm test
```

Test example:
```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});
```

## Documentation

### Code Comments

- Add JSDoc comments for functions:
```javascript
/**
 * Creates a new user in the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createUser = async (req, res) => {
  // Implementation
};
```

### API Documentation

Update `API_DOCUMENTATION.md` for any API changes:
- New endpoints
- Modified request/response formats
- Changed status codes
- New query parameters

### User Documentation

Update `README.md` for:
- New features
- Changed setup instructions
- New dependencies
- Configuration changes

## Questions or Need Help?

- Open an issue for questions
- Join our community chat (if available)
- Email maintainers (if listed)

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project README

Thank you for contributing! 🎉
