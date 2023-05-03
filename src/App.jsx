import React, { useState, useEffect, useRef } from 'react';
import List from './components/List';
import Details from './components/Details';
import Loading from './components/Loading';
import { fetchData } from './components/fetchData';

export default function App() {
  const [list, setList] = useState([]);
  const [info, setInfo] = useState();  
  const [isLoading, setLoading] = useState(false);
  const timestampRef = useRef();

  useEffect(() => {      
    setLoading(true);    

    fetchData('users', setList, timestampRef)      
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const getInfo = (id, name) => {    
    setInfo({id, name});
  };

  return (
    <div id="app">      
      {isLoading && <Loading />}
      <List list={list} getInfo={getInfo} />
      {info && <Details info={info} setLoading={setLoading} />}
    </div>
  );
}