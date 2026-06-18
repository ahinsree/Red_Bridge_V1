"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function AdminPage() {
  useEffect(() => {
    document.title = "Content Manager | Red Bridge Advisory";
  }, []);

  return (
    <>
      {/* Tell Decap CMS where to find the config.yml file */}
      <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />

      {/* Load Decap CMS from CDN */}
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />
    </>
  );
}
