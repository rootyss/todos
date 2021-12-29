import React from 'react';
import { useCookies } from 'react-cookie';
import CookieConsent from '../cookieConsent/CookieConsent.jsx';

const Footer = () => {
  const [cookies, setCookie] = useCookies(['cookieConsent']);

  const handlerCookieConsent = () => {
    setCookie('cookieConsent', true, { path: '/' });
  };

  return (
    <footer className="border-top">
      <div className="container my-3"><a className="tdn" href="https://github.com/rootyss">Rooty</a></div>
      {
        !cookies.cookieConsent
          ? (
            <CookieConsent handlerCookieConsent={handlerCookieConsent} />
          )
          : null
      }
    </footer>
  );
};

export default Footer;
