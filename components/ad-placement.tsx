"use client";

import { AdBanner } from "./adsense";

type AdPlacementProps = {
  type: "banner" | "sidebar" | "in-article";
};

export const AdPlacement = ({ type }: AdPlacementProps) => {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";

  // Different ad configurations based on type
  const adConfig = {
    banner: {
      slot: process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT || "",
      format: "auto",
      fullWidth: true,
    },
    sidebar: {
      slot: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "",
      format: "auto",
      fullWidth: false,
    },
    "in-article": {
      slot: process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT || "",
      format: "auto",
      fullWidth: true,
    },
  };

  const config = adConfig[type];

  return (
    <div className={`w-full ${type === "sidebar" ? "max-w-[300px]" : ""}`}>
      <AdBanner
        dataAdSlot={config.slot}
        dataAdFormat={config.format}
        dataFullWidthResponsive={config.fullWidth}
        clientId={clientId}
      />
    </div>
  );
};
