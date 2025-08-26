export const transformDateTime = (d: string) => {
  const customDate = new Date(d);

  const date = `${(customDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${customDate
    .getDate()
    .toString()
    .padStart(2, "0")}-${customDate.getFullYear()}`;

  const time = `${customDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${customDate.getMinutes().toString().padStart(2, "0")}`;

  return `${date} ${time}`;
};
