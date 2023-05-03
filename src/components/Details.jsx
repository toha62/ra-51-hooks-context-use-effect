import { useState, useEffect, useRef } from 'react';

export default function Details({ info, setLoading }) {
  const [userInfo, setUserInfo] = useState({});
  const timestampRef = useRef();

  useEffect(() => {  
    const fetchData = async () => {
      console.log('loading');
      const timestamp = Date.now();

      timestampRef.current = timestamp;
      setLoading(true);
      
      try {
        const response = await fetch(import.meta.env.VITE_DATA_URL + `/${info.id}.json`);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        
        if (timestampRef.current === timestamp) {
          setUserInfo(data);
        }          
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }      
    };    

    fetchData();
  }, [info.id]);
  
  return (
    <div className="card" style={{width: "18rem"}}>
      <img src={`${userInfo.avatar}?img=${userInfo.id}`} className="card-img-top" alt="..." /> 
      <ul className="list-group list-group-flush">
        <li className="list-group-item"><b>{userInfo.name}</b></li>
        <li className="list-group-item">{userInfo.details?.city}</li>
        <li className="list-group-item">{userInfo.details?.company}</li>
        <li className="list-group-item">{userInfo.details?.position}</li>
      </ul>
    </div>
  );
}