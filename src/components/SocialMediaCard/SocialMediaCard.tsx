import { SocialMediaCardProps } from "../../types";
import "./SocialMediaCard.css";

export function SocialMediaCard({
    platform,
    icon,
    onPress,
}: SocialMediaCardProps) {
    return (
        <div className="social-media-card" onClick={onPress}>
            <img src={icon} alt={platform} className="platform-icon" />
            <h3 className="platform-name">{platform}</h3>
        </div>
    );
}
