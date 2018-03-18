import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ReactMic } from 'react-mic'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import AVMicNone from 'material-ui/svg-icons/av/mic-none'

import { UserFactory } from '../../factories'

class TrainUser extends Component {

    state = {
        user: null,
        record: false
    }

    async componentDidMount() {
        const user = await UserFactory.getById(this.props.match.params.id)
        this.setState({user})
    }

    startRecording = () => {
        this.setState({
          record: true
        });
    }
    
    stopRecording = () => {
        this.setState({
          record: false
        });
    }
    
    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }
    
    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
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
                    <ReactMic
                        record={this.state.record}
                        onStop={this.onStop}
                        strokeColor="#000000"
                        backgroundColor="#FF4081"
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