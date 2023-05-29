const auth = (role) => {
  return (async) => (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ status: "error", error: "Unauthorized" });
    const authorised = role.includes(req.user.role);
    if (!authorised)
      // if (req.user.role !== role)
      return res
        .status(403)
        .json({ status: "error", error: "Not enought permissions" });
    return next();
  };
};

export { auth };
