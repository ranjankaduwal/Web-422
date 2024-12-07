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
import useSWR from 'swr';
import Error from 'next/error';
import { Card } from 'react-bootstrap';

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          Date: {data.objectDate || 'N/A'}<br />
          Classification: {data.classification || 'N/A'}<br />
          Medium: {data.medium || 'N/A'}
        </Card.Text>
        <br />
        <Card.Text>
          Artist: {data.artistDisplayName || 'N/A'}
          {data.artistDisplayName && (
            <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
              (wiki)
            </a>
          )}
        </Card.Text>
        <Card.Text>Credit Line: {data.creditLine || 'N/A'}</Card.Text>
        <Card.Text>Dimensions: {data.dimensions || 'N/A'}</Card.Text>
      </Card.Body>
    </Card>
  );
}
