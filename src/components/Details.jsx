import { useState, useEffect, useRef } from 'react';
import { fetchData } from './fetchData';

export default function Details({ info, setLoading }) {
  const [userInfo, setUserInfo] = useState({});
  const timestampRef = useRef();

  useEffect(() => {     
    setLoading(true);    

    fetchData(info.id, setUserInfo, timestampRef)      
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
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