import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/shared/PrivateRoute";
import PublicRoute from "./components/shared/PublicRoute";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
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
                {/* Public Routes - Accessible to everyone */}
                <Route path="/" element={<Landing />} />

                {/* Auth Routes - Redirect to dashboard if already logged in */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <Signup />
                    </PublicRoute>
                  }
                />

                {/* Protected Routes - Require authentication */}
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
