export function requireAuth(role: "ADMIN" | "PROJECT") {
  return (req, res, next) => {
    const user = req.user;

    if (!user) return res.status(401).json({ error: "Unauthorized" });

    if (role && user.role !== role) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  };
}
