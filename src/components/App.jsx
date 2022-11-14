import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Form } from './Form/Form';
import { FilterContact } from './FilterContact/FilterContact';
import { Block } from './App.styled';
import { useState, useEffect } from 'react';


export function App() {
  const [contact, setContact] = useState(() => {
    const value = JSON.parse(localStorage.getItem('contact')) ?? [];
    return value ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contact));
  }, [contact]);

  const addContact = data => {
    if (isDublicate(data)) {
      return alert(`${data.name} -   is already in Phonebook List`);
    }

    setContact(prev => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [...prev, newContact];
    });
  };

  const removeContact = id => {
    setContact(prev => {
      const newContact = prev.filter(item => item.id !== id);
      return newContact;
    });
  };

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const isDublicate = ({ name, phone }) => {
    const result = contact.find(
      item => item.name === name && item.phone === phone
    );
    return result;
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    if (!filter) {
      return contact;
    }
    const filteredContact = contact.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result = normalizedName.includes(normalizedFilter);
      return result;
    });
    return filteredContact;
  };

  const filteredContact = getFilterContacts();
  return (
    <>
      <Block>
        <Form onSubmit={addContact} />
      </Block>

      <FilterContact handleChange={handleChange} />
      <ContactList items={filteredContact} removeContact={removeContact} />
    </>
  );
}
