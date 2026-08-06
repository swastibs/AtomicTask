import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/shared/PrivateRoute";
import PublicRoute from "./components/shared/PublicRoute";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";

function App() {
  // Re‑trigger animations after mount
  useEffect(() => {
    const els = document.querySelectorAll(
      ".hero-line, .animate-in, .section-reveal, .animate-float, .animate-slow-drift, .animate-shimmer, .animate-caret, .animate-marquee-up, .animate-marquee-down",
    );
    els.forEach((el) => {
      el.style.animation = "none";
      requestAnimationFrame(() => {
        el.style.animation = "";
      });
    });
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="relative isolate flex min-h-screen flex-col bg-background">
            <div
              className="app-grid pointer-events-none fixed inset-0 z-0"
              aria-hidden="true"
            />
            <Navbar />
            <main className="relative z-10 flex-1">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Auth />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <Auth />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
            <div className="relative z-10">
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
