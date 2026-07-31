# BlackOps Arena — Production Starter

Production-oriented starter for a BGMI + Free Fire tournament platform.

## Stack
- Frontend: Next.js + React + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: MongoDB + Mongoose
- Auth: JWT access token + bcrypt password hashing
- Validation: Zod
- Security: Helmet, CORS allowlist, rate limiting, safe error responses

## Run
1. `cd backend && npm install && cp .env.example .env && npm run dev`
2. `cd frontend && npm install && npm run dev`

Set `NEXT_PUBLIC_API_URL` to the backend URL.

This starter intentionally keeps payments, real-time match sockets, KYC, and external game APIs out of the first production slice; those should be added with their own security/compliance review.
