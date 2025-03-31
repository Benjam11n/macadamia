'use server';

import { z } from 'zod';
import action from '../handlers/action';
import handleError from '../handlers/error';
import { CreateRoleSchema } from '../validations';
import { Role } from '@prisma/client';

export async function createRole(params: CreateRoleParams): Promise<ActionResponse<Role>> {
  const validationResult = await action({
    params,
    schema: CreateRoleSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const userId = validationResult.session?.userId;
  const { params: validatedParams, db } = validationResult;

  try {
    const { title, company, description } = validatedParams!;
    
    const role = await db.role.create({
      data: {
        userId: userId!,
        title,
        company,
        description
      }
    });

    return { success: true, data: JSON.parse(JSON.stringify(role)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getRoles(): Promise<ActionResponse> {
  const validationResult = await action({
    params: {},
    schema: z.object({}),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const userId = validationResult.session?.userId;
  const { db } = validationResult;

  try {
    const roles = await db.role.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return { success: true, data: JSON.parse(JSON.stringify(roles)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getRoleById(params: GetByIdParams): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: z.object({ id: z.string().min(1) }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const userId = validationResult.session?.userId;
  const { params: validatedParams, db } = validationResult;

  try {
    const role = await db.role.findFirst({
      where: { 
        id: validatedParams!.id,
        userId 
      }
    });

    if (!role) {
      return { success: false, error: { message: 'Role not found' } };
    }

    return { success: true, data: JSON.parse(JSON.stringify(role)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function deleteRole(params: DeleteByIdParams): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: z.object({ id: z.string().min(1) }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const userId = validationResult.session?.userId;
  const { params: validatedParams, db } = validationResult;

  try {
    // First check if role exists and belongs to user
    const existingRole = await db.role.findFirst({
      where: { 
        id: validatedParams!.id,
        userId 
      }
    });

    if (!existingRole) {
      return { success: false, error: { message: 'Role not found' } };
    }

    // Delete the role
    await db.role.delete({
      where: { id: validatedParams!.id }
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}