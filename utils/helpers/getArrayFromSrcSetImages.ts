function getImageFromSrcSetImages(data: { [any: string]: any }, startingIndex?: number) {
  const srcSetArray = data?.featuredImage.node.srcSet.split(", ").map((srcSet: string) => srcSet.split(" ")[0]);
  if (!startingIndex) {
    return srcSetArray;
  }
  if (srcSetArray && srcSetArray.length > 0) {
    for (let i = startingIndex; i >= 0; i--) {
      if (srcSetArray[i]) {
        return srcSetArray[i];
      }
    }
  }
  return null;
}

export default getImageFromSrcSetImages;
