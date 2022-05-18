function dateTimeStrToInt(str) {
  str = str.replaceAll('-', '');
  str = str.replaceAll('T', '');
  str = str.replaceAll(':', '');
  return parseInt(str);
}

function intToDateTimeStr(int) {
  let str = int.toString();
  let newStr = str.slice(0, 4) + '-';
  newStr = newStr + str.slice(4, 6) + '-';
  newStr = newStr + str.slice(6, 8) + 'T';
  newStr = newStr + str.slice(8, 10) + ':';
  newStr = newStr + str.slice(10);
  return newStr;
}

function dateStrToInt(str) {
  str = str.replaceAll('-', '');
  let dateStr = str.slice(0, 8);
  return parseInt(dateStr);
}
function intToDateStr(int) {
  let str = int.toString();
  let newStr = str.slice(0, 4) + '-';
  newStr = newStr + str.slice(4, 6) + '-';
  newStr = newStr + str.slice(6, 8);
  return newStr;
}

function stayDates(start, end) {
  let startInt = dateStrToInt(start);
  let endInt = dateStrToInt(end);
  let dates = [];
  for (let i = startInt + 1; i < endInt; i++) {
    dates.push(intToDateStr(i));
  }
  return dates;
}

function tripDates(start, end) {
  let startInt = dateStrToInt(start);
  console.log('😊😊 startInt', startInt);
  let endInt = dateStrToInt(end);
  console.log('😊😊 endInt', endInt);
  let dates = [];
  for (let i = startInt; i < endInt; i++) {
    dates.push(getMonthDayNameFromInt(i));
  }
  return dates;
}
const start = '2022-06-02';
const end = '2022-07-04';
console.log('😊😊 tripDates(start,end)', tripDates(start, end));
console.log('😊😊 stayDates(start,end)', stayDates(start, end));

const testStr = '2022-07-04';

function getMonthDayNameFromInt(int) {
  let str = intToDateStr(int);
  const yStr = str.substring(0, 4);
  const mStr = str.substring(5, 7);
  const dStr = str.substring(8, 10);
  const y = parseInt(yStr);
  const m = parseInt(mStr) - 1;
  const d = parseInt(dStr);
  const date = new Date(y, m, d);
  const dayNumber = date.getDay();
  const monthNumber = date.getMonth();
  const dayOfWeekName = getDayOfWeekName(dayNumber);
  const monthName = getMonthName(monthNumber);
  return dayOfWeekName + ', ' + monthName + ' ' + d;
}

function getDayOfWeekName(dayNumber) {
  let dayOfWeek = '';
  switch (dayNumber) {
    case 0:
      dayOfWeek = 'Sunday';
      break;
    case 1:
      dayOfWeek = 'Monday';
      break;
    case 2:
      dayOfWeek = 'Tuesday';
      break;
    case 3:
      dayOfWeek = 'Wednesday';
      break;
    case 4:
      dayOfWeek = 'Thursday';
      break;
    case 5:
      dayOfWeek = 'Friday';
      break;
    case 6:
      dayOfWeek = 'Saturday';
      break;
    default:
      break;
  }
  return dayOfWeek;
}

function getMonthName(monthNumber) {
  let monthName = '';
  switch (monthNumber) {
    case 0:
      monthName = 'January';
      break;
    case 1:
      monthName = 'February';
      break;
    case 2:
      monthName = 'March';
      break;
    case 3:
      monthName = 'April';
      break;
    case 4:
      monthName = 'May';
      break;
    case 5:
      monthName = 'June';
      break;
    case 6:
      monthName = 'July';
      break;
    case 7:
      monthName = 'August';
      break;
    case 8:
      monthName = 'September';
      break;
    case 9:
      monthName = 'October';
      break;
    case 10:
      monthName = 'November';
      break;
    case 11:
      monthName = 'December';
      break;
    default:
      break;
  }
  return monthName;
}
