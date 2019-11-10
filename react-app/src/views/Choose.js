import React from 'react'
import { Card, Button, TextField, Container } from '@material-ui/core';

class Choose extends React.Component {

    goBack() {
        this.props.history.replace("/")
    }

    render() {
        const cardStyle = {
            padding: "2vh",
            backgroundColor: "#CCCCCC",
            borderRadius: "10px",
            border: "solid black 3px",
            marginBottom: "10vh"
        }
        const createButtonStyle = {
            marginTop: "8vh",
            border: "solid black 1px",
            backgroundColor: "green",
            paddingLeft: "10px",
            paddingRight: "10px"
        }
        const joinButtonStyle = {
            marginLeft: "4vh",
            border: "solid black 1px",
            backgroundColor: "green",
            padding: "2vh"
        }
        const joinContainerStyle = {
            marginTop: "-2vh"
        }

        const joinTextFieldStyle = {

        }

        const goBackStyle = {
            position: "absolute",
            bottom: 0,
            left: 0,
            marginLeft: "2vw",
            marginBottom: "2vh",
            border: "solid black 1px",
            backgroundColor: "green"
        }

        const createTextStyle = {
            fontSize: "20px"
        }

        return (
            <div className="App">
                <header className="App-header">
                    <Card style={cardStyle}>
                        <p style={{ marginTop: "-1vh" }}>Join or create a room:</p>
                        <Container style={joinContainerStyle}>
                            <TextField style={joinTextFieldStyle} placeholder="Room ID" variant="outlined" />
                            <Button style={joinButtonStyle}>
                                Join
                            </Button>
                        </Container>
                        <Button style={createButtonStyle} onClick={(function () {
                            this.props.history.push("./room");
                        }).bind(this)}>
                            Create
                        </Button>
                        <br />
                        <p style={createTextStyle}>
                            You will be given a server ID to send to others.
                        </p>
                    </Card>
                    <Button style={goBackStyle} onClick={this.goBack.bind(this)}>
                        Change Name
                    </Button> <br />
                </header>
            </div>
        )
    }
}

export default Choose