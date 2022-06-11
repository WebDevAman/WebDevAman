function parseISO8601Duration(duration: string) {
  const match = duration.match(/P(\d+Y)?(\d+W)?(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) {
    console.error(`Invalid YouTube video duration: ${duration}`);
    return "";
  }
  const [years, weeks, days, hours, minutes, seconds] = match
    .slice(1)
    .map((_) => (_ ? parseInt(_.replace(/\D/, "")) : 0));
  const totalSeconds = (((years * 365 + weeks * 7 + days) * 24 + hours) * 60 + minutes) * 60 + seconds;
  let sec: string | number = totalSeconds % 60;
  //@ts-ignore
  const min = parseInt(totalSeconds / 60);
  if (sec.toString().length == 1) {
    sec = "0" + sec;
  }
  return min + ":" + sec;
}

export default parseISO8601Duration;
