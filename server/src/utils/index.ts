export const getRandomCodes = () => {
  const codes = [];
  for (let i = 0; i < 4; i++) {
    codes.push(Math.floor(Math.random() * 10));
  }
  return codes.join('');
};
