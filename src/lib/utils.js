import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getRelativeTime(time, lang) {
  const diff = new Date() - new Date(time);
  const seconds = Math.floor(diff / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} ${COMMON_STRINGS.years[lang]} ${COMMON_STRINGS.ago[lang]}`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} ${COMMON_STRINGS.months[lang]} ${COMMON_STRINGS.ago[lang]}`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} ${COMMON_STRINGS.days[lang]} ${COMMON_STRINGS.ago[lang]}`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} ${COMMON_STRINGS.hours[lang]} ${COMMON_STRINGS.ago[lang]}`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} ${COMMON_STRINGS.minutes[lang]} ${COMMON_STRINGS.ago[lang]}`;
  }
  return `${Math.floor(seconds)} ${COMMON_STRINGS.seconds[lang]} ${COMMON_STRINGS.ago[lang]}`;
}

export function currencyShort(value) {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value;
}

export function getCurrencySymbol(currencyCode) {
  return (0)
    .toLocaleString("en", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}

/**
 * @param {string} timestamp
 * @returns {string} Ex: {date: "Sept 12, 2021", time: "10:30 AM"}
 */
export function getDateAndTime(timestamp) {
  const date = new Date(timestamp);
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    time: date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
  };
}
