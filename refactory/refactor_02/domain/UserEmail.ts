import { InvalidArgumentError } from '../shared/domain/InvalidArgumentError'
import { ValueObject } from '../shared/domain/ValueObject'
/*
  garantizo la registracion de integridad a mi dominio
  si no hay email no lo podemos registar
  nos expandimos un poco mas con value object ya que respetamos el principio SRP
  */

interface UserEmailProps {
  value: string
}
export class UserEmail extends ValueObject<string> {
  private readonly validEmailRegExp =
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/

  constructor(readonly value: string) {
    super(value)
    // this.value = value
    this.ensureEmailIsDefined(value)
    this.ensureEmailIsValid(value)
  }

  private ensureEmailIsDefined(value: string | undefined | null): void {
    // if (value === null || value === undefined || value === "") {
    if (!value) {
      throw new InvalidArgumentError('Value must be defined')
    }
  }

  private ensureEmailIsValid(value: string): void {
    this.validate(value)
  }

  protected validate(value: string): void {
    try {
      if (!this.validEmailRegExp.test(value)) {
        throw new InvalidArgumentError(`<${value} is not a valid email`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  public equals(other: UserEmail): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    )
  }

  toString(): string {
    return this.getValue()
  }
}
