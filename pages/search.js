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
import { useForm } from 'react-hook-form';
import { Row, Col, Form, Button } from 'react-bootstrap';

export default function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    let queryString = `searchBy=${data.searchBy}&q=${data.q}`;
    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    if (data.isOnView) queryString += `&isOnView=true`;
    if (data.isHighlight) queryString += `&isHighlight=true`;

    router.push(`/artwork?${queryString}`);
  };

  return (
    <div className="p-4">
      <h2>Advanced Search</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="searchQuery" className="mb-3">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter search query"
            {...register("q", { required: true })}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="searchBy">
              <Form.Label>Search By</Form.Label>
              <Form.Select {...register("searchBy")}>
                <option value="title">Title</option>
                <option value="tags">Tags</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="geoLocation">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter geo location"
                {...register("geoLocation")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (e.g., "Europe", "France", "Paris"), separated by |.
              </Form.Text>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="medium">
              <Form.Label>Medium</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medium"
                {...register("medium")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (e.g., "Paintings", "Sculpture"), separated by |.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="highlight" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Highlighted"
            {...register("isHighlight")}
          />
        </Form.Group>

        <Form.Group controlId="onView" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Currently on View"
            {...register("isOnView")}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
