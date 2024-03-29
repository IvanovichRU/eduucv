import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Base from '../componentes/Base/Base'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    if (router.pathname === '/') {
        return (
            <>
                <Head>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                </Head>
                <Component {...pageProps} />
            </>
        );
    } else {
        return (
            <Base>
                <Head>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                </Head>
                <Component {...pageProps} />
            </Base>
        )
    }
}
