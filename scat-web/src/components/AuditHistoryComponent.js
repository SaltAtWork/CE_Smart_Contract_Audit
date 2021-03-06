import { useState,useEffect } from 'react';
import { checkData } from './GlobalFunction';

function AuditHistoryComponent(props){
    const {name} = props;
    const [data,setData] = useState("Blank");
    const [received,setReceived] = useState(false);
    useEffect(() => {
        if(!received){
            fetch("https://scat-api.herokuapp.com/audits/" + name)
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

export default AuditHistoryComponent;