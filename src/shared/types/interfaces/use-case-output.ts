export interface UseCaseOutput<T> {
  data: T,
  metadata: {
    statusCode: number,
  },
}

export default UseCaseOutput
