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
import { useEffect, useState } from 'react';
import { isAuthenticated, readToken } from '../lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '../store';
import { getFavourites, getHistory } from '../lib/userData';

const PUBLIC_PATHS = ['/login', '/register'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  // Update atoms with data from API
  const updateAtoms = async () => {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  };

  useEffect(() => {
    const authCheck = async (url) => {
      const path = url.split('?')[0];
      const isPublic = PUBLIC_PATHS.includes(path);

      if (!isAuthenticated() && !isPublic) {
        setAuthorized(false);
        router.push('/login');
      } else if (isAuthenticated()) {
        await updateAtoms();
        setAuthorized(true);
      } else {
        setAuthorized(true);
      }
    };

    // Check authentication on initial load and on route change
    authCheck(router.asPath);
    const handleRouteChange = (url) => authCheck(url);
    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup event listener
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return authorized ? children : null;
}