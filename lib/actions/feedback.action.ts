'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { CreateFeedbackSchema } from '../validations';
import action from '../handlers/action';
import handleError from '../handlers/error';
import { ROUTES } from '@/constants/routes';

export async function createFeedback(params: CreateFeedbackParams): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: CreateFeedbackSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { params: validatedParams, db } = validationResult;
  
  try {
    const { interviewId, summary, metrics } = validatedParams!;
    
    // Create feedback with nested metrics creation
    const feedback = await db.feedback.create({
      data: {
        interviewId,
        summary,
        metrics: {
          create: metrics.map(metric => ({
            category: metric.category,
            score: metric.score,
            comment: metric.comment
          }))
        }
      },
      include: {
        metrics: true
      }
    });
    
    revalidatePath(ROUTES.REVIEW(interviewId));
    
    return { success: true, data: JSON.parse(JSON.stringify(feedback)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getFeedbackByInterviewId(params: GetByIdParams): Promise<ActionResponse> {
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
    const feedback = await db.feedback.findFirst({
      where: { interviewId: validatedParams!.id },
      include: {
        metrics: true
      }
    });
    
    if (!feedback) {
      return { success: false, error: { message: 'Feedback not found' } };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(feedback)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function deleteFeedback(params: DeleteByIdParams): Promise<ActionResponse> {
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
    // Get the interview ID before deleting for revalidation
    const feedback = await db.feedback.findUnique({
      where: { id: validatedParams!.id },
      select: { interviewId: true }
    });
    
    if (!feedback) {
      return { success: false, error: { message: 'Feedback not found' } };
    }
    
    // Metrics will be deleted automatically due to onDelete: Cascade
    await db.feedback.delete({
      where: { id: validatedParams!.id }
    });
    
    revalidatePath(ROUTES.REVIEW(feedback.interviewId));
    
    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}