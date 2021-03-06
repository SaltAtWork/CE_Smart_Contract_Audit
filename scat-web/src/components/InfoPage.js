import { useState,useEffect } from 'react';
import {Link,useHistory} from 'react-router-dom';
import { convertNumber, checkData } from './GlobalFunction';
import ChartComponent from './ChartComponent';
import LinkComponent from './LinkComponent';
import AuditHistoryComponent from './AuditHistoryComponent';
import { Rating } from 'react-simple-star-rating';
import {GiDeathSkull} from 'react-icons/gi';

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
                    <td id="data">{checkData(data[0].usdTVL) ? "$" + convertNumber(data[0].usdTVL,false) : "N/A"}</td>
                    <td id="data">{checkData(data[0].usdTVLChanged) ? convertNumber(data[0].usdTVLChanged,true) + "%" : "N/A"}</td>
                </tr>
                <tr>
                    <td id="head">in ETH</td>
                    <td id="data">{checkData(data[0].ethTVL) ? convertNumber(data[0].ethTVL,false) + " ETH" : "N/A"}</td>
                    <td id="data">{checkData(data[0].ethTVLChanged) ? convertNumber(data[0].ethTVLChanged,true) + "%" : "+ x.x"}</td>
                </tr>
                <tr>
                    <td id="head">in BTC</td>
                    <td id="data">{checkData(data[0].btcTVL) ? convertNumber(data[0].btcTVL,false) + " BTC" : "N/A"}</td>
                    <td id="data">{checkData(data[0].btcTVLChanged) ? convertNumber(data[0].btcTVLChanged,true) + "%" : "+ x.x"}</td>
                </tr>
                <tr>
                    <td id="head">ETH Locked</td>
                    <td id="data">{checkData(data) ? convertNumber(data[0].ethLocked,false) + " ETH" : "N/A"}</td>
                    <td id="data">N/A</td>
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
                    <td id="data">{checkData(data[0].launchDate) ? data[0].launchDate : "N/A"}</td>
                </tr>
                <tr>
                    <td id="head">Last Exploited</td>
                    <td id="data">{checkData(data[0].lastExploited) ? data[0].lastExploited : "N/A"}</td>
                </tr>
            </table>
        </div>
    );
}


function DescriptionComponent(props){
    const {name,data} = props;
    return(
        <div class="infoitem">
            <h3>{name}'s Description</h3>
            {checkData(data[0].description) ? <p>{data[0].description}</p> : <p>No description available</p>}
        </div>
    );
}

function AnalysisComponent(props){
    const {data} = props;
    let count = 0;
    let id = "";
    //{checkData(data[0].riskAnalysis) ? <p>{JSON.parse(data[0].riskAnalysis)}</p> : <p>No risk analysis available</p>}
    return(
        <div class="infoitem">
            <h3>Analysis</h3>
            {checkData(data[0].riskAnalysis) ? 
            data[0].riskAnalysis.split('\n').map(function(item, key) {
                if(count%2 == 0){
                    id = "b";
                }
                else{
                    id = "a";
                }
                count++;
                return (
                  <p class={id} key={key}>
                    {item}
                  </p>
                )
              })
            : <p>No risk analysis available</p>}
        </div>
    );
}

function ExploitCaseComponent(props){
    const {name,data} = props;
    return(
        <div class="infoitem">
            <h3>Attack History</h3>
            {checkData(data[0].attackHistory) ? 
            data[0].attackHistory.split('\n').map(function(item, key) {
                return (
                  <p key={key}>
                    {item}
                  </p>
                )
              })
            : <p>No attack history available</p>}
        </div>
    );
}


function OurAnalysisComponent(props){
    const {name,data} = props;
    return(
        <div class="infoitem">
            <h3>Result From Our Scanner</h3>
            {checkData(data[0].result) ? 
            data[0].result.split('\n').map(function(item, key) {
                return (
                  <span class="infobox" key={key}>
                    {item}
                    <br/>
                  </span>
                )
              })
            : <p>No result available</p>}
        </div>
    );
}


function InfoPage(props){
    const name=props.match.params.name;
    const history = useHistory();
    const fetchLink = "https://scat-api.herokuapp.com/projects/" + name;
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
                console.log(res);
              setData(res);
              setReceived(true);
              document.title = name + " - SCAT";
            })
            .catch((error) => {
              console.log("Error fetching data : ", error);
              setData("Blank");
              setReceived(false);
              document.title = name + " - SCAT";
            })
        }
    })

    return(
        <div>
            <div id="infotop">
                <h1 onClick={() => history.goBack()}>SCAT</h1>
            </div>
            <div class="infopage">
                <div class="infolist-c">
                    <h1>{name}</h1>
                    <h3>Key Statistic</h3>
                </div>
                <div class="infolist-d">
                    <Rating ratingValue={checkData(data[0].rating) ? data[0].rating : 0} fillColorArray={['#008c1c','#00FF00','#FFFF00','#FF7F00','#FF0000',]} readonly={true} fullIcon={<GiDeathSkull size={30} />} emptyIcon={<GiDeathSkull size={30} />} />
                    {checkData(data[0].rating) ? <h3 class="righth3">Rating : {data[0].rating/20}/5</h3> : <h3 class="righth3">No Rating</h3>}
                </div>
            </div>
            <div class="infopage">
                <div class="infolist-a">
                    <TVLTable data={data} />
                    <CreditComponent name={name} data={data} />
                    <LinkComponent name={name} />
                    <AuditHistoryComponent name={name} />
                </div>
                <div class="infolist-b">
                    <ChartComponent name={name} />
                    <DescriptionComponent name={name} data={data} />
                    <ExploitCaseComponent name={name} data={data} />
                    <OurAnalysisComponent name={name} data={data} />
                    <AnalysisComponent data={data} />
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
           /*const chartData = [
        {timestamp: 'A', usd: 4000, eth: 2400, btc: 2200},
        {timestamp: 'B', usd: 8000, eth: 1000, btc: 2100},
        {timestamp: 'C', usd: 6000, eth: 2400, btc: 2400},
        {timestamp: 'D', usd: 3000, eth: 4200, btc: 1200},
        {timestamp: 'E', usd: 4000, eth: 2400, btc: 2200},
        {timestamp: 'F', usd: 8000, eth: 1000, btc: 2100},
        {timestamp: 'G', usd: 6000, eth: 2400, btc: 2400},
        {timestamp: 'H', usd: 3000, eth: 4200, btc: 1200},
        {timestamp: 'I', usd: 4000, eth: 2400, btc: 2200},
        {timestamp: 'J', usd: 8000, eth: 1000, btc: 2100},
        {timestamp: 'K', usd: 6000, eth: 2400, btc: 2400},
        {timestamp: 'L', usd: 3000, eth: 4200, btc: 1200},
        {timestamp: 'M', usd: 4000, eth: 2400, btc: 2200},
        {timestamp: 'N', usd: 8000, eth: 1000, btc: 2100},
        {timestamp: 'O', usd: 6000, eth: 2400, btc: 2400},
        {timestamp: 'P', usd: 3000, eth: 4200, btc: 1200},
    ];*/