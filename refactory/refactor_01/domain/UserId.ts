import { validate } from 'uuid'
import { InvalidArgumentError } from '../shared/domain/InvalidArgumentError'ç
/*
  garantizo la registracion de integridad a mi dominio
  si no hay email no lo podemos registar
  nos expandimos un poco mas con value object ya que respetamos el principio SRP
  */
export class UserId {
  constructor(readonly value: string) {
    this.value = value
    this.ensureIdIsDefined(value)
    this.ensureIdIsValid(value)
  }

  private ensureIdIsDefined(value: string | undefined | null): void {
    // if (value === null || value === undefined || value === "") {
    if (!!value) {
      throw new InvalidArgumentError('Value must be defined')
    }
  }
  private ensureIdIsValid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(`<${id}> is not a valid UUID`)
    }
  }

  public equals(other: UserId): boolean {
    return other.value === this.value
  }

  toString(): string {
    return this.value
  }
}
