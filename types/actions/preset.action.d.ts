declare global {
    export interface PresetType {
        id: string;
        name: string;
        description: string;
        personality: string;
    }
      
    export interface CreatePresetParams {
        name: string;
        description: string;
        personality: string;
    }
}

export {};