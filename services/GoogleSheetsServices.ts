const { GoogleSpreadsheet } = require("google-spreadsheet");

class GoogleSheetServices {
  private doc: any;

  constructor() {
    this.doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
    this.authenticate();
  }

  private async authenticate() {
    await this.doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
  }

  public async getSpreadSheetData() {
    await this.doc.loadInfo();
    const specialEventsSheet = this.doc.sheetsByIndex[0];
    const videoYoutubeIdsSheet = this.doc.sheetsByIndex[1];
    const MatchCardSheet = this.doc.sheetsByIndex[2];
    const currentChampsSheet = this.doc.sheetsByIndex[3];
    const ppvResultsSheet = this.doc.sheetsByIndex[4];

    const specialEventsRows = await specialEventsSheet.getRows();
    const videoYoutubeIdsRows = await videoYoutubeIdsSheet.getRows();
    const MatchCardRows = await MatchCardSheet.getRows();
    const currentChampsRows = await currentChampsSheet.getRows();
    const ppvResultsRows = await ppvResultsSheet.getRows();

    const specialEvents: Array<any> = specialEventsRows.map((row: any) => row._rawData[0]);
    const youtubeVideoIds: Array<any> = videoYoutubeIdsRows.map((row: any) => row._rawData[0]);
    const MatchCardWWE: Array<any> = MatchCardRows.map((row: any) => row._rawData);
    const MatchCardAEW: Array<any> = MatchCardRows.map((row: any) => row._rawData[1]);
    const currentChapions: Array<any> = currentChampsRows.map((row: any) => row._rawData);
    const ppvResults: Array<any> = ppvResultsRows.map((row: any) => row._rawData);

    return { specialEvents, youtubeVideoIds, MatchCardWWE, MatchCardAEW, ppvResults, currentChapions };
  }
}

export default new GoogleSheetServices();
