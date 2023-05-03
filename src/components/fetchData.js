export function fetchData(param, setFunction, timestampRef) {
  
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    timestampRef.current = timestamp;

    fetch(import.meta.env.VITE_DATA_URL + `/${param}.json`)
      .then(response => {
        if (!response.ok) {
          reject(new Error(response.statusText));
        }
        return response.json();
      })
      .then((data) => {
        if (timestampRef.current === timestamp) {
          setFunction(data);
        }
        resolve();
      })
      .catch((e) => reject(e));      
  });   
};    