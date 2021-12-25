import SideNav from '../components/SideNav'
import '../styles/globals.css'
import 'antd/dist/antd.css'

export default function MyApp({ Component, pageProps, ...appProps }) {
  if (['/signin', '/signup'].includes(appProps.router.pathname)) {
    return <Component {...pageProps} />
  }
  return (
    <SideNav >
      <Component {...pageProps} />
    </SideNav >
  )
}

