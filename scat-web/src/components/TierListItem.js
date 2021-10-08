function TierListItem(props){
    const {input} = props;
    return(
        <div class="tierlistitem-list">
          <div class="tierlistitem a">
            {input.ranking}
          </div>
          <div class="tierlistitem b">
            {input.defiName}
          </div>
          <div class="tierlistitem c">
            {input.chainType}
          </div>
          <div class="tierlistitem d">
            {input.totalValueLocked}
          </div>
          <div class="tierlistitem e">
            {input.oneDayChange}
          </div>
        </div>
    );
}

export default TierListItem