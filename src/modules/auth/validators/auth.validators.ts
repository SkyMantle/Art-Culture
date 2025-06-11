import registerJsonValidationSchema from '../validation-schemas/register/register.json-validation-schema'

const authValidators = {
  register: {
    jsonSchema: registerJsonValidationSchema,
  },
  // login: {
  //   jsonSchema: loginJsonSchema,
  // },
  // getCurrentUser: {
  //   headerSchema: loadUserHeaderSchema,
  // },
  // sendRecoveryCode: {
  //   headerSchema: sendRecoveryCodeHeaderSchema,
  //   jsonSchema: sendRecoveryCodeJsonSchema,
  // },
  // verifyRecoveryCode: {
  //   jsonSchema: verifyRecoveryCodeJsonSchema,
  // },
  // resetPassword: {
  //   jsonSchema: resetPasswordJsonSchema,
  // },
}

export default authValidators
