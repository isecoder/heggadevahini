import Head from "next/head";

export default function SEOHead() {
  return (
    <Head>
      <title>Heggade Vahini - Latest News & Updates</title>
      <meta
        name="description"
        content="Stay updated with the latest news, stories, and insights on Heggade Vahini. Explore trending articles and stay informed."
      />
      <meta
        name="keywords"
        content="Heggade Vahini, news blog, latest news, trending stories, Karnataka news, local updates"
      />
      
      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content="Heggade Vahini - Latest News & Updates" />
      <meta
        property="og:description"
        content="Catch up on the latest news, stories, and trending updates on Heggade Vahini. Stay informed and connected."
      />
      <meta property="og:image" content="https://www.heggadevahini.com/logo.jpeg" />
      <meta property="og:url" content="https://www.heggadevahini.com/" />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card (X) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Heggade Vahini - Latest News & Updates" />
      <meta
        name="twitter:description"
        content="Discover the latest news, trending stories, and insights on Heggade Vahini. Stay connected with current affairs."
      />
      <meta name="twitter:image" content="https://www.heggadevahini.com/logo.jpeg" />
    </Head>
  );
}
