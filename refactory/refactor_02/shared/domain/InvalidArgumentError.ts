export class InvalidArgumentError extends Error {
  constructor(argumentName: string, message?: string) {
    const errorMessage = message
      ? `${argumentName}: ${message}`
      : `Invalid argument: ${argumentName}`
    super(errorMessage)
    this.name = 'InvalidArgumentError'
  }
}
