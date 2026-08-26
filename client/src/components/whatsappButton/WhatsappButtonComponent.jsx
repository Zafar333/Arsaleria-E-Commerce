import { FaWhatsapp } from "react-icons/fa";

const WhatsappButtonComponent = () => {
  const phoneNumber = "923028970074"; // country code + number, without +

  const message = "Hello, I would like to know more about your products.";
  //   Website: ${process.env.NEXT_PUBLIC_SITE_URL}`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  return (
    <div>
      {" "}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-200 hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="text-4xl" />
      </a>
    </div>
  );
};

export default WhatsappButtonComponent;
