export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  siteMetadata: {
    title: "",
    description: "",
  },
  siteLogo: { url: "" },
  mainNav: [
    { title: "Home", slug: "/" },
    { title: "About Us", slug: "/about" },
    { title: "Services", slug: "/services" },
    { title: "Case Studies", slug: "/case-studies" },
    { title: "Blog", slug: "/blog" },
  ],

  footer: {
    footer_logo: "",
    description: "",
    company: [
      {
        title: "Disclaimers",
        slug: "/disclaimers",
      },
      {
        title: "Privacy Policy",
        slug: "/privacy-policy",
      },

      {
        title: "Terms of Service",
        slug: "/terms-of-service",
      },
      {
        title: "Cookie Policy",
        slug: "/cookie-policy",
      },
    ],
    quick_links: [
      {
        title: "About Us",
        slug: "/about",
      },
      {
        title: "Practice Areas",
        slug: "/practice-areas",
      },
      {
        title: "Blog",
        slug: "/blog",
      },
      {
        title: "Testimonials",
        slug: "/testimonials",
      },
      {
        title: "Contact Us",
        slug: "/contact",
      },
    ],
  },
  socialLinks: [
    {
      title: "Facebook",
      url: "",
    },
    {
      title: "Twitter",
      url: "#",
    },
    {
      title: "Instagram",
      url: "#",
    },
    {
      title: "LinkedIn",
      url: "#",
    },
  ],
};
