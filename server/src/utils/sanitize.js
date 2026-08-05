const sanitizeUser = (user, extraFields = []) => {
  if (!user) return null;

  const userObj = user.toObject ? user.toObject() : user;

  const defaultFields = [
    "_id",
    "name",
    "email",
    "isActive",
    "createdAt",
    "updatedAt",
  ];

  const allowedFields = [...defaultFields, ...extraFields];

  const sanitized = {};
  for (const field of allowedFields) {
    if (userObj[field] !== undefined) {
      sanitized[field] = userObj[field];
    }
  }

  return sanitized;
};

module.exports = { sanitizeUser };
