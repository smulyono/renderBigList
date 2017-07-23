import React from 'react';

let dataToShow = [];
for (let i=0; i<100; i++) {
    dataToShow.push(
        <div key={i} 
            style={{
                height : 40,
                padding: 5,
                boxSizing : "border-box",
                backgroundColor : "black",
                color : "white",
                textAlign : "center",
                fontSize : 14,
                borderBottom: "solid 1px white"
            }}>
            {i}
        </div>
    );
}

const simpleList = () => (
    {dataToShow}
)

export default simpleList;
