import React from "react";

function LoadInfo(props){

    return ( 
        <div className="style1">
            <div className="style2">
                <h1 className="style3">How To Use</h1>
                <div className="close" onClick={props.close}>X</div>
                <p>Enter a temporal Github api key to authenticate your presense and also enter any username you want to work with.</p>
                <p>On default, there is a dummy user already set so you can try the app without your apikey and username</p>
                <p>To learn more, click <span  className="style6" onClick={props.displayAbout}>here</span> </p>
                <h2 className="style5">Enjoy!!!!</h2>
            </div>
    
       </div>
    )
}
export default LoadInfo;