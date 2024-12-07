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
import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { readToken, removeToken } from "../lib/authenticate";

export default function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userName, setUserName] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = readToken();
    if (token) {
      setUserName(token.userName);
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    setUserName(null);
    setIsExpanded(false);
    router.push("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={isExpanded}>
      <Navbar.Brand href="/">Met Museum</Navbar.Brand>
      <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />
      <Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {userName && <Nav.Link href="/favourites">Favourites</Nav.Link>}
        </Nav>
        <Nav>
          {userName ? (
            <NavDropdown title={userName}>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
