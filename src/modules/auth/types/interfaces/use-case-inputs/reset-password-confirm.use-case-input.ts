interface ResetPasswordConfirmUseCaseInput {
  userId: number,
  token: string,
  newPassword: string,
}

export default ResetPasswordConfirmUseCaseInput
