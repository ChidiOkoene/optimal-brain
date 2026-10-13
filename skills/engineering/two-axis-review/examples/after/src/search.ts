import { db } from "./db";

export async function searchNotes(q: string) {
  if (!q) {
    console.log("usage: notes search <query>");
    process.exit(1);
  }
  const rows = await db.query(
    `SELECT * FROM notes WHERE LOWER(title) LIKE '%${q.toLowerCase()}%'`
  );
  return rows
    .filter((n) => n.status !== "archived")
    .sort((a, b) => b.updated - a.updated);
}

export async function searchBodies(q: string) {
  return db.query(`SELECT * FROM notes WHERE body LIKE ?`, [`%${q}%`]);
}
