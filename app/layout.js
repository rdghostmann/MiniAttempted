import "./globals.css";
import Head from 'next/head';

const roboto = {
  link: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap',
      rel: 'stylesheet',
    },
  ],
};

export const metadata = {
  title: "Hamstaer || Facebook",
  // description: "Mini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link href={roboto.link[0].href} rel={roboto.link[0].rel} />
        <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
      </Head>
      <body className="font-roboto antialiased">
        {children}
      </body>

    </html>
  );
}