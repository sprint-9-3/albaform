import {
  currentImageListAtom,
  temporaryDataByStepAtom,
} from "@/atoms/addFormAtomStore";
import ImageInput from "@/components/button/ImageInput";
import useViewPort from "@/hooks/useViewport";
import { fileToBase64 } from "@/utils/imageFileConvert";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

const AddformImage = () => {
  const viewPort = useViewPort();
  const [currentImageList, setCurrentImageList] = useAtom(currentImageListAtom);
  const setTemporaryDataByStep = useSetAtom(temporaryDataByStepAtom);

  const updateTempImage = useCallback(async () => {
    const base64Images = await Promise.all(
      currentImageList.map((img) => fileToBase64(img))
    );

    setTemporaryDataByStep((prev) => ({
      ...prev,
      stepOne: {
        title: prev.stepOne?.title || "",
        description: prev.stepOne?.description || "",
        recruitmentStartDate: prev.stepOne?.recruitmentStartDate || "",
        recruitmentEndDate: prev.stepOne?.recruitmentEndDate || "",
        tempImage: base64Images,
      },
    }));
  }, [currentImageList, setTemporaryDataByStep]);

  useEffect(() => {
    if (currentImageList.length > 0) {
      updateTempImage();
    }
  }, [currentImageList, updateTempImage]);

  return (
    <div className="flex flex-col space-y-4">
      <label
        htmlFor="image"
        className="text-md font-medium text-black-400 pc:text-xl"
      >
        이미지 첨부
      </label>
      <ImageInput
        size={viewPort === "pc" ? "medium" : "small"}
        onImageChange={setCurrentImageList}
        initialImage={currentImageList}
        limit={3}
        sizeCheck={true}
      />
    </div>
  );
};

export default AddformImage;
