import { validateCity } from "../../server/validator";

describe('Putting the backend schema validation to test', () => {
  test('Checking to validating API inputs ', async () => {

    const result = validateCity({ city: 6 });

    expect(result.success).toBe(false);

  });
});