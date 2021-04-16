export const getRand = (num = 29, exclude = []) => {
  let rand = Math.floor(Math.random() * (num + 1));
  if (exclude.includes(rand)) {
    rand = getRand(num, exclude);
  }
  return rand;
};
