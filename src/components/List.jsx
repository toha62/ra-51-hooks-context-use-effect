import { useRef } from 'react';

export default function List({ list, getInfo }) { 
  const activeItem = useRef();

  const handleClickList = (target, id, name) => {    
    if (!activeItem.current) {
      activeItem.current = target;
    }
    if (target !== activeItem.current) {
      activeItem.current.classList.remove('active');
      activeItem.current = target;      
    } 
    activeItem.current.classList.add('active');

    getInfo(id, name);
  };

  return (
    <div className="card" style={{width: "18rem"}}>
      <ul className="list-group list-group-flush">
        {list.map(item => 
          <li
            key={item.id}
            className="list-group-item"
            onClick={({ target }) => handleClickList(target, item.id, item.name)}
          >{item.name}</li>
        )}       
      </ul>
    </div>
  );
}