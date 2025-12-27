export const Mode = Object.freeze({
  POMODORO: {
    id: 0,
    name: "Pomodoro",
    time: 5,
    typography: { themeColor: "bg-red-400", fontColor: "text-red-400" },
  },
  SHORT_BREAK: {
    id: 1,
    name: "Short Break",
    time: 2,
    typography: { themeColor: "bg-teal-600", fontColor: "text-teal-600" },
  },
  LONG_BREAK: {
    id: 2,
    name: "Long Break",
    time: 5,
    typography: { themeColor: "bg-cyan-700", fontColor: "text-cyan-700" },
  },
});
