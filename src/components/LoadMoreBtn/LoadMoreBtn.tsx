import css from "./LoadMoreBtn.module.css";
import { LoadButtonMore } from "./LoadMoreBtn.types";
export default function LoadMoreBtn({ onLoadMore }:LoadButtonMore) {
  const handleLoadMore = ():void => {
    onLoadMore();
  };
  return (
    <button className={css.button} onClick={handleLoadMore}>
      Load more
    </button>
  );
}
