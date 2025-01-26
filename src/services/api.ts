import { AnalysisResult } from "../types";
import { API_URL } from "../constants/config";

export const uploadFile = async (
    platform: string,
    file: File,
    username?: string
): Promise<AnalysisResult> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", platform.toLowerCase());

    if (username) {
        formData.append("username", username);
    }

    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        // Log the response for debugging
        console.log("API Response:", data);

        if (!response.ok) {
            throw new Error(data.error || data.message || "Upload failed");
        }

        // Validate the response structure
        if (!data || typeof data !== "object") {
            throw new Error("Invalid response format");
        }

        // Check if the response has the expected properties
        const requiredFields = [
            "total_messages",
            "not_bullying",
            "age",
            "gender",
            "ethnicity",
            "religion",
            "other_bullying",
        ];

        const missingFields = requiredFields.filter(
            (field) => !(field in data)
        );
        if (missingFields.length > 0) {
            console.error("Missing fields in response:", missingFields);
            throw new Error("Incomplete analysis results received");
        }

        return data as AnalysisResult;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
