export abstract class Entity {
  static create<Prop, T extends Entity>(this: new () => T, props: Prop): T {
    return Object.assign(new this(), props);
  }
}
