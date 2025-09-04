#!/bin/bash

# EZTicket Deployment Script
# This script deploys the EZTicket application using Docker Compose

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Parse command line arguments
ENVIRONMENT=${1:-dev}
ACTION=${2:-up}

print_status "Deploying EZTicket in $ENVIRONMENT environment..."

# Set the appropriate compose file
if [ "$ENVIRONMENT" = "prod" ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
    ENV_FILE=".env.prod"
elif [ "$ENVIRONMENT" = "dev" ]; then
    COMPOSE_FILE="docker-compose.dev.yml"
    ENV_FILE=".env.dev"
else
    print_error "Invalid environment. Use 'dev' or 'prod'"
    exit 1
fi

# Check if environment file exists
if [ ! -f "$ENV_FILE" ]; then
    print_warning "Environment file $ENV_FILE not found. Creating from example..."
    cp env.example "$ENV_FILE"
    print_warning "Please update $ENV_FILE with your actual configuration values."
fi

# Create necessary directories
mkdir -p logs/nginx backups ssl

# Build and start services
case $ACTION in
    "up")
        print_status "Starting services..."
        docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE up -d --build
        ;;
    "down")
        print_status "Stopping services..."
        docker-compose -f $COMPOSE_FILE down
        ;;
    "restart")
        print_status "Restarting services..."
        docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE restart
        ;;
    "logs")
        print_status "Showing logs..."
        docker-compose -f $COMPOSE_FILE logs -f
        ;;
    "clean")
        print_status "Cleaning up..."
        docker-compose -f $COMPOSE_FILE down -v
        docker system prune -f
        ;;
    *)
        print_error "Invalid action. Use 'up', 'down', 'restart', 'logs', or 'clean'"
        exit 1
        ;;
esac

print_status "Deployment completed successfully!"

# Show service status
if [ "$ACTION" = "up" ]; then
    print_status "Service Status:"
    docker-compose -f $COMPOSE_FILE ps
    
    print_status "Access URLs:"
    echo "  Frontend: http://localhost:3000"
    echo "  API: http://localhost:5000"
    echo "  Database: localhost:1433"
fi
