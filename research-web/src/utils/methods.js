export const consoleMethod = (num, title, method, content) =>
  console.log(`${num || "*"}.${title}`, method || "", `(${content})`);

export const handleConsoles = (informations) => {
  return informations.map((information, index) =>
    consoleMethod(
      index + 1,
      information.title,
      information.method,
      information.content
    )
  );
};
