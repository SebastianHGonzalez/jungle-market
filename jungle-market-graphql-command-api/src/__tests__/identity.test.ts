import identity from 'lib/identity';

describe(identity, () => {
  it('returns the given value', () => {
    expect(identity(1)).toEqual(1);
  });
});
