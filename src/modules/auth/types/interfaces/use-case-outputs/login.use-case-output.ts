import UseCaseOutput from '../../../../../shared/types/interfaces/use-case-output'

interface LoginUseCaseOutputData {
  token: string
  user: {
    id: number
    email: string
    role: string
  }
}

interface LoginUseCaseOutput extends UseCaseOutput<LoginUseCaseOutputData> {}

export default LoginUseCaseOutput
