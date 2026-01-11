import { useEffect } from "react";
import PomodoroController from "./components/PomodoroController";
import { dbPromise } from "./db/indexedDb.js";
function App() {
  useEffect(() => {
    async function initDB() {
      await dbPromise;
    }

    initDB();
  }, []);

  return <PomodoroController />;
}

export default App;
