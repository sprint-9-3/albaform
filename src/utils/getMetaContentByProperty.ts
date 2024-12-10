const getMetaContentByProperty = (property: string) => {
  const metaTag = document.querySelector(
    `meta[property='${property}']`
  ) as HTMLMetaElement;
  return metaTag ? metaTag.content : null;
};

export default getMetaContentByProperty;
