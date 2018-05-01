import React, { Component } from 'react';
import styled from 'styled-components'
import ReactPageScroller from 'react-page-scroller'


class PageScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: 1};
    this._pageScroller = null;
  }

  goToPage(eventKey) {
    this._pageScroller.goToPage(eventKey);
  };

  render() {
    return (
      <ReactPageScroller ref={ (c) => { this._pageScroller = c }}>
        {this.props.children}
      </ReactPageScroller>
    )
  }
}

export default PageScroller;
