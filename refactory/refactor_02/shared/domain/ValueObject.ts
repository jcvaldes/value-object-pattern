export abstract class ValueObject<T> {
  protected readonly value: T

  protected constructor(value: T, isReadOnly: boolean = false) {
    // this.validate(value)
    this.value = isReadOnly ? Object.freeze(value) : value
  }

  protected abstract validate(value: T): void

  getValue(): T {
    return this.value
  }

  public equals(other?: ValueObject<T>): boolean {
    if (other?.value === undefined) {
      return false
    }
    if (this.isString(other.value) || this.isNumber(other.value)) {
      return other.value === this.value
    }
    if (this.isObject(other.value)) {
      return this.deepEqual(this, other)
    }
    return false
  }

  private deepEqual(object1: any, object2: any): boolean {
    for (const key in object1.value) {
      const value1 = object1.value[key]
      const value2 = object2.value[key]

      if (this.isObject(value1) && this.isObject(value2)) {
        if (!this.deepEqual(value1, value2)) return false
      } else {
        if (value1 !== value2) return false
      }
    }
    return true
  }

  private isObject(unknown: unknown): boolean {
    return unknown != null && typeof unknown === 'object'
  }

  private isNumber(unknown: unknown) {
    return unknown != null && typeof unknown === 'number'
  }

  private isString(unknown: unknown) {
    return unknown != null && typeof unknown === 'string'
  }
}
