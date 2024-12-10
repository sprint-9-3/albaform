const shareToTwitter = () => {
  const { location } = window;
  const url = String(new URL(location.href));

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent("공유할 내용")}`;
  window.open(twitterShareUrl, "_blank");
};

export default shareToTwitter;
