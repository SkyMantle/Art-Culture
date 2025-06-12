interface UpdateUserProfileUseCaseInput {
  userId: number,
  title?: string,
  bio?: string,
  country?: string,
  city?: string,
  street?: string,
  house_number?: string,
  postcode?: string,
  lat?: number,
  lon?: number,
  profileImagePath?: string,
  museumLogoPath?: string,
}

export default UpdateUserProfileUseCaseInput
