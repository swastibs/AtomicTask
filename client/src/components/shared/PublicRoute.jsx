import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from "./Spinner";

/**
 * PublicRoute Component
 * Protects public routes from authenticated access.
 * - If loading: shows a spinner
 * - If logged in: redirects to /dashboard
 * - If not logged in: renders the child component
 *
 * Use this for pages like Login, Signup, Landing (if needed)
 */
export function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return <Spinner size="lg" className="min-h-[70vh]" />;
  }

  // If logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not logged in, render the public content
  return children;
}

export default PublicRoute;
