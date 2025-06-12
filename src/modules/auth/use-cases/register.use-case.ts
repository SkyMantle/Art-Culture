import RegisterUseCaseInput from '../types/interfaces/use-case-inputs/register.use-case-input'
import RegisterOutput from '../types/interfaces/service-outputs/register.output'
import authService from '../services/auth.service'
import UseCaseOutput from '../../../shared/types/interfaces/use-case-output'

const registerUseCase = {
  async execute(input: RegisterUseCaseInput)
  : Promise<UseCaseOutput<RegisterOutput>> {
    const result = await authService.register(input)

    return {
      data: result,
      metadata: {
        statusCode: 201,
      },
    }
  }
}

export default registerUseCase
