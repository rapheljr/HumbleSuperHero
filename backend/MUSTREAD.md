# Humble Superhero API

## Overview

The Humble Superhero API is a simple Node.js-based API built using NestJS. It allows users to:

- Add a new superhero with a name, superpower, and humility score.
- Retrieve the list of superheroes sorted by humility score in descending order.

## Endpoints

### 1. Add a Superhero

**POST** `/superheroes`

#### Request Body:

```json
{
  "name": "Spider-Man",
  "superpower": "Web-Slinging",
  "humilityScore": 9
}
```

#### Response:

```json
{
  "message": "Superhero added successfully"
}
```

### 2. Get Superheroes List

**GET** `/superheroes`

#### Response:

```json
[
  {
    "name": "Spider-Man",
    "superpower": "Web-Slinging",
    "humilityScore": 9
  },
  {
    "name": "Iron Man",
    "superpower": "Genius Inventor",
    "humilityScore": 6
  }
]
```

## Installation and Running

1. Clone the repository:
   ```sh
   git clone <repo_url>
   cd humble-superhero-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the server:
   ```sh
   npm run start
   ```
4. For development with live reload:
   ```sh
   npm run start:dev
   ```

## Testing

To run tests using Jest:

```sh
npm run test
```

## Collaboration Notes

- Use meaningful commit messages and follow conventional commit standards.
- If expanding the API, consider adding a real database like MongoDB or PostgreSQL.
- Code reviews should be conducted via pull requests before merging to `main`.

## If I Had More Time

- Implement authentication to protect API endpoints.
- Add a React frontend to allow users to interact with the API visually.
- Deploy the API using Docker and Kubernetes for scalability.
- Enhance testing coverage with integration tests.

---

Built with ❤️ and humility! 🚀
