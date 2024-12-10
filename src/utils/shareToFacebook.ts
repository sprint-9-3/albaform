const shareToFacebook = () => {
  const { location } = window;
  const url = String(new URL(location.href));

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  window.open(facebookShareUrl, "_blank");
};

export default shareToFacebook;
