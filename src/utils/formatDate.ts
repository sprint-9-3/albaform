export const formatDate = (startDate: string, endDate: string) => {
  return [
    startDate.slice(0, 10).replace("/-/g,", "."),
    endDate.slice(0, 10).replace("/-/g,", "."),
  ];
};
