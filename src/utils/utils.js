export const getFormatedDate = (date, sep) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].join(sep);
};
