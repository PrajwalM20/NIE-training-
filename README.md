# Trainers Search App

A full-stack web application built with *Django REST Framework* (backend) and *React* (frontend).  
It enables users to securely log in, and then search for, add, update, and delete trainer profiles.

---

## Tech Stack

- Backend: Django + Django REST Framework  
  - JWT authentication using SimpleJWT  
  - CRUD APIs for trainer resources (Create, Read/Search, Update, Delete)  
  - Pagination & filtering support for listing trainers  
  - CORS configured for client consumption  
  - Database support for SQLite (default) and MySQL (optional)  
- Frontend: React  
  - Login/authentication flow  
  - Search trainers  
  - Add new trainer form  
  - Trainer list with update/delete capability  
  - React Router for navigation  
  - Axios for API requests  
  - Responsive UI design  

---

## Features

*Backend*
- JWT Authentication (login → obtain token → protected endpoints)  
- Trainer CRUD endpoints:  
  - Add a new trainer  
  - List/search trainers (with pagination & filters)  
  - Update an existing trainer  
  - Delete a trainer  
- CORS handling so the React frontend can call the API  
- Support for SQLite (default) and easily switchable to MySQL  



*Frontend*
- User login / token storage  
- Search interface: find trainers by name / criteria  
- Trainer list view: display existing trainers, with update/delete actions  
- Add Trainer form: input trainer details and submit to API  
- Update Trainer: edit existing trainer details  
- Delete Trainer: remove trainer entry  
- Responsive layout: works well on desktop and mobile