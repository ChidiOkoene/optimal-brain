import { searchNotes } from "../src/search";

test("finds notes by title", async () => {
  const r = await searchNotes("vector");
  expect(r.length).toBeGreaterThan(0);
});
