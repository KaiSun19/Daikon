import '../styles/globals.css'
import '../styles/NavbarStyles.scss';
import '../styles/WelcomeStyles.scss';
import '../styles/DaikonUIStyles.scss';
import { DaikonProvider } from '../Context';
import { ThemeProvider } from '@emotion/react';
import { themeOptions } from '../styles/themes';

export default function App({ Component, pageProps }) {

  return( 
    <>
      <DaikonProvider>
        <ThemeProvider theme={themeOptions}>
          <Component {...pageProps} />
        </ThemeProvider>
      </DaikonProvider>
    </>
  )


}
