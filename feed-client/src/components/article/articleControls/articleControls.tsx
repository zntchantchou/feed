import { createBookMark, deleteBookmark } from "queries/bookmarks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { joinClasses } from "utils/style";
import { Article } from "types/article";
import Icon, { IconNamesEnum } from "components/icon/icon";
import styles from "./articleControls.module.css";
import { deleteUpvote, upVoteArticle } from "queries/upvotes";

interface ArticleControlsProps {
  article: Article;
  removeFromPage: () => void;
}

enum VARIANTS {
  article = "ARTICLE",
  bookmark = "BOOMARK",
}

export default function ArticleControls({
  article,
  removeFromPage,
}: ArticleControlsProps) {
  let location = useLocation();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.article);
  const [isBookmarked, setIsBookmarked] = useState(!!article.isBookmarked);
  const queryClient = useQueryClient();
  const {
    mutate: deleteBookmarkFn,
    data: deleteBookmarkData,
    error: deleteBookmarkError,
  } = useMutation({
    mutationFn: () => deleteBookmark(article),
    onSettled: () => {
      setIsBookmarked(false);
      console.log("SETTLED deleteBookmarkFn");
      if (variant == VARIANTS.bookmark) {
        console.log("Invalidate");
        // force react query to refresh the bookmarks request when we go back to the feed
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        // removes bookmark from the page if url is /bookmarks
        removeFromPage();
      }
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
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  const {
    mutate: upvoteArticleFn,
    data: upvoteArticleData,
    error: upvoteArticleError,
  } = useMutation({
    mutationFn: () => upVoteArticle(article),
    onSettled: (data) => {
      console.log("UPVOTE ONSETTLED => ", data);
      queryClient.invalidateQueries({ queryKey: ["upvotes"] });
    },
  });

  const {
    mutate: deleteUpvoteFn,
    data: deleteUpvoteData,
    error: deleteUpvoteError,
  } = useMutation({
    mutationFn: () => deleteUpvote(article),
    onSettled: (data) => {
      console.log("DELETE UPVOTE ONSETTLED => ", data);
      queryClient.invalidateQueries({ queryKey: ["upvotes"] });
    },
  });

  const handleClickBookmark = async () => {
    try {
      isBookmarked ? deleteBookmarkFn() : saveBookmarkFn();
      console.log("handleClickBookmark isBookmarked ", isBookmarked);
    } catch (err) {
      console.log("handleClickBookmark ERROR ", err);
    }
  };

  const handleClickUpvote = async () => {
    try {
      // isBookmarked ? deleteBookmarkFn() : saveBookmarkFn();
      console.log("handleClickUpvote");
      upvoteArticleFn();
      // deleteUpvoteFn();
    } catch (err) {
      console.log("handleClickBookmark ERROR ", err);
    }
  };

  useEffect(() => {
    if (location?.pathname === "/bookmarks") {
      if (variant !== VARIANTS.bookmark) setVariant(VARIANTS.bookmark);
    } else {
      if (variant !== VARIANTS.article) setVariant(VARIANTS.article);
    }
  }, [location]);

  useEffect(() => {
    console.log("ARTICLE ", article);
  });

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
          stroke={isBookmarked ? "orangered" : "lightgray"}
          name={IconNamesEnum.bookmark}
        ></Icon>
      </div>
      <div className={styles.img} onClick={handleClickUpvote}>
        <Icon
          fill="#303030"
          stroke="lightgray"
          name={IconNamesEnum.arrowUp}
        ></Icon>
        {article.upvotes && <div>{article.upvotes}</div>}
      </div>
      <Icon fill="#303030" stroke="#fff" name={IconNamesEnum.bell}></Icon>
    </div>
  );
}
