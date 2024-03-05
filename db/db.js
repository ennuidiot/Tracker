import { enablePromise, openDatabase } from "react-native-sqlite-storage";

// enable promise for SQLite
enablePromise(true);
export async function connectToDatabase() {
  return openDatabase(
    {
      name: "Tracker.db",
      location: "default",
    },
    () => {
      console.log("DB connected");
    },
    (error) => {
      console.error(error);
      throw Error("Could not connect to database");
    },
  );
}
export async function createTables(db) {
  const habitQuery = `
    CREATE TABLE IF NOT EXISTS habit (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )
    `;
  const habitEventQuery = `
    CREATE TABLE IF NOT EXISTS habit_event (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        habit_id INTEGER NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(habit_id) REFERENCES habit(id)
    )
    `;
  try {
    console.log("Creating habit table");
    await db.executeSql(habitQuery);
    console.log("Creating habit_event table");
    await db.executeSql(habitEventQuery);
  } catch (error) {
    console.error(error);
    throw Error("Failed to create tables");
  }
}
export async function deleteTables(db) {
  try {
    console.log("Dropping habit table");
    await db.executeSql(`DROP TABLE habit`);
    console.log("Dropping habit_event table");
    await db.executeSql(`DROP TABLE habit_event`);
  } catch (error) {
    console.error(error);
    throw Error("Failed to delete tables");
  }
}
export async function deleteHabit(db, habit) {
  try {
    console.log(`Deleting habit ${habit.id} - ${habit.name}`)
    await db.executeSql(`DELETE FROM habit WHERE id=${habit.id}`)
  } catch (error) {
    console.error(error)
    throw Error("Failed to delete habit")
  }
}
export async function insertHabit(db, name) {
  const insertQuery = `
    INSERT INTO habit (name) VALUES (?)
    `;
  const values = [name];
  try {
    console.log(`Adding habit '${name}'`);
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error("Failed to add habit");
  }
}
export async function getHabits(db) {
  try {
    console.log("Getting habits");
    let habits = [];
    const results = await db.executeSql("SELECT * FROM habit");
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        habits.push(result.rows.item(index));
      }
    });
    return habits;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get habits from db");
  }
}
export async function insertHabitEvent(db, name) {
  console.log(`Adding habit_event for habit '${name}'`);
  const habitIdQuery = `SELECT id FROM habit WHERE name = ? LIMIT 1`;
  const insertQuery = `
    INSERT INTO habit_event (habit_id) VALUES (?)
    `;
  try {
    let habitIdResult = await db.executeSql(habitIdQuery, [name]);
    let habitId = habitIdResult[0].rows.item(0).id;
    return db.executeSql(insertQuery, [habitId]);
  } catch (error) {
    console.error(error);
    throw Error("Failed to add habit");
  }
}
export async function getEventsPerDay(db) {
  console.log("Getting events per day");
  let data = [];
  let result = await db.executeSql(`
  SELECT habit.name AS habit,
    STRFTIME('%d/%m/%Y', DATE(event.timestamp, "localtime")) AS event_date,
    COUNT(habit.id) AS count
  FROM (
        SELECT *
        FROM habit
    ) habit
    INNER JOIN (
        SELECT *
        FROM habit_event
    ) event ON habit.id = event.habit_id
  GROUP BY habit.name,
    STRFTIME('%d/%m/%Y', DATE(event.timestamp, "localtime"))
  ORDER BY habit.name,
    STRFTIME('%d/%m/%Y', DATE(event.timestamp, "localtime"))
  `);
  result.forEach((result) => {
    for (let index = 0; index < result.rows.length; index++) {
      data.push(result.rows.item(index));
    }
  });
  return data;
}
export async function getHabitEvents(db) {
  try {
    console.log("Get habit events");
    let habits = [];
    const results = await db.executeSql(`
        SELECT event.id, DATETIME(event.timestamp, "localtime") as timestamp, related_habit.name as habit
        FROM (
                SELECT *
                FROM habit_event
            ) event
            INNER JOIN (
                SELECT *
                FROM habit
            ) related_habit ON event.habit_id = related_habit.id
        `);
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        habits.push(result.rows.item(index));
      }
    });
    return habits;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get habits from db");
  }
}
