import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { use } from "hono/jsx";

import { verify } from "hono/jwt";





type VariablesType = {
    userId : string
}

export const verifyRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string,
        user_Id : string
    };
    Variables : VariablesType
}>


verifyRouter.get('/', async (c) => {
  const token = await c.req.header('Authorization')?.split(' ')[1];
  //console.log(token);
  if (!token) {
    return c.json({
      success: false,
      error: 'Invalid token or token expired!d',
    });
  }
  const verifiedResponse = await verify(token, c.env.JWT_SECRET, 'HS256');
  if (!verifiedResponse) {
    //console.log(verifiedResponse)
    c.status(403);
    return c.json({
      success: false,
      error: 'User unauthorized..!',
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const user = await prisma.user.findFirst({
    where: {
      id: verifiedResponse.id,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({ success: false, message: 'user not found...!' });
  }
  return c.json({
    success: true,
    userName: user?.name,
    userId: user?.id,
  });
});