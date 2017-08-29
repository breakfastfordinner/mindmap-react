import React from 'react';
import Tree from 'react-d3-tree';

const myTreeData = [
  {
    name: 'OMG this is rendering',
    attributes: {
      // keyA: 'val A',
      // keyB: 'val B',
      // keyC: 'val C',
    },
    children: [
      {
        name: 'Flavortown USA',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
        children: [
          {
            name: 'yesssss',
          },
          {
            name: 'success',
          },
        ],
      },
      {
        name: 'imdabes',
        children: [
          {
            name: 'son of imdabes',
            children: [
              {
                name: 'more childs'
              }
            ],
          },
          {
            name: 'another child'
          }
        ],
      },
    ],
  },
];

class TestMap extends React.Component {
  render() {
    return (

      <div id="treeWrapper" style={{width: '1000px', height: '1000px'}}>

        <Tree data={myTreeData} />

      </div>
    );
  }
}


export default TestMap;
