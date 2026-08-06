/**
 * Extract error message from Axios error response
 * Handles different error formats from the backend
 */
export function getErrorMessage(error) {
  // If error response exists with data
  if (error.response?.data) {
    const data = error.response.data;

    // If the backend sends { message: "..." }
    if (data.message) {
      return data.message;
    }

    // If the backend sends { error: "..." }
    if (data.error) {
      return data.error;
    }

    // If the backend sends { errors: { field: "message" } }
    if (data.errors) {
      const firstError = Object.values(data.errors)[0];
      if (typeof firstError === "string") {
        return firstError;
      }
      if (Array.isArray(firstError)) {
        return firstError[0];
      }
    }
  }

  // If error has a message property (network errors, etc.)
  if (error.message) {
    return error.message;
  }

  // Fallback messages based on status code
  if (error.response?.status === 400) {
    return "Invalid request. Please check your input.";
  }
  if (error.response?.status === 401) {
    return "Invalid email or password. Please try again.";
  }
  if (error.response?.status === 403) {
    return "You don't have permission to perform this action.";
  }
  if (error.response?.status === 404) {
    return "The requested resource was not found.";
  }
  if (error.response?.status === 409) {
    return "Email already exists. Please use a different email.";
  }
  if (error.response?.status === 422) {
    return "Validation error. Please check your input.";
  }
  if (error.response?.status === 500) {
    return "Server error. Please try again later.";
  }

  // Ultimate fallback
  return "Something went wrong. Please try again.";
}
