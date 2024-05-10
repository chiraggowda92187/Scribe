"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateBody = exports.blogCreateBody = exports.userSigninBody = exports.userSignupBody = void 0;
const zod_1 = require("zod");
exports.userSignupBody = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.userSigninBody = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.blogCreateBody = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.blogUpdateBody = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    postId: zod_1.z.string(),
});
