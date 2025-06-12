interface RegisterInput {
  email: string,
  password: string,
  role?: string,
  title?: string,
  bio?: string,
  country?: string,
  city?: string,
  street?: string,
  house_number?: string,
  postcode?: string,
  lat?: string,
  lon?: string,
  profileImagePath?: string,
  museumLogoPath?: string,
}

export default RegisterInput


