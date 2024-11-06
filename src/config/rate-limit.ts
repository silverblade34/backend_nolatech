import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Demasiadas solicitudes, por favor intente más tarde.',
});

export default rateLimiter;
