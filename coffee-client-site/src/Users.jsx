import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const lodededusers = useLoaderData();
  const [users, setUsers] = useState(useLoaderData);

  const handelDeleted = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("user Deleted", id);
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Deleted Is Done", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remainingUser = users.filter((user) => user._id !== id);
              setUsers(remainingUser);
            }
          });
      }
    });
  };

  const sum = 0;
  console.log(lodededusers);
  return (
    <div>
      <h2>{users.length}</h2>

      {/* // ! =================================== User Table--------------- */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Number</th>
              <th>email</th>
              <th>createdUser</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user) => (
              <tr key={user._id}>
                <th>1</th>
                <th>{user.email}</th>
                <td>{user._id}</td>
                <td>{user.createdUser}</td>
                <td>
                  <button className="font-bold text-green-500">Edit</button>
                </td>
                <td>
                  <button
                    className="font-bold text-red-500"
                    onClick={() => handelDeleted(user._id)}
                  >
                    Deleted
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
