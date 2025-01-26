export interface AnalysisResult {
    age: number;
    ethnicity: number;
    gender: number;
    not_bullying: number;
    other_bullying: number;
    religion: number;
    total_messages: number;
}

export interface StatusMessageProps {
    message: string;
    type: "error" | "success" | "info";
}

export interface AnalysisResultsProps {
    result: AnalysisResult;
}

export interface SocialMediaCardProps {
    platform: string;
    icon: string;
    onPress: () => void;
}
