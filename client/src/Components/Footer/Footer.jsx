import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { BsTwitter, BsInstagram, BsFacebook, BsWhatsapp } from "react-icons/bs";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="page-footer font-small pt-3 text-light" id="footer">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-5 mt-md-0 mt-2">
            <h4>CONTACT</h4>
            <h5 className="text-secondary text-decoration-none">
              henry.becomingfit@gmail.com
            </h5>

            <ul className="list-unstyled text-secondary d-flex justify-content-center flex-row">
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100087643749622"
                  className="text-secondary text-decoration-none mx-1"
                >
                  <BsFacebook size={30} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  className="text-secondary text-decoration-none mx-1"
                >
                  <BsInstagram size={30} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  className="text-secondary text-decoration-none mx-1"
                >
                  <BsTwitter size={30} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.whatsapp.com/"
                  className="text-secondary text-decoration-none mx-1"
                >
                  <BsWhatsapp size={30} />
                </a>
              </li>
            </ul>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-2 mb-md-0 mb-2">
            <h5 id="info" className="text-uppercase">
              Company
            </h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  id="Link"
                  className="text-secondary text-decoration-none"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  id="Link"
                  className="text-secondary text-decoration-none"
                  to="/contact"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-5 mb-md-0 mb-2">
            <h5 id="info" className="text-uppercase">
              Information
            </h5>
            <ul className="list-unstyled text-secondary">
              <li>
                <Link
                  id="Link"
                  to="/faqs"
                  className="text-secondary text-decoration-none"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  id="Link"
                  to="privacypolicy"
                  className="text-secondary text-decoration-none"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  id="Link"
                  to="terms"
                  className="text-secondary text-decoration-none"
                >
                  F.A.Qs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <hr style={{ margin: "2vh 4vw 0 4vw" }} />
          </div>

          <div className="footer-copyright text-center py-3">
            <a href="asd" className="text-secondary text-decoration-none">
              {" "}
              © 2022 Henry Becoming-Fit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
