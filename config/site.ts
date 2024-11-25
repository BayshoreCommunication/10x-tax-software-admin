export const siteConfig = {
  siteMetadata: {
    title: "",
    description: "",
  },
  siteLogo: { url: "" },
  sideBarItems: [
    { slug: "/", label: "Dashboard" },
    { slug: "/users", label: "Users" },
    { slug: "/tax-settings", label: "Tax Settings" },
    { slug: "/settings", label: "Settings" },
  ],
};

export type SiteConfig = typeof siteConfig;
