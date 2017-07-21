import React from 'react';


class listView extends React.Component {
    state = {
        scrollTopPosition : 0,
        itemHeight: 30,
        viewportHeight : document.documentElement.clientHeight
    }

    constructor(props) {
        super(props);
        this.handleOnScroll = this.handleOnScroll.bind(this);
    }

    renderList(count) {
        let items = [];
        let {
            itemHeight,
            scrollTopPosition,
            viewportHeight
        } = this.state;

        // get the starting position that can be draw on the viewport
        let startPos = Math.max(0, Math.floor(scrollTopPosition / itemHeight) - 10);
        let stopPos  = Math.min(count, Math.ceil((scrollTopPosition + viewportHeight) / itemHeight) + 10);

        let idx = startPos;
        while (idx <= stopPos) {
            items.push(
                <li style={{
                        height : itemHeight,
                        backgroundColor: "black",
                        color : "white",
                        borderBottom: "solid 1px #ececec",
                        padding: 7,
                        textAlign: "center"
                    }}
                    key={idx}>{idx}</li>
            );
            idx++;
        }
        return (
                <ul style={{
                        listStyleType: "none",
                        margin:0,
                        padding:0,
                        height: this.state.itemHeight * count,
                        paddingTop : (startPos * itemHeight)
                    }}
                    >
                    {items}
                </ul>
        );
    }

    handleOnScroll(e) {
        this.setState({
            scrollTopPosition : e.target.scrollTop
        });
    }

    render() {
        const {
            count
        } = this.props;

        let itemsToDraw = this.renderList(count);
        return (
            <div
                style={{
                    height : "400px",
                    overflowY : "scroll"
                }}
                onScroll={this.handleOnScroll}  
                ref={(node) => {
                    this.node = node
                }}              
                >
                {itemsToDraw}
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            viewportHeight : this.node.clientHeight
        })
    }
}
export default listView;