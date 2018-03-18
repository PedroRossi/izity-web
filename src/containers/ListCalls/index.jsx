import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import { Card, CardText } from 'material-ui/Card'
// import DatePicker from 'material-ui/DatePicker'
// import TimePicker from 'material-ui/TimePicker'
// import SelectField from 'material-ui/SelectField'
// import MenuItem from 'material-ui/MenuItem'

import ActionDescription from 'material-ui/svg-icons/action/description'
import AVPlay from 'material-ui/svg-icons/av/play-circle-filled'
import Search from 'material-ui/svg-icons/action/search'

import { CallFactory } from '../../factories'

class ListCalls extends Component {

    state = {
        calls: [],
        query: {
            day: null,
            time: null,
            authorized: null,
        },
        text: null,
        dialog: ''
    }

    requestCalls = async () => {
        let data = await CallFactory.list()
        data.forEach(call => {
            call.start = new Date(call.start)
            call.end = new Date(call.end)
        })
        this.setState({ calls: data })
    }

    handleClose = () => this.setState({dialog: ''})

    openDialog = (call) => this.setState({dialog: call.text})

    openAudioOnNewTab = (call) => CallFactory.getAudioById(call._id)

    onFilterChange = (param, value) => {
        let st = {query:this.state.query}
        st.query[param] = value
        this.setState(st)
    }

    handleTextChange = (ev) => this.setState({text: ((ev.target.value !== '') ? ev.target.value:null)})

    render() {
        const actions = [
            <FlatButton
              label="Fechar"
              primary={true}
              onClick={this.handleClose}
            />
        ]

        return (
            <div style={styles.wrapper}>
                <div style={styles.searchRow}>
                    <input type="text" style={styles.input} onChange={this.handleTextChange}/>
                    <span style={styles.span}>
                        <RaisedButton 
                            primary={true}
                            icon={<Search color="white"/>}
                            onClick={this.requestCalls}
                        />
                    </span>
                </div>
                {/* <div style={styles.rowWithCols}>
                    <div style={styles.col}>
                        <DatePicker hintText="Dia da ligação" mode="landscape" value={this.state.query.day}/>
                    </div>
                    <div style={styles.col}>
                        <TimePicker hintText="Horário de começo da ligação" mode="landscape" value={this.state.query.time}/>
                    </div>
                    <div style={styles.col}>
                        <SelectField
                            floatingLabelText="Autorizada"
                            value={this.state.query.authorized}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={null} primaryText="Ambos" />
                            <MenuItem value={true} primaryText="Sim" />
                            <MenuItem value={false} primaryText="Não" />
                        </SelectField>
                    </div>
                </div> */}
                {this.state.calls.map(call => {
                    const start = `${call.start.getHours()}:${call.start.getMinutes()}`
                    const end = `${call.end.getHours()}:${call.end.getMinutes()}`
                    return (
                        <Card key={call._id} style={styles.card}>
                            <div style={styles.cardRow}>
                                <CardText style={styles.cardRowCol1}>
                                    <div style={styles.cardRowCol1Row1}>
                                        <div style={Object.assign({}, styles.tag, {backgroundColor: (call.authorized === true) ? '#3EA938':'#ED1C24'})}>
                                            <p>{(call.authorized === true) ? 'CONFIRMADO': 'SUSPEITO'}</p>
                                        </div>
                                    </div>
                                    <div style={styles.cardRowCol1Row2}>
                                        <span><strong>{"Pedro Rossi e Heitor Felix"}</strong></span><br/>
                                        <span style={{fontStyle: 'italic'}}>{`${start} até ${end}`}</span><br/>
                                        <span>{`${call.start.toLocaleDateString()}`}</span><br/>
                                    </div>
                                </CardText>
                                <CardText style={styles.cardRowCol2}>
                                    <IconButton tooltip="Reproduzir conversa" touch={true} tooltipPosition="bottom-left" onClick={() => this.openAudioOnNewTab(call)}>
                                        <AVPlay/>
                                    </IconButton>
                                    <IconButton tooltip="Ver transcrição" touch={true} tooltipPosition="bottom-left" onClick={() => this.openDialog(call)}>
                                        <ActionDescription/>
                                    </IconButton>
                                </CardText>
                            </div>
                        </Card>
                    )
                })}
                <Dialog
                    title="Transcrição do audio"
                    actions={actions}
                    modal={false}
                    open={this.state.dialog.length > 0}
                    onRequestClose={this.handleClose}
                >
                    {this.state.dialog}
                </Dialog>
            </div>
        )
    }

}

const styles = {
    wrapper: {
        marginTop: 20,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    searchRow: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 200,
        marginRight: 200,
        height: 40
    },
    row: {
        flex: 1,
        marginTop: 30,
        display: 'flex'
    },
    input: {
        flex: 10,

    },
    icon: {
        width: 'auto',
        height: '100%'
    },
    rowWithCols: {
        flex: 1,
        marginTop: 30,
        flexDirection: 'row',
        display: 'flex',
        marginLeft: 200,
        marginRight: 200,
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle'
        // height: 50,
    },
    col: {
        flex: 1,
        margin: 10,
        verticalAlign: 'middle'
    },
    img: {
        height: 50,
        width: 'auto',
    },
    span: {
        textAlign: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        backgroundColor: '#B50156',
        flex: 1,
        height: '100%',
        width: 'auto'
    },
    card: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30,
    },
    cardRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    cardRowCol1: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    cardRowCol1Row1: {
        flex: 1
    },
    cardRowCol1Row2: {
        flex: 7,
        textAlign: 'left',
        paddingLeft: 10
    },
    tag: {
        color: 'white',
        paddingLeft: 5,
        paddingRight: 5,
    },
    cardRowCol2: {
        flex: 1,
        textAlign: 'right'
    }
}

export default withRouter(ListCalls)