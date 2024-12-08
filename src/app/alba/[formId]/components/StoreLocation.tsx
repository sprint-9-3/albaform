import CopyButton from "@/components/button/CopyButton";
import KakaoMap from "@/components/map/KakaoMap";

const StoreLocation = ({ location }: { location: string }) => {
  return (
    <section className="h-[340px] w-full pc:h-[562px]">
      <h2 className="h-[58px] w-full text-2lg text-black-500 pc:h-[78px] pc:px-0 pc:text-3xl">
        근무 지역
      </h2>
      <div className="flex justify-between text-md text-black-400 pc:mt-6 pc:p-0">
        <span className="w-[240px] pc:w-[640px] pc:text-2xl">{location}</span>
        <CopyButton text={location} />
      </div>
      <div className="mt-2 h-[210px] w-full pc:mt-12 pc:h-[380px] pc:px-0">
        <KakaoMap location={location} />
      </div>
    </section>
  );
};

export default StoreLocation;
