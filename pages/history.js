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
import { searchHistoryAtom } from '../store';
import { ListGroup, Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from '@/styles/History.module.css';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const parsedHistory = searchHistory.map((h) => Object.fromEntries(new URLSearchParams(h)));

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation();
    setSearchHistory(current => {
      let updated = [...current];
      updated.splice(index, 1);
      return updated;
    });
  };

  if (!parsedHistory.length) {
    return (
      <Card>
        <h4>Nothing Here</h4>
        Try searching for some artwork.
      </Card>
    );
  }

  return (
    <ListGroup>
      {parsedHistory.map((item, index) => (
        <ListGroup.Item
          key={index}
          className={styles.historyListItem}
          onClick={(e) => historyClicked(e, index)}
        >
          {Object.entries(item).map(([key, value]) => (
            <span key={key}>
              {key}: <strong>{value}</strong>&nbsp;
            </span>
          ))}
          <Button
            variant="danger"
            size="sm"
            className="float-end"
            onClick={(e) => removeHistoryClicked(e, index)}
          >
            &times;
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
