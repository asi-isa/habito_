import extract from "./extract";

export default function isEqual(firstDate: Date, secondDate: Date) {
  const {
    day: firstDateDay,
    month: firstDateMonth,
    year: firstDateYear,
  } = extract(new Date(firstDate));
  const {
    day: secondDateDay,
    month: secondDateMonth,
    year: secondDateYear,
  } = extract(new Date(secondDate));

  return (
    firstDateDay === secondDateDay &&
    firstDateMonth === secondDateMonth &&
    firstDateYear === secondDateYear
  );
}
