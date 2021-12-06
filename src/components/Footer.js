import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Footer.css";

const Footer = () => {
  return (
    <>
      <div className={"footer-section"}>
        <div uk-grid={""} className={"footer-grid"}>
          <div className={"uk-width-1-3@m"}>
            <img src={logo} alt={"Philozooic Logo"} className={"footer-logo"} />
            <h2 className={"company-name"}>Philozooic</h2>
          </div>
          <div className={"uk-width-1-3@m links-section"}>
            <ul className={"uk-nav-primary uk-nav-parent-icon"} uk-nav={""}>
              <li>
                <Link to={"/about-us"}>
                  <span className={"footer-link"}>About Us</span>
                </Link>
              </li>
              <li>
                <Link to={"/doctor"}>
                  <span className={"footer-link"}>Doctors</span>
                </Link>
              </li>
              <li>
                <Link to={"/caretaker"}>
                  <span className={"footer-link"}>Caretakers</span>
                </Link>
              </li>
              <li>
                <Link to={"/date-mate"}>
                  <span className={"footer-link"}>Date-Mate</span>
                </Link>
              </li>
              <li>
                <Link to={"/ngo"}>
                  <span className={"footer-link"}>NGOs</span>
                </Link>
              </li>
              <li>
                <Link to={"/faq"}>
                  <span className={"footer-link"}>FAQs</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className={"uk-width-1-3@m contact-section"}>
            <h2 className={"footer-contact"}>Contact Us:</h2>
            <div>
              <div className={"contact-div"}>
                <span
                  className={"uk-icon-button uk-margin-small-right"}
                  uk-icon={"receiver"}
                />
                <a className={"contact-info"} href={"tel:7488334705"}>
                  7488334705
                </a>
              </div>
              <div className={"contact-div"}>
                <span
                  className={"uk-icon-button uk-margin-small-right"}
                  uk-icon={"mail"}
                />
                <a
                  className={"contact-info"}
                  href={"mailto:support@philozooic.com"}
                >
                  support@philozooic.com
                </a>
              </div>
              <div className={"contact-div"}>
                <span
                  className={"uk-icon-button uk-margin-small-right"}
                  uk-icon={"location"}
                />
                <span className={"contact-info"}>Hazaribagh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
