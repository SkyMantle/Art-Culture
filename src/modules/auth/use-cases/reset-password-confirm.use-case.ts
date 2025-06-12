import ResetPasswordConfirmUseCaseInput from '../types/interfaces/use-case-inputs/reset-password-confirm.use-case-input'
import authService from '../services/auth.service'
import UseCaseOutput from '../../../shared/types/interfaces/use-case-output'

const resetPasswordConfirmUseCase = {
  async execute(input: ResetPasswordConfirmUseCaseInput)
  : Promise<UseCaseOutput<void>> {
    await authService.resetPasswordConfirm(input)

    return {
      data: undefined,
      metadata: {
        statusCode: 200,
      },
    }
  }
}

export default resetPasswordConfirmUseCase
