export const getDday = (isoDateString: string) => {
  const now = new Date();
  const targetDate = new Date(isoDateString);

  console.log(targetDate);

  const timeDifference = Math.round(
    (targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  console.log(timeDifference);

  if (timeDifference < 0) {
    return "마감";
  } else {
    return `D-${timeDifference}일`;
  }
};
