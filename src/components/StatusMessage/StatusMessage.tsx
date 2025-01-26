import { StatusMessageProps } from "../../types";
import "./StatusMessage.css";

export function StatusMessage({ message, type }: StatusMessageProps) {
    return <div className={`status-message ${type}`}>{message}</div>;
}
