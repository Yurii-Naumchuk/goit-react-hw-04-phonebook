import React from 'react';
import { Ul, Li, Button } from './ContactList.styled';

export function ContactList({ items, removeContact }) {
  
  const elements = items.map(({ name, phone, id }) => {
    return (
      <Li key={id}>
        Name :{name} Phone :{phone}
        <Button onClick={() => removeContact(id)}>Delete</Button>
      </Li>
    );
  });
  return <Ul>{elements}</Ul>;
}
