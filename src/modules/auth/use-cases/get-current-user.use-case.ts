import GetCurrentUserUseCaseInput from '../types/interfaces/use-case-inputs/get-current-user.use-case.input'
import GetCurrentUserOutput from '../types/interfaces/service-outputs/get-current-user.output'
import authService from '../services/auth.service'
import UseCaseOutput from '../../../shared/types/interfaces/use-case-output'

const getCurrentUserUseCase = {
  async execute(input: GetCurrentUserUseCaseInput)
  : Promise<UseCaseOutput<GetCurrentUserOutput>> {
    const result = await authService.getCurrentUser(input)

    return {
      data: result,
      metadata: {
        statusCode: 200,
      },
    }
  }
}

export default getCurrentUserUseCase
