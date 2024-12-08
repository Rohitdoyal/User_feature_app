import React from "react";

const Profile = ({ user }) => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h3 className="text-lg font-bold">User Profile</h3>
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Occupation:</strong> {user.occupation}</p>
    <p><strong>Email:</strong> {user.email}</p>
  </div>
);

export default Profile;
