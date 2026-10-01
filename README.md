# Products API

Express application with in-memory caching for product data.

## Setup

```
npm install
node index.js
```

Server runs on `http://localhost:3000`.

## Endpoints

| Method | Endpoint        | Description           |
|--------|-----------------|-----------------------|
| GET    | /products       | Get all products      |
| GET    | /products/:id   | Get product by id     |
| POST   | /products       | Create a product      |
| PUT    | /products/:id   | Update a product      |
| PATCH  | /products/:id   | Partially update      |
| DELETE | /products/:id   | Delete a product      |

## Caching

- GET responses are cached with a 1-minute TTL.
- `X-Cache: HIT` or `X-Cache: MISS` header indicates cache status.
- POST, PUT, PATCH, DELETE invalidate the entire cache.

## Project Structure

```
├── index.js              # Entry point
├── routes/               # Route definitions
├── middleware/            # Cache middleware
├── controllers/          # Request handlers
├── services/             # Business logic
└── database/             # Data access layer
```
