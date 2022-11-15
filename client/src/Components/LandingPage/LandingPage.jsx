import React from "react";
import "./LandingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Nav, Button, Form } from "react-bootstrap";

export default function LandingPage() {
  const handleClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    const location = document.querySelector(target).offsetTop;

    window.scrollTo({
      left: 0,
      top: location - 0,
      down: location - 10,
    });
  };
  const img =
    "https://images.ecestaticos.com/GYoqrhNGQVxkGDpZdVYyp_-4qe8=/0x0:1600x900/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F5c9%2Ffaf%2F59a%2F5c9faf59a7384ce1d07729dde9ae781c.jpg";
  const img2 =
    "https://http2.mlstatic.com/D_NQ_NP_2X_756701-MLU49508112613_032022-F.webp";
  const img3 =
    "https://m.media-amazon.com/images/I/71+kDhjbyXL._AC_UL1500_.jpg";
  const img4 =
    "https://m.media-amazon.com/images/I/51OKk9pvEHL._AC_UL1000_.jpg";

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-3 col-xl-3 col-xl-3"></div>
        <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">
          <div className="carousel">
            <Carousel variant="dark">
              <Carousel.Item>
                <div className="imagen">
                  <img
                    className="d-block w-100"
                    src={img}
                    width="300px"
                    height="250px"
                    alt="First slide"
                  />
                  <div>
                    <Carousel.Caption className="descripcionImagen">
                      <h5>First slide label</h5>
                      <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                      </p>
                    </Carousel.Caption>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="imagen">
                  <img
                    className="d-block w-100"
                    src={img2}
                    width="300px"
                    height="250px"
                    alt="Second slide"
                  />
                </div>
                <Carousel.Caption className="descripcionImagen">
                  <h5>Second slide label</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="imagen">
                  <img
                    className="d-block w-100"
                    src={img3}
                    width="300px"
                    height="250px"
                    alt="Second slide"
                  />
                </div>
                <Carousel.Caption className="descripcionImagen">
                  <h5>Second slide label</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="imagen">
                  <img
                    className="d-block w-100"
                    src={img4}
                    width="350px"
                    height="250px"
                    alt="Third slide"
                  />
                </div>
                <Carousel.Caption className="descripcionImagen">
                  <h5>Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        {/*         <div className="row text-white py-5" id="row-about">
          <div className="container text-center">
            <div className="d-flex justify-content-center">
              <div className="col-md-10">
                <h1 className="h3titleimage">Nuestros principios</h1>
                <h5>Nuestros principios se basan en lo siguiente</h5>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <img
                  alt="gif"
                  width="85%"
                  height="90%"
                  src="https://cdn.grupoelcorteingles.es/statics/manager/contents/images/uploads/2022/08/rye5OnVys.gif"
                  className="imgRedonda"
                />
              </div>
            </div>
          </div>
        </div> */}
        <div className="form-position">
          <div className="form-container">
            <div className="formulario">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
