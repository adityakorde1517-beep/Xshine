import "./globals.css";

export const metadata = {
  title: {
    default: "Business Website",
    template: "%s | Business Website",
  },

  description:
    "Explore our products and services. Get in touch with us for more information.",

  keywords: [
    "business",
    "products",
    "services",
    "company",
  ],

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}