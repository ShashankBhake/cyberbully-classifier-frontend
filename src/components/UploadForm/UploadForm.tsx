import { useState } from "react";
import { PLATFORMS } from "../../constants/config";
import "./UploadForm.css";

interface UploadFormProps {
    platform: string;
    onSubmit: (data: { file: File; username?: string }) => void;
    isLoading: boolean;
}

export function UploadForm({ platform, onSubmit, isLoading }: UploadFormProps) {
    const [username, setUsername] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const needsUsername =
        platform === PLATFORMS.INSTAGRAM || platform === PLATFORMS.FACEBOOK;

    const getAcceptedFileTypes = () => {
        if (platform === PLATFORMS.WHATSAPP) {
            return ".txt,.zip";
        }
        return ".zip";
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const fileExtension = file.name.split(".").pop()?.toLowerCase();

            if (platform === PLATFORMS.WHATSAPP) {
                if (fileExtension !== "txt" && fileExtension !== "zip") {
                    setError(
                        "Please upload a valid WhatsApp chat export file (.txt) or backup file (.zip)"
                    );
                    return;
                }
            } else if (fileExtension !== "zip") {
                setError(
                    `Please upload a valid ${platform} backup file (.zip)`
                );
                return;
            }

            setFile(file);
            setError(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            onSubmit({ file, username: needsUsername ? username : undefined });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="upload-form">
            {needsUsername && (
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={`Enter ${platform} username`}
                        required={needsUsername}
                    />
                </div>
            )}

            <div className="form-group">
                <label htmlFor="file">
                    Upload File{" "}
                    {platform === PLATFORMS.WHATSAPP
                        ? "(.txt or .zip)"
                        : "(.zip)"}
                    :
                </label>
                <input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept={getAcceptedFileTypes()}
                    required
                />
                <small className="file-hint">
                    {platform === PLATFORMS.WHATSAPP
                        ? "Upload your WhatsApp chat export (.txt) or backup file (.zip)"
                        : `Upload your ${platform} backup file (.zip)`}
                </small>
                {error && <div className="error-message">{error}</div>}
            </div>

            <button type="submit" disabled={isLoading || !file}>
                {isLoading ? "Analyzing..." : "Analyze Content"}
            </button>
        </form>
    );
}
