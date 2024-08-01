# Jokes Frontend

The Jokes Frontend is a Next.js application designed to interact with the Jokes Service architecture. It provides a user-friendly interface for fetching random jokes, submitting new jokes, and moderating jokes. This application uses access tokens with interceptors to securely communicate with the backend services.

## Features

- **Fetch Random Joke**: Retrieve random jokes from the backend.
- **Submit Joke**: Allow users to submit new jokes.
- **Moderate Jokes**: Enable moderators to manage jokes including approving, rejecting, editing, deleting, and changing categories.
- **Secure Communication**: Utilizes access tokens with interceptors to set headers for secure communication with backend services.
- **Responsive Design**: Ensures a seamless user experience across different devices.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Pages](#pages)
4. [API Integration](#api-integration)
5. [Access Tokens](#access-tokens)
6. [Contributing](#contributing)
7. [License](#license)

## Installation

To get started with the Jokes Frontend, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/say1bt/jokes-frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd jokes-frontend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the Jokes Frontend locally, run:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Pages

### Home

- `GET /`: Displays a random joke fetched from the backend.

### Submit Joke

- `GET /submit`: Form for users to submit new jokes.

### Moderate Jokes

- `GET /moderate`: List of jokes for moderators to manage.
- `GET /moderate/:id/edit`: Form for moderators to edit an existing joke.
- `GET /moderate/:id`: Detail view of a joke for moderation.

## API Integration

The frontend interacts with the backend services through various API endpoints:

- `GET /api/jokes/random`: Fetch a random joke.
- `POST /api/jokes`: Submit a new joke.
- `GET /api/jokes/moderate`: Retrieve jokes for moderation.
- `PUT /api/jokes/:id`: Edit an existing joke.
- `DELETE /api/jokes/:id`: Delete a joke.
- `POST /api/jokes/:id/approve`: Approve a joke.
- `POST /api/jokes/:id/reject`: Reject a joke.
- `PATCH /api/jokes/:id/category`: Change the category of a joke.

## Access Tokens

To securely communicate with the backend services, the application uses access tokens. Interceptors are set up to attach the access tokens to the headers of each request.


## Acknowledgments
This project was developed with the assistance of AI tools like ChatGPT, which helped in generating documentation and providing coding suggestions.

```

## Contributing

We welcome contributions to improve the Jokes Frontend. Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to modify this README file as needed to fit your specific project requirements.
