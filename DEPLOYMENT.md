# Production deployment checklist
- Set strong JWT_SECRET and MongoDB production URI.
- Restrict CORS to the deployed frontend origin.
- Put the API behind HTTPS/TLS and a reverse proxy or managed platform.
- Use MongoDB backups and monitoring.
- Store secrets only in platform secret managers.
- Add a real email/notification provider before enabling account recovery.
- Add payment-provider webhooks with signature verification before handling money.
- Add observability (structured logs, error tracking, uptime checks).
- Run `npm run build` in both apps before release.
