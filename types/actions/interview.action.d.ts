declare global {
    export interface RoleParams {
        id?: string;
        title: string;
        company: string;
        description: string;
    }
      
    export interface CreateInterviewParams {
        roleId: string;
        presetId: string;
        resume: string;
    }
      
    export interface AddMessageParams {
        interviewId: string;
        role: 'user' | 'assistant';
        content: string;
    }

    interface GetByIdParams {
        id: string;
    }

    interface DeleteByIdParams {
        id: string;
    }

    interface GetChiliByCategoryParams {
        category: string;
    }
}

export {};