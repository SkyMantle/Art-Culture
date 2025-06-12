import LoginUseCaseInput from '../types/interfaces/use-case-inputs/login.use-case-input'
import LoginOutput from '../types/interfaces/service-outputs/login.output'
import authService from '../services/auth.service'
import UseCaseOutput from '../../../shared/types/interfaces/use-case-output'

const loginUseCase = {
  async execute(input: LoginUseCaseInput)
  : Promise<UseCaseOutput<LoginOutput>> {
    const result = await authService.login(input)

    return {
      data: result,
      metadata: {
        statusCode: 200,
      },
    }
  }
}

export default loginUseCase
