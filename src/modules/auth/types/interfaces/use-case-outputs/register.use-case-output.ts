import UseCaseOutput from '../../../../../shared/types/interfaces/use-case-output'

interface RegisterUseCaseOutputData {
  token: string
  user: {
    id: number
    email: string
    role: string
    title?: string
    bio?: string
    images?: string
    country?: string
    city?: string
    street?: string
    house_number?: string
    postcode?: string
    lat?: number
    lon?: number
  }
  message: string
}

interface RegisterUseCaseOutput extends UseCaseOutput<RegisterUseCaseOutputData> {}

export default RegisterUseCaseOutput
