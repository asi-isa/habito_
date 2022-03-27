import extract from "./extract";

export default function isEqual(firstDate: Date, secondDate: Date) {
  const {
    day: firstDateDay,
    month: firstDateMonth,
    year: firstDateYear,
  } = extract(firstDate);
  const {
    day: secondDateDay,
    month: secondDateMonth,
    year: secondDateYear,
  } = extract(secondDate);

  return (
    firstDateDay === secondDateDay &&
    firstDateMonth === secondDateMonth &&
    firstDateYear === secondDateYear
  );
}
