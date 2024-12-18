// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Link ke manifest */}
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          <link rel="icon" href="/icons/icon-192x192.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Memuat file JavaScript pendaftaran Service Worker */}
          <script src="/service-worker-registration.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
