## Setup Instructions

### Prerequisites
Node.js (version 14 or higher)
MySQL (version 5.7 or higher)
npm (Node Package Manager)


# 1. Clone the repository
git clone https://github.com/Radhika-varfa/Auth_task.git
cd Auth_task

# 2. Install Backend Dependencies
cd backend
npm install

# 3. Set up the MySQL Database
# - Create a new MySQL database.
# - Configure the credentials in the `.env` file inside the backend directory.

# Example SQL commands to create the necessary tables:
# CREATE DATABASE myapp;
# USE myapp;
# CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255), last_name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), role ENUM('customer', 'admin') DEFAULT 'customer', email_verified BOOLEAN DEFAULT FALSE);
# CREATE TABLE email_verifications (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, token VARCHAR(255), expiration TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id));

# 4. Set up Environment Variables
# - Create a `.env` file in the `backend` directory with the following variables:

echo "PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your-mysql-password
MYSQL_DATABASE=myapp
JWT_SECRET=your-jwt-secret
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
BASE_URL=http://localhost:5000" > .env

# 5. Run the Backend Server
npm start
# This will start the backend on http://localhost:5000


