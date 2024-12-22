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
      <h1>دفترچه تلفن</h1>
      <form onSubmit={submitHandler} className="mb-4">
        <div className="form-group text-center">
          <label htmlFor="form-control">نام:</label>
          <input
            type="text"
            className="form-control"
            id="form-control"
            placeholder="نام را وارد کنید"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group text-center">
          <label htmlFor="phone">شماره تلفن:</label>
          <input
            type="number"
            className="form-control"
            id="phone"
            placeholder="شماره تلفن را وارد کنید"
            onChange={(e) => setPhone(e.target.value)} // اصلاح این خط
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            {editIndex !== null ? "ویرایش" : "اضافه کردن"}
          </button>
        </div>
      </form>

      <hr />
      <ul className="list-group">
        {contacts.map((contact, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <CheckTwoToneIcon style={{ color: "green" }} />
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
