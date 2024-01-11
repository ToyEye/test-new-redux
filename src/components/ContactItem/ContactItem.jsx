import { useDispatch } from "react-redux";
import { deleteContact } from "../../store/contacts/contactSlice";
import { ContactItemStyled, ContactName } from "./ContactItem.styled";
import { Button } from "../reusable/Button/Button";

export const ContactItem = ({ id, name, phone }) => {
  const dispatch = useDispatch();

  return (
    <ContactItemStyled>
      <ContactName>
        {name} : {phone}
      </ContactName>
      <Button onClick={() => dispatch(deleteContact(id))} type="button">
        Delete
      </Button>
    </ContactItemStyled>
  );
};
