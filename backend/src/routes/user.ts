
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { z } from "zod";
import { userSigninBody, userSignupBody } from "@chiraggowda/scribespace-common";



export const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    userId: string;
  };
  // SYNTAX 1 for using variables in the hono app
  // Variables:{
  //   userId :string
  // }
  Variables: VariablesType;
}>();



type VariablesType = {
    userId: string;
};

user.post('/signup', async (c) => {
  // pending things in the route hashing password, sending the json web token to the user
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const reqBody = await c.req.json();
    const parsedResponse = userSignupBody.safeParse(reqBody);
    if (parsedResponse.success == false) {
      return c.json({
        message: 'Invalid ipnuts',
      });
    }
    const dbResponse = await prisma.user.create({
      data: {
        name: parsedResponse.data.email,
        email: parsedResponse.data.email,
        password: parsedResponse.data.password,
      },
    });
    // sending jsonwebtoken as a part of the response
    const token = await sign({ id: dbResponse.id, name:dbResponse.name }, c.env.JWT_SECRET, 'HS256');
    return c.json({
      success: true,
      dbResponse,
      token : `Bearer ${token}`,
    });
  } catch (error) {
    return c.json({
      error,
    });
  }
});

user.post('/signin', async (c) => {
  const reqBody = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const parsedResponse = userSigninBody.safeParse(reqBody);
  if (parsedResponse.success == false) {
    return c.json({
      success: false,
      message: 'Inavlid inputs...!',
    });
  }
  const user = await prisma.user.findFirst({
    where: {
      email: parsedResponse.data.email,
    },
  });
  if (user?.password != parsedResponse.data.password) {
    return c.json({
      success: false,
      message: 'Invalid credentials...!',
    });
  }
  const token = await sign({ id: user.id, name : user.name }, c.env.JWT_SECRET, 'HS256');
  return c.json({ success: true, token: `Bearer ${token}` });
});