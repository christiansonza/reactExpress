import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,              

  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    const retryAfterMs = req.rateLimit.resetTime - Date.now();
    const retryAfterSec = Math.ceil(retryAfterMs / 1000);

    res.status(429).json({
      message: "Too many login attempts",
      retryAfter: retryAfterSec,
    });
  },
});
