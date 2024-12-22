import React, { useState, useEffect } from "react";
import "./Phonebook.css";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";

const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(savedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedContacts = contacts.map((contact, index) =>
        index === editIndex ? { name, phone } : contact
      );
      setContacts(updatedContacts);
      setEditIndex(null);
    } else {
      setContacts([...contacts, { name, phone }]);
    }
    setName("");
    setPhone("");
  };

  const editHandler = (index) => {
    setEditIndex(index);
    setName(contacts[index].name);
    setPhone(contacts[index].phone);
  };

  const deleteHandler = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  return (
    <div className="container">
      <h2>دفترچه تلفن</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          {" "}
          نام:
          <input
            type="text"
            className="form-control"
            placeholder="نام را وارد کنید"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          شماره تلفن:
          <input
            type="number"
            className="form-control"
            placeholder="شماره تلفن را وارد کنید"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editIndex !== null ? "ویرایش" : "اضافه کردن"}
        </button>
      </form>
      <ul className="list-group mt={3}">
        {contacts.map((contact, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <CheckTwoToneIcon />
            {contact.name} - {contact.phone}
            <div>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => editHandler(index)}
              >
                ویرایش
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteHandler(index)}
              >
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Phonebook;
