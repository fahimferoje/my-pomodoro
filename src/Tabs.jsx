const tabs = [
  { id: 0, label: "Pomodoro", color: "bg-red-300" },
  { id: 1, label: "Short Break", color: "bg-red-300" },
  { id: 2, label: "Long Break", color: "bg-red-300" },
];

import Mode from "./PomodoroController";

export default function Tabs({ active, mode, setActive }) {
  return (
    <div className="flex gap-3 p-2 rounded-2xl w-fit mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActive(tab.id)}
          className={`
            px-5 py-2 rounded-xl font-semibold text-white transition
            ${active === tab.id ? "bg-zinc-500" : tab.color}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
