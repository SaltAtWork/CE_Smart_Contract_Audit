function TableRow(props){
  const {input} = props;
  return(
    <tr>
      <td>{input.name}</td>
      <td>{input.category}</td>
      <td>{input.chain}</td>
      <td>{input.lastExploit}</td>
      <td>{input.tvl}</td>
      <td>{input.percentChange}</td>
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

function ListTable(props){
    const {input,filter} = props;
    return(
        <table>
          <TableHeadRow />
          {input.map((element)=>{
            if(filter === "All"){
              return <TableRow input={element} />
            }
            else if(filter === element.category){
              return <TableRow input={element} />
            }
            return null;
          })}
        </table>
    );
}

export default ListTable