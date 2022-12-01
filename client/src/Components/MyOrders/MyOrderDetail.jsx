import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./MyOrderDetail.module.css"


const OrderDetail = ({data}) => {

    //Bootstrap
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        
        <>

            <Button className={styles.btn} variant="primary" onClick={handleShow}>
               Your Order 
            </Button>
  
        <Modal show={show} onHide={handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Check your Order</Modal.Title>
          </Modal.Header>


          <Modal.Body>
            <div>
                <div className={styles.itemContainer}>  
                        { 
                            data?.purchasedProducts.map((products, index) => (
                                <div key={index}>
                                    <img src={products.product.image}/>
                                    <p>{products.product.name}</p>
                                    <p>{products.size}</p>
                                    <p>{products.color}</p>
                                </div>
                            ))
                        }
                </div>


                <div className={styles.orderContainer}>
                    <h4>Order Information</h4>
                        <p>{data?.status}</p>
                        <p>{data?.address}</p>
                        <p>{data?.totalQuantity}</p>
                        <p>US {data?.totalToPay}</p>
                </div>
            </div>
          </Modal.Body>



          <Modal.Footer>
            
          </Modal.Footer>

        </Modal>
      </>
    )
};

export default OrderDetail;