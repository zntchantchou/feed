import { Article } from "types/article";
import { createBookMark, deleteBookmark } from "queries/bookmarks";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styles from "./articleControls.module.css";
import Icon, { iconNamesEnum } from "components/icon/icon";
import { joinClasses } from "utils/style";

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
  const [isBookmarked, setIsBookmarked] = useState(!!article.isBookmarked);
  const {
    mutate: deleteBookmarkFn,
    data: deleteBookmarkData,
    error: deleteBookmarkError,
  } = useMutation({
    mutationFn: () => deleteBookmark(article),
    onSettled: () => {
      console.log("SETTLED deleteBookmarkFn");
      setIsBookmarked(false);
    },
  });
  const {
    mutate: saveBookmarkFn,
    data: saveBookmarkData,
    error: saveBookmarkError,
  } = useMutation({
    mutationFn: () => createBookMark(article),
    onSettled: () => {
      console.log("SETTLED saveBookmarkFn");
      setIsBookmarked(true);
    },
  });

  const handleClickBookmark = async () => {
    try {
      article.isBookmarked ? deleteBookmarkFn() : saveBookmarkFn();
    } catch (err) {
      console.log("handleClickBookmark ERROR ", err);
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
      <div
        className={joinClasses(
          styles.img,
          isBookmarked ? styles.bookmarked : ""
        )}
        onClick={handleClickBookmark}
      >
        <Icon
          fill="#303030"
          stroke={isBookmarked ? "orangered" : "white"}
          name={iconNamesEnum.bookmark}
        ></Icon>
      </div>
      <img
        className={styles.img}
        src={"./arrow-up.svg"}
        alt="upvote article"
      ></img>
      <img
        className={styles.img}
        src={"./bell.svg"}
        alt="recommend article"
      ></img>
    </div>
  );
}
