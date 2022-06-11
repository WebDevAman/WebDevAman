import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import getArratFromSrcSetImages from "../utils/helpers/getArrayFromSrcSetImages";
import truncateString from "../utils/helpers/truncateString";

function useFormatNewsItemData(startingIndex: number, data?: { [any: string]: any }) {
  const [postPreview, setPostPreview] = useState("");

  const primaryCategoryName = useMemo(() => {
    if (data && data.hasOwnProperty("categories")) {
      const primary = data.categories.edges.filter((category: any) => category.isPrimary);
      if (primary.length > 0) {
        return primary[0].node.name;
      }
    }
    return "";
  }, [data]);

  const srcSetImage = useMemo(() => {
    if (!data) return;
    const srcSetImage = getArratFromSrcSetImages(data, startingIndex);

    return srcSetImage || data?.featuredImage.node.link;
  }, [data, startingIndex]);

  useEffect(() => {
    if (data?.hasOwnProperty("excerpt")) {
      const html = data?.excerpt.replace("\n", "");
      // Create a new div element
      var tempDivElement = document.createElement("div");

      // Set the HTML content with the given value
      tempDivElement.innerHTML = html;

      // Retrieve the text property of the element
      setPostPreview(truncateString((tempDivElement.textContent || tempDivElement.innerText || "").trim(), 130));
    }
  }, [data]);

  return [primaryCategoryName, postPreview, srcSetImage];
}

export default useFormatNewsItemData;
