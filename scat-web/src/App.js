import './App.css';
import {useState} from 'react';
import ListTable from './components/ListTable.js';
//import {v4 as uuidv4} from 'uuid';


const Title =()=>{
  return(
    <div id="title">
      <h1>SCAT</h1>
      <h2>SMART CONTRACT SECURITY AUDITING TEAM</h2>
      <p>SCAT is our project to analyze DeFi projects risk and weakness in smart contract, while also provide
        general risk analysis and risk factor data on the project
      </p>
    </div>
  );
}

const FilterList = [
  {id:"All",tag:"All Projects"},
  {id:"Lending",tag:"Lending Projects"},
  {id:"Trading",tag:"Trading Projects"},
  {id:"Asset",tag:"Asset Projects"}
]

const TableItemList = [
  {
    name:"Alpha Homura",
    category:"Lending",
    chain:"Ethereum",
    lastExploit:"13/02/2021",
    tvl:"$736.1M",
    percentChange:"+0.78%"
  },
  {
    name:"CREAM Finance",
    category:"Lending",
    chain:"Ethereum",
    lastExploit:"13/02/2021",
    tvl:"$640.8M",
    percentChange:"-5.08%"
  },
  {
    name:"bZx",
    category:"Lending",
    chain:"Ethereum",
    lastExploit:"14/09/2020",
    tvl:"$14.9M",
    percentChange:"+3.36%"
  },
  {
    name:"Warp Finance",
    category:"Lending",
    chain:"Ethereum",
    lastExploit:"18/12/2020",
    tvl:"$5.9M",
    percentChange:"+3.57%"
  },
  {
    name:"Balancer",
    category:"Trading",
    chain:"Ethereum",
    lastExploit:"28/06/2020",
    tvl:"$1.92B",
    percentChange:"+2.99%"
  },
  {
    name:"Yearn Finance",
    category:"Asset",
    chain:"Ethereum",
    lastExploit:"06/02/2021",
    tvl:"$4.47B",
    percentChange:"+2.28%"
  },
]

function DeFiTable(){
  const [filter,setFilter] = useState("All");

  const changeFilter=(event)=>{
    setFilter(event.target.id);
  }

  return(
    <div>
      <div id="filter">
        {FilterList.map((element)=>{
          if(filter === element.id){
            return <div className="active" id={element.id} onClick={changeFilter}>{element.tag}</div>
          }
          return <div className="not-active" id={element.id} onClick={changeFilter}>{element.tag}</div>
        })}
      </div>
      <div id="defitable">
        <ListTable input={TableItemList} filter={filter}/>
      </div>
    </div>
  );
}


function App() {
  return (
    <div>
      <Title />
      <DeFiTable />
    </div>
  );
}

export default App;

//<Filter />
//<Table />