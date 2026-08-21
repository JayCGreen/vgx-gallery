import type { NextConfig } from "next";

module.exports = {
  experimental: {
    serverActions: true,
  },
}

const nextConfig: NextConfig = {
	/* config options here */
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
