class ApiResponse {
  static success(res, options = {}) {
    const {
      statusCode = 200,
      message = "Success",
      data = null,
      ...extra
    } = options;

    const response = {
      success: true,
      message,
      ...extra,
    };

    if (data !== null && data !== undefined) {
      response.data = data;
    }

    return res.status(statusCode).json(response);
  }

  static error(res, statusCode, message, errors = null, extra = {}) {
    const response = {
      success: false,
      message,
      ...extra,
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  static ok(res, data, message = "Success") {
    return this.success(res, { statusCode: 200, message, data });
  }

  static created(res, data, message = "Resource created successfully") {
    return this.success(res, { statusCode: 201, message, data });
  }

  static noContent(res, message = "No content") {
    return res.status(204).json({ success: true, message });
  }

  static badRequest(res, message = "Bad request", errors = null) {
    return this.error(res, 400, message, errors);
  }

  static unauthorized(res, message = "Unauthorized") {
    return this.error(res, 401, message);
  }

  static forbidden(res, message = "Forbidden") {
    return this.error(res, 403, message);
  }

  static notFound(res, message = "Not found") {
    return this.error(res, 404, message);
  }

  static conflict(res, message = "Conflict", errors = null) {
    return this.error(res, 409, message, errors);
  }

  static internal(res, message = "Internal server error") {
    return this.error(res, 500, message);
  }
}

module.exports = {
  ApiResponse,
  successResponse: ApiResponse.success.bind(ApiResponse),
  errorResponse: ApiResponse.error.bind(ApiResponse),
};
