import config from './index';

describe('env-var-config', () => {
  it('should work', () => {
    process.env.TEST_ENVIRONMENT_VARIABLE = 'test';

    const input = {
      testEnvironmentVariable: {
        description: 'Used to do some things',
      },
      another: {
        description: 'Test',
      },
    };

    const res = config(input);

    expect(res.testEnvironmentVariable).toBe('test');
  });
});
