import UseCaseOutput from '../../../../../shared/types/interfaces/use-case-output'

interface UpdateUserProfileUseCaseOutputData {
  userId: number
  email: string
  firstName: string
  lastName: string
  role: string
  profileImagePath?: string
  museumLogoPath?: string
  museumName?: string
  museumDescription?: string
}

interface UpdateUserProfileUseCaseOutput extends UseCaseOutput<UpdateUserProfileUseCaseOutputData> {}

export default UpdateUserProfileUseCaseOutput
