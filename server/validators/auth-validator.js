const {z} = require("zod");

const loginSchema = z.object({
    username: z
    .string({required_error: "username is required"})
    .trim()
    .min(3, {invalid_type_error: "username must have at least 3 characters"})
    .max(30, {invalid_type_error: "username must have less that 30 characters"}) ,

    password: z
    .string({required_error: "password is required"})
    .trim()
    .min(6, {invalid_type_error: "password must have at least 6 characters"})
    .max(30, {invalid_type_error: "password must have less that 30 characters"}) ,


})

const signUpSchema = loginSchema.extend({
   
    email: z
    .string({required_error: "email is required"})
    .trim()
    .email({message: "invalid email address"})
    .min(3, {invalid_type_error: "email must have at least 3 characters"})
    .max(30, {invalid_type_error: "email must have less that 30 characters"}) ,

  
})

module.exports = {signUpSchema , loginSchema};