export function checkData(data){
    if(data !== "Blank" && data !== undefined && data !== "N/A"){
        // if(data.length >= 1){
        //     return true;
        // }
        return true;
    }
    return false;
}

export function convertNumber(num,isPercent){
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
        if(rounded > 0 && isPercent === true){
            fixed = "+" + fixed;
        }
        return fixed;
    }
}