import { useNavigate } from "react-router-dom";
import { SocialMediaCard } from "../../components/SocialMediaCard";
import { PLATFORMS } from "../../constants/config";
import { PlatformLogos } from "../../constants/platformLogos";
import "./HomePage.css";

export function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <h1 className="platform-title">Cyberbully Classifier</h1>
            <div className="platform-grid">
                {Object.entries(PLATFORMS).map(([key, platform]) => (
                    <SocialMediaCard
                        key={key}
                        platform={platform}
                        icon={PlatformLogos[key as keyof typeof PlatformLogos]}
                        onPress={() => navigate(`/${platform}`)}
                    />
                ))}
            </div>
        </div>
    );
}
