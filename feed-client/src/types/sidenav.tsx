import { IconNamesEnum } from "components/icon/icon";
import { AppRoutesEnum } from "router/routes";

export type NavItem = {
  label: string;
  redirectTo: AppRoutesEnum;
  iconName: IconNamesEnum;
};
