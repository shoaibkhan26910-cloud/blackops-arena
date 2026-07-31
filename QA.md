# QA / test plan
## Automated
- TypeScript compile: `npm run build` in frontend and backend.
- API smoke tests: health, register, login, tournament list/detail, protected registration, admin authorization.
- Add integration tests with a disposable MongoDB database before production.
## Manual
- Keyboard-only navigation and visible focus.
- Mobile widths and touch targets.
- Invalid form input and API error states.
- Expired/invalid auth tokens.
- Duplicate registration and full/completed tournament.
- Admin-only routes.
## Security
- Helmet/CORS/rate limiting enabled.
- Passwords hashed with bcrypt.
- JWT secret supplied by environment.
- Zod request validation.
- No secrets in source.
