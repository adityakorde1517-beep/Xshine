
import "./globals.css";

export const metadata = {
  title: {
    default: "Xshines | Metal Dishwashing Scrubbers",
    template: "%s | Xshines",
  },

  description:
    "Xshines offers quality metal scrubbers for dishwashing, helping remove tough grease and stubborn stains.",

  keywords: [
    "Xshines",
    "metal scrubber",
    "dishwashing scrubber",
    "steel scrubber",
    "kitchen cleaning",
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
