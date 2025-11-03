import { RequestHandler } from "express";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY =
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "";

// In-memory store for development (not for production)
const devUsers: Map<
  string,
  {
    id: string;
    email: string;
    password: string;
    profile?: Record<string, any>;
  }
> = new Map();

const isDevMode = !SUPABASE_URL || !SUPABASE_KEY;

export const handleSignUp: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email and password are required" });
  }

  try {
    // Development mode: use in-memory storage
    if (isDevMode) {
      const userId = `user_${Date.now()}`;
      const user = { id: userId, email };
      const profile = { id: userId, auth_id: userId, email };
      devUsers.set(email, { id: userId, email, password, profile });

      return res.status(200).json({
        user,
        profile,
        message: "User created (dev mode)",
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .insert({
          auth_id: data.user.id,
          email,
        })
        .select()
        .single();

      if (profileError) {
        return res.status(500).json({ error: profileError.message });
      }

      return res.status(200).json({
        user: data.user,
        profile,
        message: "User created successfully",
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sign up failed";
    // eslint-disable-next-line no-console
    console.error("Sign up error:", message);
    return res.status(500).json({ error: message });
  }
};

export const handleSignIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email and password are required" });
  }

  try {
    // Development mode
    if (isDevMode) {
      const user = devUsers.get(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      return res.status(200).json({
        session: { access_token: `token_${user.id}` },
        user: { id: user.id, email: user.email },
        profile: user.profile || null,
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    if (data.session) {
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", data.user.id)
        .single();

      return res.status(200).json({
        session: data.session,
        user: data.user,
        profile: profile || null,
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sign in failed";
    // eslint-disable-next-line no-console
    console.error("Sign in error:", message);
    return res.status(500).json({ error: message });
  }
};

export const handleSignOut: RequestHandler = async (req, res) => {
  try {
    if (isDevMode) {
      return res.status(200).json({ message: "Signed out successfully" });
    }

    const { session } = req.body;
    if (!session || !session.access_token) {
      return res.status(400).json({ error: "Session is required" });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      },
      auth: { persistSession: false },
    });

    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: "Signed out successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sign out failed";
    // eslint-disable-next-line no-console
    console.error("Sign out error:", message);
    return res.status(500).json({ error: message });
  }
};

export const handleWalletConnect: RequestHandler = async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
    // Development mode: use wallet address as identifier
    if (isDevMode) {
      const walletEmail = `wallet-${walletAddress.toLowerCase()}@wallet.local`;
      const existing = devUsers.get(walletEmail);

      if (existing) {
        return res.status(200).json({
          session: { access_token: `token_${existing.id}` },
          user: { id: existing.id, email: existing.email },
          profile: existing.profile || null,
          isNewWallet: false,
        });
      }

      // Create new wallet user
      const userId = `wallet_${Date.now()}`;
      const user = { id: userId, email: walletEmail };
      const profile = { id: userId, auth_id: userId, email: walletEmail };
      devUsers.set(walletEmail, { id: userId, email: walletEmail, password: walletAddress, profile });

      return res.status(200).json({
        user,
        profile,
        isNewWallet: true,
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false },
    });

    const walletEmail = `wallet-${walletAddress.toLowerCase()}@wallet.local`;

    // Try to create user
    let { data: signUpData, error: signUpError } =
      await supabase.auth.admin.createUser({
        email: walletEmail,
        password: walletAddress,
        email_confirm: true,
      });

    // If user already exists, sign in instead
    if (signUpError && signUpError.message.includes("already registered")) {
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: walletEmail,
          password: walletAddress,
        });

      if (signInError) {
        return res.status(401).json({ error: signInError.message });
      }

      if (signInData.session && signInData.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("auth_id", signInData.user.id)
          .single();

        return res.status(200).json({
          session: signInData.session,
          user: signInData.user,
          profile: profile || null,
          isNewWallet: false,
        });
      }
    } else if (signUpError) {
      return res.status(400).json({ error: signUpError.message });
    }

    if (signUpData && signUpData.user) {
      const { data: profile } = await supabase
        .from("users")
        .insert({
          auth_id: signUpData.user.id,
          email: walletEmail,
        })
        .select()
        .single();

      return res.status(200).json({
        user: signUpData.user,
        profile: profile || null,
        isNewWallet: true,
      });
    }

    return res.status(500).json({ error: "Failed to connect wallet" });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Wallet connection failed";
    // eslint-disable-next-line no-console
    console.error("Wallet connect error:", message);
    return res.status(500).json({ error: message });
  }
};

export const handleGetSession: RequestHandler = async (req, res) => {
  try {
    if (isDevMode) {
      // In dev mode, we don't have real sessions
      return res.status(401).json({ error: "No session in dev mode" });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No session token provided" });
    }

    const token = authHeader.slice(7);

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      auth: { persistSession: false },
    });

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    if (data.user) {
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", data.user.id)
        .single();

      return res.status(200).json({
        user: data.user,
        profile: profile || null,
      });
    }

    return res.status(401).json({ error: "No user found" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get session";
    // eslint-disable-next-line no-console
    console.error("Get session error:", message);
    return res.status(500).json({ error: message });
  }
};
