import Dexie from "dexie";

const db = new Dexie("unsplash");

db.version(1).stores({
  listData: `id++, page, data`,
  searchData: `id++, page, query, data`,
  listLove: `id++, photoId`,
});

export default db;
