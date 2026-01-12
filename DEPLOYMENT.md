# Deployment Guide

This guide covers deploying the University Resources Management System to production.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud like MongoDB Atlas)
- Server with SSH access (or cloud platform like Heroku, DigitalOcean, AWS, etc.)

## Environment Configuration

### Server Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database - Use MongoDB Atlas or your MongoDB instance
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/university_resources

# JWT Secret - Generate a strong secret key
JWT_SECRET=your_very_strong_secret_key_here_min_32_characters
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# CORS - Your frontend URL
CLIENT_URL=https://your-frontend-domain.com
```

### Client Environment Variables

Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## Deployment Options

### Option 1: Traditional VPS (DigitalOcean, Linode, AWS EC2)

#### 1. Prepare the Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB (if hosting locally)
# Or use MongoDB Atlas for cloud database

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

#### 2. Clone and Setup Application

```bash
# Clone repository
git clone <your-repository-url>
cd university-resources-mern

# Install dependencies
npm run install-all

# Build frontend
cd client
npm run build
cd ..
```

#### 3. Configure PM2

Create `ecosystem.config.js` in project root:

```javascript
module.exports = {
  apps: [{
    name: 'university-resources-api',
    script: './server/server.js',
    cwd: './server',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
    },
  }],
};
```

Start the application:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 4. Configure Nginx

Create `/etc/nginx/sites-available/university-resources`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/project/client/build;
        index index.html;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # File uploads
    client_max_body_size 10M;
}
```

Enable site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/university-resources /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Option 2: Heroku

#### 1. Prepare for Heroku

Create `Procfile` in project root:

```
web: cd server && npm start
```

Create `package.json` in root if not exists with:

```json
{
  "scripts": {
    "start": "cd server && npm start",
    "heroku-postbuild": "cd client && npm install && npm run build"
  }
}
```

Modify `server/server.js` to serve React build:

```javascript
// Add after other middleware
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}
```

#### 2. Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set CLIENT_URL=https://your-app-name.herokuapp.com

# Deploy
git push heroku main
```

### Option 3: Docker

#### 1. Create Dockerfile for Server

`server/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

#### 2. Create Dockerfile for Client

`client/Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 3. Create docker-compose.yml

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    container_name: university-mongodb
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    ports:
      - "27017:27017"

  server:
    build: ./server
    container_name: university-server
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://admin:password@mongodb:27017/university_resources?authSource=admin
      JWT_SECRET: your_jwt_secret
      CLIENT_URL: http://localhost:3000
    depends_on:
      - mongodb
    volumes:
      - ./server/uploads:/app/uploads

  client:
    build: ./client
    container_name: university-client
    ports:
      - "80:80"
    depends_on:
      - server

volumes:
  mongo-data:
```

#### 4. Run with Docker

```bash
docker-compose up -d
```

## Post-Deployment Checklist

- [ ] Verify database connection
- [ ] Test user registration and login
- [ ] Test file upload functionality
- [ ] Verify notifications are working
- [ ] Test all API endpoints
- [ ] Check error logging
- [ ] Setup backup strategy for database
- [ ] Setup monitoring (e.g., PM2 monitoring, New Relic, DataDog)
- [ ] Configure firewall rules
- [ ] Setup regular database backups
- [ ] Test SSL certificate renewal

## Monitoring

### PM2 Monitoring

```bash
# View logs
pm2 logs

# Monitor processes
pm2 monit

# View status
pm2 status
```

### Database Backups

```bash
# MongoDB backup
mongodump --uri="your_mongodb_uri" --out=/path/to/backup

# Automate with cron
0 2 * * * mongodump --uri="your_mongodb_uri" --out=/backups/$(date +\%Y\%m\%d)
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `CLIENT_URL` in server `.env` matches your frontend domain
2. **File Upload Issues**: Check folder permissions for uploads directory
3. **Database Connection**: Verify MongoDB URI and network access
4. **JWT Errors**: Ensure JWT_SECRET is set and consistent

### Logs

```bash
# PM2 logs
pm2 logs university-resources-api

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

## Security Considerations

1. Use strong JWT secret (minimum 32 characters)
2. Enable HTTPS/SSL
3. Set up firewall (UFW on Ubuntu)
4. Regular security updates
5. Implement rate limiting (already included)
6. Use environment variables for sensitive data
7. Regular database backups
8. Monitor for suspicious activity

## Performance Optimization

1. Enable gzip compression in Nginx
2. Use CDN for static assets
3. Implement caching strategies
4. Database indexing (already implemented)
5. Use PM2 cluster mode
6. Optimize images before upload
7. Implement pagination for large datasets

## Support

For issues and questions, refer to the project documentation or create an issue in the repository.
