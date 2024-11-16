# JS Bank App

A modern banking application built using JavaScript, React, Node.js, and Express.js.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [API Handling](#api-handling)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Tech Stack

### Front-end

- **JavaScript**
- **React**

### Back-end

- **Node.js**
- **Express.js**

### API

- **Axios**
- **Fetch**
- **AJAX**

### Data base

- **MongoDB**

## Features

- User authentication (Sign up, Log in, Log out)
- Account management (Check balance, Transfer funds)
- Transaction history tracking
- Real-time updates with Axios and Fetch API

## Getting Started

To get a local copy of the project up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16.x)
- **npm** (v6.x or higher)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/js-bank-app.git
   cd js-bank-app
   ```

### Running the app

1. **Backend server: Running the app**

- Connect to port 5500

  ```bash
  npm install
  npm start
  ```

2. **Frontend - client: Running the app**

- Connect to port 3000

  ```bash
  npm install
  npm start
  ```

3. **In case of error during launch the app**

   **Front - client**

  <details>
<summary>Error and solutions </summary >

```bash
> mern-client@1.0.0 start
> cross-env NODE_OPTIONS=--openssl-legacy-provider react-scripts start

node: --openssl-legacy-provider is not allowed in NODE_OPTIONS
```

Then,

Solution1 : Clean the Project and Reinstall Dependencies

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

Then, try starting your application again:

```bash
npm start
```

</details>

## API Handling

### Overview

The frontend communicates with the backend (Node.js/Express) through API requests to perform actions like logging in, fetching account details, transferring funds, and more. These interactions are managed using tools like **AJAX**, **Fetch**, or **Axios**.

### API Request Methods

#### 1. **API Handling with $.ajax**

The $.ajax method is a jQuery function used to send an asynchronous HTTP request to a backend API. It's used to send a POST request for user signup.

```javascript
$.ajax({
	url: "http://localhost:5500/api/signup", // The URL to your backend API endpoint
	method: "POST", // Using the POST method to send data
	contentType: "application/json", // The data format being sent is JSON
	data: JSON.stringify({ name, email, password }), // Converting the JavaScript object into JSON format
	success: () => {
		// If the request is successful, store the username in localStorage and notify the user
		localStorage.setItem("userName", name);
		alert("Signup successful 😘!");

		// Redirect the user to the login page after a short delay
		setTimeout(() => {
			window.location.href = "/login";
		}, 200);
	},
	error: (xhr) => {
		// If there's an error, display the error message
		const errorMessage = xhr.responseJSON?.message || "Signup failed";
		setError(errorMessage); // Display the actual error message
		console.error("Error:", errorMessage);
	},
});
```

#### 2. **Axios** (Recommended for simplicity and better error handling)

- Axios is a promise-based HTTP client for the browser and Node.js. It simplifies making API requests and handling responses.

Frontend (Axios/Fetch):

We send a POST request to /api/login with the user's email and password.
If the backend responds successfully, we store the token in localStorage or sessionStorage.
If there's an error (invalid credentials or server error), we catch it and display the appropriate message to the user.
Backend (Express):

The backend validates the login data by checking if both the email and password are provided.
It then checks if the email exists in the database and if the password matches.
On success, it generates a JWT token and sends it to the frontend as part of the response.

##### Example: Fetching User Data

```javascript
import axios from "axios";

const loginUser = async (email, password) => {
	try {
		// Sending login request to the backend
		const response = await axios.post("/api/login", {
			email,
			password,
		});

		if (response.status === 200) {
			console.log("Login success:", response.data.message);
			// Store the token in localStorage or cookies
			localStorage.setItem("token", response.data.token);

			// Handle post-login logic (redirect user, update UI, etc.)
		}
	} catch (error) {
		if (error.response && error.response.status === 400) {
			// Display validation errors
			console.error("Login failed:", error.response.data.message);
		} else {
			// Handle server errors
			console.error("Server error:", error.message);
		}
	}
};

// Example usage
loginUser("user@example.com", "password123");
```

### Folder-structure

```

/js-bank-app
├── /server # Backend directory (Node.js/Express)
│ ├── /controllers # Controllers for handling API logic
│ ├── /models # Database models (e.g., User, Transaction)
│ ├── /routes # API route definitions
│ ├── /services # for mailServices
│ ├── app.js # Main entry point for the backend server
│ ├── .env # Environment variables for the app
│ ├── .gitignore # Git ignore file for backend
│ └── /middleware # Middleware for authentication, validation, etc.
│
├── /client # Frontend directory
│ ├── /src # Source code for React application
│ │ ├── /components # React components (e.g., Header, Footer, Dashboard)
│ │ ├── App.js # Main React component
│ │ └── index.js # Entry point for the React app
│ ├── public # Contains static assets like HTML, JS and configuration files
│ ├── package.json # Frontend dependencies and scripts
│ └── .gitignore # Git ignore file for frontend
│
├── package.json # Root project dependencies and scripts
├── .gitignore # Global gitignore (for backend and frontend)
└── README.md # Project documentation

```

### Contributing

- Aissetou : https://github.com/aissetousacko
- Yahia : https://github.com/yahiabgd
- Yoojeong : https://github.com/Yooyoo56
