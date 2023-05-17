const createError = require("http-errors");




function getTime(seconds) {
  let total = Math.round(seconds) / 60;
  let [minutes, percent] = String(total).split(".");
  let second = Math.round((percent * 60) / 100)
    .toString()
    .substring(0, 2);
  let houre = 0;
  if (minutes > 60) {
    total = minutes / 60;
    let [h1, percent] = String(total).split(".");
    (houre = h1),
      (minutes = Math.round((percent * 60) / 100)
        .toString()
        .substring(0, 2));
  }
  return houre + ":" + minutes + ":" + second;
}

function CopyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

function GetVideosTotalTime(chapters = []) {
  let time,
    hour,
    minute,
    second = 0;
  for (const chapter of chapters) {
    if (Array.isArray(chapter?.episodes)) {
      for (const episode of chapter.episodes) {
        if (episode?.time) time = episode.time.split(":"); // [Hour, Min, sec]
        else time = "00:00:00".split(":");
        if (time.length == 3) {
          second += Number(time[0]) * 3600; // Convert an hour to seconds
          second += Number(time[1]) * 60; // Convert a minute to seconds
          second += Number(time[2]);
        } else if (time.length == 2) {
          second += Number(time[0]) * 60;
          second += Number(time[1]);
        }
      }
    }
  }
  hour = Math.floor(second / 3600);
  minute = Math.floor(second / 60) % 60;
  second = Math.floor(second % 60);
  if (String(hour).length == 1) hour = `0${hour}`;
  if (String(minute).length == 1) minute = `0${minute}`;
  if (String(hour).length == 1) second = `0${second}`;
  return `${hour}:${minute}:${second}`;
}

function convertTime(time) {
  var timeInString = time; // Any value here
var milliseconds;
if (timeInString.split(":").length === 2) {
  /* For MM:SS */
  milliseconds =
    Number(timeInString.split(":")[0]) * 60000 +
    Number(timeInString.split(":")[1]) * 1000;
} else if (timeInString.split(":").length === 3) {
  /* For HH:MM:SS */
  milliseconds =
    Number(timeInString.split(":")[0]) * 3600000 +
    Number(timeInString.split(":")[1]) * 60000 +
    Number(timeInString.split(":")[2]) * 1000;
} else if (timeInString.split(":").length === 4) {
  /* For DD:HH:MM:SS */
  milliseconds =
    Number(timeInString.split(":")[0]) * 86400000 +
    Number(timeInString.split(":")[1]) * 3600000 +
    Number(timeInString.split(":")[2]) * 60000 +
    Number(timeInString.split(":")[3]) * 1000;
}

console.log(milliseconds)
}

module.exports = {
  CopyObject,
  getTime,
  GetVideosTotalTime,
  convertTime
};
