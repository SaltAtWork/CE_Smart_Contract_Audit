import './App.css';
import {useState,useEffect} from 'react';
import ListTable from './components/ListTable.js';
import InfoPage from './components/InfoPage';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import { ResponsiveContainer } from 'recharts';
import { checkData } from './components/GlobalFunction';
import "@fontsource/mulish";
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
    lastExploited:"13/02/2021",
    usdTVL:"$736.1M",
    usdTVLChanged:"+0.78%"
  },
  {
    name:"Curve Finance",
    category:"Lending",
    chain:"Ethereum",
    lastExploited:"13/02/2021",
    usdTVL:"$640.8M",
    usdTVLChanged:"-5.08%"
  },
  {
    name:"Aave",
    category:"Lending",
    chain:"Ethereum",
    lastExploited:"14/09/2020",
    usdTVL:"$14.9M",
    usdTVLChanged:"+3.36%"
  },
  {
    name:"Warp Finance",
    category:"Lending",
    chain:"Ethereum",
    lastExploited:"18/12/2020",
    usdTVL:"$5.9M",
    usdTVLChanged:"+3.57%"
  },
  {
    name:"Balancer",
    category:"Trading",
    chain:"Ethereum",
    lastExploited:"28/06/2020",
    usdTVL:"$1.92B",
    usdTVLChanged:"+2.99%"
  },
  {
    name:"Yearn Finance",
    category:"Asset",
    chain:"Ethereum",
    lastExploited:"06/02/2021",
    usdTVL:"$4.47B",
    usdTVLChanged:"+2.28%"
  },
]

function DeFiTable(props){
  const {data} = props;
  const [filter,setFilter] = useState("All");
  const [dataState,setDataState] = useState(false);

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
          <ListTable input={checkData(data) ? data : TableItemList} filter={filter} placeholder={checkData(data)}/>
        </div>
      </div>
  );
}

function App() {
  const [data,setData] = useState("Blank");
  const [received,setReceived] = useState(false);
  useEffect(() => {
      if(!received){
          fetch("http://127.0.0.1:4000/projects")
          .then(res => {
            if(res.ok){
              return res.json();
            }
            throw res;
          })
          .then((res) => {
            setData(res);
            setReceived(true);
          })
          .catch((error) => {
            console.log("Error fetching data : ", error);
            setData("Blank");
            setReceived(false);
          })
      }
  })

  return (
    <div id="bg">
      <Switch>
          <Route path="/" exact>
            <Title />
            <DeFiTable data={data}/>
          </Route>
          <Route path="/info/:name" component={InfoPage} />
      </Switch>
    </div>
  );
}

export default App;

//<Filter />
//<Table />
/*<h1>
              {JSON.stringify(data,null,2)}
            </h1> */