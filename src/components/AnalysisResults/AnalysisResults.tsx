import { AnalysisResultsProps } from "../../types";
import "./AnalysisResults.css";

export function AnalysisResults({ result }: AnalysisResultsProps) {
    if (!result || typeof result !== "object") {
        return null;
    }

    const analysisData = [
        {
            category: "Safe Content",
            value: result.not_bullying,
            color: "safe",
        },
        {
            category: "Age-based Harassment",
            value: result.age,
            color: "harassment",
        },
        {
            category: "Gender-based Harassment",
            value: result.gender,
            color: "harassment",
        },
        {
            category: "Ethnic Discrimination",
            value: result.ethnicity,
            color: "discrimination",
        },
        {
            category: "Religious Discrimination",
            value: result.religion,
            color: "discrimination",
        },
        {
            category: "Other Concerning Content",
            value: result.other_bullying,
            color: "harassment",
        },
    ];

    return (
        <div className="analysis-results">
            <h2>Analysis Results</h2>

            <div className="total-messages">
                <span className="total-messages-value">
                    {result.total_messages || 0}
                </span>
                <span className="total-messages-label">
                    Total Messages Analyzed
                </span>
            </div>

            <div className="results-container">
                {analysisData.map((item) => {
                    const percentage = item.value;

                    return (
                        <div key={item.category} className="result-item">
                            <div className="result-header">
                                <div className="category-label">
                                    <div
                                        className={`category-dot ${item.color}`}
                                    />
                                    <span>{item.category}</span>
                                </div>
                                <span className="percentage-value">
                                    {percentage.toFixed(2)}%
                                </span>
                            </div>

                            <div className="progress-bar-bg">
                                <div
                                    className={`progress-bar ${item.color}`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
