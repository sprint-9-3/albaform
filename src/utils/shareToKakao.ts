import getMetaContentByProperty from "./getMetaContentByProperty";

const shareToKakao = () => {
  const { Kakao, location } = window;

  const url = String(new URL(location.href));

  const ogTitle = getMetaContentByProperty("og:title") || "Albaform";
  const ogDescription =
    getMetaContentByProperty("og:description") ||
    "아르바이트 공고를 올리고 채용하는 플랫폼 Albaform!";
  const ogImage = getMetaContentByProperty("og:image") || "/logo/main-logo.svg";

  Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: ogTitle,
      description: ogDescription,
      imageUrl: ogImage,
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
  });
};

export default shareToKakao;
