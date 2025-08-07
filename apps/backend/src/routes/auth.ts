import express from "express";

import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import fetch from "node-fetch";
import querystring from "querystring";
import { enrichUser } from "../components/users/enrichUser";
import { linkUserAndKOL } from "../components/users/linkUserAndKOL";
import {
  adminLogin,
  getMe,
  loginWithEmail,
  loginWithTwitter,
} from "../controllers/auth";
import { authenticateToken } from "../middleware/auth";
import { authTwitter } from "../middleware/authTwitter";

const prisma = new PrismaClient();

const authRoutes = express.Router();

authRoutes.post("/admin/login", adminLogin);

authRoutes.get("/admin/me", authenticateToken, async (req, res) => {
  //@ts-ignore
  const user = req.user as { userId: number };

  try {
    const adminUser = await prisma.adminUser.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        username: true,
        role: true,
        projectId: true,
      },
    });

    if (!adminUser) return res.status(404).json({ error: "User not found" });

    res.json(adminUser);
  } catch (error) {
    console.error("Error in /admin/me:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRoutes.post("/login/email", loginWithEmail);
authRoutes.post("/login/twitter", loginWithTwitter);
authRoutes.get("/me", authTwitter, getMe);

const clientId = process.env.TWITTER_CLIENT_ID!;
const clientSecret = process.env.TWITTER_CLIENT_SECRET!;
const redirectUri = process.env.TWITTER_REDIRECT_URI!;

// ✅ Генерируем code_verifier/challenge для PKCE
const codeVerifier = crypto.randomBytes(32).toString("hex");
const codeChallenge = crypto
  .createHash("sha256")
  .update(codeVerifier)
  .digest("base64url");

// Step 1: Redirect to Twitter
authRoutes.get("/twitter", (req, res) => {
  // ✅ Генерируем уникальный state для каждого запроса
  const ref = req.query.ref as string | undefined; // если пришёл ?ref=abcd
  const redirectAfterCallback = req.query.redirectAfterCallback as
    | string
    | undefined; // если пришёл ?ref=abcd
  const statePayload = {
    nonce: crypto.randomBytes(16).toString("hex"),
    ref: ref || null,
    redirectAfterCallback: redirectAfterCallback || null,
  };
  const state = Buffer.from(JSON.stringify(statePayload)).toString("base64url");

  // ✅ Собираем OAuth URL
  const query = querystring.stringify({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "tweet.read users.read offline.access",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  res.redirect(`https://twitter.com/i/oauth2/authorize?${query}`);
});

// Step 2: Twitter callback
authRoutes.get("/callback/twitter", async (req, res) => {
  let code = req.query.code;
  if (Array.isArray(code)) {
    code = code[0];
  }
  if (typeof code !== "string") {
    return res.status(400).json({ error: "Invalid code parameter" });
  }

  const body = {
    code,
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  };

  const response = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: querystring.stringify(body),
  });

  const data: any = await response.json();

  if (!data?.access_token) {
    return res.status(401).json({ error: "OAuth failed", detail: data });
  }
  console.log("Twitter oauth callback data", data);

  const userResponse = await fetch(
    "https://api.twitter.com/2/users/me?user.fields=id,name,username,profile_image_url",
    {
      headers: {
        Authorization: `Bearer ${data?.access_token}`,
      },
    }
  );

  const userData: any = await userResponse.json();

  console.log("Twitter auth callback userData", userData);

  const stateParam = req.query.state as string;
  let referralCodeFromState: string | null = null;
  let redirectAfterCallbackFromState: string | null = null;

  try {
    const decoded = JSON.parse(Buffer.from(stateParam, "base64url").toString());
    referralCodeFromState = decoded.ref;
    redirectAfterCallbackFromState = decoded.redirectAfterCallback;
  } catch (err) {
    console.warn("Failed to parse OAuth state", err);
  }

  await enrichUser(
    userData?.data?.username,
    false,
    referralCodeFromState
  ).catch(console.error);

  linkUserAndKOL(userData?.data?.username).catch(console.error);

  // Удаляем куки с реферальным кодом
  res.setHeader(
    "Set-Cookie",
    "referral_code=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict"
  );

  // Устанавливаем куки для токена и пользователя
  res.cookie("twitter_token", data?.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  if (userData?.data?.username) {
    res.cookie("twitter_user", userData?.data?.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
  }

  res.redirect(redirectAfterCallbackFromState || "/social-card");
});

authRoutes.post("/logout", (req, res) => {
  res.clearCookie("twitter_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out" });
});

export { authRoutes };
