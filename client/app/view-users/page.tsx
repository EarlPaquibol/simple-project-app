"use client";

import { useEffect, useState } from "react";

interface UserType {
  id: string;
  name: string;
  email: string;
}

const ViewUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const getUsers = () => {
    fetch("http://localhost:3000/api/v1/getUsers")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };

  const deleteUser = (userId: string) => {
    fetch(`http://localhost:3000/api/v1/deleteUser/${userId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong!");
        console.log(res);
        console.log("User deleted");
        setUsers((prev) => prev.filter((user) => user.id != userId));
      })
      .catch((err) => console.log(err));
  };

  const insertUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/insertUser/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("Http error!");
      const newUser: UserType = await res.json();
      console.log("Created ", newUser);
      setUsers((prev) => [...prev, newUser]);
      setName("");
      setEmail("");
    } catch (err) {
      console.log("Error encountered", err);
    }
  };

  const editUser = async (userId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/editUser/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        },
      );
      if (!res.ok) throw new Error("Something went wrong!");
      const editedUser: UserType = await res.json();
      console.log("Successfully edited user", editedUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Simple crud app!</h1>
      <button onClick={() => getUsers()}>Get Users</button>
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              Name: {user.name} Email: {user.email}
              <button onClick={() => deleteUser(user.id)}>Delete user</button>
              <input
                placeholder="New name"
                onChange={(e) => setName(e.target.value)}
              ></input>
              <input
                placeholder="New email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <button onClick={() => editUser(user.id)}>Edit user</button>
            </li>
          ))}
        </ul>
      )}

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <button onClick={() => insertUser()}>Insert User</button>
      </div>
    </div>
  );
};

export default ViewUsers;
