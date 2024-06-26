# Full Stack E-Commerce Furniture Store | Personal Project

-Let's connect, you can find my LinkedIn profile through this link: [https://www.linkedin.com/in/ali-abu-hatab/]

# Furniture Store E-commerce Project

## 1. Abstract
The business of ecommerce nowadays is the most visible business use of the World Wide Web. The main goal of an e-commerce webstores is to sell goods and services online. This full stack project is a web-based shopping system designed for the furniture market. The project objective is to create a responsive website that enhances the shopping experience for users. Moreover, it's providing a powerful administration management system.

This ecommerce project is an attempt to provide the advantages of online shopping to customers of a real shop. Its objective is to help clients to order furniture items in the web store remotely, thus delivering the customers their orders smoothly without the need to visit the store locally. The customers will get the delivery service of their online shopping to their homes from this shop.

This system can be implemented to that local furniture-related business, which wants to expand its market online, and if they ensure their customers can enjoy the online shopping experience of such related furniture products. The technology stack includes React and TailwindCSS for the front-end side, PHP and Node.js for the server-side scripting, and MySQL for the database management system.

## Table of Contents
1. [Abstract](#1-abstract)
2. [Introduction](#2-introduction)
   1. [Objective](#21-objective)
   2. [Methodology](#22-methodology)
3. [Run Instructions & Requirements](#3-run-instructions--requirements)
4. [Tools used in the Project](#4-tools-used-in-the-project)
5. [Project database UML](#5-project-database-uml)
6. [Discussion about User Interface](#6-discussion-about-user-interface)
7. [Conclusions](#7-conclusions)
8. [References](#8-references)

## 2. Introduction
E-commerce is rapidly gaining traction as a widely accepted business model. Ecommerce growth makes a huge financial impact for business owners and makes the shopping experience more comfortable for clients.

### 2.1 Objective
The objective of this project is to develop a specialized e-commerce web store for the furniture market. The store aims to offer an easy shopping experience for customers to place their orders online, in addition to orders and products stock management system for the store owners.

### 2.2 Methodology
1. Select the project idea: Brainstorm phase where ended with the idea of an ecommerce website.
2. UI Design inspirations: Select the best fit UI design for the project in Dribble and Behance.
3. Study the workflow: Studies the user shopping flow, backend and database schema.
4. Development: Used React and Tailwinds to implement the UI, PHP and MySQL for backend.
5. Testing: After completing the project I tested all features and added some databases users, orders and other data for project testing and demo.

## 3. Run Instructions & Requirements
To run this project, you need to setup the following tools, frameworks into your environment:
- Install Node.js and add /bin folder to your environment variables following this guide.
- Git to clone the project in your local machine from my git repository: type in your terminal:

- The project consists of two parts, Backend and Front End.
- Move the clone folder to the `C:\xampp\htdocs` directory.
- Run the XAMPP Apache and MySQL (Port: 3306).
- Navigate to the frontend part and type `npm install` to install the node dependencies.
- If you encounter any issues run:

- To run the project type in terminal `npm start`.
- Open your browser and type: `http://localhost:3000`

## 4. Tools used in the Project
The following frameworks, libraries languages and tools with their versions I used in implementation of this project:

### Front End:
- React and React DOM versions 18.3.1
- Styling libraries: TailwindCSS 3.4.3
- Material UI: Icons and Colors 5.15.18
- Icons: react icons 5.2.1
- Routing: react router dom 6.23.1
- PostCSS 8.4.38 tool for transforming CSS with JavaScript
- Fetch function to fetch the API Json Responses.
- The front-end components written using JSX format.
- I used ECMAScript 6+ coding standard.

### Backend – Node.js:
- HTTP Requests: axios 1.7.2
- PHP for backend server scripting.
- XAMPP: Local Server tool with Apache and MySQL.
- SQL: Database Querying Language to deal with data, POST, GET, and Update.
- Implemented Local Storage and Session Storage.

## 5. Project database UML
The following figure shows the database UML from PhpMyAdmin, we have the following tables with their relations and brief description:

1. **Categories (categories table)**:
 - Columns: id, name
 - Description: Stores product categories for organizational purposes.
 
2. **Guests (guests table)**:
 - Columns: guest_id, first_name, last_name, street_address, city, phone_number, email_address 
 - Description: Records details of guest users who place orders without registering.

3. **Guest Orders (guest_orders table)**:
 - Columns: order_id, guest_id, first_name, last_name, street_address, city, phone_number, email_address, note, products, purchase_date
 - Description: Captures orders placed by guest users, linked to guests via guest_id.

4. **Items (items table)**:
 - Columns: itemID, title, price, description, mainImagePath, longDescription, category 
 - Description: Stores details of products available in the ecommerce store, categorized under categories.

5. **Orders (orders table)**:
 - Columns: id, user_id, first_name, last_name, street_address, city, phone_number, email_address, note, purchase_date 
 - Description: Records orders placed by registered users, linked to users via user_id.

6. **Order Items (order_items table)**:
 - Columns: id, order_id, product_id, title, price, quantity, image
 - Description: Contains details of products included in each order (orders), linked via order_id.

7. **Users (users table)**:
 - Columns: Id, userName, userEmail, userPassword, userLevel, firstName, lastName, email, gender, phoneNumber 
 - Description: Stores registered user information, associated with orders via user_id.

### Key Features:
- Maintained through foreign key constraints (user_id, guest_id) to ensure accurate data relationships.
- Utilizes appropriate data types (INT, VARCHAR, TEXT, DATETIME, DOUBLE, DECIMAL) for efficient data storage and retrieval.
- Ensures unique primary keys (id, guest_id, order_id, itemID, Id) are automatically generated.

**Figure 1: Database UML**

## 6. Discussion about User Interface
The following pages/features were implemented in the project:
- **Home Page**: A landing page consisting of header, footer and hero section with CALL TO ACTION button that scrolls the user to the shop section, that contains some items cards where customers can click on each card to be redirected to the product details in the product page feature.
- **Product page**: A page where item details like item title, category short and long description, high quality image and item price. In addition, it contains a call to action button "Add to Cart", this user can simply add the products to the cart after selecting the quantity needed for sure.
- **Shopping cart**: A page that contains the products added to client's cart, where the client may be a guest user or already registered user. A number of rows rendered with details of the cart items, options like delete, increase, decrease the quantity already provided to the client. A call to action "Proceed to Checkout" is added.
- **Checkout page**: A form page that collects from the customer the order details like delivery address, first name, last name and phone number. Moreover, the user can view the order summary before clicking the "Complete Order" Call to Action Button.
- **Categories page**: This page displays the products grid according to selected category tap name.
- **Sign in and Sign Up Pages**: Pages where the user/admin can sign up or login to their account with their login credentials.
- **Admin Panel**: Admin page where admin can manage users, customers' orders, add items, update items details, and remove users.
- **User account**: Dashboard where signed up users can view their orders, update their personal info, and logout.
- **Security and error handling**: Used SH1 hashing passwords and secure PHP functions like `prepare()`, to prevent SQL injection. In addition to error handling for sign up and other stuffs.

## 7. Conclusions
In summary, I have implemented successfully an ecommerce web store with basic functionalities to enable smoother and great user experience using different tools and technologies basically, React, TailwindCSS, PHP and MySQL for database. The project has different features through shopping flow from add to cart up to post and fetch data from and to the database. I developed the pagination to enable smooth interaction between pages and avoid rendering the same page different times which is time-consuming for the user. For security, I enabled the hashing password using SH1 algorithm and protected the store from SQL injection.

## 8. References
- W3Schools
- React and TailwindCSS online Documentation
- PHP Documentation.
- YouTube Tutorials.

## Contact
Feel free to reach out to me with questions, feedback, or collaboration requests:

Email: ali.abuhatab.dev@gmail.com
Linkedin: [https://www.linkedin.com/in/ali-abu-hatab/]
Facebook: [https://www.facebook.com/ali.abuhatab.7]
