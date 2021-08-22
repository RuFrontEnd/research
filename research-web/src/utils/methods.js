export const handleConsoles = (informations) => {
  const consoleMethod = (num, title, method, content) =>
    console.log(`${num || "*"}.${title}`, method, `(${content})`);

  return informations.map((information, index) =>
    consoleMethod(
      index + 1,
      information.title,
      information.method,
      information.content
    )
  );
};
