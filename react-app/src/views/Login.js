import React from 'react'
import axios from 'axios';
import { TextField, Card, Button } from '@material-ui/core';
import { CONFIG } from '../config'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { nickname: "" }
    }

    handleContinue() {
        var nickname = this.state.nickname
        if (nickname.length > 0) {
            console.log("Nickname: " + nickname)
            console.log(CONFIG.BASE_URL);

            let postMsg = {
                nickname: nickname
            }

            var url = CONFIG.BASE_URL
            
            axios.get(url, postMsg)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.props.history.push("./choose");
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
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
                        <TextField
                            value={this.state.nickname}
                            onChange={e => this.setState({ nickname: e.target.value })}
                            label={"Enter a nickname"}
                            type="text" variant={"outlined"}
                            autoFocus={true}
                            style={textfieldStyle}
                            inputProps={textfieldInputProps}
                            placeholder="What would you like to be called?"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    (this.handleContinue()).bind(this)
                                }
                            }
                            }
                        />
                        <br />
                        <div style={{ marginTop: "4vh" }} />
                        <Button onClick={this.handleContinue.bind(this)} variant="contained" color={"primary"} style={loginButtonStyle}>Continue</Button>
                        <div style={{ marginBottom: "2vh" }} />
                    </Card>
                </header>
            </div>
        )
    }
}

export default Login