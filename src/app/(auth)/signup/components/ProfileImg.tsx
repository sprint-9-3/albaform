import { profileImgAtom } from "@/atoms/signupAtomStore";
import { useToast } from "@/hooks/useToast";
import { useSetAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";

const ProfileImg = () => {
  const [previewSrc, setPreviewSrc] = useState("");
  const setProfileImg = useSetAtom(profileImgAtom);
  const { addToast } = useToast();

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      const file = files[0];
      const imgCheck = file.size < 5 * 1024 * 1024;

      if (!imgCheck) {
        addToast("이미지는 5MB를 넘을 수 없습니다.", "warning");
        return;
      }

      e.target.value = "";

      const imgPreview = new FileReader();
      imgPreview.onloadend = () => {
        if (imgPreview.result && typeof imgPreview.result === "string") {
          setPreviewSrc(imgPreview.result);
          setProfileImg(file);
        }
      };

      imgPreview.readAsDataURL(file);
    }
  };

  return (
    <>
      <label htmlFor="profileImg" className="relative cursor-pointer">
        <Image
          src={previewSrc || "/icon/profile-circle-lg.svg"}
          alt="프로필사진 변경"
          width={80}
          height={80}
          className="size-20 rounded-full border-4 border-line-100 bg-background-200 object-cover pc:size-[100px]"
          priority={true}
        />
        <Image
          src="/icon/write-lg.svg"
          alt="프로필사진 변경 버튼"
          width={24}
          height={24}
          className="absolute bottom-2 right-0 rounded-full border-[3px] border-gray-50 bg-background-300 pc:bottom-0 pc:size-9"
          priority={true}
        />
      </label>
      <input
        type="file"
        id="profileImg"
        name="profileImg"
        className="hidden"
        accept="image/*"
        onChange={handleImgChange}
      />
    </>
  );
};

export default ProfileImg;
