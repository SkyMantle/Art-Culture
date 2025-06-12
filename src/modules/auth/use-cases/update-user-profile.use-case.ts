import UpdateUserProfileUseCaseInput from '../types/interfaces/use-case-inputs/update-user-profile.use-case.input'
import { UpdateUserProfileOutput } from '../types/interfaces/service-outputs/update-user-profile.output'
import { authService } from '../services/auth.service'
import UseCaseOutput from '../../../../shared/types/interfaces/use-case-output'

const updateUserProfileUseCase = {
  async execute(input: UpdateUserProfileUseCaseInput): Promise<UseCaseOutput<UpdateUserProfileOutput>> {
    try {
      const result = await authService.updateUserProfile(input)
      return { data: result, metadata: { statusCode: 200 } }
    } catch (error) {
      throw error
    }
  }
}

export default updateUserProfileUseCase
