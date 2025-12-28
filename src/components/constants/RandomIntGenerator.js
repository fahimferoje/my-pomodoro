const RANDOM_NUMBER_MIN = 1;
const RANDOM_NUMBER_MAX = 1000;

export const getRandomInt = () => {
  const minCeiled = Math.ceil(RANDOM_NUMBER_MIN);
  const maxFloored = Math.floor(RANDOM_NUMBER_MAX);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};
