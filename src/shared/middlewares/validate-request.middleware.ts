import {
  NextFunction,
  Request,
  Response
} from 'express'
import ValidationsCollection from '../types/interfaces/validations-collection'
import validateRequestPart from './validate-request-part.middleware'

const validateRequest = (validationsCollection: ValidationsCollection) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    jsonSchema,
    headerSchema,
    querySchema,
    paramSchema,
  } = validationsCollection
    
  if (jsonSchema) {
    await validateRequestPart(
      {
        req,
        part: 'json',
        schema: jsonSchema,
      },
    )
  }

  // if (headerSchema) {
  //   await validateRequestPart(
  //     {
  //       c,
  //       part: 'header',
  //       schema: headerSchema,
  //     },
  //   )
  // }

  // if (querySchema) {
  //   await validateRequestPart(
  //     {
  //       c,
  //       part: 'query',
  //       schema: querySchema,
  //     },
  //   )
  // }

  // if (paramSchema) {
  //   await validateRequestPart(
  //     {
  //       c,
  //       part: 'param',
  //       schema: paramSchema,
  //     },
  //   )
  // }

  next()
}

export default validateRequest
