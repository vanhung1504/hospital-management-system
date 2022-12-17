import { useState } from "react";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";

function UsersList() {
  const [showForm, setShowForm] = useState({
    isShow: false,
    userId: null,
  });

  return (
    <>
      <UsersTable setShowForm={setShowForm} />
      {showForm.isShow && (
        <UserForm userId={showForm.userId} setShowForm={setShowForm} />
      )}
    </>
  );
}

export default UsersList;
