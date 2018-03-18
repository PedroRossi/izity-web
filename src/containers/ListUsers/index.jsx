import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'

import ContentAdd from 'material-ui/svg-icons/content/add'
import AVMic from 'material-ui/svg-icons/av/mic'

import { UserFactory } from '../../factories'

class ListUsers extends Component {

    state = {
        users: [],
        open: false,
        name: '',
        phone: ''
    }

    async componentDidMount() {
        const data = await UserFactory.list()
        this.setState({ users: data })
    }

    handleClose = () => this.setState({open: false})

    handleOpen = () => this.setState({open: true})

    handleSubmit = async () => {
        const user = {
            name: this.state.name,
            phone: this.state.phone
        }
        this.handleClose()
        const data = await UserFactory.create(user)
        let users = this.state.users
        users.push(data)
        this.setState({users})
    }

    handleChange = (param, value) => {
        let st = {}
        st[param] = value
        this.setState(st)
    }

    render() {
        const actions = [
            <FlatButton
              label="Cancelar"
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Enviar"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleSubmit}
            />
        ];

        return (
            <div style={styles.wrapper}>
                {this.state.users.map(user => 
                    <Card key={user._id} style={styles.card}>
                        <div style={styles.row}>
                            <div style={styles.col1}>
                                <div style={Object.assign({}, styles.tag, {backgroundColor: (user.trained === true) ? '#3EA938':'#ED1C24'})}>
                                    <p>{(user.trained === true) ? 'AUTORIZADO': 'NÃO AUTORIZADO'}</p>
                                </div>
                            </div>
                            <div style={styles.col2}>
                                <span><strong>{"Nome: "}</strong>{user.name}</span><br/>
                                <span><strong>{"Telefone: "}</strong>{user.phone}</span><br/>
                            </div>
                            <div>
                                {
                                    (user.trained === true) ? null:
                                    <IconButton tooltip="Treinar voz" touch={true} tooltipPosition="bottom-left" onClick={() => this.props.history.push(`/train/${user._id}`)}>
                                        <AVMic/>
                                    </IconButton>
                                }
                            </div>
                        </div>
                    </Card>
                )}
                <FloatingActionButton style={styles.fab} onClick={this.handleOpen}>
                  <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title="Cadastrar funcionário"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField hintText="Nome completo" fullWidth={true} value={this.state.name} onChange={(ev) => this.handleChange('name', ev.target.value)}/>
                    <TextField hintText="Telefone" fullWidth={true} value={this.state.phone} onChange={(ev) => this.handleChange('phone', ev.target.value)}/>
                </Dialog>
            </div>
        )
    }

}

const styles = {
    wrapper: {
        textAlign: 'center',
    },
    fab: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: 40
    },
    card: {
        textAlign: 'left',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        padding: 10
    },
    col1: {
        flex: 1,
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    col2: {
        flex: 8,
        marginLeft: 10,
        marginTop: 5
    },
    tag: {
        color: 'white',
        paddingLeft: 5,
        paddingRight: 5,
    }
}

export default withRouter(ListUsers)