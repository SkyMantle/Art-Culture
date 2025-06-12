interface UpdateUserProfileOutput {
  user: {
    id: number,
    email: string,
    role: string,
    title?: string,
    bio?: string,
    country?: string,
    city?: string,
    street?: string,
    house_number?: string,
    postcode?: string,
    lat?: number,
    lon?: number,
  },
}

export default UpdateUserProfileOutput
