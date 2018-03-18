import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { ReactMic } from 'react-mic'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AVStop from 'material-ui/svg-icons/av/stop'

// import Recorder from 'recorderjs'
// import WebAudioRecorder from 'web-audio-recorder-js'

import { UserFactory } from '../../factories'

class TrainUser extends Component {
    
    state = {
        user: null,
        record: false
    }
    
    async componentDidMount() {
        const user = await UserFactory.getById(this.props.match.params.id)

        const AudioContext = window.AudioContext || window.webkitAudioContext
        const audioCtx = new AudioContext()

        // this.recorder = new Recorder(AudioContext)

        // this.recorder = new WebAudioRecorder(audioCtx)

        this.setState({user})
    }

    startRecording = () => {
        this.recorder.record()
        this.setState({record: true})
    }
    
    stopRecording = () => {
        this.setState({record: false})
    }
    
    onData(recordedBlob) {
        // console.log('chunk of real-time data is: ', recordedBlob)
    }
    
    onStop = async (recordedBlob) => {
        // const blob = recordedBlob.blob
        // console.log(recordedBlob)
        // const data = await UserFactory.train(this.state.user, record)
        // console.log(data)
    }

    render() {
        if (!this.state.user)
            return (<div><p>{"Carregando..."}</p></div>)
        if (this.state.user.trained)
            return (<Redirect to="/users"/>)
        return (
            <div style={styles.wrapper}>
                <h3>{this.state.user.name}</h3>
                <div style={styles.vAlign}>
                    <div>
                        {this.state.record ? 
                            <IconButton style={styles.icon} iconStyle={styles.iconStyle} onClick={this.stopRecording}>
                                <AVStop color="white"/>
                            </IconButton>:
                            <IconButton style={styles.icon} iconStyle={styles.iconStyle} onClick={this.startRecording}>
                                <AVPlayArrow color="white"/>
                            </IconButton>
                        }
                    </div>
                    <p>
                        {"Clique no botão e grave a frase abaixo até a sua voz cadastrar"}
                    </p>
                    <RaisedButton
                        label="Minha voz confirma meu acesso"
                        primary={true}
                    />
                    {/* <ReactMic
                        record={this.state.record}
                        onStop={this.onStop}
                        visualSetting=''
                    /> */}
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