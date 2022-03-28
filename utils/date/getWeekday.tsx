const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function getWeekday(date: Date) {
  return WEEKDAYS[date.getDay()];
}
