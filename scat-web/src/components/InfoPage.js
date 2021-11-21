import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function convertNumber(num){
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;

    var rounded;
    var fixed;
    if(num >= billion){
        rounded = Math.round(num / billion * 10) / 10;
        fixed = rounded.toFixed(1);
        return fixed + " B";
    }
    else if(num >= million){
        rounded = Math.round(num / million * 10) / 10;
        fixed = rounded.toFixed(1);
        return fixed + " M";
    }
    else if(num >= thousand){
        rounded = Math.round(num / thousand * 10) / 10;
        fixed = rounded.toFixed(1);
        return fixed + " K";
    }
    else{
        rounded = Math.round(num * 10) / 10;
        fixed = rounded.toFixed(1);
        return fixed;
    }
}

function checkData(data){
    if(data !== "Blank"){
        if(data.length == 1){
            return true;
        }
    }
    return false;
}

function TVLTable(props){
    const {name,data} = props;
    return(
        <div class="infoitem">
            <h3>
                Total Value Locked
            </h3>
            <table>
                <tr>
                    <td id="head">in USD</td>
                    <td id="data">$ {checkData(data) ? convertNumber(data[0].usdTVL) : "xxx.x M"}</td>
                    <td id="data">+ x.x%</td>
                </tr>
                <tr>
                    <td id="head">in ETH</td>
                    <td id="data">{checkData(data) ? convertNumber(data[0].ethTVL) : "xxx.x K"} ETH</td>
                    <td id="data">+ x.x%</td>
                </tr>
                <tr>
                    <td id="head">in BTC</td>
                    <td id="data">{checkData(data) ? convertNumber(data[0].btcTVL) : "xxx.x K"} BTC</td>
                    <td id="data">+ x.x%</td>
                </tr>
                <tr>
                    <td id="head">ETH Locked</td>
                    <td id="data">{checkData(data) ? convertNumber(data[0].ethLocked) : "xxx.x K"} ETH</td>
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
                Credit
            </h3>
            <table>
                <tr>
                    <td id="head">Project Launch Date</td>
                    <td id="data">xx/xx/xxxx</td>
                </tr>
                <tr>
                    <td id="head">Developer</td>
                    <td id="data">xxxxxxxxxx</td>
                </tr>
                <tr>
                    <td id="head">Last Exploit</td>
                    <td id="data">xx/xx/xxxx</td>
                </tr>
            </table>
        </div>
    );
}

function LinkComponent(props){
    const {name,data} = props;
    return(
        <div class="infoitem">
            <h3>
                Project's Links
            </h3>
            <p><a href="#">{name} 1st Exploit</a></p>
            <p><a href="#">{name} Lab</a></p>
            <p><a href="https://www.twitter.com">Twitter</a></p>
        </div>
    );
}

function AuditHistoryComponent(props){
    const {name,data} = props;
    return(
        <div class="infoitem">
            <h3>
                Audit History
            </h3>
            <p><a href="#">xxxxxxxxxx - xx/xx/xxxx</a></p>
            <p><a href="#">xxxxxxxxxx - xx/xx/xxxx</a></p>
            <p><a href="#">xxxxxxxxxx - xx/xx/xxxx</a></p>
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
    const {name,data} = props;
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

    const fetchLink = "http://127.0.0.1:4000/api/projects/" + name;
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
            <div id="title">
                <Link to="/" style={{textDecoration: 'none'}}><h1>SCAT</h1></Link>
            </div>
            <div id="infotitle">
                <h2>{name}</h2>
                <h3>Key Statistic</h3>
            </div>
            <div class="infopage">
                <div class="infolist-a">
                    <TVLTable name={name} data={data} />
                    <CreditComponent name={name} data={data} />
                    <LinkComponent name={name} data={data} />
                    <AuditHistoryComponent name={name} data={data} />
                </div>
                <div class="infolist-b">
                    <ChartComponent name={name} data={data} />
                    <DescriptionComponent name={name} data={data} />
                    <AnalysisComponent name={name} data={data} />
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
*/