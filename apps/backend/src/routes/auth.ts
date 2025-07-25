import cookie from "cookie";
import express from "express";

import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import fetch from "node-fetch";
import querystring from "querystring";
import { updateKOLByUsername } from "../components/kols/updateKOLByUsername";
import { enrichUser } from "../components/users/enrichUser";
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

authRoutes.get("/admin/me", authenticateToken, (req, res) => {
  //@ts-ignore
  const user = req.user as { id: number; username: string; role: string };

  res.json({
    username: user.username,
    role: user.role,
  });
});

authRoutes.post("/login/email", loginWithEmail);
authRoutes.post("/login/twitter", loginWithTwitter);
authRoutes.get("/me", authTwitter, getMe);

const clientId = process.env.TWITTER_CLIENT_ID!;
const clientSecret = process.env.TWITTER_CLIENT_SECRET!;
const redirectUri = process.env.TWITTER_REDIRECT_URI!;

const state = crypto.randomBytes(16).toString("hex");
const codeVerifier = crypto.randomBytes(32).toString("hex");
const codeChallenge = crypto
  .createHash("sha256")
  .update(codeVerifier)
  .digest("base64url");

// Step 1: Redirect to Twitter
authRoutes.get("/twitter", (req, res) => {
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

  enrichUser(userData?.data?.username).catch(console.error);
  updateKOLByUsername(userData?.data?.username).catch(console.error);

  // Читаем куки
  const cookies = cookie.parse(req.headers.cookie || "");
  const referralCode = cookies["referral_code"];

  if (userData?.data?.username) {
    const newUser = await prisma.user.upsert({
      where: { username: userData.data.username },
      update: {
        avatarUrl: userData.data.profile_image_url,
        platform: "twitter",
      },
      create: {
        username: userData.data.username,
        avatarUrl: userData.data.profile_image_url,
        platform: "twitter",
      },
    });

    if (
      referralCode &&
      !newUser.referredById &&
      referralCode !== newUser.referralCode // защита от self-referral
    ) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });

      if (referrer && referrer.id !== newUser.id) {
        await prisma.user.update({
          where: { id: newUser.id },
          data: {
            referredById: referrer.id,
          },
        });

        // Начисление очков, если нужно:
        // await prisma.user.update({
        //   where: { id: referrer.id },
        //   data: {
        //     earnedPoints: { increment: 10 },
        //   },
        // });

        console.log(
          `🎉 User ${newUser.username} referred by ${referrer.username}`
        );
      }
    }

    // Очищаем куку
    res.setHeader(
      "Set-Cookie",
      "referral_code=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict"
    );
  }

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

  res.redirect("/");
});

authRoutes.post("/logout", (req, res) => {
  res.clearCookie("twitter_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out" });
});

export { authRoutes };
