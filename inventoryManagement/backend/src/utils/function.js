export const errorLog = (label, message) => {
  console.error(`ERROR [${label}]: ${message}`);
};

export const log = (...rest) => {
  console.log(...rest);
};
