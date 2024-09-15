import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodObject, ZodRawShape } from 'zod';

type ZodObjectSchema<T extends ZodRawShape> = ZodObject<T>;

export function validateData<T extends ZodRawShape>(schema: ZodObjectSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Incoming request body:", req.body);
    console.log("Validation schema:", schema.shape);

    try {
      schema.parse(req.body);
      console.log("Validation passed");
      next();
    } catch (error) {
      console.error("Validation error:", error);
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        console.error("Validation details:", errorMessages);  // Adiciona esta linha para detalhes do erro
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
      } else {
        console.error("Unexpected error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  };
}
