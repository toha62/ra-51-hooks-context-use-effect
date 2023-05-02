import React, { useState, useEffect, useRef } from 'react';
import List from './components/List';
import Details from './components/Details';

export default function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const timestampRef = useRef();

  useEffect(() => {  
    const fetchData = async () => {
      const timestamp = Date.now();
      timestampRef = timestamp;
      setLoading(true);

      try {
        const response = await fetch(import.meta.env.VITE_DATA_URL);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const list = await response.json();

        if (timestampRef.current === timestamp) {
          setList(list);
        }          
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
      
    };    

    fetchData();
  }, []);

  return (
    <div id="app">
      <List list={list} />
      <Details />      
    </div>
  );
}