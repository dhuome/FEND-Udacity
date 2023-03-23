const { z } = require('zod');

const schema = z.object({
  city: z.string().trim().max(90)
});

function validateCity(data) {
  return schema.safeParse(data);
}

module.exports = {validateCity}