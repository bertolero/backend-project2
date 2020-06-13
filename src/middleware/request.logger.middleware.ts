import * as express from "express";

const requestLoggerMiddleware = (
  req: express.Request,
  rep: express.Response,
  next: express.NextFunction
) => {
  console.log(`${req.method} ${req.originalUrl}`);
  const start = new Date().getTime();
  rep.on("finish", () => {
    const elapsed = new Date().getTime() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${rep.statusCode} ${elapsed}ms`
    );
  });
  next();
};

export { requestLoggerMiddleware };
