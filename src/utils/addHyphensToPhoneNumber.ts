const addHyphensToPhoneNumber = (number: string) => {
  return number.slice(0, 3) + "-" + number.slice(3, 7) + "-" + number.slice(7);
};

export default addHyphensToPhoneNumber;
