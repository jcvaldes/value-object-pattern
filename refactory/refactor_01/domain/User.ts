import { validate } from 'uuid'
import { InvalidArgumentError } from '../shared/domain/InvalidArgumentError'
import { ValueObject } from '../shared/domain/ValueObject'
import { UserEmail } from './UserEmail'
import { UserId } from './UserId'
/* ventajas
- dejamos mas legible la clase
- encapsulamos validaciones
- prevenimos el seteo de propiedades propiedades desde fuera manteniendo la encapsulacion
*/
export class User {
  private readonly id: UserId
  private email: UserEmail
  private birthDate: UserBirthDate

  constructor(id: string, email: string, birthdate: Date) {
    this.id = new UserId(id)
    this.email = new UserEmail(email)
    // this.birthDate = new UserBirthDate(birthDate)
    // this.ensureIdIsValid(id)
    // this.ensureEmailIsValid(email)
    // this.ensureBirthdateIsValid(birthdate)
  }
  get idValue(): string {
    return this.id.value
  }
  get emailValue(): string {
    return this.email.value
  }
  get birthdateValue(): Date {
    return this.birthDate.value
  }

  // private ensureIdIsValid(id: string): void {
  //   if (!validate(id)) {
  //     throw new InvalidArgumentError(`<${id}> is not a valid UUID`)
  //   }
  // }

  // private ensureEmailIsValid(email: string): void {
  //   const validEmailRegExp =
  //     /^(?=.*@(?:hotmail\.com|gmail\.com|yahoo\.com)$)[a-zA-Z0-9!#$%&_+[a-zA-Z0-9_-]*$/

  //   if (!validEmailRegExp.test(email)) {
  //     throw new InvalidArgumentError(`<${email}> is not a valid email`)
  //   }
  // }
  // private ensureBirthdateIsValid(birthdate: Date): void {
  //   const currentDate = new Date()
  //   let ageInYears = currentDate.getFullYear() - birthdate.getFullYear()

  //   if (
  //     currentDate.getMonth() < birthdate.getMonth() ||
  //     (currentDate.getMonth() == birthdate.getMonth() &&
  //       currentDate.getDate() < birthdate.getDate())
  //   ) {
  //     ageInYears--
  //   }
  //   if (ageInYears < 18 || ageInYears > 110) {
  //     throw new InvalidArgumentError(
  //       `<${birthdate.toISOString()}> is not a valid birthdate`,
  //     )
  //   }
  // }

  updateEmail(newEmail: string): void {
    this.ensureEmailIsValid(newEmail)
    this.email = newEmail
  }
}
