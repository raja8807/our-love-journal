import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SSRProvider } from "react-bootstrap";

export default function App({ Component, pageProps }) {
  return (
    <>
      <script
        async
        src="https://upload-widget.cloudinary.com/global/all.js"
        type="text/javascript"
      ></script>
      <SessionProvider session={pageProps.session}>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </SessionProvider>
    </>
  );
}
