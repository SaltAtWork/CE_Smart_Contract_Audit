import './App.css';
import TierListItem from './components/TierListItem.js';
import {v4 as uuidv4} from 'uuid';

const Title =()=><h1 id="title">[Insert Project Name Here]</h1>

const FilterList = [
  "All",
  "Lending",
  "DEXes"
]

const TierListItemList = [
  {
    ranking:"Rank",
    defiName:"Name",
    chainType:"Chain",
    categoryType:"Category",
    totalValueLocked:"TVL",
    oneDayChange:"1 Day%"
  },
  {
    ranking:"1",
    defiName:"Aave",
    chainType:"Multichain",
    categoryType:"Lending",
    totalValueLocked:"$15.51B",
    oneDayChange:"2.58%"
  },
  {
    ranking:"2",
    defiName:"Curve Finance",
    chainType:"Multichain",
    categoryType:"DEXes",
    totalValueLocked:"$13.44B",
    oneDayChange:"10.41%"
  },
]

const Filter =()=>{
  return(
    <ul>
      {FilterList.map((element)=>{
        return <li> {element} </li>
      })}
    </ul>
  );
}

const TierList =()=>{
  return(
    <div class="col-9">
      {TierListItemList.map((element)=>{
        return <TierListItem input={element} />
      })}
    </div>
  );
}

const DeFiList =()=>{
  return(
    <div class="row"> 
        <div class="col-3 filter">
          <span>Filter</span>
          <Filter />
        </div>
        <TierList />
      </div>
  );
}

function App() {
  return (
    <div>
      <Title />
      <DeFiList />
    </div>
  );
}

export default App;
