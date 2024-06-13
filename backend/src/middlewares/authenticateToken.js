import jwt from "jsonwebtoken";

const authenticateToken = (requiredRole) => (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      req.user = decoded; // storing decoded user information for further use
      next();
    }
  );
};

export default authenticateToken;
