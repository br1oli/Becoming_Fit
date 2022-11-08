import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { 
    BsTwitter, 
    BsInstagram, 
    BsFacebook, 
    BsWhatsapp 
} from 'react-icons/bs'

import './Footer.css'

const Footer = () => {
  return (
    <footer className="page-footer font-small pt-4 text-light" id='footer'>
    <div className="container-fluid text-center text-md-left">
        <div className='row'>
            <div className='col-md-5 mt-md-0 mt-2'>
                <p>Henry Becoming Fit</p>
            </div>

            <hr className='clearfix w-100 d-md-none pb-0'/>

            <div className="col-md-2 mb-md-0 mb-2">

                 <h5 id="info" className="text-uppercase">Company</h5>

                 <ul className='list-unstyled'>
                    <li>   
                        <Link id="Link" className="text-secondary text-decoration-none" to="/contact">Contact</Link>
                    </li>
                    <li>     
                        <Link id="Link" className="text-secondary text-decoration-none" to="/contact">About Us</Link>
                    </li>
                 </ul>

            </div>

            <div className='col-md-2 mb-md-0 mb-2'>

                 <h5 id='info' className='text-uppercase'>Infotmation</h5>

                 <ul className='list-unstyled text-secondary'>
                     <li>
                        <Link id='Link' className="text-secondary text-decoration-none">Terms & Conditions</Link>
                     </li>
                     <li>
                        <Link id='Link' className="text-secondary text-decoration-none">Privacy Policy</Link>
                     </li>
                     <li>
                        <Link id='Link' className="text-secondary text-decoration-none">F.A.Qs</Link>
                     </li>
                 </ul>
            </div>

            <div className='col-md-2 mb-md-0 mb-2'>
                <h5 id='info' className='text-uppercase'>Follow Us</h5>
                <ul className='list-unstyled text-secondary d-flex justify-content-center flex-row'>
                    <li><a href="" className='text-secondary text-decoration-none mx-1'><BsFacebook /></a></li>
                    <li><a href="" className='text-secondary text-decoration-none mx-1'><BsInstagram /></a></li>
                    <li><a href="" className='text-secondary text-decoration-none mx-1'><BsTwitter /></a></li>
                    <li><a href="" className='text-secondary text-decoration-none mx-1'><BsWhatsapp /></a></li>
                </ul>
            </div>

            <div>
                <hr style={{margin: "0 0 0 0"}}/>
            </div>

            <div className='footer-copyright text-center py-3' >
            Copyright © 2022: <a href="asd" className='text-secondary text-decoration-none'>Henry Becoming Fit SRL</a>
            </div>

        </div>
    </div>
    </footer>
  )
}

export default Footer;