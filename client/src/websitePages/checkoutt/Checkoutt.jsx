import StripeProvider from "@/components/checkoutComponents/StripeProvider";

const Checkoutt = () => {
  return (
    <div className="mt-[100px] max-w-[1400px] m-auto">
      <div>
        <StripeProvider />
      </div>
    </div>
  );
};

export default Checkoutt;
