import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import Styles from "./WhatsApp.module.css";

const WhatsAppButton = () => {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.wpButton}>
          <a href="https://web.whatsapp.com">
            <BsWhatsapp className={Styles.button} color={"white"} />
          </a>
        </div>
      </div>
    </>
  );
};

export default WhatsAppButton;
