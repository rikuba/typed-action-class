import * as assert from 'assert';
import { UniteActions } from '../';
import * as actions from './actions';
import { Foo, Bar, Baz } from './actions';

{
  type Action = UniteActions<typeof actions>;

  (function (action: Action) {
    switch (action.type) {
      case 'FOO':
        // The action should be narrowed to Foo
        const foo: Foo = action;
        break;

      case 'BAR':
        // The action should be narrowed to Bar
        const bar: Bar = action;
        break;

      case 'BAZ':
        // The action should be narrowed to Baz
        const baz: Baz = action;
        break;
    }
  });
}

{
  // Foo class should recieve a undefined type argument
  const foo = new Foo(undefined);

  // foo.type should be string literal 'FOO' type value
  const fooType: 'FOO' = foo.type;

  // foo.payload should be undefined type value
  const fooPayload: undefined = foo.payload;

  describe('class extends Action("FOO")', () => {
    describe('#type', () => {
      it('should be "FOO" value', () => {
        assert(foo.type === 'FOO');
      });
    });
    describe('#payload', () => {
      it('should be undefined value', () => {
        assert(foo.payload === undefined);
      });
    });
  });
}

{
  // Bar class should receive a string type argument
  const bar = new Bar('payload');

  // bar.type should be string literal 'BAR' type value
  const barType: 'BAR' = bar.type;

  // bar.payload should be string type value
  const barPayload: string = bar.payload;

  describe('class extends Action("BAR")', () => {
    describe('#type', () => {
      it('should be "BAR" value', () => {
        assert(bar.type === 'BAR');
      });
    });
    describe('#payload', () => {
      it('should be "payload" value', () => {
        assert(bar.payload === 'payload');
      });
    });
  });
}

{
  // Baz class should receive a { hoge: string; fuga: number; piyo: boolean; } type argument
  const baz = new Baz({
    hoge: 'hoge',
    fuga: 42,
    piyo: true
  });

  // baz.type should be string literal 'BAZ' type value
  const bazType: 'BAZ' = baz.type;

  // baz.payload should be { hoge: string; fuga: number; piyo: boolean; } type valie
  const bazPayload: { hoge: string; fuga: number; piyo: boolean; } = baz.payload;

  describe('class extends Action("BAZ")', () => {
    describe('#type', () => {
      it('should be "BAR" value', () => {
        assert(baz.type === 'BAZ');
      });
    });
    describe('#payload', () => {
      it('should be object', () => {
        assert(baz.payload != null);
        assert(typeof baz.payload === 'object');
      });
      it('should have string type hoge property', () => {
        assert(typeof baz.payload.hoge === 'string');
        assert(baz.payload.hoge === 'hoge');
      });
      it('should have number type fuga property', () => {
        assert(typeof baz.payload.fuga === 'number');
        assert(baz.payload.fuga === 42);
      });
      it('should have boolean type piyo property', () => {
        assert(typeof baz.payload.piyo === 'boolean');
        assert(baz.payload.piyo === true);
      });
    });
  });
}