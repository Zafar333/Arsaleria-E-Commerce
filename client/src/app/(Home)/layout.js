import Fotter from "@/components/fotter/Fotter";
import Header from "@/components/header/Header";
import WhatsappButtonComponent from "@/components/whatsappButton/WhatsappButtonComponent";
import { cookies } from "next/headers";

const layout = async ({ children }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("userAccessToken");
  return (
    <div className="">
      <Header token={token} />
      <main className="">{children}</main>
      <WhatsappButtonComponent />
      <Fotter />
    </div>
  );
};

export default layout;
