import { useQuery } from "@tanstack/react-query";
import styles from "./contacts.module.css";
import { getUserContacts } from "queries/contacts";
import { useEffect } from "react";
import { Contact } from "components/contact/contact";
import { IContact } from "types/contact";
import Icon, { IconNamesEnum } from "components/icon/icon";
import Button from "components/ui/button/button";

export default function Contacts() {
  const {
    isPending,
    isError,
    data: contacts,
    error,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getUserContacts(),
  });

  useEffect(() => {
    console.log("CONTACTS mount");
  }, []);

  if (isError || error) {
    console.log("IS ERROR", isError, "\n", error);
    return <div>Error</div>;
  }

  if (isPending || !contacts) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.root} key={Math.random() * Math.random()}>
      <div className={styles.controls}>
        <Button
          style={{ width: "12rem" }}
          variant="dark"
          onClick={() => {
            console.log("ONCLICK add contact");
          }}
        >
          <>
            <Icon
              name={IconNamesEnum.addContact}
              fill="lightgray"
              stroke="lightgray"
            ></Icon>
            <div className={styles.buttonLabel}>add contact</div>
          </>
        </Button>
      </div>
      {contacts.map((c: IContact, i: number) => (
        <Contact contact={c} key={i} />
      ))}
    </div>
  );
}
