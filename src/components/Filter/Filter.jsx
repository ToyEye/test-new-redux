import { useSelector, useDispatch } from "react-redux";

import {
  InputEnter,
  InputText,
  InputType,
} from "../reusable/FormElements/FormElements";
import { filterContact } from "../../store/contacts/contactSlice";
import { getFilter } from "../../store/contacts/contactSlice";

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handler = (evt) => {
    dispatch(filterContact(evt.target.value));
  };

  return (
    <InputType>
      <InputText>Find contact by name</InputText>
      <InputEnter type="text" value={filter} onChange={handler} />
    </InputType>
  );
};

export default Filter;
