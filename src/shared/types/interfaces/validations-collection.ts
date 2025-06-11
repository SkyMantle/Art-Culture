import { z } from 'zod'

interface ValidationsCollection {
  jsonSchema?: z.Schema,
  headerSchema?: z.Schema,
  querySchema?: z.Schema,
  paramSchema?: z.Schema,
}

export default ValidationsCollection
