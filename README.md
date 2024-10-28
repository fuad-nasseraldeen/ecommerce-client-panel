# MegaStore 🛒 E-Commerce Website

This is a full-stack e-commerce application built with **Next.js** for the frontend and **Redux** for state management. The app includes features such as product listing, category browsing, cart management with local storage support, and loading indicators.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)

## Features

- Product listing and filtering by category
- Dynamic homepage with featured and new arrival products
- Cart management with persistence in local storage
- Loading indicator for async actions
- Styled with **Styled-Components**

## Project Structure

├── app/ │ ├── components/ # Reusable UI components │ ├── redux/ # Redux store and actions │ ├── util/ # Utility functions │ ├── newProducts/ # New products component │ ├── header/ # Header component │ └── featured/ # Featured product component ├── public/ # Static assets ├── pages/ # Next.js pages │ ├── api/ # API routes to interact with DB and fetch external APIs │ ├── hooks/ │ └── useDebounce # Custom hooks, including debounce functionality ├── stripe/ # Stripe integration for secure payment processing │ └── model # Stripe model setup to provide 100% website functionality to customers ├── README.md # Project documentation └── package.json # Project dependencies and scripts
## Setup and Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/fuad-nasseraldeen/ecommerce-client-panel.git
    cd ecommerce-client-panel
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Environment Variables**
   - Create a `.env.local` file in the root directory.
   - Define necessary variables (e.g., API keys or endpoints).

4. **Run the Development Server**
    ```bash
    npm run dev
    ```

5. **Open in Browser**
   - Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

- **Homepage**: Displays a random featured product, categories to shop by, and new arrivals.
- **Cart**: The cart is managed using Redux and persists in local storage. Items added to the cart are stored locally and will remain on page reload.
- **Random Product on Homepage**: A random product is featured on the homepage using the `getRandomProduct` utility.

## Scripts

- `npm run dev`: Run the app in development mode.
- `npm run build`: Build the app for production.
- `npm start`: Start the production server after building.

## Dependencies

- **Next.js**: React framework for building web applications.
- **React Redux**: For state management.
- **Redux Toolkit**: Simplified Redux setup.
- **Styled-Components**: CSS-in-JS library for styling components.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **React-Redux**: For connecting React with Redux.
