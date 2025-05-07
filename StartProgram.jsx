import React, { useState, useEffect } from 'react';

const StartProgram = () => {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [boolean, setBoolean] = useState(false);

  // 사용자 목록 불러오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("사용자 불러오기 실패:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = async (user) => {
    user === selectedUser && boolean? setBoolean(false) : setBoolean(true);
    setSelectedUser(user);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("할 일 불러오기 실패:", err);
    }
  };

  return (
    <div>
      <h2>[사용자 목록]</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => handleUserClick(user)} style={{ backgroundColor: selectedUser === user ? "lightblue" : "white" }}>
              - {user.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedUser && boolean && (
        <div>
          <h3>[{selectedUser.name}의 할 일 목록]</h3>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.completed ? "☑" : "☐"} {todo.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StartProgram;