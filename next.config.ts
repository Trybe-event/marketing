import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This value is a public origin, never a credential. The alias supports the
  // Vercel variable chosen by the maintainer consistently in server/client code.
  env: {
    NEXT_PUBLIC_WEB_APP_URL:
      process.env.WEB_APP_URL ||
      process.env.web_app_url ||
      process.env.NEXT_PUBLIC_WEB_APP_URL ||
      "",
  },
};

export default nextConfig;
