const supabase = require('../config/supabaseClient');
const { createClient } = require('@supabase/supabase-js');

// Create a temporary, session-isolated Supabase client for auth operations
// This prevents signInWithPassword/signUp from polluting the shared service-role client
function createAuthClient() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// @desc    Register user (signup)
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, and password' });
    }

    // Use a per-request client so signUp doesn't pollute the shared service-role client
    const authClient = createAuthClient();
    const { data, error } = await authClient.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: 'student' },
      },
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.status(201).json({
      success: true,
      data: {
        user: data.user,
        session: data.session,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // Use a per-request client so signInWithPassword doesn't set session on the shared client
    const authClient = createAuthClient();
    const { data, error } = await authClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Fetch profile (with role) for the frontend using the service-role client (bypasses RLS)
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    res.status(200).json({
      success: true,
      data: {
        user: profile,
        session: data.session,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged-in user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    // Server-side logout is a no-op: the frontend simply discards the token.
    // We do NOT call supabase.auth.signOut() here because that would
    // sign out the shared service-role client, breaking the entire server.
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

