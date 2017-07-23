import React from 'react';
import ListView from './listView';

let produceData = (withWidth) => {
    let dataToShow = [];
    for (let i=0; i<10000; i++) {
        dataToShow.push(
            <div key={i} 
                style={{
                    width : (withWidth ? 40 : "100%"),
                    height : 40,
                    padding: 5,
                    boxSizing : "border-box",
                    backgroundColor : "black",
                    color : "white",
                    textAlign : "center",
                    fontSize : 14,
                    borderBottom: "solid 1px white",
                    marginRight: (withWidth ? 7 : 0)
                }}>
                {i}
            </div>
        );
    }
    return dataToShow;
}


const sampleApp =() => (
    <div className="sampleapp-container">
         <ListView 
            itemHeight={40}
            itemWidth={40}
            height={150}
            style={{
                display:"flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignContent: "flex-start"
            }}
            >
            {produceData(true)}
        </ListView>  
         <hr /><br />
         <ListView 
            itemHeight={40}
            height={250}>
            {produceData(false)}
        </ListView> 
        
    </div>
);

export default sampleApp;