import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReviewToProduct, getReviews } from "../../Redux/Actions/UsersActions";
import styles from "./ProductReviews.module.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAuth0 } from "@auth0/auth0-react";


const ReviewForm = ({idProduct}) => {
  let idUser = useSelector((state) => state.userStore.email);

    //Bootstrap
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //inputs
    const dispatch = useDispatch();
    const state = useSelector(state => state.allProducts)
    const reviews = useSelector(state => state.reviews)
    const [ input, setInput ] = useState({
        rating: "0",
        comment: "",
        recommend: "Yes",
        title: "",
        quality: "0"
    });
    const { user, isAuthenticated } = useAuth0();

    const handleChange = (e) => {
        e.preventDefault(e);
        
        // setInput((prev) => ({...prev, [e.target.name]: e.target.value}))
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
      e.preventDefault(e);
      dispatch(addReviewToProduct(idProduct, idUser, input))
      setInput({
        rating: "",
        comment: "",
        recommend: "Yes",
        title: "",
        quality: ""
      });

      const reviewPosted = () => (alert("Thanks for your feedback!"));
      reviewPosted();
      const handleClose = () => setShow(false);
      handleClose();
      window.location.reload()
    };

    
    return (
        
        <>
        {
            isAuthenticated ? (

              <Button className={styles.popUp} variant="primary" onClick={handleShow}>
                WRITE A REVIEW
              </Button>
            ) : (
                <p>Join our club to give us a feedback!</p>
            )
        }
  
        <Modal show={show} onHide={handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Review this product</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Form>
              <Form.Group  controlId="exampleForm.ControlInput1">
                <Form.Label>Overall Rating</Form.Label>

                <Form.Control
                  type="range" name="rating" value={input.rating} onChange={handleChange} className={styles.rating} min="0" max="5" step="0.1"
                />
              </Form.Group>

              <Form.Group  controlId="exampleForm.ControlInput1">
                <div>Would you recommend this product?</div>
                <Form.Label>
                  Yes
                  <input
                    type="radio" 
                    checked={input.recommend === 'Yes'}
                    name="recommend" value={'Yes'} onChange={handleChange} placeholder="Yes"
                  />
                </Form.Label>
                <Form.Label>
                  No
                  <input
                    checked={input.recommend === 'No'}
                    type="radio" 
                    name="recommend" 
                    value={'No'} onChange={handleChange} placeholder="No"
                  />
                </Form.Label>
                
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Write a short description of this product/ eg. Great fit pants</Form.Label>
                <Form.Control as="textarea" rows={1} name="title" value={input.title} onChange={ handleChange} className={styles.sentence} placeholder={"Write a short title"} />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>How was your experience?</Form.Label>
                <Form.Control as="textarea" rows={4} name="comment" value={input.comment} onChange={ handleChange} className={styles.comment} placeholder={"Write your description"} />
              </Form.Group>

               <Form.Group  controlId="exampleForm.ControlInput1">
                <Form.Label>How do you rate the quality?</Form.Label>
                <Form.Control
                  type="range" name="quality" value={input.quality} onChange={handleChange} className={styles.quality} min="0" max="5" step="0.1"
                />
              </Form.Group>
            </Form>

          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" value="ADDREVIEW" className={styles.submit} variant="primary" /*onSubmit={handleSubmit}*/ onClick={handleSubmit}>
              Submit review
            </Button>
          </Modal.Footer>

        </Modal>
      </>
    )
};

export default ReviewForm;