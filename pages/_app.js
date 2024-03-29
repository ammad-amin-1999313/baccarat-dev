// pages/_app.js
import Layout from '../components/Layout';
import '../styles/globals.css';
// pages/_app.js
import 'tailwindcss/tailwind.css';
import Modal from 'react-modal';

// Set the root element for accessibility
Modal.setAppElement('#__next');


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
