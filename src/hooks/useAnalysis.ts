import { useState } from "react";
import { AnalysisResult } from "../types";
import { uploadFile } from "../services/api";
import { PLATFORMS } from "../constants/config";

export function useAnalysis(platform: string) {
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [status, setStatus] = useState<{
        message: string;
        type: "error" | "success" | "info";
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData: {
        file: File;
        username?: string;
    }) => {
        const { file, username } = formData;
        const needsUsername =
            platform === PLATFORMS.INSTAGRAM || platform === PLATFORMS.FACEBOOK;

        if (!file || (needsUsername && !username)) {
            setStatus({
                message: "Please provide all required information",
                type: "error",
            });
            return;
        }

        setIsLoading(true);
        setStatus({ message: "Analyzing content...", type: "info" });
        setResult(null);

        try {
            const data = await uploadFile(platform, file, username);
            console.log("Analysis Results:", data);

            if (!data) {
                throw new Error("No analysis results received");
            }

            const hasValidData = Object.values(data).every(
                (value) => value !== undefined && value !== null
            );

            if (!hasValidData) {
                throw new Error("Invalid analysis results received");
            }

            setResult(data);
            setStatus({
                message: "Analysis completed successfully!",
                type: "success",
            });
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = (error: unknown) => {
        let errorMessage = "Error analyzing content. Please try again.";

        if (error instanceof Error) {
            if (error.message.includes("Invalid file format")) {
                errorMessage =
                    "Invalid file format. Please check your file and try again.";
            } else if (error.message.includes("No messages found")) {
                errorMessage = "No messages found in the provided file.";
            } else if (error.message.includes("Invalid username")) {
                errorMessage = "Invalid username. Please check and try again.";
            } else if (error.message.includes("Incomplete analysis")) {
                errorMessage = "Unable to complete analysis. Please try again.";
            }

            console.error("Analysis Error:", {
                message: error.message,
                originalError: error,
            });
        }

        setStatus({
            message: errorMessage,
            type: "error",
        });
        setResult(null);
    };

    return {
        handleSubmit,
        isLoading,
        status,
        result,
    };
}
