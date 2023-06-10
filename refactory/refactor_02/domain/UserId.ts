import { ValueObject } from '../shared/domain/ValueObject'
import { validate as validateUUID } from 'uuid'
import { InvalidArgumentError } from '../shared/domain/InvalidArgumentError'

/*
  garantizo la registracion de integridad a mi dominio
  si no hay email no lo podemos registar
  nos expandimos un poco mas con value object ya que respetamos el principio SRP
  */
export class UserId extends ValueObject<string> {
  constructor(readonly value: string) {
    super(value, true)
    this.ensureIdIsDefined(value)
    this.ensureIdIsValid(value)
  }

  private ensureIdIsDefined(value: string | undefined | null): void {
    // if (value === null || value === undefined || value === "") {
    if (!value) {
      throw new InvalidArgumentError('Value must be defined')
    }
  }
  private ensureIdIsValid(id: string): void {
    this.validate(id)
  }

  protected validate(value: string): void {
    if (!validateUUID(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid UUID`)
    }
  }
  public equals(other: UserId): boolean {
    return super.equals(other)
  }

  toString(): string {
    return super.getValue()
  }
}
