import React from 'react'
import CanvasDraw from "react-canvas-draw";
import { Tabs, Tab, Paper, Typography, Box } from '@material-ui/core'

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

        this.tabValue = 0
        this.canvasRef = React.createRef()
        this.saveData = ""
    }

    tabChanged = (event, newValue) => {
        if(this.tabValue === 0) {
            this.canvasGetData()
        }
        this.tabValue = newValue
        this.setState({ tabValue: newValue })
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

        const tabBarStyle = {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#888888",
            width: "100vw",
            height: "100vh"
        }

        /*const undoStyle = {
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
        }*/

        function TabPanel(props) {
            const { children, value, index, ...other } = props;

            return (
                <Typography
                    component="div"
                    role="tabpanel"
                    hidden={value !== index}
                    id={`full-width-tabpanel-${index}`}
                    aria-labelledby={`full-width-tab-${index}`}
                    {...other}
                >
                    <Box>{children}</Box>
                </Typography>
            );
        }

        return (
            <div>
                <Paper square style={tabBarStyle}>
                    <Tabs
                        value={this.tabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="disabled tabs example"
                        onChange={this.tabChanged.bind(this)}
                    >
                        <Tab label="Canvas" />
                        <Tab label="Option 2" />
                        <Tab label="Option 3" />
                    </Tabs>
                </Paper>
                <TabPanel value={this.tabValue} index={0}>
                    <CanvasDraw
                        ref={this.canvasRef}
                        style={canvasStyle}
                        canvasWidth={"100vw"}
                        canvasHeight={"90vh"}
                        saveData={this.saveData}
                        immediateLoading={true}
                    //imgSrc={"https://image.shutterstock.com/image-vector/vector-retro-bold-font-alphabet-260nw-717976975.jpg"}
                    />
                </TabPanel>
            </div>
        )
    }
}

export default Room