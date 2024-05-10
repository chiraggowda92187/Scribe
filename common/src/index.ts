import { z } from "zod";

export const userSignupBody = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});


export const userSigninBody = z.object({
  email: z.string().email(),
  password: z.string(),
});


export const blogCreateBody = z.object({
  title: z.string(),
  content: z.string(),
});


export const blogUpdateBody = z.object({
  title: z.string(),
  content: z.string(),
  postId: z.string(),
});


export type userSignupBodyType = z.infer<typeof userSignupBody>
export type userSigninBodyType = z.infer<typeof userSigninBody>
export type blogCreateBodyType = z.infer<typeof blogCreateBody>
export type blogUpdateBodyType = z.infer<typeof blogUpdateBody>