export class DomainEntity<T> {
  constructor(data: T) {
    Object.assign(this, data);
  }
  static from<T, U extends DomainEntity<T>>(
    this: new (data: T) => U,
    data: T,
  ): U & T {
    return Object.assign(new this(data), data);
  }
}
