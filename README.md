# Task Manager App

This is a simple Task Manager app built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. It allows users to create, update, delete, mark as completed/incomplete, and sort tasks by priority or date. The app also supports drag-and-drop functionality to reorder tasks. All data is stored in the browser's `localStorage`.

## Features

- **Task List Management**: Create, update, delete, and toggle task completion.
- **Drag and Drop**: Rearrange tasks via drag-and-drop functionality.
- **Filtering & Sorting**: Filter tasks by their completion status and sort them by date or priority.
- **Task Modal**: A modal to create and update tasks.
- **Task Details**: View detailed information about each task.

## Tech Stack

- **React**: The core library for building user interfaces.
- **Vite**: Fast and modern build tool for development and production.
- **TypeScript**: Provides type safety for JavaScript code.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For routing between the Task List and Task Details pages.
- **@hello-pangea/dnd**: A library for drag-and-drop functionality in React.
- **Jest & React Testing Library**: For unit and integration tests.

## Setup Instructions

To set up the project locally and run it on your machine, follow the steps below:


### Step 1: Clone the Repository

Start by cloning the repository to your local machine. Use the following command:

- git clone https://github.com/yourusername/task-manager.git
- cd task-manager 

### Step 2: Install Dependencies

Once inside the project directory, install the required dependencies using either npm or yarn:

- npm install


### Step 3: Run the Development Server
Now that the dependencies are installed, you can start the development server. Run the following command to start the app: 

- npm run dev


### Step 4: To run the test 

- npx vitest