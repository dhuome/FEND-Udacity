import { validateData } from '../js/updateUI'

describe('Putting the data validation to test', () => {
  test('Checking to see if the validation helper function returns the expected results', async () => {

    const result = validateData('test', 'test', 2, 2);

    expect(result).toBe(true);

  });
});