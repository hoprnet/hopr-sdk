import { sdkApiError } from './sdkApiError';

describe('sdkApiError', () => {
  it('sets description from hoprdErrorPayload.status when present', () => {
    const err = new sdkApiError({
      status: 401,
      statusText: 'Unauthorized',
      hoprdErrorPayload: {
        status: 'UNAUTHORIZED',
        error: 'authentication failed'
      }
    });

    expect(err.name).toBe('APIError');
    expect(err.status).toBe(401);
    expect(err.statusText).toBe('Unauthorized');
    expect(err.description).toBe('UNAUTHORIZED');
    expect(err.hoprdErrorPayload).toEqual({
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    });
  });

  it('falls back to hoprdErrorPayload.error when status is not present', () => {
    // The schema requires `status` to be a string, but at runtime nothing
    // prevents an empty-string status. The constructor checks
    // `hoprdErrorPayload?.status` which is falsy for '', so it should fall
    // through to the `?.error` branch (sdkApiError.ts line 51).
    const err = new sdkApiError({
      status: 422,
      statusText: 'Unprocessable Entity',
      hoprdErrorPayload: {
        status: '',
        error: 'something specific went wrong'
      }
    });

    expect(err.description).toBe('something specific went wrong');
  });

  it('uses the default HTTP-status description when no hoprdErrorPayload is provided', () => {
    const err = new sdkApiError({
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(err.description).toBe('HTTP Status code 500');
    expect(err.hoprdErrorPayload).toBeUndefined();
  });
});
