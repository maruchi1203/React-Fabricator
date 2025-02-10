const getRandomKey = (length: number) => {
  let result = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsLength = chars.length;
  let counter = 0;
  while (counter < length) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
    counter += 1;
  }
  return result;
};

const convertStyleOptionToNum = (str: string) => {
  const regex = /^[a-zA-Z\s]*/g;
  const num = str.replace(regex, "");
  return parseInt(num);
};

export { getRandomKey, convertStyleOptionToNum };
