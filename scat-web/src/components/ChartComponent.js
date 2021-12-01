import { useState,useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { checkData,convertNumber } from './GlobalFunction';

function CustomTooltip(props){
    const {active,payload,label,currency} = props;
    if (active && payload && payload.length) {
        var date = new Date(label*1000);
        date = date.toLocaleString('th-TH',{dateStyle: 'medium', timeStyle: 'medium'});
        return (
          <div className="tooltip">
            <p>{`${date} : `}</p>
            <p>{`${currency.toUpperCase()} : ${convertNumber(payload[0].value)}`}</p>
          </div>
        );
    }
    return null;
}

function ChartComponent(props){
    const {name} = props;
    const [currency,setCurrency] = useState("usd");
    const [range,setRange] = useState(7);
    var projectName = name.replace(/\s+/g, '-').toLowerCase();
    const [chartData,setChartData] = useState("Blank");
    const [received,setReceived] = useState(false);
    useEffect(() => {
        if(true){
            fetch("http://127.0.0.1:4000/TVLHistory/history/" + projectName)
            .then(res => {
              if(res.ok){
                return res.json();
              }
              throw res;
            })
            .then((res) => {
              setChartData(res);
              setReceived(true);
            })
            .catch((error) => {
              console.log("Error fetching data : ", error);
              setChartData("Blank");
              setReceived(false);
            })
        }
    })
    var FilteredData = chartData.slice(0, range);

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
                <span class={checkCurrency("usd")} id="usd" onClick={changeCurrency}>USD</span>
                <span> | </span>
                <span class={checkCurrency("eth")} id="eth" onClick={changeCurrency}>ETH</span>
                <span> | </span>
                <span class={checkCurrency("btc")} id="btc" onClick={changeCurrency}>BTC</span>
            </p>
            <p class="chart_right">
                <span class={checkRange(365)} onClick={changeRange} id={365}>1 Year</span>
                <span> | </span>
                <span class={checkRange(90)} onClick={changeRange} id={90}>3 Months</span>
                <span> | </span>
                <span class={checkRange(30)} onClick={changeRange} id={30}>1 Month</span>
                <span> | </span>
                <span class={checkRange(7)} onClick={changeRange} id={7}>1 Week</span>
            </p>
            <p></p>
            <p></p>
            <div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart margin={{left: 10, bottom: 10, right: 10}} data={checkData(FilteredData) ? FilteredData.reverse() : []}>
                    <Line type="linear" dataKey={currency} stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" vertical={false}/>
                    <Tooltip content={<CustomTooltip currency={currency}/>}/>
                    <XAxis dataKey="timestamp" hide={true}/>
                    <YAxis domain={['auto','auto']} tickFormatter={tick => {
                        return convertNumber(tick);
                    }}/>
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ChartComponent;