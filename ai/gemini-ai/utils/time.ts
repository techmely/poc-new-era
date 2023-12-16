export const sleep = async (number = 200) =>
  await new Promise((resolve) => {
    setTimeout(resolve, number);
  });
