# geography-application
React.js + Node.js + MongoDB application for geography quiz.

## Development workflow

```bash
# Install dependencies
cd 02_Server && npm install
cd ../03_Client && npm install
```

### Formatting (Prettier)

Run Prettier in **write** mode to auto-fix code:

```bash
npm run format       # inside 02_Server or 03_Client
```

Check formatting in CI mode (no changes written):

```bash
npm run format:check
```

### Running tests

```bash
# Server (Jasmine)
cd 02_Server && npm test

# Client (React Testing Library)
cd ../03_Client && npm test -- --watchAll=false
```

### Local containers

Build and start the whole stack (MongoDB, API, React UI):

```bash
docker compose -f docker-compose-local-build.yaml up --build -d
```

Then access the UI at http://localhost:3000 and API at http://localhost:4000.

### Continuous Integration

The project ships with a GitHub Actions workflow (`.github/workflows/ci.yml`) that automatically:

1. Checks out the code
2. Installs Node 20
3. Runs Prettier in **check** mode
4. Executes the full test suites for server and client

Push or open a pull request to `master` and you’ll see the job on GitHub.

✅ Entire stack starts in the correct order and works end-to-end:

1. `geography-db` comes up, passes its MongoDB health-check, and seeds all 15 quiz questions (CRLF and auth issues fixed).
2. `geography-server` waits until the DB is healthy, then starts. Health probe `/api/health` returns `{"status":"ok"}`.
3. The API endpoint `GET /questions` now returns the seeded documents (confirmed via curl).
4. Compose files (`docker-compose-backend.yaml`, `docker-compose-local-build.yaml`, root `docker-compose.yaml`) all use `condition: service_healthy` to enforce sequential startup, with health-checks on every service.

You can run the whole stack with:

```bash
# using locally-built images
docker compose -f docker-compose-local-build.yaml up --build

# or using the published-image variant
docker compose up
```

The client will auto-start only after the server is healthy.

## Architecture overview

- Client: React 18 + MUI (sx), Axios; env var `REACT_APP_GEO_SRV` for API host
- API: Express 5, Mongoose 8, Helmet, Compression; validation via Joi
- DB: MongoDB (seeded), with `mongosh` healthcheck in Compose
- Containers: non-root users, healthcheck-ordered startup

### Server endpoints
- `GET /api/health` → `{ status: 'ok' }`
- `GET /questions?number=N` → returns all or first N
- `GET /questions/:id` → single question
- `POST /questions` → create (validated)
- `PUT /questions/:id` → update (validated)
- `DELETE /questions/:id` → remove

### Testing and coverage
- Client: Jest + RTL. 100% coverage.
- Server: Jasmine + Supertest + nyc. High coverage; validation and happy-paths covered. Startup/shutdown and error plumbing intentionally deprioritized.