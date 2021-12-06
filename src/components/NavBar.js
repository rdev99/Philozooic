import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";
import logo from "../assets/logo.png";

const NavBar = (props) => {
  const { user, setUser } = props;



  const showAuthPart = () => {
    if (user === null || typeof user === "undefined") {
      return (
        <li>
          <Link to={"/login"} className={"nav-item"}>
            Login
          </Link>
        </li>
      );
    }
    return (
      <>
        <li>
          {/* eslint-disable-next-line */}
          <Link to={`/user/${user?.userId}`} className={"nav-item"}>
            <img
              src={`/${user?.picturePath}`}
              className={"nav-dp"}
              alt={user.name}
            />
            {`Hi, ${user.name.split(" ")[0]}`}
          </Link>
        </li>
        <li>
          <Link to={"/my-pets"} className={"nav-item"}>
            My Pets
          </Link>
        </li>
        <li>
          {/* eslint-disable-next-line */}
          <a
            className={"nav-item"}
            onClick={() => {
              localStorage.clear();
              setUser(null);
            }}
          >
            Logout
          </a>
        </li>
      </>
    );
  };

  // const SearchBar = () => {
  //   return (
  //     <div className={"uk-navbar-item search-box-div"}>
  //       <form className={"uk-search uk-search-navbar"}>
  //         <span uk-search-icon={""}></span>
  //         <input
  //           className={"uk-search-input search-box"}
  //           type={"search"}
  //           placeholder={"Search"}
  //         />
  //       </form>
  //     </div>
  //   );
  // };

  return (
    <>
      {/* Phone Nav */}
      <div
        uk-sticky={
          "animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; cls-inactive: uk-navbar-transparent uk-light; top: 200"
        }
      >
        <nav className={"uk-navbar uk-navbar-container uk-margin phone-nav"}>
          <div className={"uk-navbar-left"}>
            {/* eslint-disable-next-line */}
            <a className={"uk-navbar-toggle"} href="#">
              <span uk-navbar-toggle-icon={""} />
              <div uk-dropdown={"mode: click"}>
                <ul className={"uk-nav uk-dropdown-nav"}>
                  <li>
                    <Link to={"/about-us"} className={"nav-item"}>
                      About Us
                    </Link>
                  </li>
                  {showAuthPart()}
                </ul>
              </div>
            </a>
          </div>
          <div className={"uk-navbar-right"}>
            <div className={"uk-navbar-item phone-nav-logo-box"}>
              <Link to={"/"}>
                <img
                  src={logo}
                  className={"logo-img"}
                  alt={"Philozooic Logo"}
                />
              </Link>
            </div>
          </div>
        </nav>
      </div>
      {/* Phone Nav Ends */}

      {/* Desktop Nav */}
      <div
        className={"uk-section-primary uk-preserve-color desktop-nav"}
        style={{ backgroundColor: "black" }}
      >
        <div
          uk-sticky={
            "animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; cls-inactive: uk-navbar-transparent uk-light; top: 200"
          }
        >
          <nav className={"uk-navbar-container"}>
            <div className={"uk-container uk-container-expand navbar-cont active"}>
              <div uk-navbar={""} className={"navbar"}>
                <div className={"uk-navbar-item logo-image-box"}>
                  <Link to={"/"}>
                    <img
                      src={logo}
                      className={"logo-img"}
                      alt={"Philozooic Logo"}
                    />
                  </Link>
                  <Link to={"/"} className={"nav-item"}>
                    <h6 className={"company-name"}>Philozooic</h6>
                  </Link>
                </div>

                <ul className={"uk-navbar-nav"}>
                  <li>
                    <Link to={"/about-us"} className={"nav-item"}>
                      About Us
                    </Link>
                  </li>
                  {showAuthPart()}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Desktop Nav Ends */}
    </>
  );
};

export default NavBar;
