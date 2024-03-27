import { appWithTranslation } from "next-i18next";
import "@/styles/globals.scss";
import { getUrqlClient } from "@/utils/urql";
import type { AppProps } from "next/app";
import { Provider as URQLProvider } from "urql";
import Script from "next/script";

const client = getUrqlClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
            });
            `,
        }}
      />
      <URQLProvider value={client}>
        <Component {...pageProps} />
      </URQLProvider>
    </>
  );
}

export default appWithTranslation(App);
