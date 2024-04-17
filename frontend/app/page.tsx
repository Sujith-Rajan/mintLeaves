import OfferBaner from "./component/main/banner/OfferBaner";
import TopBanner from "./component/main/banner/TopBanner";
import ShopByCategory from "./component/main/shopByCategory/ShopByCategory";

export default function Home() {
  return (
    <div className="h-auto w-full">
      <TopBanner/>
      <OfferBaner/>
      <ShopByCategory/>
    </div>
  );
}
