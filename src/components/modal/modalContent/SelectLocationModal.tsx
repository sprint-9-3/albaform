import SolidButton from "@/components/button/SolidButton";
import ModalContainer from "../modalContainer/ModalContainer";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";
import SearchLocation from "@/components/input/SearchLocation";
import KakaoMap2 from "@/components/map/KakaoMap2";
import KakaoMap from "@/components/map/KakaoMap";
import { useAtom } from "jotai";
import { addressAtom } from "@/atoms/addressAtom";
import { useToast } from "@/hooks/useToast";

const SelectLocationModal = () => {
  const { addToast } = useToast();
  const { closeModal } = useModal();
  const [location, setLocation] = useState<string>("");
  const [address, setAddress] = useAtom(addressAtom);

  const handleSearch = (search: string) => {
    setLocation(search);
  };

  const handleLocationFound = (newAddress: string) => {
    setAddress(newAddress);
  };

  const handleSubmit = () => {
    addToast("근무지가 입력되었습니다", "success");
    closeModal();
  };

  return (
    <ModalContainer>
      <div className="flex flex-col items-center pb-[8px] pc:max-w-[720px]">
        <h2 className="text-2lg font-semibold text-black-400 pc:text-[32px] pc:leading-[46px]">
          근무지역 선택
        </h2>
        <div className="mt-6 flex w-full gap-3">
          <SearchLocation onSearch={handleSearch} />
          <div className="w-[80px] pc:h-[62px] pc:w-[200px]">
            <SolidButton style="orange300">검색</SolidButton>
          </div>
        </div>
        <form className="flex w-full flex-col">
          <div className="mt-6 flex flex-col gap-6">
            <div className="h-[280px] w-full pc:h-[380px] pc:px-0">
              <KakaoMap2
                location={location}
                onLocationFound={handleLocationFound}
                clickEnabled
              />
              {/* <KakaoMap location={location} /> */}
              <p>{address}</p>
            </div>
            <div className="flex gap-3">
              <SolidButton
                style="gray100"
                type="button"
                onClick={() => {
                  closeModal();
                }}
              >
                취소
              </SolidButton>

              <SolidButton
                style="orange300"
                type="submit"
                onClick={handleSubmit}
              >
                게시하기
              </SolidButton>
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default SelectLocationModal;
