import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import AVMicNone from 'material-ui/svg-icons/av/mic-none'

import { UserFactory } from '../../factories'

class TrainUser extends Component {

    state = {
        user: null
    }

    async componentDidMount() {
        const user = await UserFactory.getById(this.props.match.params.id)
        this.setState({user})
    }

    render() {
        if (!this.state.user)
            return (<div><p>Carregando...</p></div>)
        return (
            <div style={styles.wrapper}>
                <h3>{this.state.user.name}</h3>
                <div style={styles.vAlign}>
                    <div>
                        <IconButton style={styles.icon} iconStyle={styles.iconStyle} onClick={this.handleOpen}>
                            <AVMicNone color="white"/>
                        </IconButton>
                    </div>
                    <p>
                        {"Clique no botão e grave a frase abaixo até a sua voz cadastrar"}
                    </p>
                    <RaisedButton
                        label="Minha voz confirma meu acesso"
                        primary={true}
                    />
                </div>
            </div>
        )
    }

}

const styles = {
    wrapper: {
        textAlign: 'center',
        height: '100%'
    },
    icon: {
        backgroundColor: '#B50156',
        borderRadius: 200,
        height: 200,
        width: 200
    },
    iconStyle: {
        height: 150,
        width: 150
    },
    vAlign: {
        paddingTop: 50
    }
}

export default withRouter(TrainUser)