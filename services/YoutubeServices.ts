class YoutubeService {
  private readonly endpoint: string;
  private readonly TOKEN: string;

  constructor() {
    this.endpoint = "https://www.googleapis.com/youtube/v3/videos";
    this.TOKEN = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
  }

  public async getVideoInfoFromId(id: string) {
    const params = `?key=${this.TOKEN}&part=snippet,contentDetails&id=${id}`;
    const response = await fetch(this.endpoint + params);
    return await response.json();
  }
}

export default new YoutubeService();
