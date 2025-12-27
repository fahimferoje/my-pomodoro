import { Mode } from "../components/constants/PomodoroMode.js";

export default function Tabs({ active, onTabClick }) {
  return (
    <div className="flex gap-3 p-2 rounded-2xl w-fit mx-auto">
      {Object.values(Mode).map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(tab)}
          className={`
            px-5 py-2 rounded-xs font-semibold text-white transition
            ${active === tab.id ? "bg-zinc-500" : ""}
          `}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
