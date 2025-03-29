'use server';

import { ZodError, ZodSchema } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { UnauthorizedError, ValidationError } from '../http-errors';
import{ prisma }from '../prisma';
import { getUserOrCreate } from '../auth';

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

/**
 * Server action helper function that:
 * 1. Validates input parameters against a schema if provided
 * 2. Checks user authentication if required
 * 3. Ensures database connection via Prisma
 * 4. Returns validated params and session info
 */
async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>) {
  // Validate params against schema if provided
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error('Schema validation failed');
      }
    }
  }
  
  let session = null;
  let user = null;
  if (authorize) {
    const authData = await auth();
    user = await getUserOrCreate();
    if (!authData?.userId) {
      return new UnauthorizedError();
    }
    session = authData;
  }
  
  return { params, session, user, db: prisma };
}

export default action;