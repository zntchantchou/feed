import { ReactComponent as BookmarkIcon } from "assets/bookmark.svg";

interface IconProps {
  fill: string;
  stroke: string;
}

function Icon({ fill, stroke }: IconProps) {
  return <BookmarkIcon fill={fill} stroke={stroke} />;
}

export default Icon;
