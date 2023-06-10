import { UserBirthDate } from './UserBirthDate'
import { UserEmail } from './UserEmail'
import { UserId } from './UserId'
/* ventajas
  - dejamos mas legible la clase
  - encapsulamos validaciones
  - prevenimos el seteo de propiedades propiedades desde fuera manteniendo la encapsulacion
  - aporta semantica
  - validaciones asegura consistencia
  - mejor modelado
  - cohesion
  - mayor robustes
  debates
  - penalizacion rendimiento 30 ms en los new
  - proceso de refactor
  - verbosidad
  - exponer value object desde modelos
  - donde instanciarlos
  - acoplamiento con uuid
  - convencion .value
*/
export class User {
  private readonly id: UserId
  private email: UserEmail
  private birthDate: UserBirthDate

  constructor(id: string, email: string, birthDate: Date) {
    this.id = new UserId(id)
    this.email = new UserEmail(email)
    this.birthDate = new UserBirthDate(birthDate)
  }
  get idValue(): string {
    return this.id.getValue()
  }
  get emailValue(): string {
    return this.email.value
  }
  get birthdateValue(): Date {
    return this.birthDate.value
  }

  updateEmail(newEmail: string): void {
    this.email = new UserEmail(newEmail)
  }
}
