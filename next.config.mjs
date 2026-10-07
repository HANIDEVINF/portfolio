/** @type {import("next").NextConfig} */
const nextConfig = {
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT === "true"
    ? { output: "export", trailingSlash: true }
    : {}),
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}
export default nextConfig
