import { Article } from "types/article";
import { createBookMark, deleteBookmark } from "queries/bookmarks";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styles from "./articleControls.module.css";

interface ArticleControlsProps {
  article: Article;
}

enum VARIANTS {
  article = "ARTICLE",
  bookmark = "BOOMARK",
}

export default function ArticleControls({ article }: ArticleControlsProps) {
  let location = useLocation();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.article);
  const {
    mutate: deleteBookmarkFn,
    data: deleteBookmarkData,
    error: deleteBookmarkError,
  } = useMutation({
    mutationFn: () => deleteBookmark(article),
  });
  const {
    mutate: saveBookmarkFn,
    data: saveBookmarkData,
    error: saveBookmarkError,
  } = useMutation({
    mutationFn: () => createBookMark(article),
  });

  const handleClickBookmark = async () => {
    try {
      if (variant === VARIANTS.article) {
        console.log("SAVE BOOKMARK ");
        saveBookmarkFn();
      } else {
        console.log("DELETE FROM BOOKMARKS ");
        deleteBookmarkFn();
      }
    } catch {
      console.log("bookmarkArticle");
    }
  };

  useEffect(() => {
    if (location?.pathname === "/bookmarks") {
      console.log("SET VARIANT bookmark");
      if (variant !== VARIANTS.bookmark) setVariant(VARIANTS.bookmark);
    } else {
      console.log("SET VARIANT article");
      if (variant !== VARIANTS.article) setVariant(VARIANTS.article);
    }
    console.log("LOCALTION ", location);
  }, [location]);

  return (
    <div className={styles.root}>
      <img
        onClick={handleClickBookmark}
        className={styles.img}
        src={"./bookmark.svg"}
        alt="bookmark article"
        color="white"
      ></img>
      <img
        className={styles.img}
        src={"./arrow-up.svg"}
        alt="upvote article"
        color="white"
      ></img>
      <img
        className={styles.img}
        src={"./bell.svg"}
        alt="recommend article"
        color="white"
      ></img>
    </div>
  );
}
