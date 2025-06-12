import ResetPasswordUseCaseInput from '../types/interfaces/use-case-inputs/reset-password.use-case-input'
import authService from '../services/auth.service'
import UseCaseOutput from '../../../shared/types/interfaces/use-case-output'

const resetPasswordUseCase = {
  async execute(input: ResetPasswordUseCaseInput)
  : Promise<UseCaseOutput<void>> {
    await authService.resetPassword(input)

    return {
      data: undefined,
      metadata: {
        statusCode: 200,
      },
    }
  }
}

export default resetPasswordUseCase
