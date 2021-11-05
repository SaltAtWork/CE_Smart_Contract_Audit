import { useState } from 'react';
import {Link} from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function TVLTable(props){
    const {name} = props;
    return(
        <div class="infoitem">
            <h3>
                Total Value Locked
            </h3>
            <table>
                <tr>
                    <td id="head">in USD</td>
                    <td id="data">$ xxx.x M</td>
                    <td id="data">+ x.x%</td>
                </tr>
                <tr>
                    <td id="head">in ETH</td>
                    <td id="data">xxx.x K ETH</td>
                    <td id="data">+ x.x%</td>
                </tr>
                <tr>
                    <td id="head">in BTC</td>
                    <td id="data">xxx.x K BTC</td>
                    <td id="data">+ x.x%</td>
                </tr>
                <tr>
                    <td id="head">ETH Locked</td>
                    <td id="data">xxx.x K ETH</td>
                    <td id="data">+ x.x K ETH</td>
                </tr>
            </table>
        </div>
    );
}

function CreditComponent(props){
    const {name} = props;
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
    const {name} = props;
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
    const {name} = props;
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
    const {name} = props;
    const [currency,setCurrency] = useState("USD");
    const [range,setRange] = useState(10);
    const data = [
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

    var FilteredData = data.slice(data.length - range);

    const changeCurrency=(event)=>{
        setCurrency(event.target.id);
    }

    const changeRange=(event)=>{
        setRange(event.target.id);
        if(range != "All"){
            FilteredData = data.slice(data.length - range);
        }
        else{
            FilteredData = data;
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
    const {name} = props;
    return(
        <div class="infoitem">
            <h3>{name}'s Description</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
    );
}

function AnalysisComponent(props){
    const {name} = props;
    return(
        <div class="infoitem">
            <h3>Analysis</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
    );
}

function ExploitCaseComponent(props){
    const {name} = props;
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
    const {name} = props;
    return(
        <div class="infoitem">
            <h3>Smart Contract Auditing Result</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
    );
}

function InfoPage(props){
    const name=props.match.params.name;
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
                    <TVLTable name={name} />
                    <CreditComponent name={name} />
                    <LinkComponent name={name} />
                    <AuditHistoryComponent name={name} />
                </div>
                <div class="infolist-b">
                    <ChartComponent name={name} />
                    <DescriptionComponent name={name} />
                    <AnalysisComponent name={name} />
                    <ExploitCaseComponent name={name} />
                    <OurAnalysisComponent name={name} />
                </div>
            </div>
        </div>
    );
}

export default InfoPage;

//