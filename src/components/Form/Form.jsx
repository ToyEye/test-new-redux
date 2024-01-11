import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { addContact } from "../../store/contacts/contactSlice";

import {
  InputEnter,
  InputText,
  InputType,
} from "../reusable/FormElements/FormElements";
import { Button } from "../reusable/Button/Button";
import { FormStyled } from "./Form.styled";
import { getFilteredContacts } from "../../store/contacts/contactSlice";

export default function Form() {
  const [name, setName] = useState("");
  const [phone, setNumber] = useState("");

  const contacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "phone":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (contacts.find((contact) => contact.name === name)) {
      toast.error("Contact exist!");
      return;
    } else {
      toast.success("Contact added");
      await dispatch(addContact({ name, phone }));
    }

    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <InputType>
        <InputText>Name</InputText>
        <InputEnter
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Enter your name"
          required
          value={name}
          onChange={handleChange}
        />
      </InputType>
      <InputType>
        <InputText>Name</InputText>
        <InputEnter
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter your number"
          value={phone}
          onChange={handleChange}
        />
      </InputType>
      <Button type="submit">Add contact</Button>
    </FormStyled>
  );
}
