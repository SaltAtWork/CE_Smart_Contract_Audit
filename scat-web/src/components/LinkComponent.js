import { useState,useEffect } from 'react';
import { checkData } from './GlobalFunction';

function LinkComponent(props){
    const {name} = props;
    const [data,setData] = useState("Blank");
    useEffect(() => {
        if(true){
            fetch("http://127.0.0.1:4000/ecosystems/" + name)
            .then(res => {
              if(res.ok){
                return res.json();
              }
              throw res;
            })
            .then((res) => {
              setData(res);
            })
            .catch((error) => {
              console.log("Error fetching data : ", error);
              setData("Blank");
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

export default LinkComponent;