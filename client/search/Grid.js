import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import OrderButton from './OrderButton';

export default class Grid extends React.Component {
  render() {
    return (
      <div style={styles.root} className='container'>
      <h3>Search Results</h3>
        <GridList
          cellHeight={250}
          cols={3}
          padding={10}
          style={styles.gridList}
        >
          {this.props.orders.map((tile) => (
            <GridTile
              key={tile.image}
              title={tile.food}
              subtitle={<span>by <b>{tile.chef}</b></span>}
              actionIcon={ <OrderButton meal={this.props.meal} cuisine={tile}/> }
            >
              <img src={tile.image} />
            </GridTile>
          ))}
        </GridList>
      </div>
    ) 
  }
}

const styles = {
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    marginBottom: 24,
  },
};