import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReviewToProduct, getReviews } from "../../Redux/Actions/UsersActions";
import styles from "./ProductReviews.module.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAuth0 } from "@auth0/auth0-react";
//Material UI
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';



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
        rating: 2,
        quality: 2,
        recommend: "Yes",
        title: "",
        comment: "",
    });
    const [errors, setErrors] = useState({});
    const { user, isAuthenticated } = useAuth0();



    let validateInput = (input) => {
      const errors = {};
      if (!input.title.length) errors.title = "Please write a title"
      if (!input.comment.length) errors.comment = "Please write a review";
      return errors
    }

    useEffect(() => {
      setErrors(validateInput(input));
    }, [input])


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
     if (!Object.keys(errors).length) {
      setInput({
        name: "",
        description: "",
        releaseDate: "",
        rating: "",
        genres: "",
        platforms: ""
      });
    }

      const reviewPosted = () => (alert("Thanks for your feedback!"));
      reviewPosted();
      const handleClose = () => setShow(false);
      handleClose();
      window.location.reload()
    };

    //Stars Material UI
    const labels = {
      0.5: 'Useless',
      1: 'Useless+',
      1.5: 'Poor',
      2: 'Poor+',
      2.5: 'Ok',
      3: 'Ok+',
      3.5: 'Good',
      4: 'Good+',
      4.5: 'Excellent',
      5: 'Excellent+',
    };

    function getLabelTextRating(value) {
      return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }
    function getLabelTextQuality(value) {
      return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const [hoverRating, setHoverRating] = React.useState(-1);
    const [hoverQuality, setHoverQuality] = React.useState(-1);
    
    
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
                <Form.Label>Overall Rating</Form.Label><br/>


                 <Box
                  sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Rating
                    size="large"
                    name="rating"
                    value={input.rating}
                    precision={0.5}
                    getLabelText={getLabelTextRating}
                    onChange={(event, newValue) => {
                      setInput({
                        ...input,
                        [event.target.name]: event.target.value
                      });
                    }}
                    onChangeActive={(event, newHover) => {
                      setHoverRating(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  {input.rating !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hoverRating !== -1 ? hoverRating : input.rating]}</Box>
                  )}
                </Box>
              </Form.Group>
              <br/>

              <Form.Group  controlId="exampleForm.ControlInput1">
                <Form.Label>How do you rate the quality?</Form.Label><br/>

              <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Rating
                    size="large"
                    name="quality"
                    value={input.quality}
                    precision={0.5}
                    getLabelText={getLabelTextQuality}
                    onChange={(event, newValue) => {
                      setInput({
                        ...input,
                        [event.target.name]: event.target.value
                      });
                    }}
                    onChangeActive={(event, newHover) => {
                      setHoverQuality(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  {input.quality !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hoverQuality !== -1 ? hoverQuality : input.quality]}</Box>
                  )}
                </Box>
              </Form.Group>
              <br/>

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
                <br/>
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

              <br/>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Write a short title for this product. (e.g. Great fit pants)</Form.Label>
                <Form.Control as="textarea" rows={1} name="title" value={input.title} onChange={ handleChange} className={styles.sentence} placeholder={"Write a short title"} />
                <p className={styles.errors}>{errors.title && errors.title}</p>
              </Form.Group>

              <br/>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>How was your experience?</Form.Label>
                <Form.Control as="textarea" rows={4} name="comment" value={input.comment} onChange={ handleChange} className={styles.comment} placeholder={"Write your description"} />
                <p className={styles.errors}>{errors.comment && errors.comment}</p>
              </Form.Group>

              <br/>

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