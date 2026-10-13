import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'flashcompare-luxury-secret-key-2026';

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: user.role === 'owner' ? '2h' : '24h' }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      return next();
    }
  }

  // Development & local fallback for testing when session token is renewing
  const devUserId = req.headers['x-user-id'];
  if (process.env.NODE_ENV !== 'production' && devUserId) {
    if (devUserId === 'adm-01') {
      req.user = { id: 'adm-01', role: 'admin', email: 'admin@flashcompare.ai' };
      return next();
    }
    if (devUserId === 'own-01') {
      req.user = { id: 'own-01', role: 'owner', email: 'owner@flashcompare.ai' };
      return next();
    }
    if (devUserId === 'usr-01') {
      req.user = { id: 'usr-01', role: 'customer', email: 'user@flashcompare.ai' };
      return next();
    }
  }

  return res.status(401).json({ error: 'Authentication required' });
};

export const requireRole = (allowedRoles) => {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permission denied for this resource' });
    }
    next();
  };
};
