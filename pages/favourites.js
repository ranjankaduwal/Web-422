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
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '@/components/ArtworkCard';
import { Row, Col, Card } from 'react-bootstrap';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList.length) {
    return (
      <Card>
        <h4>Nothing Here</h4>
        Try adding some artwork to the favourites list.
      </Card>
    );
  }

  return (
    <Row className="gy-4">
      {favouritesList.map((id) => (
        <Col lg={3} key={id}>
          <ArtworkCard objectID={id} />
        </Col>
      ))}
    </Row>
  );
}
