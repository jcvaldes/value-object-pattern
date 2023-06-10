import { InvalidArgumentError } from '../shared/domain/InvalidArgumentError'

/*
  garantizo la registracion de integridad a mi dominio
  si no hay email no lo podemos registar
  nos expandimos un poco mas con value object ya que respetamos el principio SRP
  */
export class UserBirthDate {
  constructor(readonly value: Date) {
    this.value = value
    this.ensureBirthDateIsDefined(value)
    this.ensureBirthDateIsValid(value)
  }

  private ensureBirthDateIsDefined(value: Date | undefined | null): void {
    // if (value === null || value === undefined || value === "") {
    if (!!value) {
      throw new InvalidArgumentError('Value must be defined')
    }
  }
  private ensureBirthDateIsValid(value: Date): void {
    const currentDate = new Date()
    let ageInYears = currentDate.getFullYear() - value.getFullYear()

    if (
      currentDate.getMonth() < value.getMonth() ||
      (currentDate.getMonth() == value.getMonth() &&
        currentDate.getDate() < value.getDate())
    ) {
      ageInYears--
    }
    if (ageInYears < 18 || ageInYears > 110) {
      throw new InvalidArgumentError(
        `<${value.toISOString()}> is not a valid birthdate`,
      )
    }
  }

  public equals(other: UserBirthDate): boolean {
    return other.value === this.value
  }

  toString(): string {
    return this.value.toDateString()
  }
}
