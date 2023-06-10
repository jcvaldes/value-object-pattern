import { InvalidArgumentError } from '../shared/domain/InvalidArgumentError'
/*
  garantizo la registracion de integridad a mi dominio
  si no hay email no lo podemos registar
  nos expandimos un poco mas con value object ya que respetamos el principio SRP
  */
export class UserEmail {
  private readonly validEmailRegExp =
    /^(?=.*@(?:hotmail\.com|gmail\.com|yahoo\.com)$)[a-zA-Z0-9!#$%&_+[a-zA-Z0-9_-]*$/

  constructor(readonly value: string) {
    this.value = value
    this.ensureEmailIsDefined(value)
    this.ensureValidEmail(value)
  }

  private ensureEmailIsDefined(value: string | undefined | null): void {
    // if (value === null || value === undefined || value === "") {
    if (!!value) {
      throw new InvalidArgumentError('Value must be defined')
    }
  }

  private ensureValidEmail(value: string): void {
    if (!this.validEmailRegExp.test(value)) {
      throw new InvalidArgumentError(`<${value} is not a valid email`)
    }
  }

  public equals(other: UserEmail): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    )
  }

  toString(): string {
    return this.value
  }
}
