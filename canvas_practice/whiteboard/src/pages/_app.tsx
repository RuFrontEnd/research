// 套用至所有 page files
import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }: {
    Component: React.ComponentType;
    pageProps: Record<string, any>;
}) {
    return <Component {...pageProps} />

}