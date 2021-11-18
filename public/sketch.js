var socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');
  // console.log(socket.id)

  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
      // When we receive data
      function(data) {
        console.log("Got: " + data.x + " " + data.y);
        // Draw a blue circle
        fill(128,128,128);
        noStroke();
        ellipse(data.x, data.y, 20, 20);
      }
  );
}

function draw() {
  // Nothing
  // background(0)
}
//
function touchMoved() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}