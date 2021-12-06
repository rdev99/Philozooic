import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GetUserById } from "../apis/User";
import "../css/IndividualPage.css";
import CaretakerProfilePage from "./CaretakerProfilePage";
import DoctorProfilePage from "./DoctorProfilePage";
import NGOProfilePage from "./NGOProfilePage";
import UserProfileSection from "./UserProfileSection";

const ProfilePage = (props) => {
  const { userId } = useParams();
  const history = useHistory();
  const { setUserMain } = props;
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState("User");

  useEffect(() => {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser === null || loggedInUser.user.userId !== userId) {
      history.push("/");
    } else {
      fetchUser(userId);
      document.title = `Welcome ${user?.name?.split(" ")[0]} | Philozooic`
    }
  }, [history, user?.name, userId]);

  const fetchUser = async (userID) => {
    await GetUserById(userID)
      .then(({ data: foundUser }) => {
        setUser(foundUser);
        setUserType(foundUser.userType);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderContent = () => {
    return (
      <>
        {user !== null && (
          <>
            <div className={"uk-section hero-section"}>
              <div className={"uk-container"}>
                <h1 className={"hero-heading-text"}>{user.name}</h1>
              </div>
            </div>
            {userType !== null && (
              <div className={"uk-margin-medium-top"}>
                <ul className={"uk-flex-center"} uk-tab={""}>
                  <li>
                    <legend
                      className={
                        selectedUserType === "User" ? "tab active" : "tab"
                      }
                      onClick={() => setSelectedUserType("User")}
                    >
                      User
                    </legend>
                  </li>
                  <li>
                    <legend
                      className={
                        selectedUserType === `${userType}`
                          ? "tab active"
                          : "tab"
                      }
                      onClick={() => setSelectedUserType(userType)}
                    >
                      {userType}
                    </legend>
                  </li>
                </ul>
              </div>
            )}
            {(() => {
              switch (selectedUserType) {
                case "Doctor":
                  return <DoctorProfilePage doctorId={user.targetUserId} />;
                case "Caretaker":
                  return (
                    <CaretakerProfilePage caretakerId={user.targetUserId} />
                  );
                case "NGO":
                  return <NGOProfilePage ngoId={user.targetUserId} />;
                default:
                  return (
                    <UserProfileSection user={user} setUser={setUserMain} />
                  );
              }
            })()}
          </>
        )}
      </>
    );
  };

  return renderContent();
};

export default ProfilePage;
