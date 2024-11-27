const formatExperienceMonth = (experienceMonth: number) => {
  let year = 0;
  let month = 0;

  if (experienceMonth > 12) {
    year = Math.floor(experienceMonth / 12);
    month = experienceMonth % 12;
    return month === 0 ? `${year}년` : `${year}년 ${month}개월`;
  } else return `${experienceMonth}개월`;
};

export default formatExperienceMonth;
