import Image from "next/image";

const HeaderMenu = () => {
  return (
    <div className="relative h-[24px] w-[24px] pc:h-[32px] pc:w-[32px]">
      <Image src="/icon/menu-lg.svg" fill alt="header menu" />
    </div>
  );
};

export default HeaderMenu;
