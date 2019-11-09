import React from 'react'
import { TextField, Card, Button } from '@material-ui/core';

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const titleStyle = {
            fontSize: "calc(42px + 2vmin)",
            color: "white",
            textShadow:
                "3px 3px 0 #000," +
                "-1px -1px 0 #000," +
                "1px -1px 0 #000," +
                "-1px 1px 0 #000," +
                "1px 1px 0 #000"
        }
        const textfieldStyle = {
            width: "50vw",
            maxWidth: "400px"
        }
        const textfieldInputProps = {
            style: {
                color: "black",
            }
        }
        const mainCardStyle = {
            padding: "2vh",
            backgroundColor: "#CCCCCC",
            borderRadius: "10px",
            border: "solid black 3px",
            marginBottom: "10vh"
        }

        const shortTextStyle = {
            fontSize: "calc(10px + 2vmin)"
        }
        const loginButtonStyle = {
            border: "solid black 1px"
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 style={titleStyle}>Collab-APP</h1>
                    <Card style={mainCardStyle}>
                        <div style={shortTextStyle}>
                            <p>
                                This app is made for students by students. <br /> <br />
                            </p>
                        </div>
                        <TextField label={"Enter a nickname"} type="text" variant={"outlined"} autoFocus={true} style={textfieldStyle} inputProps={textfieldInputProps} placeholder="What would you like to be called?" />
                        <br/>
                        <div style={{marginTop: "4vh"}} />
                        <Button variant="contained" color={"primary"} style={loginButtonStyle}>Continue</Button>
                        <div style={{marginBottom: "2vh"}} />
                    </Card>
                </header>
            </div>
        )
    }
}

export default Login