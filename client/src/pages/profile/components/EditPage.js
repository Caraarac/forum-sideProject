import React, { useState } from "react";
import UserAuthService from "../../../services/userAuth.service";
import AuthService from "../../../services/auth.services";

const EditPage = ({
  handleEditPage,
  editStatus,
  currentUser,
  setCurrentUser,
  currentUserStatus,
}) => {
  const [username, setUsername] = useState(currentUser.user.username);
  const [password, setPassword] = useState("");
  // error message
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // get input value
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // handle send
  const handleSend = () => {
    currentUserStatus.current = true;
    setLoading(true);
    UserAuthService.editUser(currentUser.user._id, username, password)
      .then((d) => {
        let data = JSON.parse(localStorage.getItem("user"));
        data.user = d.data;
        localStorage.setItem("user", JSON.stringify(data));
        setCurrentUser(AuthService.getCurrentUser());
        handleEditPage(false);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.response);
        setMessage(e.response.data);
      });
  };
  return (
    <div className="editPage">
      {/* loading css animation */}
      {loading && (
        <div className="loading-box">
          <div className="loading la-ball-8bits la-2x">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <div className={editStatus ? "editPage-box moveBox" : "editPage-box"}>
        <div className="editPage-container">
          <div className="title">
            <h1>????????????</h1>
          </div>
          <div className="username">
            <p>????????????????????????:</p>
            <input
              onChange={handleUsername}
              placeholder="????????????????????????"
              type="text"
              id="username"
              value={username}
              required
            />
          </div>
          <div className="password">
            <p>???????????????:</p>
            <input
              onChange={handlePassword}
              placeholder="???????????????"
              type="password"
              id="password"
              required
            />
          </div>
          {message && <div className="error">{message}</div>}
          <div className="button">
            <button onClick={() => handleEditPage(false)}>??????</button>
            <button onClick={handleSend}>??????</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
