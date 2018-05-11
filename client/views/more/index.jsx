import React from 'react'
import {observer, inject} from 'mobx-react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/navigation/arrow-back'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  gridList: {
    width: '100%',
    height: 450
  },
  fab: {
    position: 'fixed',
    bottom: 40,
    right: 40,
    zIndex: 100
  }
}

const tilesData = [
  {
    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525840316305&di=c07beda105f1dc66966497f117b0dec1&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3D51d3556b8e35e5dd8421ad9f1fbec283%2Fb2de9c82d158ccbf7290000312d8bc3eb13541de.jpg',
    title: '青岛浮生3日',
    author: 'DevilDI',
  }
]

@inject('testMobx') @observer
export default class extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

	bootstrap(){
		return new Promise((resolve) => {
      setTimeout(() => {
        this.props.testMobx.count = 3
        resolve(true)
      })
    })
	}

  change(){
    this.context.router.history.push('detail')
  }

	render() {
		console.log(this.props.testMobx.count)
		return (
			<div style={styles.root}>
		    <GridList
		      cols={1}
		      cellHeight={180}
		      style={styles.gridList}
		      padding={0}
		    >
		      {tilesData.map((tile, i) => (
		        <GridTile
		          key={i}
		          title={tile.title}
		          subtitle={<span>by <b>{tile.author}</b></span>}
		          onClick={() => this.change(i)}
		        >
		          <img src={tile.img} />
		        </GridTile>
		      ))}
		    </GridList>
        <FloatingActionButton style={styles.fab} onClick={this.change.bind(this)}>
          <ContentAdd />
        </FloatingActionButton>
		  </div>
		)
	}
}