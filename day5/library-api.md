# Library API Design

A REST API for a library's **books** resource. Every response uses JSON.

## Book object

- `id` - number, assigned by the server
- `title` - string
- `author` - string
- `year` - number
- `isbn` - string

## Endpoints

### 1. List all books

- **Method:** GET
- **Path:** `/books`
- **Description:** Returns an array of all books.
- **Request body:** none
- **Success status:** 200 OK

### 2. Get one book

- **Method:** GET
- **Path:** `/books/{id}`
- **Description:** Returns the book with the given id.
- **Request body:** none
- **Success status:** 200 OK

### 3. Create a book

- **Method:** POST
- **Path:** `/books`
- **Description:** Adds a new book to the library.
- **Example request body:**
```json
  {
    "title": "Things Fall Apart",
    "author": "Chinua Achebe",
    "year": 1958,
    "isbn": "9780385474542"
  }
```
- **Success status:** 201 Created

### 4. Update a book

- **Method:** PUT
- **Path:** `/books/{id}`
- **Description:** Replaces all the details of an existing book.
- **Example request body:**
```json
  {
    "title": "Things Fall Apart",
    "author": "Chinua Achebe",
    "year": 1959,
    "isbn": "9780385474542"
  }
```
- **Success status:** 200 OK

### 5. Delete a book

- **Method:** DELETE
- **Path:** `/books/{id}`
- **Description:** Removes the book with the given id.
- **Request body:** none
- **Success status:** 204 No Content

### 6. List books by an author

- **Method:** GET
- **Path:** `/books?author=Chinua%20Achebe`
- **Description:** Returns only the books written by the given author, using a query parameter.
- **Request body:** none
- **Success status:** 200 OK

### 7. Partially update a book (optional)

- **Method:** PATCH
- **Path:** `/books/{id}`
- **Description:** Changes only the fields that are sent.
- **Example request body:**
```json
  {
    "year": 1959
  }
```
- **Success status:** 200 OK

## Error codes

### 400 Bad Request

The request is invalid or missing required data.

- **Example:** `POST /books` with a body that has no `title`, or `year` sent as the text "abc".
- **Example response:**
```json
  { "error": "title is required" }
```

### 404 Not Found

The requested resource does not exist.

- **Example:** `GET /books/9999` when there is no book with id 9999.
- **Example response:**
```json
  { "error": "Book not found" }
```