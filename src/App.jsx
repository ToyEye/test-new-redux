import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

import "./App.css";
import { Loader } from "./components/Loader/Loader";
import { Heading } from "./components/reusable/Heading/Heading";
import { Container } from "./components/reusable/Container/Container";
import { Section } from "./components/reusable/Section/Section";
import Filter from "./components/Filter/Filter";
import { ContactList } from "./components/ContactList/ContactList";
import Form from "./components/Form/Form";

import { fetchApi } from "./store/contacts/contactSlice";

export default function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    dispatch(fetchApi());
  }, [dispatch]);

  return (
    <Container>
      <Toaster
        toastOptions={{
          error: {
            duration: 2000,
          },
        }}
      />
      <Section>
        <Heading as="h1">Phonebook</Heading>
        <Form />
      </Section>
      <Section>
        <Heading as="h2">Contacts</Heading>
        <Filter />
        {loading && !error && <Loader />}
        <ContactList />
      </Section>
    </Container>
  );
}
