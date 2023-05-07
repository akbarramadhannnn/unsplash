import dexieDB from "lib/dexie";

export const addListData = async (page, response) => {
  await dexieDB.listData.add({
    page: page,
    data: response,
  });
};

export const getListData = async () => {
  const lisData = await dexieDB.listData.toArray();
  return lisData;
};
