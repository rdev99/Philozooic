import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GetPetsByOwnerIdAPI } from "../apis/Pet";
import "../css/AllPage.css";
import AddPet from "./AddPet";

const UserPetSection = (props) => {
  const { user } = props;
  const [fetchMessage, setFetchMessage] = useState({});
  const [selectedPage, setSelectedPage] = useState("ALL");
  const [userPetList, setUserPetList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (user === null) {
      history.push("/");
    } else {
      document.title = `${user.name.split(" ")[0]}'s Pets | Philozooic`;
      const fetchPetsByOwnerId = async () => {
        await GetPetsByOwnerIdAPI(user.userId)
          .then(({ data: foundPets }) => {
            setUserPetList(foundPets);
            setFetchMessage({
              success: true,
              message: "Pets successfully fetched.",
            });
          })
          .catch((error) => {
            if (error.response.status === 404) {
              setFetchMessage({
                success: false,
                message: "You haven't added any pets yet.",
              });
            }
          });
      };
      fetchPetsByOwnerId();
    }
  }, [history, user]);

  const renderContent = () => {
    if (selectedPage === "ADD") {
      return (
        <AddPet
          user={user}
          userPetList={userPetList}
          setUserPetList={setUserPetList}
        />
      );
    } else {
      if (Object.keys(fetchMessage).length === 0) {
        return <span uk-spinner={"ratio: 4.5"} />;
      } else if (selectedPage === "ALL" && !fetchMessage.success) {
        return (
          <div className={"section"}>
            <p className={"not-found-message"}>{fetchMessage.message}</p>
          </div>
        );
      } else {
        return (
          <div className={"section"}>
            <div className={"uk-child-width-1-4@l pet-card all-page-grid"} uk-grid={""}>
              {(() => {
                return userPetList.map((pet) => {
                  return (
                    <div key={pet.petId}>
                      <div className={"uk-card uk-card-default"}>
                        <div className={"uk-card-media-top"}>
                          <img
                            src={`/${pet.picturePath}`}
                            alt={`${pet.name}`}
                            title={`${pet.name}`}
                          />
                        </div>
                        <div className={"uk-card-body card body"}>
                          <h3 className={"uk-card-title name"}>{pet.name}</h3>
                          <h6 className={"miscellaneous-info"}>
                            Animal: {pet.animalType}
                          </h6>
                          <h6 className={"miscellaneous-info"}>
                            Breed: {pet.breed}
                          </h6>
                          <br />
                          <div className={"button-box"}>
                            <Link
                              to={{
                                pathname: `/pet/${pet.petId}/${user.userId}`,
                                state: {
                                  pet: pet,
                                },
                              }}
                            >
                              <button className={"section-button"}>Edit</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className={"uk-margin-medium-top"}>
      <ul className={"uk-flex-center"} uk-tab={""}>
        <li>
          <legend
            className={selectedPage === "ALL" ? "tab active" : "tab"}
            onClick={() => setSelectedPage("ALL")}
          >
            Your Pets
          </legend>
        </li>
        <li>
          <legend
            className={selectedPage === `ADD` ? "tab active" : "tab"}
            onClick={() => setSelectedPage("ADD")}
          >
            Add Pet
          </legend>
        </li>
      </ul>
      {renderContent()}
    </div>
  );
};

export default UserPetSection;
