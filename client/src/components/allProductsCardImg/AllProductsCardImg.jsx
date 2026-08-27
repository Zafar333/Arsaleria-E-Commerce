import Image from "next/image";
import SeeProductDetail from "./SeeProductDetail";

const AllProductsCardImg = async ({ allProductsData }) => {
  // const [allProductImgs, setAllProductImgs] = useState([
  //   "/homepageImgs/2.webp",
  //   "/homepageImgs/11.webp",
  //   "/homepageImgs/3.webp",
  //   "/homepageImgs/4.webp",
  //   "/homepageImgs/12.jpg",
  //   "/homepageImgs/6.webp",
  //   "/homepageImgs/7.webp",
  //   "/homepageImgs/13.webp",
  //   "/homepageImgs/8.webp",
  //   "/homepageImgs/9.webp",
  //   "/homepageImgs/10.webp",
  //   "/homepageImgs/14.jpg",
  //   "/homepageImgs/1.webp",
  //   "/homepageImgs/5.webp",
  // ]);
  // const[cardLength,setCardLength]=useState(["1","2","3","4","5","6"])

  return (
    /* card */
    /* loop is apply this div */
    allProductsData?.length > 0 ? (
      allProductsData?.map((prod, ind) => (
        <div className="border border-gray-200 h-fit" key={ind}>
          <div className=" bg-whiteGray h-[240px] sm:h-[300px] flex rounded-sm">
            <Image
              alt="Image"
              width={410}
              height={200}
              src={prod?.secure_url}
              className="w-full h-full object-contain "
            />
            {/* <img src={img} className="w-full h-full  object-center" /> */}
          </div>
          {/* card text Content */}
          <div className="mt-[10px]">
            <p className="font-Poppins text-[15px] md:text-[18px] text-center text-darkGray bolder font-bold">
              {prod?.product_name}
            </p>
            <div className="grid grid-cols-3 mt-[5px]">
              <p className="font-Poppins text-[15px] md:text-[18px] text-textLightGray text-end">
                {prod?.sellproduct_price_1kg}
              </p>
              <p className="flex justify-center items-center">|</p>
              <p className="font-Poppins text-[15px] md:text-[18px] text-textLightGray ">
                Rs
              </p>
            </div>
            <SeeProductDetail prod={prod} />
          </div>
        </div>
      ))
    ) : (
      <div className="text-[17px] font-Roboto  text-darkGreen">
        No Product Found
      </div>
    )
    /* card text Content */
    /* loop is apply this div */
    /* {card} */
  );
};

export default AllProductsCardImg;
