import "@/styles/globals.css";
import '@/components/Button/style.module.css'
import '@/components/Header/style.module.css'
import '@/pages/items/itemId.module.css'
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
