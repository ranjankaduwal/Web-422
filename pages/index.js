/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Ranjan Kaduwal Student ID: 126578228 Date: 
*
*  Vercel App (Deployed) Link: 
*
********************************************************************************/ 
import { Row, Col, Image } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
      <Row className="mt-4">
        <Col md={6}>
          <p>
            The Metropolitan Museum of Art, located in New York City, is the largest art museum in the United States and among the most visited art museums in the world. 
          </p>
        </Col>
        <Col md={6}>
          <p>
            For more information, visit the 
            <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer"> Wikipedia page.</a>
          </p>
        </Col>
      </Row>
    </div>
  );
}
