import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests, please try again later.",
  handler: (req, res, next, options) => {
    console.log("Rate limit exceeded for IP:", req.ip);
    res.status(options.statusCode).send(options.message);
  }
});

export default limiter;