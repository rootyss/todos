export default (date, sep) => {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  return [year, month, day].join(sep);
};

export const isExpired = (dateCompleted) => {
  const date = new Date(dateCompleted).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  return date < today;
};
