import RegisterUserUseCaseInput from '../types/interfaces/use-case-inputs/register-user.use-case-input'
import RegisterOutput from '../types/interfaces/service-outputs/register.output'
import authService from '../services/auth.service'
import UseCaseOutput from '../../../shared/types/interfaces/use-case-output'

const registerUserUseCase = {
  async execute(input: RegisterUserUseCaseInput): Promise<UseCaseOutput<RegisterOutput>> {
    const result = await authService.registerUser(input)

    return {
      data: result,
      metadata: {
        statusCode: 201,
      },
    }
  }
}

export default registerUserUseCase
