import dexieDB from "lib/dexie";

export const addSearchData = async (page, query, response) => {
  await dexieDB.searchData.add({
    page: page,
    query: query,
    data: response,
  });
};

export const getSearchData = async () => {
  const searchData = await dexieDB.searchData.toArray();
  return searchData;
};
