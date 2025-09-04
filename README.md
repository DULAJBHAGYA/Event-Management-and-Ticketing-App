# EZTicket - Event Management and Ticketing Platform

A comprehensive event management and ticketing platform built with Next.js frontend and .NET Core 9 backend, fully dockerized for production deployment.

## 🏗️ Architecture

- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS
- **Backend**: .NET Core 9 Web API with Entity Framework
- **Database**: SQL Server 2022
- **Reverse Proxy**: Nginx
- **Cache**: Redis (Optional)
- **Deployment**: Docker & Docker Compose

## 🚀 Quick Start

### Prerequisites
- Docker Desktop
- Docker Compose
- At least 4GB RAM
- Ports 80, 3000, 5000, 1433 available

### 1. Clone Repository
```bash
git clone <repository-url>
cd Event-Management-and-Ticketing-App
```

### 2. Environment Setup
```bash
cp env.example .env.prod
# Edit .env.prod with your configuration
```

### 3. Deploy Application
```bash
# Development
./deploy.sh dev up

# Production
./deploy.sh prod up
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000
- **API Docs**: http://localhost:5000/swagger

## 📁 Project Structure

```
Event-Management-and-Ticketing-App/
├── ezticket/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   │   ├── components/     # React components
│   │   │   ├── api/           # API routes
│   │   │   └── globals.css    # Global styles
│   │   └── lib/               # Utilities
│   ├── public/                # Static assets
│   ├── Dockerfile
│   └── package.json
├── EZTicket.API/              # .NET Core Backend
│   ├── Models/                # Entity Framework models
│   ├── DTOs/                  # Data Transfer Objects
│   ├── Controllers/           # API controllers
│   ├── Services/              # Business logic
│   ├── Data/                  # DbContext
│   ├── Mappings/              # AutoMapper profiles
│   ├── Validators/            # FluentValidation
│   ├── Middleware/            # Custom middleware
│   ├── Dockerfile
│   └── EZTicket.API.csproj
├── docker-compose.yml         # Main compose file
├── docker-compose.dev.yml     # Development
├── docker-compose.prod.yml    # Production
├── nginx.conf                 # Reverse proxy
├── deploy.sh                  # Deployment script
├── env.example               # Environment template
└── README.md                 # This file
```

## 🎯 Features

### Frontend Features
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Modern UI/UX**: Clean, professional interface
- **Event Management**: Browse, search, and filter events
- **Ticket Booking**: Secure ticket purchasing system
- **User Authentication**: Login/Register with JWT
- **Organizer Dashboard**: Event creation and management
- **Promotions**: Special offers and discounts
- **AI Integration**: Chatbot and recommendations
- **Real-time Updates**: Live event information

### Backend Features
- **RESTful API**: Clean, documented endpoints
- **JWT Authentication**: Secure user authentication
- **Entity Framework**: Code-first database approach
- **AutoMapper**: Object mapping
- **FluentValidation**: Input validation
- **Serilog**: Structured logging
- **Swagger**: API documentation
- **CORS**: Cross-origin resource sharing
- **Health Checks**: Service monitoring

### Database Features
- **SQL Server**: Enterprise-grade database
- **Entity Framework**: ORM with migrations
- **Relationships**: Proper foreign key constraints
- **Indexing**: Optimized query performance
- **Backups**: Automated backup system

## 🐳 Docker Configuration

### Services
- **Frontend**: Next.js production build
- **Backend**: .NET Core 9 API
- **Database**: SQL Server 2022
- **Proxy**: Nginx with load balancing
- **Cache**: Redis for performance

### Environment Files
- **Development**: `docker-compose.dev.yml`
- **Production**: `docker-compose.prod.yml`
- **Configuration**: `.env.prod`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_PASSWORD` | SQL Server password | `YourStrong@Passw0rd` |
| `JWT_SECRET_KEY` | JWT signing key | `YourSuperSecretKey...` |
| `JWT_ISSUER` | JWT issuer | `EZTicket` |
| `JWT_AUDIENCE` | JWT audience | `EZTicket` |
| `API_URL` | Frontend API URL | `http://localhost:5000` |

### Database Configuration
- **Server**: `sqlserver` (internal) / `localhost:1433` (external)
- **Database**: `EZTicketDB`
- **Username**: `sa`
- **Password**: Set via `DB_PASSWORD`

## 🚀 Deployment Commands

### Development
```bash
# Start development environment
./deploy.sh dev up

# View logs
./deploy.sh dev logs

# Stop services
./deploy.sh dev down
```

### Production
```bash
# Start production environment
./deploy.sh prod up

# View logs
./deploy.sh prod logs

# Stop services
./deploy.sh prod down

# Clean up everything
./deploy.sh prod clean
```

### Manual Docker Commands
```bash
# Development
docker-compose -f docker-compose.dev.yml up -d

# Production
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token

### Events
- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `POST /api/events` - Create event (Organizer)
- `PUT /api/events/{id}` - Update event (Organizer)
- `DELETE /api/events/{id}` - Delete event (Organizer)

### Tickets
- `GET /api/tickets` - Get user tickets
- `POST /api/tickets` - Purchase tickets
- `GET /api/tickets/{id}` - Get ticket details

### Promotions
- `GET /api/promotions` - Get all promotions
- `POST /api/promotions` - Create promotion (Organizer)
- `PUT /api/promotions/{id}` - Update promotion (Organizer)
- `DELETE /api/promotions/{id}` - Delete promotion (Organizer)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: BCrypt password hashing
- **CORS Configuration**: Controlled cross-origin access
- **Rate Limiting**: API request throttling
- **Input Validation**: Comprehensive data validation
- **SQL Injection Protection**: Entity Framework parameterized queries
- **XSS Protection**: Content Security Policy headers

## 📈 Performance Features

- **Docker Multi-stage Builds**: Optimized image sizes
- **Nginx Load Balancing**: Horizontal scaling support
- **Redis Caching**: Fast data retrieval
- **Database Indexing**: Optimized query performance
- **CDN Ready**: Static asset optimization
- **Health Checks**: Service monitoring

## 🚨 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
lsof -i :3000
# Kill the process
kill -9 <PID>
```

#### Database Connection Issues
```bash
# Check database logs
docker-compose logs sqlserver

# Test database connection
docker exec -it ezticket-sqlserver-prod /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd
```

#### Memory Issues
```bash
# Check container resource usage
docker stats

# Increase Docker memory limit in Docker Desktop settings
```

### Reset Everything
```bash
# Stop and remove all containers, networks, and volumes
./deploy.sh prod clean

# Or manually
docker-compose -f docker-compose.prod.yml down -v
docker system prune -f
```

## 🔄 Updates and Maintenance

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
./deploy.sh prod restart
```

### Database Migrations
Database migrations are handled automatically by Entity Framework on startup.

### Backup Database
```bash
# Create backup
docker exec ezticket-sqlserver-prod /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "BACKUP DATABASE EZTicketDB TO DISK = '/var/opt/mssql/backup/EZTicketDB.bak'"
```

## 📚 Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management
- **Next.js API Routes**: Server-side API endpoints

### Backend
- **.NET Core 9**: Cross-platform web framework
- **Entity Framework Core**: ORM for database operations
- **AutoMapper**: Object-to-object mapping
- **FluentValidation**: Input validation
- **Serilog**: Structured logging
- **Swagger/OpenAPI**: API documentation

### Database
- **SQL Server 2022**: Relational database
- **Entity Framework Migrations**: Database versioning
- **Indexes**: Query optimization

### Infrastructure
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy and load balancer
- **Redis**: In-memory data store

## 🆘 Support

For issues and support:
1. Check the logs: `docker-compose logs -f`
2. Verify environment configuration
3. Check Docker and Docker Compose versions
4. Review this documentation

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**EZTicket** - Your premier event management and ticketing solution! 🎫✨