import { IContact } from "types/contact";
import styles from "./contact.module.css";
import Icon, { IconNamesEnum } from "components/icon/icon";

interface ContactProps {
  contact: IContact;
}

export function Contact({ contact }: ContactProps) {
  return (
    <div className={styles.root}>
      <Icon name={IconNamesEnum.user} fill="lightgray" stroke="lightgray" />
      <div className={styles.email}>{contact.email}</div>
    </div>
  );
}
