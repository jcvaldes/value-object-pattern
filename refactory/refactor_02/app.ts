import { v4 as uuidv4 } from 'uuid'
import { User } from './domain/User'

const user = new User(uuidv4(), 'idevkingos@gmail.com', new Date('1976-07-01'))
console.log(user.idValue)
