import '@styles/globals.css'
import { useEffect } from 'react'

function Application({ Component, pageProps }) {
  useEffect(() => {
    // Load Netlify Identity widget
    if (typeof window !== 'undefined') {
      const netlifyIdentity = require('netlify-identity-widget')
      netlifyIdentity.init()
      
      // Handle redirect after login
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on("init", user => {
          if (!user) {
            window.netlifyIdentity.on("login", () => {
              document.location.href = "/admin/";
            });
          }
        });
      }
    }
  }, [])

  return <Component {...pageProps} />
}

export default Application
