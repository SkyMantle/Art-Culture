interface RegisterUseCaseInput {
  email: string,
  password: string,
  role?: 'USER' | 'MUSEUM',
  title?: string,
  bio?: string,
  country?: string,
  city?: string,
  street?: string,
  house_number?: string,
  postcode?: string,
  lat?: string,
  lon?: string,
  images?: string[],
}

export default RegisterUseCaseInput
