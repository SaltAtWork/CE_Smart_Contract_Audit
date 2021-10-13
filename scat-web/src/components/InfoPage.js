import {Link} from 'react-router-dom'

function InfoPage(props){
    return(
        <div>
            <div id="title">
                <Link to="/" style={{textDecoration: 'none'}}><h1>SCAT</h1></Link>
            </div>
            <div id="infotitle">
                <h2>{props.match.params.name}</h2>
                <h3>Key Statistic</h3>
            </div>
            <div id="infopage">
                <div id="infoitem-a">Test A</div>
                <div id="infoitem-b">Test B</div>
            </div>
        </div>
    );
}

export default InfoPage;