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
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function Artwork() {
  const router = useRouter();
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);
  const finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  useEffect(() => {
    if (data) {
      const filteredResults = validObjectIDList.objectIDs.filter((id) =>
        data.objectIDs?.includes(id)
      );
      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        results.push(filteredResults.slice(i, i + PER_PAGE));
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) return <Card><h4>Error 404: Data Not Found</h4></Card>;
  if (!artworkList) return null;

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((id) => (
            <Col lg={3} key={id}>
              <ArtworkCard objectID={id} />
            </Col>
          ))
        ) : (
          <Card>
            <h4>Nothing Here</h4>
            Try searching for something else.
          </Card>
        )}
      </Row>
      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : page)} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={() => setPage(page < artworkList.length ? page + 1 : page)} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}