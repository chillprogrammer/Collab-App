import React from "react";
import CanvasDraw from "react-canvas-draw";
import {
  Tabs,
  Tab,
  Paper,
  Typography,
  Box,
  Card,
  Slider,
  Button,
} from "@material-ui/core";
import { SliderPicker } from "react-color";
// import { subscribeToDrawing } from '../socket';
import socketIOClient from "socket.io-client";
import { CONFIG } from "../config";

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
    immediateLoading: false,
  };

  constructor(props) {
    super(props);

    this.tabValue = 0;
    this.state = {
      color: "#00FFFF",
      brushRadius: 10,
    };
    this.canvasRef = React.createRef();
    this.saveData = "";

    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.brushRadiusChanged = this.brushRadiusChanged.bind(this);
    this.canvasUndo = this.canvasUndo.bind(this);
    this.canvasClear = this.canvasClear.bind(this);

    this.socket = socketIOClient(CONFIG.SOCKET_URL);
  }

  componentDidMount() {
    this.socket.on("drawToClient", (drawing) => {
      this.saveData = drawing;

      this.setState({
        saveData: drawing,
      });

      this.canvasLoadData();
    });
  }

  tabChanged = (event, newValue) => {
    if (this.tabValue === 0) {
      this.canvasGetData();
    }
    this.tabValue = newValue;
    this.setState({ tabValue: newValue });
  };

  canvasUndo() {
    this.canvasRef.current.undo();
  }

  canvasClear() {
    this.canvasRef.current.clear();
  }

  canvasGetData() {
    const drawingData = this.canvasRef.current.getSaveData();
    this.saveData = drawingData;
    this.socket.emit("drawToServer", drawingData);
  }

  canvasLoadData() {
    this.canvasRef.current.loadSaveData(this.saveData, true);
  }

  handleChangeComplete = (c) => {
    this.canvasGetData();
    this.setState({ color: c.hex });
    this.canvasLoadData();
  };

  brushRadiusChanged = (event, size) => {
    this.canvasGetData();
    if (size < 0) {
      size = 0;
    } else if (size > 100) {
      size = 100;
    }
    this.brushRadius = size;
    this.setState({ brushRadius: size });
    this.canvasLoadData();
  };

  render() {
    const canvasStyle = {
      position: "absolute",
      top: "10vh",
      left: "25vw",
    };

    const tabBarStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "#888888",
      width: "100vw",
      height: "100vh",
    };

    const toolboxStyle = {
      backgroundColor: "#aabbcc",
      position: "absolute",
      left: 0,
      top: "10vh",
      width: "25vw",
      height: "89vh",
      border: "solid black 2px",
    };

    const undoButtonStyle = {
      backgroundColor: "#999999",
      left: "2vw",
    };

    const clearButtonStyle = {
      position: "absolute",
      backgroundColor: "#999999",
      right: "2vw",
    };

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
      <div onMouseUp={this.canvasGetData.bind(this)}>
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
            canvasWidth={"75vw"}
            canvasHeight={"90vh"}
            saveData={this.saveData}
            immediateLoading={true}
            brushColor={this.state.color}
            brushRadius={this.state.brushRadius}
          />
          <Card style={toolboxStyle}>
            <div style={{ marginTop: "4vh" }} />
            <p style={{ marginLeft: "9vw" }}>Brush Color</p>
            <SliderPicker
              color={this.state.color}
              onChangeComplete={this.handleChangeComplete}
            />
            <p style={{ marginLeft: "9vw" }}>{this.state.color}</p>
            <div style={{ marginTop: "10vh" }} />
            <p style={{ marginLeft: "9vw" }}>Brush Size</p>
            <Slider
              value={this.state.brushRadius}
              onChange={this.brushRadiusChanged}
              aria-labelledby="input-slider"
            />
            <div style={{ marginTop: "10vh" }} />
            <Button
              onClick={this.canvasUndo}
              style={undoButtonStyle}
              variant={"outlined"}
            >
              Undo
            </Button>
            <Button
              onClick={this.canvasClear}
              style={clearButtonStyle}
              variant={"outlined"}
            >
              Clear
            </Button>
          </Card>
        </TabPanel>
      </div>
    );
  }
}

export default Room;
