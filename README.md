# My Journal

A full-stack journaling app for writing, browsing, editing, and deleting daily entries with a title, mood, and body. Built to practice the full request cycle: React UI → Express REST API → MongoDB.

**Live demo:** [link coming soon...]

![Screenshot of the app](coming soon...)

## Features

- Create, read, update, and delete journal entries (full CRUD)
- Tag each entry with a mood
- Sidebar of past entries, newest first
- Client- and server-side validation (empty entries are rejected, blank titles default to "Untitled")

## Tech Stack

| Layer | Tools |
|-------|-------|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Database | MongoDB (official Node driver) |
| Other | dotenv, CORS |

## API

Base URL: `http://localhost:5000/entries`

| Method | Endpoint | Description | Success |
|--------|----------|-------------|---------|
| GET | `/` | List all entries | 200 |
| POST | `/` | Create an entry | 201 |
| PUT | `/:id` | Update an entry | 200 |
| DELETE | `/:id` | Delete an entry | 204 |

Error responses: `400` for invalid input or ids, `404` when an entry doesn't exist, `500` for unexpected server errors.

Example request body for `POST /entries`:

```json
{
  "title": "A good day",
  "mood": "Happy",
  "body": "Went for a walk...",
  "date": "Mon Nov 16 2026"
}
```

## Getting Started

**Prerequisites:** Node.js 20.19+ (or 22.12+) and a MongoDB database (a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works).

1. Clone the repository and enter its directory:
   ```bash
   git clone https://github.com/nicshrly/JournalApp.git
   cd <repository-directory>
   ```

2. Configure and start the backend. Create `server/.env` and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>
   ```

   Then install the backend dependencies and start the API:
   ```bash
   cd server
   npm install
   npm run dev
   ```

   Keep this terminal running. The API listens on `http://localhost:5000`.

3. In a second terminal, from the repository root, install and start the frontend:
   ```bash
   npm install
   npm run dev
   ```

4. Open the URL Vite prints (usually http://localhost:5173).
## Project Structure

```
public/                  # Static public assets
|-- favicon.svg
|-- icons.svg
src/                     # React frontend
|-- assets/              # App images and starter assets
|-- components/
|   |-- DeleteModal.jsx  # Delete confirmation dialog
|   |-- Entry.jsx        # Journal entry display and actions
|   |-- NewEntry.jsx     # Create/edit entry form
|   |-- moods.js         # Available mood options
|-- App.jsx              # Main app and entry state
|-- App.css              # App layout styles
|-- index.css            # Global styles
|-- main.jsx             # React app entry point
server/                  # Express and MongoDB backend
|-- db.js                # MongoDB connection
|-- routes.js            # /entries API routes
|-- server.js            # Express app and server startup
index.html               # Vite HTML entry point
package.json             # Frontend scripts and dependencies
vite.config.js           # Vite configuration
```

## What I Learned

- Building a REST API and connecting it to a React client
- Controlled forms and lifting state up so components stay in sync
- Validating on both client and server, since the client can't be trusted
- Working with MongoDB `ObjectId`s, status codes, and error handling in Express

## Future Improvements

- UI styling
- Entry archive
- Search and filter by title, mood, or date
- Pagination for large entries and entry lists
- Sticker and image importing
- Download entries
- Automated tests for the API routes