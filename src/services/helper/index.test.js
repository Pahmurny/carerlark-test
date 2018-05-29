import { generateError, errorPromise } from '.';

beforeEach(() => {

});

describe('generateError', () => {
  it('generate error with valid status and message', () => {
    const error = generateError('message', 456);
    expect(error.message).toBe('message');
    expect(error.code).toBe(456);
    expect(error.status).toBe(456);
  });
  it('generate error with message and empty status', () => {
    const error = generateError('message');
    expect(error.message).toBe('message');
    expect(error.code).toBe(400);
    expect(error.status).toBe(400);
  });
  it('generate error without message and status', () => {
    const error = generateError();
    expect(error.message).toBe('Unknown error');
    expect(error.code).toBe(400);
    expect(error.status).toBe(400);
  });
});
