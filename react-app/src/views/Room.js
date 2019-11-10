import React from 'react'
import CanvasDraw from "react-canvas-draw";
import { Button } from '@material-ui/core';

class Room extends React.Component {

    static defaultCanvasProps = {
        loadTimeOffset: 5,
        lazyRadius: 30,
        brushRadius: 122,
        brushColor: "#444",
        catenaryColor: "#0a0302",
        gridColor: "rgba(150,150,150,0.17)",
        hideGrid: false,
        canvasWidth: 400,
        canvasHeight: 400,
        disabled: false,
        imgSrc: "",
        saveData: null,
        immediateLoading: false
    };

    constructor(props) {
        super(props)

        this.canvasRef = React.createRef()
        this.saveData = {};
    }

    canvasUndo() {
        this.canvasRef.current.undo()
    }

    canvasClear() {
        this.canvasRef.current.clear()
    }

    canvasGetData() {
        this.saveData = this.canvasRef.current.getSaveData()
    }

    canvasLoadData() {
        this.canvasRef.current.loadSaveData(this.saveData, true)
    }

    render() {
        const canvasStyle = {
            position: "absolute",
            top: "10vh"
        }

        const undoStyle = {
            position: "absolute",
            top: 0,
            left: 0
        }
        const saveStyle = {
            position: "absolute",
            top: 0,
            left: 100
        }
        const playStyle = {
            position: "absolute",
            top: 0,
            left: 200
        }

        return (
            <div className="App">
                <header className="App-header">
                    <Button style={undoStyle} onClick={this.canvasUndo.bind(this)} >UNDO</Button>
                    <Button style={saveStyle} onClick={this.canvasGetData.bind(this)}>SAVE</Button>
                    <Button style={playStyle} onClick={this.canvasLoadData.bind(this)}>PLAY</Button>
                    <CanvasDraw
                        ref={this.canvasRef}
                        style={canvasStyle}
                        canvasWidth={"100vw"}
                        canvasHeight={"90vh"}
                    //imgSrc={"https://image.shutterstock.com/image-vector/vector-retro-bold-font-alphabet-260nw-717976975.jpg"}
                    />
                </header>
            </div>
        )
    }
}

export default Room