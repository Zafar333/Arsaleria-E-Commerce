import Fotter from "@/components/fotter/Fotter";
import Header from "@/components/header/Header"
const layout = ({ children }) => {
  return <div className="">
      <Header/>
  <main className="">
    {children}
  </main>
  <Fotter/>
    
  </div>
};

export default layout;
