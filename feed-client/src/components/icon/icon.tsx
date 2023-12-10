import { ReactComponent as BookmarkIcon } from "assets/bookmark.svg";
import { ReactComponent as BellIcon } from "assets/bell.svg";
import { ReactComponent as ArrowUpIcon } from "assets/arrow-up.svg";
import { ReactComponent as SearchIcon } from "assets/search.svg";
import { ReactComponent as TrendingIcon } from "assets/trending-up.svg";
import { ReactComponent as FlagIcon } from "assets/flag.svg";
import { ReactComponent as FolderIcon } from "assets/folder.svg";
import { ReactElement, SVGProps } from "react";

export enum iconNamesEnum {
  bookmark = "bookmark",
  bell = "bell",
  arrowUp = "arrowUp",
  search = "search",
  trending = "trending",
  folder = "folder",
  flag = "flag",
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: iconNamesEnum;
}

interface Icons {
  [key: string]: (
    iconProps: IconProps
  ) => ReactElement<SVGProps<SVGSVGElement>, any>;
}

const icons: Icons = {
  bookmark: (props: IconProps) => <BookmarkIcon {...props} />,
  bell: (props: IconProps) => <BellIcon {...props} />,
  search: (props: IconProps) => <SearchIcon {...props} />,
  arrowUp: (props: IconProps) => <ArrowUpIcon {...props} />,
  trending: (props: IconProps) => <TrendingIcon {...props} />,
  flag: (props: IconProps) => <FlagIcon {...props} />,
  folder: (props: IconProps) => <FolderIcon {...props} />,
};

function Icon(props: IconProps): ReactElement<SVGProps<SVGSVGElement>, any> {
  return icons[props.name](props);
}

export default Icon;
