import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faPinterest,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";
const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="l-footer">
          <h1>
            {/* <img src="https://i.postimg.cc/y62wcLBq/logo.png" alt="" /> */}
            Cameraly
          </h1>
          <p>
            The new hero pieces bring instant fashion credibility. Bright
            florals clash with camouflage prints.
          </p>
          <p>Follow us on</p>
          <div>
            <FontAwesomeIcon
              icon={faTwitter}
              color="white"
              size="2x"
              className="m-1"
            />
            <FontAwesomeIcon
              icon={faFacebook}
              color="white"
              size="2x"
              className="m-1"
            />
            <FontAwesomeIcon
              icon={faPinterest}
              color="white"
              size="2x"
              className="m-1"
            />
            <FontAwesomeIcon
              icon={faLinkedinIn}
              color="white"
              size="2x"
              className="m-1"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              color="white"
              size="2x"
              className="m-1"
            />
          </div>
        </div>
        <ul className="r-footer">
          <li>
            <h2>Information</h2>
            <ul className="box">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Services</Link>
              </li>
              <li>
                <Link href="#">Delivery Information</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms and Conditions</Link>
              </li>
              <li>
                <Link href="#">Return Policy</Link>
              </li>
            </ul>
          </li>
          <li>
            <h2>My Account</h2>
            <ul className="box ">
              <li>
                <Link href="#">My Account</Link>
              </li>
              <li>
                <Link href="#">Cart</Link>
              </li>
              <li>
                <Link href="#">Checkout</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </li>
          <li>
            <h2>Get In Touch</h2>
            <ul className="box">
              <li>
                <Link href="#">14 Tottenham Road, London, England.</Link>
              </li>
              <li>
                <Link href="#">(102) 6666 8888</Link>
              </li>
              <li>
                <Link href="#">info@cameraly.com</Link>
              </li>
              <li>
                <img
                  src="https://template.hasthemes.com/garcia/garcia/assets/images/payment.png"
                  alt=""
                />
              </li>
            </ul>
          </li>
        </ul>
        <div className="b-footer">
          <p>All rights reserved by © Cameraly 2021 </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
