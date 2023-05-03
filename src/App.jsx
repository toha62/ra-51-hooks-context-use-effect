import React, { useState, useEffect, useRef } from 'react';
import List from './components/List';
import Details from './components/Details';
import Loading from './components/Loading';

export default function App() {
  const [list, setList] = useState([]);
  const [info, setInfo] = useState();  
  const [isLoading, setLoading] = useState(false);
  const timestampRef = useRef();

  useEffect(() => {  
    const fetchData = async () => {
      const timestamp = Date.now();
      
      timestampRef.current = timestamp;
      setLoading(true);

      try {
        const response = await fetch(import.meta.env.VITE_DATA_URL + '/users.json');

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

  const getInfo = (id, name) => {    
    setInfo({id, name});
    console.log(info);
  };

  return (
    <div id="app">      
      {isLoading && <Loading />}
      <List list={list} getInfo={getInfo} />
      {info && <Details info={info} setLoading={setLoading} />}
    </div>
  );
}