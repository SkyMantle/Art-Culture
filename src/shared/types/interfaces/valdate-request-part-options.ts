import { Request } from 'express'
import z from 'zod'

import RequestPart from '../types/request-part'

interface ValidateRequestPartOptions {
  req: Request,
  part: RequestPart,
  schema: z.Schema,
}

export default ValidateRequestPartOptions
