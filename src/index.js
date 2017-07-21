import React from 'react';
import DOM from 'react-dom';
import ListView from './components/listView';

DOM.render(
    <ListView 
        count={500000}
        />,
    document.getElementById("root")
);