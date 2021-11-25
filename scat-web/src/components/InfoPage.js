import { useState,useEffect } from 'react';
import {Link,useHistory} from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { convertNumber, checkData } from './GlobalFunction';

function TVLTable(props){
    const {data} = props;
    return(
        <div class="infoitem">
            <h3>
                Total Value Locked
            </h3>
            <table>
                <tr>
                    <td id="head">in USD</td>
                    <td id="data">$ {checkData(data) ? convertNumber(data[0].usdTVL,false) : "xxx.x M"}</td>
                    <td id="data">{checkData(data) ? convertNumber(data[0].usdTVLChanged,true) : "+ x.x"}%</td>
                </tr>
                <tr>
                    <td id="head">in ETH</td>
                    <td id="data">{checkData(data) ? convertNumber(data[0].ethTVL,false) : "xxx.x K"} ETH</td>
                    <td id="data">{checkData(data) ? convertNumber(data[0].ethTVLChanged,true) : "+ x.x"}%</td>
                </tr>
                <tr>
                    <td id="head">in BTC</td>
                    <td id="data">{checkData(data) ? convertNumber(data[0].btcTVL,false) : "xxx.x K"} BTC</td>
                    <td id="data">{checkData(data) ? convertNumber(data[0].btcTVLChanged,true) : "+ x.x"}%</td>
                </tr>
                <tr>
                    <td id="head">ETH Locked</td>
                    <td id="data">{checkData(data) ? convertNumber(data[0].ethLocked,false) : "xxx.x K"} ETH</td>
                    <td id="data">+ x.x K ETH</td>
                </tr>
            </table>
        </div>
    );
}

function CreditComponent(props){
    const {name,data} = props;
    return(
        <div class="infoitem">
            <h3>
                Timestamps
            </h3>
            <table>
                <tr>
                    <td id="head">Project Launch Date</td>
                    <td id="data">xx/xx/xxxx</td>
                </tr>
                <tr>
                    <td id="head">Last Exploited</td>
                    <td id="data">xx/xx/xxxx</td>
                </tr>
            </table>
        </div>
    );
}

function LinkComponent(props){
    const {name} = props;
    const [data,setData] = useState("Blank");
    const [received,setReceived] = useState(false);
    useEffect(() => {
        if(!received){
            fetch("http://127.0.0.1:4000/ecosystems/" + name)
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
    return(
        <div class="infoitem">
            <h3>
                Project's Links
            </h3>
            {!checkData(data) ? <p>No Link Available</p> : data.map((element)=>{
                return <p><a href={element.linkAddress}>{element.description}</a></p>
            })}
        </div>
    );
}

function AuditHistoryComponent(props){
    const {name} = props;
    const [data,setData] = useState("Blank");
    const [received,setReceived] = useState(false);
    useEffect(() => {
        if(!received){
            fetch("http://127.0.0.1:4000/audits/" + name)
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
    return(
        <div class="infoitem">
            <h3>
                Audit History
            </h3>
            {!checkData(data) ? <p>No Audit Available</p> : data.map((element)=>{
                return <p><a href={element.linkAddress}>{element.description}</a></p>
            })}
        </div>
    );
}

function ChartComponent(props){
    const {name,data} = props;
    const [currency,setCurrency] = useState("USD");
    const [range,setRange] = useState(10);
    const chartData = [
        {name: 'A', USD: 4000, ETH: 2400, BTC: 2200},
        {name: 'B', USD: 8000, ETH: 1000, BTC: 2100},
        {name: 'C', USD: 6000, ETH: 2400, BTC: 2400},
        {name: 'D', USD: 3000, ETH: 4200, BTC: 1200},
        {name: 'E', USD: 4000, ETH: 2400, BTC: 2200},
        {name: 'F', USD: 8000, ETH: 1000, BTC: 2100},
        {name: 'G', USD: 6000, ETH: 2400, BTC: 2400},
        {name: 'H', USD: 3000, ETH: 4200, BTC: 1200},
        {name: 'I', USD: 4000, ETH: 2400, BTC: 2200},
        {name: 'J', USD: 8000, ETH: 1000, BTC: 2100},
        {name: 'K', USD: 6000, ETH: 2400, BTC: 2400},
        {name: 'L', USD: 3000, ETH: 4200, BTC: 1200},
        {name: 'M', USD: 4000, ETH: 2400, BTC: 2200},
        {name: 'N', USD: 8000, ETH: 1000, BTC: 2100},
        {name: 'O', USD: 6000, ETH: 2400, BTC: 2400},
        {name: 'P', USD: 3000, ETH: 4200, BTC: 1200},
    ];

    var FilteredData = chartData.slice(chartData.length - range);

    const changeCurrency=(event)=>{
        setCurrency(event.target.id);
    }

    const changeRange=(event)=>{
        setRange(event.target.id);
        if(range != "All"){
            FilteredData = chartData.slice(chartData.length - range);
        }
        else{
            FilteredData = chartData;
        }
    }

    const checkCurrency=(id)=>{
        if(currency == id){
            return "active";
        }
        else{
            return "not-active";
        }
    }

    const checkRange=(id)=>{
        if(range == id){
            return "active";
        }
        else{
            return "not-active";
        }
    }

    return(
        <div class="infoitem">
            <h3>
                Chart
            </h3>
            <p class="chart_left">
                <span class={checkCurrency("USD")} id="USD" onClick={changeCurrency}>USD</span>
                <span> | </span>
                <span class={checkCurrency("ETH")} id="ETH" onClick={changeCurrency}>ETH</span>
                <span> | </span>
                <span class={checkCurrency("BTC")} id="BTC" onClick={changeCurrency}>BTC</span>
            </p>
            <p class="chart_right">
                <span class={checkRange("All")} onClick={changeRange} id="All">All</span>
                <span> | </span>
                <span class={checkRange(10)} onClick={changeRange} id={10}>10 Lists</span>
                <span> | </span>
                <span class={checkRange(5)} onClick={changeRange} id={5}>5 Lists</span>
            </p>
            <p></p>
            <p></p>
            <LineChart width={600} height={300} data={FilteredData}>
                <Line type="monotone" dataKey={currency} stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" vertical={false}/>
                <Tooltip />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        </div>
    );
}

function DescriptionComponent(props){
    const {name,data} = props;
    return(
        <div class="infoitem">
            <h3>{name}'s Description</h3>
            {checkData(data) ? <p>{data[0].description}</p> : <p>No Description Available</p>}
        </div>
    );
}

function AnalysisComponent(props){
    const {data} = props;
    return(
        <div class="infoitem">
            <h3>Analysis</h3>
            {checkData(data) ? <p>{data[0].riskAnalysis}</p> : <p>No Risk Analysis Available</p>}
        </div>
    );
}

function ExploitCaseComponent(props){
    const {name,data} = props;
    return(
        <div class="infoitem">
            <h3>Exploited Case</h3>
            <p>19 October 2021</p>
            <t></t>
            <p>&emsp;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
    );
}


function OurAnalysisComponent(props){
    const {name,data} = props;
    return(
        <div class="infoitem">
            <h3>Smart Contract Auditing Result</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
    );
}


function InfoPage(props){
    const name=props.match.params.name;
    const history = useHistory();
    const fetchLink = "http://127.0.0.1:4000/projects/" + name;
    const [data,setData] = useState("Blank");
    const [received,setReceived] = useState(false);
    useEffect(() => {
        if(!received){
            fetch(fetchLink)
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


    return(
        <div>
            <div id="infotop">
                <h1 onClick={() => history.goBack()}>SCAT</h1>
            </div>
            <div id="infotitle">
                <h2>{name}</h2>
                <h3>Key Statistic</h3>
            </div>
            <div class="infopage">
                <div class="infolist-a">
                    <TVLTable data={data} />
                    <CreditComponent name={name} data={data} />
                    <LinkComponent name={name} />
                    <AuditHistoryComponent name={name} />
                </div>
                <div class="infolist-b">
                    <ChartComponent name={name} data={data} />
                    <DescriptionComponent name={name} data={data} />
                    <AnalysisComponent data={data} />
                    <ExploitCaseComponent name={name} data={data} />
                    <OurAnalysisComponent name={name} data={data} />
                </div>
            </div>
        </div>
    );
}

export default InfoPage;

/*  Exploited Case Placeholder
            <p>19 October 2021</p>
            <t></t>
            <p>&emsp;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

            <p><a href="#">{name} 1st Exploit</a></p>
            <p><a href="#">{name} Lab</a></p>
            <p><a href="https://www.twitter.com">Twitter</a></p>

            */