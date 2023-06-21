import ButtonSlide from "./ButtonSlide";

export default function ProductHeader() {
  return (
    <div className="px-6 md:px-12 flex justify-between items-center mb-5 mt-8">
      <h1 className="text-black font-medium text-2xl leading-7">
        Find Your Flow Fits
      </h1>
      <div className="flex gap-4 items-center">
        <h2 className="text-base font-medium leading-6 text-grey">Shop</h2>
        <div className="hidden md:flex gap-4">
          <ButtonSlide type="prev" />
          <ButtonSlide type="next" />
        </div>
      </div>
    </div>
  );
}
