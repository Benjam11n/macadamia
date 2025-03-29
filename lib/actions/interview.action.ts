'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { CreateInterviewSchema, UpdateInterviewSchema, AddMessageSchema } from '../validations';
import action from '../handlers/action';
import handleError from '../handlers/error';
import { ROUTES } from '@/constants/routes';

export async function createInterview(params: CreateInterviewParams): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: CreateInterviewSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const userId = validationResult.session?.userId;
  const { params: validatedParams, db } = validationResult;
  
  try {    
    const interview = await db.interview.create({
      data: {
        ...validatedParams!,
        userId: userId!
      }
    });
    
    revalidatePath(ROUTES.DASHBOARD);
    
    return { success: true, data: JSON.parse(JSON.stringify(interview)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getInterviewById(params: GetByIdParams): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: z.object({ id: z.string().min(1) }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { params: validatedParams, db } = validationResult;
  
  try {
    const interview = await db.interview.findUnique({
      where: { id: validatedParams!.id },
      include: {
        role: true,
        preset: true,
        messages: {
          orderBy: { timestamp: 'asc' }
        }
      }
    });
    
    if (!interview) {
      return { success: false, error: { message: 'Interview not found' } };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(interview)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserInterviews(): Promise<ActionResponse> {
  const validationResult = await action({
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const userId = validationResult.session?.userId;
  const { db } = validationResult;
  
  try {
    const interviews = await db.interview.findMany({
      where: { userId },
      include: {
        role: true,
        preset: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return { success: true, data: JSON.parse(JSON.stringify(interviews)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function addMessage(params: AddMessageParams): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: AddMessageSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { params: validatedParams, db } = validationResult;
  
  try {
    const message = await db.chatMessage.create({
      data: {
        ...validatedParams!,
        timestamp: BigInt(Date.now())
      }
    });
        
    return { success: true, data: JSON.parse(JSON.stringify(message)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function updateInterview(id: string, data: Partial<z.infer<typeof UpdateInterviewSchema>>): Promise<ActionResponse> {
  const validationResult = await action({
    params: { id, ...data },
    schema: z.object({ id: z.string().min(1) }).merge(UpdateInterviewSchema),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { params: validatedParams, db } = validationResult;
  
  try {
    const { id, ...updateData } = validatedParams!;
    
    const interview = await db.interview.update({
      where: { id },
      data: updateData
    });
    
    revalidatePath(ROUTES.DASHBOARD);
    revalidatePath(ROUTES.DETAILS(id));
    
    return { success: true, data: JSON.parse(JSON.stringify(interview)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function setTranscribingStatus(params: { id: string, isTranscribing: boolean }): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: z.object({ 
      id: z.string().min(1),
      isTranscribing: z.boolean()
    }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { params: validatedParams, db } = validationResult;
  
  try {
    const interview = await db.interview.update({
      where: { id: validatedParams!.id },
      data: { isTranscribing: validatedParams!.isTranscribing }
    });
    
    revalidatePath(ROUTES.DETAILS(validatedParams!.id));
    
    return { success: true, data: JSON.parse(JSON.stringify(interview)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function deleteInterview(params: DeleteByIdParams): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: z.object({ id: z.string().min(1) }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { params: validatedParams, db } = validationResult;
  
  try {
    // First delete related messages
    await db.chatMessage.deleteMany({
      where: { interviewId: validatedParams!.id }
    });
    
    // Then delete the interview
    await db.interview.delete({
      where: { id: validatedParams!.id }
    });
    
    revalidatePath(ROUTES.DASHBOARD);
    
    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function saveRole(params: RoleParams): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: z.object({
      id: z.string().optional(),
      title: z.string().min(1),
      company: z.string().min(1),
      description: z.string()
    }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const userId = validationResult.session?.userId;
  const { params: validatedParams, db } = validationResult;
  
  try {
    const { id, ...roleData } = validatedParams!;
    
    let role;
    
    if (id) {
      // Update existing role
      role = await db.role.update({
        where: { id },
        data: roleData
      });
    } else {
      // Create new role
      role = await db.role.create({
        data: {
          ...roleData,
          userId: userId!
        }
      });
    }
        
    return { success: true, data: JSON.parse(JSON.stringify(role)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}