const mediaUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export const cn = (classNames: (string | undefined | null | boolean)[]) =>
  classNames
    .filter(
      (className) => typeof className === "string" && className.length > 0,
    )
    .join(" ");

export const formatDate = (dateOrDateString: Date | string) => {
  let date: Date = new Date();

  if (typeof dateOrDateString === "string") {
    const timestamp = Date.parse(dateOrDateString);
    const isValid = !isNaN(timestamp);
    if (!isValid) {
      console.error("Not a valid date");
      return;
    }
    date = new Date(dateOrDateString);
  } else date = dateOrDateString;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const isDefined = <T>(val: T | null | undefined): val is T =>
  val !== undefined && val !== null;

export const buildMediaUrl = (url: string) =>
  `${mediaUrl}${url.startsWith("/") ? url : "/" + url}`;
