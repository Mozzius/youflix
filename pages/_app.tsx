import { useEffect } from "react";
import { AppProps } from "next/app";
import { Provider, signIn, useSession } from "next-auth/client";
import styles from "../styles/App.module.scss";
import "../styles/globals.scss";

interface CustomAppProps extends AppProps {
  Component: AppProps["Component"] & {
    auth: any;
  };
}

export default function App({ Component, pageProps }: CustomAppProps) {
  return (
    <Provider session={pageProps.session}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </Provider>
  );
}

function Auth({ children }) {
  const [session, loading] = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (loading) return;
    if (!isUser) signIn("google");
  }, [isUser, loading]);

  if (isUser) {
    return children;
  } else {
    return <div className={styles.loading}>Loading...</div>;
  }
}
