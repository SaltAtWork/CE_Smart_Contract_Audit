import { useHistory } from 'react-router-dom';
import { convertNumber } from './GlobalFunction';

function TableRow(props){
  const {input,placeholder} = props;
  const history = useHistory();
  const handleClick=()=>{
    history.push('/info/' + input.name);
  }

  return(
    <tr onClick={handleClick}>
      <td>{input.name}</td>
      <td>{input.category}</td>
      <td>{input.chain}</td>
      <td>{input.lastExploited}</td>
      <td>{!placeholder ? input.usdTVL : "$ " + convertNumber(input.usdTVL,false)}</td>
      <td>{!placeholder ? input.usdTVLChanged : convertNumber(input.usdTVLChanged,true) + " %"}</td>
    </tr>
  );
}

function TableHeadRow(){
  return(
    <tr>
      <th>Name</th>
      <th>Category</th>
      <th>Chain</th>
      <th>Last Exploit</th>
      <th>Locked(USD)</th>
      <th>%Change</th>
    </tr>
  );
}

function checkCategory(props){
  const normalCategory = ["Lending","Trading","Assets"];
  for(let i = 0; i < normalCategory.length; i++){
    if(props === normalCategory[i]){
      return false;
    }
  }
  return true;
}

function ListTable(props){
    const {input,filter,placeholder} = props;
    return(
        <table>
          <TableHeadRow />
          {input.map((element)=>{
            if(filter === "All"){
              return <TableRow input={element} placeholder={placeholder} />
            }
            else if(filter === element.category){
              return <TableRow input={element} placeholder={placeholder} />
            }
            else if(filter === "Others" && checkCategory(element.category)){
              return <TableRow input={element} placeholder={placeholder} />
            }
            return null;
          })}
        </table>
    );
}

export default ListTable

/* 

*/