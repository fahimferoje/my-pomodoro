import { openDB } from "idb";

export const dbPromise = openDB("pomodoro", 5, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("tasks")) {
      const store = db.createObjectStore("tasks", {
        keyPath: "id",
        autoIncrement: true,
      });

      store.createIndex("taskId", "id");
    }

    if (!db.objectStoreNames.contains("activeTask")) {
      db.createObjectStore("activeTask");
    }

    if (!db.objectStoreNames.contains("settings")) {
      const store = db.createObjectStore("settings", {
        keyPath: "key",
      });

      store.createIndex("settings_key", "key");
    }
  },
});

export async function addTask(task) {
  const db = await dbPromise;

  return db.add("tasks", task);
}

export async function getAllTasks() {
  const db = await dbPromise;
  return db.getAll("tasks");
}

export async function updateTask(task) {
  const db = await dbPromise;
  return db.put("tasks", task);
}

export async function deleteTask(id) {
  const db = await dbPromise;
  return db.delete("tasks", id);
}

export async function addActiveTask(task) {
  const db = await dbPromise;

  return db.add("activeTask", task, "active_task");
}

export async function updateActiveTask(task) {
  const db = await dbPromise;
  return db.put("activeTask", task, "active_task");
}

export async function getActiveTask() {
  const db = await dbPromise;
  return db.get("activeTask", "active_task");
}

export async function deleteActiveTask() {
  const db = await dbPromise;
  return db.delete("activeTask", "active_task");
}

export async function getAllSettings() {
  const db = await dbPromise;
  return db.getAll("settings");
}

export async function addStageSecondsSettings(stageSeconds) {
  const db = await dbPromise;
  return db.add("settings", {
    key: "stageSeconds",
    value: stageSeconds,
  });
}
