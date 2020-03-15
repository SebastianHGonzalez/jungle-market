const listen = jest.fn();

jest.mock('./app', () => ({ listen }));

describe('api', () => {
  test('listens to 3000', () => {
    // eslint-disable-next-line global-require
    require('.');

    expect(listen).toBeCalled();
  });
});
