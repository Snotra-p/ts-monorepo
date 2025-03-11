export abstract class DomainEntity<T> {
  constructor(data: T) {
    Object.assign(this, data);
    this.initialize();
  }

  static from<T, U extends DomainEntity<T>>(
    this: new (data: T) => U,
    data: T,
  ): U & T {
    return new this(data) as U & T;
  }

  protected initialize() {}
}
