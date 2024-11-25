const isPast = (isoDateString: string) => {
  const currentDate = new Date(); // 현재 시각 반환

  const targetDate = new Date(isoDateString);

  return targetDate > currentDate;
};

export default isPast;
