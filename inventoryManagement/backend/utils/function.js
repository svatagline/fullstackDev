export const log = (...args) => {
  console.log(...args);
};

export const errorLog = (tag, ...args) => {
  console.error(`Error in ${tag} :`, ...args);
};
