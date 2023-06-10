import { validate } from 'uuid'
import { InvalidArgumentError } from '../shared/domain/InvalidArgumentError'
/* problemas:
  - si tengo mas propiedades indudablemente va a crecer
  tengo validaciones y logica adicional porque puedo actualizar
  el email
  - estamos modelando user a través de primitivos
  - la clase tiene muchas responsabilidades
*/
export class User {
  constructor(
    private id: string,
    private email: string,
    private birthdate: Date,
  ) {
    // const validEmailRegExp =
    //   /^(?=.*@(?:hotmail\.com|gmail\.com|yahoo\.com)$)[a-zA-Z0-9!#$%&_+[a-zA-Z0-9_-]*$/

    // if (!validEmailRegExp.test(email)) {
    //   throw new InvalidArgumentError(`<${email}>Invalid email`)
    // }
    this.ensureIdIsValid(id)
    this.ensureEmailIsValid(email)
    this.ensureBirthdateIsValid(birthdate)
  }

  private ensureIdIsValid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(`<${id}> is not a valid UUID`)
    }
  }

  private ensureEmailIsValid(email: string): void {
    const validEmailRegExp =
      /^(?=.*@(?:hotmail\.com|gmail\.com|yahoo\.com)$)[a-zA-Z0-9!#$%&_+[a-zA-Z0-9_-]*$/

    if (!validEmailRegExp.test(email)) {
      throw new InvalidArgumentError(`<${email}> is not a valid email`)
    }
  }
  private ensureBirthdateIsValid(birthdate: Date): void {
    const currentDate = new Date()
    let ageInYears = currentDate.getFullYear() - birthdate.getFullYear()

    if (
      currentDate.getMonth() < birthdate.getMonth() ||
      (currentDate.getMonth() == birthdate.getMonth() &&
        currentDate.getDate() < birthdate.getDate())
    ) {
      ageInYears--
    }
    if (ageInYears < 18 || ageInYears > 110) {
      throw new InvalidArgumentError(
        `<${birthdate.toISOString()}> is not a valid birthdate`,
      )
    }
  }

  updateEmail(newEmail: string): void {
    this.ensureEmailIsValid(newEmail)
    this.email = newEmail
  }
}
