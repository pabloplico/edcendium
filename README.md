# Edcendium Learning Management System

A modern learning management system built with Next.js and AWS Amplify Gen 2.

## Key Features

### Course Creation
Teachers can create courses by specifying:
- Course title, learning area, subject, and year level
- Content descriptors aligned with curriculum standards
- General capabilities and cross-curriculum priorities
- Achievement standards for assessment

### Lesson Generation
The LMS includes an AI-assisted lesson generation tool that:
- Takes input parameters like title, subject, and grade level
- Processes teacher prompts to generate tailored lesson content
- Creates structured lesson plans with objectives, content, and activities
- Allows editing before saving to the database

### Dashboard Interfaces
- **Teacher Dashboard**: Course management tiles, recent activity feed, and quick action buttons
- **Student Dashboard**: Course progress tracking, upcoming assignments, and enrollment options

## Data Model

The system uses the following primary entities:
- **User**: Teachers and students with role-based permissions
- **Course**: Educational content organized by curriculum standards
- **Lesson**: Individual learning units with objectives and activities

## Deployment to AWS Amplify

This project uses AWS Amplify Gen 2 for backend services. Follow these steps to deploy:

### Prerequisites

1. Install the AWS CLI and configure it with your AWS credentials
2. Install the Amplify CLI: `npm install -g @aws-amplify/cli`
3. Node.js version 20 or higher

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the local development server: `npm run dev`
4. Start the Amplify sandbox: `npx amplify sandbox`

### Deployment

1. Log in to the AWS Amplify Console
2. Create a new app and connect it to your Git repository
3. Configure the build settings using the provided `amplify.yml` file
4. Deploy the application

The `amplify.yml` file is already configured with the correct build commands for Amplify Gen 2:

```yaml
version: 1
backend:
  phases:
    build:
      commands:
        - npm ci --cache .npm --prefer-offline
        - npx amplify sandbox --no-interactive
        - npx amplify generate outputs --out-dir ./
        - npx amplify deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --cache .npm --prefer-offline
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - .next/cache/**/*
      - .npm/**/*
      - node_modules/**/*
```

### Authentication

The application uses Amplify Authentication with custom user attributes:
- Email-based authentication
- User role attribute (teacher/student)
- Password policies for security

### Data Storage

The application uses Amplify DataStore with the following models:
- Todo (example model, to be expanded)

## Future Development

Planned enhancements include:
- Assignment creation and submission system
- Student enrollment and progress tracking
- Resource library for teaching materials
- Integrated assessment tools
- Parent portal for guardian oversight