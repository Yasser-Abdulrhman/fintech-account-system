# Fintech Account System

A simple, robust, and scalable system for managing financial accounts and transactions, built with NestJS, TypeORM, and MySQL.

## Features

*   **Open an Account**: Create a new account with an optional initial deposit.
*   **Deposit Funds**: Add funds to an existing account.
*   **Withdraw Funds**: Remove funds from an existing account, with checks for sufficient balance.
*   **Check Balance**: Retrieve the current balance of an account.

## Tech Stack

*   **Framework**: [NestJS](https://nestjs.com/)
*   **ORM**: [TypeORM](https://typeorm.io/)
*   **Database**: [MySQL](https://www.mysql.com/)
*   **Containerization**: [Docker](https://www.docker.com/)
*   **API Documentation**: [Swagger (OpenAPI)](https://swagger.io/)

---

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v18 or later)
*   [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

### Running the Application with Docker (Recommended)

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-link>
    cd fintech-account-system
    ```

2.  **Create a `.env` file** in the root directory by copying the `.env.example` (if provided) or creating it from scratch with the following content:
    ```env
    DB_HOST=db
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=password
    DB_DATABASE=fintech
    ```

3.  **Build and run the services:**
    ```bash
    docker-compose up --build
    ```
    The API will be available at `http://localhost:3000`.

### Running the Application Locally

1.  Ensure you have a local MySQL instance running.
2.  Update the `.env` file with your local database credentials (e.g., `DB_HOST=localhost`).
3.  Install dependencies: `npm install`
4.  Run database migrations: `npm run migration:run`
5.  Start the application: `npm run start:dev`

---

## Running Tests

To run the unit tests, use the following command:

```bash
npm test
```

---

## API Documentation

Once the application is running, you can access the interactive Swagger API documentation at:

**http://localhost:3000/api**

---

## Design Decisions & Challenges

### Design Decisions

1.  **NestJS & Modular Architecture**: The application is structured into `AccountsModule` and `TransactionsModule`. This separation of concerns makes the codebase clean, scalable, and easy to test.
2.  **TypeORM and Migrations**: TypeORM provides a strong bridge to the database. Using migrations (`npm run migration:run`) ensures that database schema changes are version-controlled and reproducible, which is critical for team collaboration and deployment.
3.  **Decimal for Financial Data**: The `balance` and `amount` fields use the `decimal` type in the database. This is a crucial decision to avoid floating-point precision errors that can occur with standard `float` or `double` types when handling money.
4.  **Concurrency Management**: Financial transactions must be atomic and handle concurrent requests correctly. The `TransactionsService` uses database transactions (`dataSource.transaction`) and pessimistic row-level locking (`setLock('pessimistic_write')`). This ensures that when two requests try to modify the same account balance simultaneously, one will wait for the other to complete, preventing race conditions and data corruption.
5.  **Secure Public IDs**: Instead of exposing sequential primary keys (e.g., `1, 2, 3`), the application generates unique, non-sequential IDs (`accountId`, `transactionId`) using `cuid2`. This is a security best practice that prevents attackers from guessing IDs and enumerating data.

### Challenges Encountered

*   **Concurrency**: The primary challenge was ensuring the atomicity of deposit and withdrawal operations. A simple "read-then-write" approach is vulnerable to race conditions. Implementing pessimistic locking within a database transaction was the solution to guarantee data integrity.
*   **Configuration Management**: Setting up TypeORM to work seamlessly with both the NestJS application (for runtime) and the TypeORM CLI (for migrations) required careful configuration. The `typeorm.config.ts` file is designed to be a single source of truth for both.

---

This setup provides a solid foundation for a real-world fintech application, emphasizing best practices in code quality, testing, and security.