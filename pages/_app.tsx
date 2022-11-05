import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Base from '../componentes/Base/Base'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Base>
            <Component {...pageProps} />
        </Base>
    )
}
