declare global {
    export interface FeedbackMetric {
        category: string;
        score: number;
        comment: string;
    }
      
    export interface CreateFeedbackParams {
        interviewId: string;
        summary: string;
        metrics: FeedbackMetric[];
    }
}

export {};