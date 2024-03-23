const express = require("express");
const app = express();
const ip = require("ip");
const path = require("path");
const robot = require("robotjs");
require("express-ws")(app);

const port = 3000;
robot.setMouseDelay(10);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.ws("/ws", (ws) => {
  let prevPos = { x: 0, y: 0 };
  ws.on("message", (msg) => {
    const [x, y, actionType] = msg.split(" ");
    if (actionType) {
      if (actionType === "start") {
        prevPos = { x, y };
      } else if (actionType === "click") {
        robot.mouseClick();
      } else if (actionType === "rClick") {
        robot.mouseClick("right");
      }
      return;
    }
    const offset = { x: x - prevPos.x, y: y - prevPos.y };
    console.log(offset);
    const mousePos = robot.getMousePos();
    robot.moveMouse(mousePos.x + offset.x, mousePos.y + offset.y);
    prevPos = { x, y };
  });
});

app.listen(port, () => {
  console.log(`http://${ip.address()}:3000`);
});
