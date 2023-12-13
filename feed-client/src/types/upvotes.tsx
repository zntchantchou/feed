export type UpvoteCount = {
  articleId: string;
  upvotes: string;
};

export type UserUpvote = {
  articleId: string;
  createdAt: string;
};

export interface Upvotes {
  all: UpvoteCount[];
  userUpvotes: UserUpvote[];
}
