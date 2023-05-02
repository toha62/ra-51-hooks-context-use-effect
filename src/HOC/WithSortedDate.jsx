export default function WithSortedDate(Component, sortField) {
  
  return (props) => {    
    const sortedData = props.list.map((item) => {
      const monthNum = item.date.split('-')[1];
      const month = new Date(Date.parse(item.date)).toDateString().split(' ')[1];
      const year = item.date.split('-')[0];
      const { date } = item;
      const { amount } = item;

      return { month, monthNum, year, date, amount };
    });

    sortedData.sort((a, b) => a[sortField] > b[sortField] ? 1 : -1);    
 
    return <Component {...props} list= {sortedData} />
  }  
}