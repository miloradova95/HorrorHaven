# HorrorHaven

This project was created during the Creative Code Lab at UAS St. Pölten. Within 14 days, I had to develop a functional web application that incorporated a database, user authentication, and a frontend framework of my choice.

HorrorHaven is a web application for horror movie enthusiasts to explore and engage with their favorite films. Users can browse an extensive collection of horror movies, access detailed metadata from the TMDB API, create personalized watchlists, and geek out through a commenting system.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React, Vite, Tailwind CSS
- **API:** TMDB API

## Features

- Browse a vast collection of horror movies
- View detailed movie metadata
- Create and manage personalized watchlists
- Engage in discussions via a commenting system
- Responsive and sleek UI with Tailwind CSS

## Installation & Setup

To run the project locally, follow these steps:

### 1. Clone the Repository
```sh
git clone https://github.com/miloradova95/HorrorHaven.git
cd HorrorHaven
```

### 2. Install Dependencies
Navigate to both the `client` and `server` directories and install dependencies:
```sh
cd ../client
npm install

cd ../server
npm install
```

### 3. Run the Application
Start the backend:
```sh
cd ../server
node app.js
```

Start the frontend:
```sh
cd ../client
npm run dev
```

