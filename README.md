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
  - API swagger: http://localhost:4000/api

#### Step 3: Stop Containers

```bash
docker-compose down
```
This command will cleanly stop and remove all the containers and associated resources.


## 📋 Usage

### 1. Start with main page
You can view all products listed on the main page.\
![main page](/assets/usage1.png)

### 2. Select the product
![alt text](/assets/usage2.png)

### 3. Click buy button
![alt text](/assets/usage3.png)

After clicking the buy button, the machine will wait for cash to be inserted.

To simulate cash insertion, follow these steps:

#### 3.1 Find the bill id
 Solution 1: Check the Network tab in the browser's Inspect mode. \
 ![alt text](/assets/usage3.1.1.png)

 Solution 2: Check the `bill` table in the database and look for bills with a status of `pending`. \
![alt text](/assets/usage3.1.2.png)

#### 3.2 Call the Pay Bill API.
[Swagger Pay Bill ](http://localhost:4000/api#/Payment/PaymentController_payBill)\
curl:
```bash
curl --location --request PATCH 'http://localhost:4000/api/v1/payment/pay/9d3aab61-8a28-48db-bdb3-c9fe35e218ae' \
--header 'User-Agent: Apidog/1.0.0 (https://apidog.com)' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: localhost:4000' \
--header 'Connection: keep-alive' \
--data-raw '{
  "cashId": "C0010"
}'
```

Include the bill ID as a path parameter.\
And include the cash ID for the coin or banknote you want to insert in the request body as a JSON object.

You can check the `cashId` from the `cash` table in the database\
![alt text](/assets/usage3.2.png)

#### 4. Check the cash insertion result at the vending client
The amount paid and remaining amount will be updated immediately.\
![alt text](/assets/usage4.png)

#### 5. Complete the payment
Then, I will try to insert a 50 THB banknote. The expected result is that the payment will succeed, and I will receive 25 THB in change.

Result:

![alt text](/assets/usage5.1.png)\
The vending client displays a payment success result.

![alt text](/assets/usage5.2.png)\
And if you check the vending service log, it will display information about the change given to the customer.


