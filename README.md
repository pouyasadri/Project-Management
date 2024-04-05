# Laravel 11 + React Full Stack App with Inertia - Project Management App

This is a full-stack web application for managing projects, built with Laravel 11 and React using the Inertia.js
library.

## Features

- User authentication
- Create, read, update, and delete (CRUD) operations for projects
- CRUD operations for tasks within each project
- Task status and priority management
- Pagination for tasks and projects
- Image upload for projects
- Flash messages for success and error notifications
- Form validation
- Responsive design
- Dark mode
- Assign tasks to users
- Filter tasks by status
- Sort tasks by priority
- Search projects by name
- Search tasks by name
- View tasks by project
- View tasks by user
- View tasks by status
- View tasks by priority
- View tasks by date
- View tasks by search
- View tasks by filter
- View tasks by sort
- View tasks by pagination

## Technologies Used

- Backend: Laravel 11
- Frontend: React
- Routing: Inertia.js
- Styling: Tailwind CSS
- Database: Sqlite

## Installation

1. Clone the repository: `git clone https://github.com/pouyasadri/Project-Management.git`
2. Navigate to the project directory: `cd project-management-app`
3. Install PHP dependencies: `composer install`
4. Install JavaScript dependencies: `npm install`
5. Copy the example env file: `cp .env.example .env`
6. Generate an app key: `php artisan key:generate`
7. Set up your database in the `.env` file
8. Run the migrations: `php artisan migrate`
9. Compile the assets: `npm run dev`
10. Start the server: `php artisan serve`

Now, you can visit `localhost:8000` in your browser to start using the application.

## Usage

After logging in, you can create a new project, view all your projects, and edit or delete existing projects. Within
each project, you can create, view, edit, and delete tasks. Each task has a status and priority that can be updated.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
