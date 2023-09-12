// 套用至所有 page files
import '../styles/globals.css';

export default function App({ Component, pageProps }: {
    Component: React.ComponentType;
    pageProps: Record<string, any>;
}) {
    return <Component {...pageProps} />

}