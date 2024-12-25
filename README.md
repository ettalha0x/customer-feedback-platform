# Customer Feedback Platform

This project is a customer feedback platform built with a Django backend and a Next.js frontend. It allows users to submit feedback and view insights.
[Demo video](https://drive.google.com/file/d/1MInHR9YVEA2BQRxthHxzYwg2yA_DiHWC/view?usp=sharing)

## Getting Started

Follow these instructions to set up and run the project locally using Docker.

### Prerequisites

- Docker
- Docker Compose
- GitHub account
- Visual Studio Code with the Codespaces extension

### Setup Instructions

1. **Fork the Repository**

   - Go to the [GitHub repository](https://github.com/ettalha0x/customer-feedback-platform) and fork it to your GitHub account.

2. **Create a New Codespace Instance**

   - Navigate to your forked repository on GitHub.
   - Click on the "Code" button and select "Open with Codespaces."
   - Create a new Codespace instance.

3. **Open Codespace in VS Code Desktop**

   - Once the Codespace is created, click on the "Open in VS Code" button to open the instance in your local VS Code Desktop application.

4. **Configure the Backend**

   - Open a terminal in your Codespace.
   - Navigate to the backend directory:

     ```bash
     cd backend
     ```

   - Create a `.env` file and add the database URL you received by email:

     ```bash
     echo "DATABASE_URL=your_database_url" > .env
     ```

5. **Run the Project**

   - Navigate to the root directory:

     ```bash
     cd ..
     ```

   - Start the services using Docker Compose:

     ```bash
     docker-compose up
     ```

6. **Access the Application**

   - Once the services are running, you can access the frontend at `http://localhost:3000` and the backend at `http://localhost:8000`.

### Project Structure

- **backend/**: Contains the Django backend code.
- **frontend/**: Contains the Next.js frontend code.

### Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

### License

This project is licensed under the MIT License.
