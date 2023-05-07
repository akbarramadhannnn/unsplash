import { useState, useEffect, useCallback } from "react";

const useInfinteScroll = () => {
  const [isInfiteScroll, setIsInfiniteScroll] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      setIsInfiniteScroll(false);
      return;
    }

    setIsInfiniteScroll(true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    isInfiteScroll,
  };
};

export default useInfinteScroll;
