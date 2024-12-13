# Blue Vending

## 🚀 About the Project

Blue Vending is a modern vending machine management system designed to streamline operations, improve efficiency, and enhance customer experience. The project leverages cutting-edge technologies to provide real-time inventory tracking, remote management, and data analytics.

## 🛠️ Getting Started
### Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed the [Node.js](https://nodejs.org/).
- Docker and Docker-Compose installed. You can download them from [Docker's official website](https://www.docker.com/).

### 🐳 Run with Docker-Compose

To run the project using Docker-Compose, follow these steps:

#### Step 1: Build and Start Containers

```bash
docker-compose up -d
```

This command will:

  1. Build the Docker images defined in your docker-compose.yml file.
  2. Start all services defined in the file.

  #### Step 1.1: Configure Environment Variables

  Before building and starting the containers, you need to configure the environment variables. Create a `.env` file in the directory of `vending-client` and `vending-services` and add the necessary variables. 
  
  Here is an configable variables for `vending-client`:

  ```env
  VITE_VENDING_SERVICE_URL           // The url of vending-services default is http://localhost:4000
  VITE_VENDING_MACHINE_NAME          // Name to display at header
  VITE_VENDING_MACHINE_DESCRIPTION   // The discription below machine name 
  ```
\
  And this is an configable variables for `vending-services`:
  ```env
  PORT                        // The server port
  DATABASE_ENDPOINT
  DATABASE_PORT
  DATABASE_NAME
  DATABASE_USERNAME
  DATABASE_PASSWORD
  DB_LOG                      // Log the SQL command when querying the database.
  INIT_MOCK_DATA              // Set to "true" if you want to seed the database with mock data.
                              // It's contain a data from table 'category', 'inventory', 'product' and 'media'
  ```

  Make sure to update the values according to your setup. The `docker-compose.yml` file will automatically load these variables when you run the `docker-compose up -d` command.


#### Step 2: Access the Application
  - Web application: http://localhost:3000
  - [WIP] API swagger: http://localhost:4000/api

#### Step 3: Stop Containers

```bash
docker-compose down
```
This command will cleanly stop and remove all the containers and associated resources.


