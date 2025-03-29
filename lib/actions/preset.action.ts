'use server';

import { ROUTES } from "@/constants/routes";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { CreatePresetSchema, UpdatePresetSchema } from "../validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Preset } from "@prisma/client";

export async function createPreset(params: CreatePresetParams): Promise<ActionResponse> {
    const validationResult = await action({
      params,
      schema: CreatePresetSchema,
      authorize: true,
    });
  
    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }
  
    const userId = validationResult.session?.userId;
    const { params: validatedParams, db } = validationResult;
    
    try {
      const preset = await db.preset.create({
        data: {
          ...validatedParams!,
          userId 
        }
      });
      
      revalidatePath(ROUTES.ROLE);
      
      return { success: true, data: JSON.parse(JSON.stringify(preset)) };
    } catch (error) {
      return handleError(error) as ErrorResponse;
    }
  }
  
  export async function getAllPresets(): Promise<ActionResponse> {
    const validationResult = await action({
      authorize: false,  // Public presets don't require auth
    });
  
    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }
  
    const { db } = validationResult;
    
    try {
      const presets = await db.preset.findMany({
        orderBy: { name: 'asc' }
      });
      
      return { success: true, data: JSON.parse(JSON.stringify(presets)) };
    } catch (error) {
      return handleError(error) as ErrorResponse;
    }
  }
  
  export async function getUserPresets(): Promise<ActionResponse<Preset[]>> {
    const validationResult = await action({
      authorize: true,
    });
  
    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }
  
    const userId = validationResult.session?.userId;
    const { db } = validationResult;
    
    try {
      const presets = await db.preset.findMany({
        where: {
          OR: [
            { isDefault: true },
            { userId: userId }
          ]
        },
        orderBy: { name: 'asc' }
      });
      
      return { success: true, data: JSON.parse(JSON.stringify(presets)) };
    } catch (error) {
      return handleError(error) as ErrorResponse;
    }
  }
  
  export async function getPresetById(params: GetByIdParams): Promise<ActionResponse> {
    const validationResult = await action({
      params,
      schema: z.object({ id: z.string().min(1) }),
      authorize: false,  // Allow public access to presets
    });
  
    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }
  
    const { params: validatedParams, db } = validationResult;
    
    try {
      const preset = await db.preset.findUnique({
        where: { id: validatedParams!.id }
      });
      
      if (!preset) {
        return { success: false, error: { message: 'Preset not found' } };
      }
      
      return { success: true, data: JSON.parse(JSON.stringify(preset)) };
    } catch (error) {
      return handleError(error) as ErrorResponse;
    }
  }
  
  export async function updatePreset(id: string, data: Partial<z.infer<typeof UpdatePresetSchema>>): Promise<ActionResponse> {
    const validationResult = await action({
      params: { id, ...data },
      schema: z.object({ id: z.string().min(1) }).merge(UpdatePresetSchema),
      authorize: true,
    });
  
    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }
  
    const userId = validationResult.session?.userId;
    const { params: validatedParams, db } = validationResult;
    
    try {
      // First check if preset belongs to user
      const existingPreset = await db.preset.findUnique({
        where: { id: validatedParams!.id },
        select: { userId: true }
      });
      
      if (!existingPreset || existingPreset.userId !== userId) {
        return { success: false, error: { message: 'Not authorized to update this preset' } };
      }
      
      const { id, ...updateData } = validatedParams!;
      
      const preset = await db.preset.update({
        where: { id },
        data: updateData
      });
      
      revalidatePath(ROUTES.ROLE);
      
      return { success: true, data: JSON.parse(JSON.stringify(preset)) };
    } catch (error) {
      return handleError(error) as ErrorResponse;
    }
  }
  
  export async function deletePreset(params: DeleteByIdParams): Promise<ActionResponse> {
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
      // First check if preset belongs to user
      const existingPreset = await db.preset.findUnique({
        where: { id: validatedParams!.id },
        select: { userId: true }
      });
      
      if (!existingPreset || existingPreset.userId !== userId) {
        return { success: false, error: { message: 'Not authorized to delete this preset' } };
      }
      
      await db.preset.delete({
        where: { id: validatedParams!.id }
      });
      
      revalidatePath(ROUTES.ROLE);
      
      return { success: true };
    } catch (error) {
      return handleError(error) as ErrorResponse;
    }
  }