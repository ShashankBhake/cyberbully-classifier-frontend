import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { AnalysisPage } from "./pages/AnalysisPage/AnalysisPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:platform" element={<AnalysisPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
