import { useEffect } from "react";

export const useTitle = (props) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = props;
    return () => {
      document.title = prevTitle;
    };
  }, []);
};
