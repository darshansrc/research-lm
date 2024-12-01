import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(duration);

export { dayjs as day };

export function fromNow(date: string | number) {
  return dayjs(date).fromNow() || "a long time ago";
}

export const generateRandomName = (length: number = 2) =>
  uniqueNamesGenerator({
    dictionaries: [colors, animals],
    length,
    separator: "_",
  });

export function generateGradient(name: string): string {
  const hash = name.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  const h = hash % 360;
  const s = 70 + (hash % 30);
  const l = 60 + (hash % 20);
  return `linear-gradient(135deg, hsl(${h}, ${s}%, ${l}%), hsl(${(h + 60) % 360}, ${s}%, ${l}%))`;
}
