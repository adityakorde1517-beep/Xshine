import "./globals.css";

export const metadata = {
  title: "Xshines | Metal Dishwashing Scrubbers",
  description:
    "Xshines offers quality metal scrubbers for dishwashing, designed to tackle tough grease, stubborn stains, and everyday kitchen cleaning. Discover reliable cleaning solutions for your home and business.",
  keywords: [
    "Xshines",
    "metal scrubber",
    "dishwashing scrubber",
    "steel scrubber",
    "kitchen cleaning",
    "dish cleaning scrubber",
    "metal cleaning scrubber",
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