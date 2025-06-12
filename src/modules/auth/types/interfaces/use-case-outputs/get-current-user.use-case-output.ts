import UseCaseOutput from '../../../../../shared/types/interfaces/use-case-output'

interface GetCurrentUserUseCaseOutputData {
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

interface GetCurrentUserUseCaseOutput extends UseCaseOutput<GetCurrentUserUseCaseOutputData> {}

export default GetCurrentUserUseCaseOutput
