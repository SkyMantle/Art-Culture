interface RegisterOutput {
  token: string,
  user: {
    id: number,
    email: string,
    role: string,
    title?: string,
    bio?: string,
    images?: string,
    country?: string,
    city?: string,
    street?: string,
    house_number?: string,
    postcode?: string,
    lat?: number,
    lon?: number,
  },
  message: string,
}

export default RegisterOutput
