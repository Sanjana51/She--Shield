import React, { useState, useEffect } from 'react';

export default function ContactCards({ onSelectContact }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/contacts')
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {contacts.map(contact => (
        <div
          key={contact.id}
          className="bg-white border border-pink-200 shadow-md p-4 rounded-lg text-center"
        >
          <h3 className="text-lg font-bold text-pink-800">{contact.name}</h3>
          <p className="text-pink-600">{contact.phone}</p>
          <button
            onClick={() => onSelectContact(contact.phone)}
            className="mt-3 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm"
          >
            📤 Share Location via WhatsApp
          </button>
        </div>
      ))}
    </div>
  );
}

