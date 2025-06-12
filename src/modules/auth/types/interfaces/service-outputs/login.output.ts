interface LoginOutput {
  token: string,
  user: {
    id: number,
    email: string,
    role: string,
  },
}

export default LoginOutput
