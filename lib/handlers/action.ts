'use server';

import { ZodError, ZodSchema } from 'zod';
import { currentUser, auth } from '@clerk/nextjs/server';

// Custom error classes
export class ValidationError extends Error {
  fieldErrors: Record<string, string[]>;
  
  constructor(fieldErrors: Record<string, string[]>) {
    super('Validation Error');
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

// Types
export type ClerkAuth = {
  userId: string | null;
  sessionId: string | null;
  getToken: () => Promise<string | null>;
};

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
  
  // Check authorization with Clerk if required
  let session = null;
  let user = null;
  if (authorize) {
    const authData = await auth();
    if (!authData?.userId) {
      return new UnauthorizedError();
    }
    user = await currentUser();
    session = authData;
  }
  
  // Prisma is already instantiated and connection is managed
  // No need for explicit connection like with Mongoose
  
  // Return params, session, user and db for use in the action
  return { params, session, user, db: prisma };
}

export default action;