import dexieDB from "lib/dexie";

export const addLove = async (id) => {
  await dexieDB.listLove.add({
    photoId: id,
  });
};

export const deleteLove = async (id) => {
  await dexieDB.listLove.delete(id);
};

export const getListLove = async () => {
  const listLove = await dexieDB.listLove.toArray();
  return listLove;
};
