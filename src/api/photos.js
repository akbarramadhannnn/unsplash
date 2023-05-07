import axiosDefault from "../lib/axiosDefault";
import { addListData, getListData } from "helpers/indexDB/listData";
import { addSearchData, getSearchData } from "helpers/indexDB/searchData";

export const ApiGetPhotosList = async (page = 1) => {
  const lisData = await getListData();
  const findData = lisData.find((d) => d.page === page);

  if (!findData) {
    const response = await axiosDefault.get(`/photos?page=${page}`);
    const { code } = response;

    if (code !== "ERR_BAD_REQUEST") {
      await addListData(page, response);
    }

    return response;
  }

  return findData.data;
};

export const ApiSearchPhotosList = async (page = 1, query = "") => {
  const searchData = await getSearchData();
  const findData = searchData.find((d) => d.page === page && d.query === query);

  if (!findData) {
    const response = await axiosDefault.get(
      `/search/photos?page=${page}&query=${query}`
    );

    const { code } = response;

    if (code !== "ERR_BAD_REQUEST") {
      await addSearchData(page, query, response);
    }

    return response;
  }

  return findData.data;
};
