import {
  blogCreateBody,
  blogUpdateBody,
} from '@chiraggowda/scribespace-common';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { z } from 'zod';

type VariablesType = {
  userId: string;
};

export const blog = new Hono<{
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

blog.use('/*', async (c, next) => {
  //console.log("middleware hit!")
  const token = await c.req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return c.json({
      success: false,
      message: 'Invalid token or token expired!',
    });
  }
  const tokenVerified = await verify(token, c.env.JWT_SECRET, 'HS256');
  if (!tokenVerified) {
    c.status(403);
    return c.json({ success: false, message: 'unauthorized..!' });
  }
  c.set;
  c.set('userId', tokenVerified.id);
  await next();
});

blog.post('/', async (c) => {
  try {
    const reqBody = await c.req.json();
    const parsedResponse = blogCreateBody.safeParse(reqBody);
    if (parsedResponse.success == false) {
      return c.json({ success: false, message: 'Inavlid form!' });
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogResp = await prisma.post.create(
      {
      data: {
        title: parsedResponse.data.title,
        content: parsedResponse.data.content,
        authorId: c.get('userId'),
      },
    });
    return c.json({ success: true, response: blogResp });
  } catch (error) {
    return c.json({ success: false, error });
  }
});

blog.put('/', async (c) => {
  try {
    const reqBody = await c.req.json();
    const parsedResponse = blogUpdateBody.safeParse(reqBody);
    if (parsedResponse.success == false) {
      return c.json({ success: false, message: 'Invalid form details!' });
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogUpdateResponse = await prisma.post.update({
      where: {
        id: parsedResponse.data.postId,
      },
      data: {
        title: parsedResponse.data.title,
        content: parsedResponse.data.content,
      },
    });
    return c.json({ success: true, reponse: blogUpdateResponse });
  } catch (error) {
    return c.json({ success: false, error });
  }
});

blog.get('/bulk', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const resp = await prisma.post.findMany({
      select : {
        title : true,
        content : true,
        id : true,
        published : true,
        date : true,
        author : {
          select : {
            name : true
          }
        }
      }
    });
    return c.json({
      success: true,
      resp,
    });
  } catch (error) {
    return c.json({ success: false, error });
  }
});

blog.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const resp = await prisma.post.findFirst({
      where: {
        id: id,
      },select:{
        title : true,
        date : true,
        content : true,
        id : true,
        published : true,
        author : {
          select : {
            name : true
          }
        }
      },
    });
    if (resp == null) {
      return c.json({ success: false, message: 'Error fetching!' });
    }
    return c.json({
      success: true,
      resp,
    });
  } catch (error) {
    return c.json({ success: false, error });
  }
});
