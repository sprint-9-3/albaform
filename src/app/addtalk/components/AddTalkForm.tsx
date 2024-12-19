"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTalkSchema } from "@/schema/addTalk/addTalkSchema";
import FormInput from "@/components/input/FormInput";
import ImageInput from "@/components/button/ImageInput";
import SolidButton from "@/components/button/SolidButton";
import useViewPort from "@/hooks/useViewport";
import { z } from "zod";
import { cls } from "@/utils/dynamicTailwinds";
import ErrorText from "@/components/errorText/ErrorText";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useEffect, useState } from "react";
import uploadImage from "../actions/uploadImage";
import addTalk from "../actions/addTalk";
import getAlbaTalkDetail from "@/app/albatalks/[talkId]/getAlbaTalkDetail";
import patchPost from "../actions/patchPost";

const AddTalkForm = () => {
  const searchParams = useSearchParams();
  const talkId = searchParams.get("talkId");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof addTalkSchema>>({
    resolver: zodResolver(addTalkSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<File[]>([]);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const { addToast } = useToast();
  const viewPort = useViewPort();
  const router = useRouter();

  const urlToFile = async (imageUrl: string): Promise<File> => {
    try {
      // URL에서 파일 이름 추출
      const fileName = imageUrl.split("/").pop() || "default.jpg";

      // URL에서 Blob 데이터 가져오기
      const response = await fetch(imageUrl);
      if (!response.ok) {
        console.error("이미지를 가져오는 데 실패했습니다.");
      }

      const blob = await response.blob();

      // Blob을 File 객체로 변환
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      console.error("이미지를 파일로 변환하는 데 실패했습니다: ", error);
      throw error;
    }
  };

  useEffect(() => {
    if (talkId) {
      const fetchData = async () => {
        try {
          const response = await getAlbaTalkDetail(talkId);

          if (response && response.status === 200) {
            setValue("title", response.data.title);
            setValue("content", response.data.content);

            if (response.data.imageUrl) {
              const file = await urlToFile(response.data.imageUrl);

              setImages([file]);
              setExistingImages([file]);
              setExistingImageUrl(response.data.imageUrl);
            } else {
              setImages([]);
            }
          } else {
            addToast("데이터를 불러오는데 실패했습니다.", "warning");
          }
        } catch (error) {
          addToast("데이터를 불러오는데 실패했습니다.", "warning");
          console.error("데이터 불러오는데 실패: ", error);
        }
      };

      fetchData();
    }
  }, [talkId, setValue]);

  const onCancel = () => {
    router.push("/albatalk");
  };

  const onSubmit = async (formData: z.infer<typeof addTalkSchema>) => {
    try {
      let imageUrl = "";

      if (images.length > 0 && images[0] !== existingImages[0]) {
        const imageUrlResponse = await uploadImage(images[0]);

        if (imageUrlResponse.status === 201) {
          imageUrl = imageUrlResponse.data;
          setExistingImageUrl("");
        } else {
          addToast("이미지 등록 중 문제가 발생했습니다.", "warning");
          console.error("이미지 등록 실패: ", imageUrlResponse.error);
          return;
        }
      }

      const data = {
        title: formData.title,
        content: formData.content,
        imageUrl: imageUrl || (!images[0] ? "" : existingImageUrl),
      };

      if (!talkId) {
        const response = await addTalk(data);

        if (response.status === 201) {
          addToast("글이 등록되었습니다.", "success");
          router.push(`/albatalks/${response.data.id}`);
        } else {
          addToast("글 등록에 실패했습니다.", "warning");
          console.error("글 등록 실패: ", response.error);
        }
      } else {
        const response = await patchPost(Number(talkId), data);

        if (response.status === 200) {
          addToast("글이 수정되었습니다.", "success");
          router.push(`/albatalks/${response.data.id}`);
        } else {
          addToast("글 수정에 실패했습니다.", "warning");
          console.error("글 수정 실패: ", response.error);
        }
      }
    } catch (error) {
      addToast("요청에 실패했습니다.", "warning");
      console.error("요청 실패: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mx-auto max-w-[327px] pt-4 pc:max-w-[1480px] pc:pt-10 tablet:max-w-[600px] tablet:pt-[23px]"
    >
      <h3 className="mb-8 border-b border-line-200 pb-4 text-2lg font-semibold pc:mb-[72px] pc:pb-10 pc:text-3xl tablet:pb-[23px]">
        {talkId ? "글 수정하기" : "글쓰기"}
      </h3>
      <div className="flex flex-col gap-y-10 pc:gap-y-6">
        <div className="relative flex flex-col gap-y-4">
          <label
            htmlFor="title"
            className="fit-content w-[fit-content] cursor-pointer text-2lg pc:text-xl"
          >
            제목
            <span className="ml-1 text-red">*</span>
          </label>
          <FormInput
            id="title"
            name="title"
            type="text"
            register={register}
            error={errors.title}
            placeholder="제목을 입력해주세요."
            className="rounded-lg border-none bg-background-200 p-[14px] placeholder:text-md pc:max-w-full pc:p-4 pc:placeholder:text-xl tablet:placeholder:text-lg"
          />
          <ErrorText error={errors.title}>{errors.title?.message}</ErrorText>
        </div>
        <div className="relative flex flex-col gap-y-4">
          <label
            htmlFor="content"
            className="w-[fit-content] cursor-pointer text-2lg pc:text-xl"
          >
            내용
            <span className="ml-1 text-red">*</span>
          </label>
          <textarea
            id="content"
            {...register("content")}
            className={cls(
              "h-[180px] resize-none appearance-none rounded-lg border-none bg-background-200 p-[14px] text-start placeholder:text-md focus:outline-none pc:w-full pc:p-4 pc:placeholder:text-xl tablet:h-[200px] tablet:placeholder:text-lg",
              errors.content ? "border-red" : ""
            )}
            placeholder="내용을 입력해주세요."
          />
          <ErrorText error={errors.content}>
            {errors.content?.message}
          </ErrorText>
        </div>
        <div className="flex flex-col gap-y-4">
          <label className="w-[fit-content] text-2lg pc:text-xl">이미지</label>
          <ImageInput
            size={viewPort === "pc" ? "large" : "medium"}
            onImageChange={setImages}
            limit={1}
            initialImage={images}
          />
        </div>
      </div>
      <div className="mb-[18px] mt-[34px] flex flex-col gap-y-1 pc:absolute pc:right-0 pc:top-0 pc:h-[58px] pc:w-[372px] pc:flex-row pc:gap-x-3 tablet:absolute tablet:right-0 tablet:top-0 tablet:mb-0 tablet:mt-4 tablet:h-[46px] tablet:w-[217px] tablet:flex-row tablet:gap-x-2">
        <SolidButton type="button" style="gray100" onClick={onCancel}>
          취소
        </SolidButton>
        <SolidButton style="orange300">등록하기</SolidButton>
      </div>
    </form>
  );
};

export default AddTalkForm;
