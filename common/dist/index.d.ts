import { z } from "zod";
export declare const userSignupBody: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const userSigninBody: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const blogCreateBody: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const blogUpdateBody: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    postId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    postId: string;
}, {
    title: string;
    content: string;
    postId: string;
}>;
export type userSignupBodyType = z.infer<typeof userSignupBody>;
export type userSigninBodyType = z.infer<typeof userSigninBody>;
export type blogCreateBodyType = z.infer<typeof blogCreateBody>;
export type blogUpdateBodyType = z.infer<typeof blogUpdateBody>;
