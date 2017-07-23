import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ListView extends React.Component {
    state = {
        scrollTopPosition:0,
        containerHeight:0,
        containerWidth:0
    }

    renderToShow(children) {
        // if there is only 1 children, then no need
        // to optimize them
        if (!_.isArray(children) || 
            !children.length) {
            return children;
        }
        let itemCount = children.length;

        // go to each children and determine which children to draw
        // find itemHeight and itemWidth
        const { itemHeight, itemWidth, visibleThreshold } = this.props;
        const { scrollTopPosition, containerWidth, containerHeight } = this.state;

        // number of item can be drawn horizontally
        let visibleItemHorizontal = 1;
        if (containerWidth) {
            visibleItemHorizontal = Math.max(1, Math.floor(containerWidth / (itemWidth === 0 ? containerWidth : itemWidth))) ;
        }

        // number of item can be drawn vertically
        let visibleItemVertical = 1;
        if (containerHeight) {
            visibleItemVertical = Math.max(1, Math.floor(containerHeight / (itemHeight === 0 ? containerHeight : itemHeight))) ;
        }

        
        // index to draw based on scroll position
        let startPos = Math.max(0, (Math.floor(scrollTopPosition / itemHeight) * visibleItemHorizontal) - visibleThreshold);

        let pixelPosPosition = (scrollTopPosition + containerHeight);
        let endPos = Math.min(itemCount , (Math.floor( pixelPosPosition / itemHeight) * visibleItemHorizontal) + visibleThreshold);

        // only show partial
        return {
            data : children.slice(startPos, endPos),
            startPos : startPos,
            endPos : endPos,
            visibleItemVertical : visibleItemVertical, 
            visibleItemHorizontal : visibleItemHorizontal
        }
    }

    handleContainerScroll(e) {
        this.setState({
            scrollTopPosition : e.currentTarget.scrollTop
        })
    }
    
    render() {
        const {
            children,
            height,
            style
        } = this.props;

        const childrenObj = this.renderToShow(children);

        let containerStyle = {
            height : Math.floor((children.length * this.props.itemHeight) / childrenObj.visibleItemHorizontal),
            paddingTop : Math.max(0, Math.floor((childrenObj.startPos * this.props.itemHeight) / childrenObj.visibleItemHorizontal))
        };

        if (style) {
            containerStyle = {
                ...containerStyle, 
                ...style
            };
        }

        return (
            <div className="listView_container"
                style={{
                    height: height,
                    overflowY : "scroll"
                }}
                ref={(node) => {
                    this.containerNode = node
                }}
                onScroll={this.handleContainerScroll.bind(this)}
                >
                <div className="listView_items_container"
                    style={containerStyle}>
                    {childrenObj.data}
                </div>
            </div>
        );
    }

    componentDidMount() {
        console.info('component did mount');
        this.setState({
            containerHeight : this.containerNode.clientHeight,
            containerWidth : this.containerNode.clientWidth
        })
    }
}

// Props
ListView.defaultProps = {
    visibleThreshold : 5,
    itemWidth : 0,
    itemHeight: 0,
    height: 400,
    children : null
};

ListView.propTypes = {
    visibleThreshold : PropTypes.number,
    itemWidth : PropTypes.number,
    itemHeight: PropTypes.number,
    height : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    children : PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired
}


export default ListView;