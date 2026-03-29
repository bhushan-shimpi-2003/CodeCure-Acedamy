const supabase = require('../config/supabaseClient');

/**
 * Protect routes - Verify Supabase Auth token
 * Extracts the JWT token from the Authorization header,
 * verifies it with Supabase, and attaches the user profile to req.user
 */
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized - no token provided',
    });
  }

  try {
    // Verify the token with Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error('Supabase getUser error:', error);
      return res.status(401).json({
        success: false,
        error: 'Not authorized - invalid token',
        details: error ? error.message : 'No user returned from Supabase',
      });
    }

    // Fetch the user's profile (which includes their RBAC role)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      console.error('Supabase profile fetch error:', profileError);
      return res.status(401).json({
        success: false,
        error: 'User profile not found',
        details: profileError ? profileError.message : 'No profile found',
      });
    }

    // Attach user profile (with role) to the request object
    req.user = profile;
    next();
  } catch (err) {
    console.error('Catch error in protect:', err);
    return res.status(401).json({
      success: false,
      error: 'Not authorized - token verification failed',
      details: err.message,
    });
  }
};

/**
 * RBAC Middleware - Grant access to specific roles only
 * Usage: authorize('admin', 'teacher')
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};
