import isEqual from "./isEqual";

export default function isInList(
  date: Date,
  dateList: Date[],
  predicate: (firstDate: Date, secondDate: Date) => boolean = isEqual
) {
  if (!dateList) return false;

  for (const date_ of dateList) {
    if (predicate(date_, date)) return true;
  }

  return false;
}
