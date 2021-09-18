import React, { useState, useEffect } from "react";
import Container from "./components/Container";
import ContactForm from "./components/FormContacts";
import ContactList from "./components/ListContacts";
import Filter from "./components/Filter";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? [];
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const AddContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name}  вже присутній в довіднику контактів.`);
    } else if (contacts.find((contact) => contact.number === number)) {
      alert(`${number}  вже присутній в довіднику контактів.`);
    } else if (!name.trim() || !number.trim()) {
      alert("Введіть назву контакту і номер телефону!");
    } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(number)) {
      alert("Введіть правильний номер телефону! ");
    } else {
      setContacts((prevContacts) => [...prevContacts, contact]);
    }
  };

  const DeleteContact = (contactId) => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <h1>Телефонний довідник</h1>
      <ContactForm onSubmit={AddContact} />
      <h2>Контакти</h2>
      {contacts.length > 1 && <Filter value={filter} onChange={changeFilter} />}
      {contacts.length > 0 ? (
        <ContactList
          contacts={getVisibleContacts()}
          onDelete={DeleteContact}
        />
      ) : (
        <p>Телефонний довідник порожній. Додайте контакт, будь-ласка.</p>
      )}
    </Container>
  );
}

export default App;
