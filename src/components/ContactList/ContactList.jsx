import { ContactStyledList } from "./ContactList.styled";
import { ContactItem } from "../ContactItem/ContactItem";

import { useSelector } from "react-redux";
import { getFilteredContacts } from "../../store/contacts/contactSlice";

export const ContactList = () => {
  const filter = useSelector(getFilteredContacts);

  return (
    <ContactStyledList>
      {filter &&
        filter.map(({ name, id, phone }) => (
          <ContactItem key={id} name={name} id={id} phone={phone} />
        ))}
    </ContactStyledList>
  );
};
