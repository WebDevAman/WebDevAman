const getYoutubeThumbnailUrl = (id: string, quality?: string) =>
  `https://img.youtube.com/vi/${id}/${quality || "maxresdefault"}.jpg`;

export default getYoutubeThumbnailUrl;
