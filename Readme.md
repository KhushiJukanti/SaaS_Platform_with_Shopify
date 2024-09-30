# SaaS Platform with Shopify API

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Pages and Components](#pages-and-components)
- [API and Mock Data](#api-and-mock-data)
- [Running the Application](#running-the-application)

## Project Overview

The Shopify Dashboard provides a comprehensive view of order data from a Shopify store. It displays total orders, total sales, and the conversion rate, allowing users to manage and analyze their shopify performance effectively. The dashboard also includes features for sorting and filtering orders, along with options for refreshing data.

## Technologies Used

- **Frontend**: React, Bootstrap, React Router
- **Backend**: Node.js, Express, Axios
- **Database**: MongoDB (if used for authentication or storing additional data)
- **Others**: dotenv, cors

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KhushiJukanti/SaaS_Platform_with_Shopify.git
   cd shopify-dashboard
    ```
2. **Install dependencies**:
    - **For the frontend**:
    ```bash
    cd frontend
    npm install
    ```
    - **For the backend**:
    ```bach
    cd backend
    npm install
    ```
3. **Create a `.env` file in the `backend` directory and set up your environment variables**:
    
    MongoURI,
    JWT Token,
    Shopify Store URL,
    Session Tokey Key.

## Folder Stracture

- **Backend**:
    ```bash
    Shopify-Dashboard/
    ├── Backend/
    │   ├── Controllers/       
    │   ├── Models/           
    │   ├── routes/           
    │   ├── middleware/       
    │   ├── .env               
    │   ├── server.js                
    └── └── package.json 
    ├── Frontend/
    │   ├── public/                    
    │   │   └── index.html
    │   ├── src/
    │   │   ├── components/            
    │   │   │   ├── Navbar.jsx         
    │   │   │   ├── Login.jsx          
    │   │   │   ├── Register.jsx        
    │   │   │   ├── Dashboard.jsx      
    │   │   └── context/              
    │   │       └── AuthContext.jsx    
    │   ├── App.js                    
    │   ├── index.js                   
    │   ├── package.json               
    │   └── .env                       
    └── └── README.md           
    ```

## Pages and Components
- **Register Page:** Register the user.
- **Login Page:** User authentication.
- **Dashboard Page:** Displays order data, sorting options, and refresh functionality.
- **Navbar:** Navigation links based on user authentication.

## API and Mock Data
- The backend is set up to fetch order data from Shopify using Axios.
- The API response includes:
    - Total Orders
    - Total Sales
    - Conversion Rate

- Make sure to have valid API keys and endpoints set in the .`env` file.

## Running the Application
1. **Start the backend server:**
    ```bash
    cd backend
    node server.js
    ```
2. **Start the frontend applivation:**
    ```bash
    cd frontend
    npm start
    ```
3. **Open your browser and navigate to `http://localhost:3000` to view the application.**



## Conclusion
This Shopify Dashboard is designed to help users efficiently manage and analyze their Shopify order data. With features like real-time updates, sorting, and filtering, users can gain valuable insights into their e-commerce operations. If you have any questions or suggestions, feel free to reach out!



