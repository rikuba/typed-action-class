import { Action } from '../';

export class Foo extends Action('FOO') {}

export class Bar extends Action('BAR')<string> {}

export class Baz extends Action('BAZ')<{
  hoge: string;
  fuga: number;
  piyo: boolean;
}> {}
