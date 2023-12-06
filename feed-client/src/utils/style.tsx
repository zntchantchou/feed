export const joinClasses = (...classnames: string[]) => {
  let finalClass = "";
  for (const className of classnames) {
    finalClass += " " + className;
  }
  return finalClass.trim();
};
