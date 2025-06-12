import { Request, Response, NextFunction } from 'express'

export const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error: any) {
      res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      })
    }
  }
}
