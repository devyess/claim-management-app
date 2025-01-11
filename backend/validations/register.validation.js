const { z } = require('zod');

const registerValidation = z.object({
      userName: z.string().min(3).max(100),
      email: z.string().email(),
      password: z.string().min(4).max(100),
});

module.exports = registerValidation;