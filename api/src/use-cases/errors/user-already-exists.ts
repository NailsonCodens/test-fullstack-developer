export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Este email já existe')
  }
}
