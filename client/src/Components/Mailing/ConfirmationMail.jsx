 import React, { useState } from "react"
 import styles from "./ConfirmationMail.module.css";
 import NavBar from "../NavBar/NavBar";
 import Footer from "../Footer/Footer";

 import { useDispatch, useSelector } from "react-redux";
 import { postMail } from "../../Redux/Actions/UsersActions"

 
 const Mailing = () => {
    const dispatch = useDispatch();
    const [ input, setInput ] = useState({
        name: "",
        color: "",
        size: "",
        email: "",
        message: "",
    });

    console.log(input);

    const handleChange = (e) => {
        e.preventDefault(e);
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
    };


    const handleSubmit = (e) => {
        e.preventDefault(e)
        dispatch(postMail(input))
    };
    return(
        <div>
            <NavBar/>
            <div className={styles.container}>
                <h1 className={styles.brand}><span>Becoming Fit</span> Web Design</h1>
                <div className={styles.wrapper}>
                <div className={styles.companyInfo}>
                    <h3>Becoming Fit</h3>
                    <ul>
                    <li><i className="fa fa-road"></i> 44 Something st</li>
                    <li><i className="fa fa-phone"></i> (555) 555-5555</li>
                    <li><i className="fa fa-envelope"></i> test@acme.test</li>
                    </ul>
                </div>
                <div className={styles.contact}>
                    <h3>Email Us</h3>
                    {/* {{msg}} */}
                    <form onSubmit={handleSubmit} method="POST" action="send">
                    <p>
                        <label>Name</label>
                        <input onChange={handleChange} type="text" name="name"/>
                    </p>
                    <p>
                        <label>Color</label>
                        <input onChange={handleChange} type="text" name="color"/>
                    </p>
                    <p>
                        <label>Email Address</label>
                        <input onChange={handleChange} type="email" name="email"/>
                    </p>
                    <p>
                        <label>Size</label>
                        <input onChange={handleChange} type="text" name="size"/>
                    </p>
                    <p className={styles.full}>
                        <label>Message</label>
                        <textarea  onChange={handleChange}name="message" rows="5"></textarea>
                    </p>
                    <p className={styles.full}>
                        <button type="submit">Submit</button>
                    </p>
                    </form>
                </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
 };

 export default Mailing;