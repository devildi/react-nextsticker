import React from 'react'
import {observer, inject} from 'mobx-react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/navigation/arrow-back'
import Helmet from 'react-helmet'
const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  gridList: {
    width: '100%',
    height: 180,
    backgroundColor: 'grey'
  },
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 100
  }
}

@inject('testMobx') @observer
export default class extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount(){
    this.props.testMobx.getAll(this.props.testMobx.user)
  }

	bootstrap(){
		return new Promise((resolve) => {
      //console.log(this.props)
      resolve(true)
    })
	}

  change(i){
    if(i){
      this.context.router.history.push({
      pathname: '/detail/'+ i
    })
    } else {
      this.context.router.history.goBack()
    }
  }

	render() {
    let data = this.props.testMobx.toJson().points
    let all = this.props.testMobx.toJson().all
		return (
			<div style={styles.root}>
        <Helmet>
          <title>Fancy your trip!</title>
          <meta name="google trip" content="Fancy Your Trip!"/>
        </Helmet>
		    <GridList
		      cols={1}
		      cellHeight={180}
		      style={styles.gridList}
		      padding={0}
		    >
	        <GridTile
	          title={data[0].tripName}
	          subtitle={<span>by <b>{data[0].author}</b></span>}
	          onClick={() => this.change(this.props.testMobx.user)}
	        >
	          <img src={data[0].route[0].pic} />
	        </GridTile>
          {
            all.map((r,i) => (
              <GridTile
                key={i}
                title={r.tripName}
                subtitle={<span>by <b>{r.author}</b></span>}
                onClick={() => this.change(r.user)}
              >
                <img src={r.route[0].pic} />
              </GridTile>
            ))
          }
		    </GridList>
        <FloatingActionButton style={styles.fab} onClick={() => this.change()}>
          <ContentAdd />
        </FloatingActionButton>
		  </div>
		)
	}
}