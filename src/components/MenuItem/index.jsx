import React, { Component } from 'react'
import MDMenuItem from 'material-ui/MenuItem'
import { withRouter } from 'react-router-dom'

class MenuItem extends Component {
    render() {
        return (
            <MDMenuItem 
                primaryText={this.props.primaryText}
                focusState={(this.props.location.pathname === this.props.pathname) ? 'focused' : 'none'} 
                onClick={(ev) => {
                    this.props.history.push(this.props.pathname)
                    this.props.onClick()
                }
            }/>
        )
    }
}

export default withRouter(MenuItem)