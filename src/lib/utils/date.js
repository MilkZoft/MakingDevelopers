import dateFormat from 'date-format';

export function day() {
  return dateFormat('dd', new Date());
}

export function isDay(day) {
  return isDefined(day) && day.length === 2 && !isNaN(day) && day <= 31;
}

export function isMonth(month) {
  return isDefined(month) && month.length === 2 && !isNaN(month) && month <= 12;
}

export function isYear(year) {
  return isDefined(year) && year.length === 4 && !isNaN(year);
}

export function month() {
  return dateFormat('MM', new Date());
}

export function now() {
  return dateFormat(new Date());
}

export function year() {
  return dateFormat('yyyy', new Date());
}
