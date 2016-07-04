import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import OrderButton from './OrderButton';

export default class Grid extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={200}
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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    cols: 4,
    width: 1000,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
    padding: 30
  },
};