import React from "react"
import '../styles/globals.css'
import Layout from "@/components/LayoutComponent"
import { Provider } from "react-redux";
import {wrapper,  store} from "../../redux/store"
import { CookiesProvider } from "react-cookie"

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </CookiesProvider>
  )
}

export default wrapper.withRedux(App);
