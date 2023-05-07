import { Fragment, useCallback, useEffect, useState } from "react";
import { ApiGetPhotosList, ApiSearchPhotosList } from "api/photos";
import { Card, Modal } from "components/molecules";
import { Input, Button, TextError } from "components/atoms";
import useInfiniteScroll from "hooks/useInfinteScroll";
import { addLove, deleteLove, getListLove } from "helpers/indexDB/listLove";

const App = () => {
  const { isInfiteScroll } = useInfiniteScroll();
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);
  const [isDidMount, setIsDidMount] = useState(true);
  const [search, setSearch] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [page, setPage] = useState(1);
  const [limitPage, setlimitPage] = useState(0);
  const [dataPhotos, setDataPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [listLove, setListLove] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    data: {},
  });
  const [isSearch, setIsSearch] = useState(false);

  const handleFetchSearch = useCallback(
    (totalPage, params) => {
      if (!limitPage || totalPage <= limitPage) {
        ApiSearchPhotosList(totalPage, search)
          .then((response) => {
            const { code, message, results, total, total_pages } = response;

            if (!limitPage && total_pages) {
              setlimitPage(total_pages);
            }

            if (code === "ERR_BAD_REQUEST") {
              setErrorMessage(message);
              setIsLoadingPhotos(false);
              return;
            }

            if (total === 0) {
              setErrorMessage("Data not found");
              setIsLoadingPhotos(false);
              return;
            }

            if (message) {
              setErrorMessage(message);
              setIsLoadingPhotos(false);
              return;
            }

            if (params === "scroll") {
              setDataPhotos((oldState) => [...oldState, ...results]);
              setTimeout(() => {
                setPage(totalPage);
              }, 300);
              return;
            }

            if (params === "init") {
              setErrorMessage("");
              setDataPhotos(results);
              setIsLoadingPhotos(false);
              return;
            }
          })
          .catch((err) => {
            console.log("error [ApiSearchPhotosList]", err);
          });
      }
    },
    [search, limitPage]
  );

  const handleFetchList = useCallback((totalPage, params) => {
    ApiGetPhotosList(totalPage)
      .then((response) => {
        const { code, message } = response;

        if (code === "ERR_BAD_REQUEST") {
          setErrorMessage(message);
          setIsLoadingPhotos(false);
          return;
        }

        if (params === "scroll") {
          setDataPhotos((oldState) => [...oldState, ...response]);
          setTimeout(() => {
            setPage(totalPage);
          }, 300);
          return;
        }

        if (params === "init") {
          setDataPhotos(response);
          setIsLoadingPhotos(false);
          return;
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    let timeout;
    if (isInfiteScroll) {
      timeout = setTimeout(() => {
        const totalPage = page + 1;
        if (search !== "") {
          handleFetchSearch(totalPage, "scroll");
        } else {
          handleFetchList(totalPage, "scroll");
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isInfiteScroll, page, search, handleFetchSearch, handleFetchList]);

  useEffect(() => {
    if (isDidMount) {
      handleFetchList(page, "init");
      setIsDidMount(false);
    }
  }, [isDidMount, page, handleFetchList]);

  useEffect(() => {
    const FetchLove = async () => {
      const resultLove = await getListLove();
      if (resultLove !== null) {
        setListLove(resultLove);
      }
    };

    FetchLove();
  }, []);

  const handleChangeInput = useCallback((e) => {
    const { value } = e.target;
    setSearch(value);
    setErrorInput("");
  }, []);

  const handleSearchImage = useCallback(() => {
    if (search === "") {
      setErrorInput("Please fill input");
    } else {
      const totalPage = 1;
      setPage(totalPage);
      setlimitPage(0);
      setIsLoadingPhotos(true);
      setErrorMessage("");
      setIsSearch(true);

      handleFetchSearch(totalPage, "init");
    }
  }, [search, handleFetchSearch]);

  const handleOnClickLove = useCallback(async (data) => {
    const listLove = await getListLove();
    const findData = listLove.find((d) => d.photoId === data.id);

    if (!findData) {
      await addLove(data.id);
    } else {
      await deleteLove(findData.id);
    }

    const resultLove = await getListLove();
    setListLove(resultLove);
  }, []);

  const handleClickImage = useCallback((data) => {
    setModal((oldState) => ({
      ...oldState,
      isOpen: true,
      data: data,
    }));
  }, []);

  const handleOnCloseModal = useCallback(() => {
    setModal((oldState) => ({
      ...oldState,
      isOpen: false,
      data: {},
    }));
  }, []);

  const handleResetSearch = useCallback(() => {
    const totalPage = 1;
    setIsSearch(false);
    setSearch("");
    setErrorMessage("");
    setPage(totalPage);
    handleFetchList(totalPage, "init");
  }, [handleFetchList]);

  return (
    <Fragment>
      <div className="px-[30px] py-[30px] lg:px-[100px] lg:py-[50px]">
        <div className="mb-[50px]">
          <Input
            value={search}
            onChange={handleChangeInput}
            placeholder="Search photos.."
          />

          {errorInput ? <TextError message={errorInput} /> : null}

          <div className="flex">
            <Button
              onClick={handleSearchImage}
              label="Search"
              className="bg-[#3F7ED8] text-white"
            />

            {isSearch ? (
              <div className="ml-[20px]">
                <Button onClick={handleResetSearch} label="Reset Search" />
              </div>
            ) : null}
          </div>
        </div>

        {isLoadingPhotos ? <p>Loading....</p> : null}

        {!isLoadingPhotos && errorMessage ? (
          <TextError message={errorMessage} align="center" />
        ) : null}

        {!isLoadingPhotos && errorMessage === "" ? (
          <Card
            dataPhotos={dataPhotos}
            listLove={listLove}
            onClickLove={(data) => handleOnClickLove(data)}
            onClickImage={(data) => handleClickImage(data)}
          />
        ) : null}

        {isInfiteScroll ? (
          <div className="text-center mt-[30px] py-[20px]">
            <p>Loading....</p>
          </div>
        ) : null}
      </div>

      <Modal
        isOpen={modal.isOpen}
        data={modal.data}
        onClose={handleOnCloseModal}
      />
    </Fragment>
  );
};

export default App;
