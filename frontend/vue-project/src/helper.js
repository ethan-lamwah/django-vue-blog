export function getLocaleDate(date) {
  return new Date(date).toLocaleDateString("en-ca", {
    year: "numeric",
    month: "short",
    day: "numeric",
    time: "long",
  });
}

export function timeSince(date) {
  var dateArg = new Date(date);
  var seconds = Math.floor((new Date() - dateArg) / 1000);
  var interval = seconds / 31536000;

  const f = (p, e) => {
    p = Math.floor(p);
    return `${p} ${e}${p > 1 ? "s" : ""} ago`;
  };

  if (interval > 1) return f(interval, "yr");

  interval = seconds / 2592000;
  if (interval > 1) return f(interval, "mon");

  interval = seconds / 86400;
  if (interval > 1) return f(interval, "day");

  interval = seconds / 3600;
  if (interval > 1) return f(interval, "hr");

  interval = seconds / 60;
  if (interval > 1) return f(interval, "min");

  return f(seconds, "sec");
}

export function scrollToElement(id, options) {
  const el = document.querySelector(id);
  if (el) {
    el.scrollIntoView(options);
  }
}
