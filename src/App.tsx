import { Suspense, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from "./components/home";
import TranscriptExtractionSection from "./components/TranscriptExtractionSection";
import Login from "./components/login";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import routes from "tempo-routes";

const clientId = "44254493802-69pljbpjink1p89tteb339jld67d74nd.apps.googleusercontent.com"; // Replace with your actual client ID

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route
              path="/extract"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <TranscriptExtractionSection />
                </PrivateRoute>
              }
            />
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
    </GoogleOAuthProvider>
  );
}

export default App;