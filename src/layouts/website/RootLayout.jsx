import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { FaWhatsapp } from 'react-icons/fa';

const RootLayout = () => {
  const whatsappNumber = "919967157463";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
};

export default RootLayout; 