import { useState, useEffect, Fragment } from "react";
import UserService from "../services/userService";
import { useDispatch, useSelector } from "react-redux";

// Thunks
import { getAllUsersRequest } from "../store/thunks/userThunk";

// Selectors
import { getAllUsersSelector } from "../store/selectors/userSelector";

type UserType = {
  id: number;
  name: string;
  email: string;
};

function UsersList() {
  const dispatch = useDispatch<any>();

  // redux states
  const usersList = useSelector((state: any) => getAllUsersSelector(state));
  console.log("usersList", usersList);

  // the Local State
  const [username, setUsername] = useState("Wissam");

  const [isLoading, setLoading] = useState(false);

  // a function to handle the input onChange event
  const handleInputChange = (event: any) => {
    setUsername(event.target.value);
  };

  // const [usersList, setUsersList] = useState([]);

  const [clickedUser, setClickedUsername] = useState<UserType>();

  const getAllUsers = () => {
    usersList.length === 0 && dispatch(getAllUsersRequest());
    // setLoading(true);
    // userService.getAllUsers().then((response: any) => {
    //   setUsersList(response.data);
    //   setLoading(false);
    // });
  };

  const getUserById = (id: number) => {
    UserService.getUserById(id).then((response: any) => {
      setClickedUsername(response.data);
    });
  };

  let count = 0;
  useEffect(() => {
    count === 0 && getAllUsers();
  }, []);

  return (
    <>
      <div className="users-list-container">
        <div className="users-list-top-section">
          <div>
            <h2>UsersList</h2>

            <h3>the state: {username}</h3>
            <input type="text" value={username} onChange={handleInputChange} />
          </div>

          {/* if the clickedUser not empty we show it */}
          {clickedUser && (
            <div className="user-item">
              <h3>{clickedUser.name}</h3>
              <h3>{clickedUser.email}</h3>
            </div>
          )}
        </div>

        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <>
            {/* list of users */}
            <h2>List of users</h2>
            {usersList &&
              usersList.map((user: UserType) => (
                <div
                  className="user-preview"
                  key={user.id}
                  onClick={() => getUserById(user.id)}
                >
                  <h3>{user.name}</h3>
                  <h3>{user.email}</h3>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
}

export default UsersList;
