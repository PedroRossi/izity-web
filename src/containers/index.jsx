import React, { Component } from 'react'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from '../components/MenuItem'

import ListUsers from './ListUsers'
import ListCalls from './ListCalls'
import TrainUser from './TrainUser'

const muiTheme = getMuiTheme({
    appBar: {
        color: '#B50156'
    },
    palette: {
        primary1Color: '#B50156',
    }
})

class App extends Component {

    state = {
        open: false
    }

    toggleOpen = () => this.setState({open: !this.state.open})

    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <AppBar
                            title="Izity"
                            onLeftIconButtonClick={this.toggleOpen}
                            titleStyle={{textAlign: 'right'}}
                        />
                        <Drawer
                            docked={false}
                            open={this.state.open}
                            onRequestChange={(open) => this.setState({open})}
                        >
                            <MenuItem onClick={this.toggleOpen} primaryText="Buscar conversas" pathname="/calls"/>
                            <MenuItem onClick={this.toggleOpen} primaryText="Listar usuários" pathname="/users"/>
                        </Drawer>
                        <div style={{textAlign: 'center'}}>
                            <Route exact path={'/calls'} component={ListCalls}/>
                            <Route path={'/users'} component={ListUsers}/>
                            <Route path={'/train/:id'} component={TrainUser}/>
                        </div>
                    </div>
                </MuiThemeProvider>
            </BrowserRouter>
        )
    }

}

export default App