import { useParams, useNavigate } from "react-router-dom";
import { UploadForm } from "../../components/UploadForm/UploadForm";
import { AnalysisResults } from "../../components/AnalysisResults";
import { StatusMessage } from "../../components/StatusMessage";
import { useAnalysis } from "../../hooks/useAnalysis";
import "./AnalysisPage.css";

export function AnalysisPage() {
    const { platform } = useParams();
    const navigate = useNavigate();
    const { handleSubmit, isLoading, status, result } = useAnalysis(platform!);

    return (
        <div className="analysis-page">
            <button className="back-button" onClick={() => navigate("/")}>
                ← Back
            </button>

            <h1>{platform} Content Analysis</h1>

            <UploadForm
                platform={platform!}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />

            {status && (
                <StatusMessage message={status.message} type={status.type} />
            )}
            {result && <AnalysisResults result={result} />}
        </div>
    );
}
