import { openDB } from "idb";

export const dbPromise = openDB("pomodoro", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("tasks")) {
      const store = db.createObjectStore("tasks", {
        keyPath: "id",
      });

      store.createIndex("taskId", "id");
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
