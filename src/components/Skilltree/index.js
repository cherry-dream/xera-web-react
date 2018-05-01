import React from 'react';
import { ReactCytoscape, cytoscape } from 'react-cytoscape';

const style = cytoscape.stylesheet()
    .selector('node')
      .css({
                'height': 120,
                'width': 120,
                'background-fit': 'cover',
                'border-color': '#000',
                'border-width': 3,
                'border-opacity': 0.5
              })
    .selector('.owned')
      .css({
                'border-color': '#FF0',
                'border-width': 9
            })
    .selector('.eating')
      .css({
                'border-color': 'red'
              })
    .selector('.eater')
      .css({
                'border-width': 9
              })
    .selector('edge')
      .css({
                'curve-style': 'bezier',
                'width': 6,
                'target-arrow-shape': 'triangle',
                'line-color': '#eee',
                'target-arrow-color': '#eee'
              })
    .selector('.owned-owned')
      .css({
                'width': 6,
                'line-color': '#f00',
                'target-arrow-color': '#f00'
              })
    .selector('.owned-not')
      .css({
                'width': 6,
                'line-color': '#fbb',
                'target-arrow-color': '#fbb'
              })
    .selector('#bird')
      .css({
                'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'
              })
    .selector('#cat')
      .css({
                'background-image': 'https://farm2.staticflickr.com/1261/1413379559_412a540d29_b.jpg'
              })
    .selector('#ladybug')
      .css({
                'background-image': 'https://farm4.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'
              })
  .selector('#aphid')
      .css({
                'background-image': 'https://farm9.staticflickr.com/8316/8003798443_32d01257c8_b.jpg'
              })
  .selector('#rose')
      .css({
                'background-image': 'https://farm6.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg'
              })
  .selector('#grasshopper')
      .css({
                'background-image': 'https://farm7.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg'
              })
  .selector('#plant')
      .css({
                'background-image': 'https://farm1.staticflickr.com/231/524893064_f49a4d1d10_z.jpg'
              })
  .selector('#wheat')
      .css({
                'background-image': 'https://farm3.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'
              })

const elements = {
  nodes: [
          { data: { id: 'cat' } },
          { data: { id: 'bird' } },
          { data: { id: 'ladybug' } },
          { data: { id: 'aphid' } },
          { data: { id: 'rose' } },
          { data: { id: 'grasshopper' } },
          { data: { id: 'plant' } },
          { data: { id: 'wheat' } }
        ],
  edges: [
          { data: { source: 'cat', target: 'bird' } },
          { data: { source: 'bird', target: 'ladybug' } },
          { data: { source: 'bird', target: 'grasshopper' } },
          { data: { source: 'grasshopper', target: 'plant' } },
          { data: { source: 'grasshopper', target: 'wheat' } },
          { data: { source: 'ladybug', target: 'aphid' } },
          { data: { source: 'aphid', target: 'rose' } }
        ]
}

const layout = {
  name: 'breadthfirst',
  directed: true,
  padding: 0
}

const owned = {
  cat: true
};

const updateGraph = (cy) => {
    for (let nodeId in owned) {
      cy.$id(nodeId).addClass('owned');
    }

    const edges = cy.edges(function(ele) {return true});
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i];
      let target = edge.target();
      let source = edge.source();
      if (owned[source.id()]) {
        if (owned[target.id()]) {
          edge.classes('owned-owned')
        } else {
          edge.classes('owned-not')
        }
      } else {
        edge.classes()
      }
    }
}

const cyRef = (cy) => {
  cy.ready(function(event) {
    updateGraph(event.cy)
  })

  cy.on('tap', 'node', function(){
      const node = this;
      const connectedEdges = node.connectedEdges(function(el){
          return el.target() === node;
      });
      const sources = connectedEdges.sources();
      let canOwn = true;
      for (let i = 0; i < sources.length; i++) {
        let source = sources[i];
        if (!owned[source.id()]) {
          canOwn = false;
          break;
        }
      }
      if (canOwn) {
        owned[node.id()] = true;
        updateGraph(cy);
      }
  }); // on tap

}

class Skilltree extends React.Component {

  render() {
    return (
      <div style={{height:"800px", width: "200px"}}>
        <ReactCytoscape
          style={{position:"absolute"}}
          containerID="cy"
          boxSelectionEnabled={false}
          autounselectify={true}
          elements={elements}
          cyRef={cyRef}
          cytoscapeOptions={{wheelSensitivity: 0.1}}
          layout={layout}
          style={style}
        />
      </div>
    )
  }
}

export default Skilltree;
