import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import TranscriptExtractionSection from "./components/TranscriptExtractionSection";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/extract" element={<TranscriptExtractionSection />} />
          <Route
            path="/pricing"
            element={
              <div className="p-10">
                <h1 className="text-2xl font-bold">
                  Pricing Plans - Coming Soon
                </h1>
              </div>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
