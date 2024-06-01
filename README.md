# Applications Logger

This is a simple web app that helps log job applications and track their progress.
Designed for desktop only.

## Getting Started

### Requirements

For development, you will only need [Node](http://nodejs.org/) installed in your
environment.

### Install

    git clone git@github.com:Arvoya/applications.git
    cd applications
    npm install

### Configure app

Along with this project, you will need to clone the [server](link) and follow the
instructions to set it up.

### Start & watch

    npm run dev
    npm start

## Architecture

Describe how the project is structured.

```
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── Components
│   │   ├── Form
│   │   │   └── index.tsx
│   │   ├── Lists
│   │   ├── Lists.tsx
│   │   └── Modal
│   │       └── index.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   ├── tests
│   │   └── setup.ts
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Languages & tools

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

## User Stories

1. As a user, I want to be able to create a new log entry for each job application
I submit, so that I can keep track of all my applications in one place.
2. As a user, I want to be able to update each log entry with the status of the
application (e.g., "submitted", "interview scheduled", "rejected"), so that I can
easily see the progress of each application.
3. As a user, I want to be able to add notes to each log entry, so that I can record
important details about the application or the job.
4. As a user, I want to be able to filter and sort my log entries, so that I can
easily find specific applications.
5. As a user, I want to be able to export my log entries to a CSV file, so that
I can use the data in other applications or for reporting.
6. As a user, I want the web app to automatically save my log entries, so that I
don't lose any data if my browser crashes or if I forget to save.
7. As a user, I want to be able to log in to the web app, so that I can access my
log entries from any device.
8. As a user, I want the web app to be responsive, so that I can use it on my phone
or tablet as well as my computer.

## Change Log

1.0.0
