var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var connectCounter = 0;
var allPlayers = [];
var add = [];


app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/public/index.html');
});

io.on('connection', function(socket){
  console.log('user connected:');
  connectCounter++;
  create(connectCounter);
  
  io.emit('connecting', allPlayers);
  
  
  
  socket.on('askToMove', function(player){
      io.emit('move', player);
  });
  
  socket.on('askToShoot', function(shootingData){
      io.emit('shoot', shootingData);
  });
  
   socket.on('gotShoot', function(playerId){
      io.emit('respawn', playerId);
   });
   
   socket.on('destroy', function(playerId){
       
       for (index = 0; index < allPlayers.length; ++index) {

            if (playerId == allPlayers[index][0]){
                allPlayers.splice(index, 1);
            }
            
        }
       
       
        io.emit('test');
   });
  
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
    //io.emit('chat message', "someone has just left");
    
  });
  
});

io.emit('some event', { for: 'everyone' });


http.listen(3000, function(){
  console.log('listening on *:3000');
});



function create(id){
        
    background = generateColor();
    topPos = generatePosition();
    leftPos = generatePosition();

    add = [id, background, topPos, leftPos];
    allPlayers.push(add);
    
    return [id, background, topPos, leftPos];

 }

function generateRandom(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function generatePosition(){

    return generateRandom(1, 100);

}

function generateColor(){

    number1 = generateRandom(0, 9);
    number2 = generateRandom(0, 9);
    number3 = generateRandom(0, 9);
    number4 = generateRandom(0, 9);
    number5 = generateRandom(0, 9);
    number6 = generateRandom(0, 9);

    return "#" + number1 + number2 + number3 + number4 + number5 + number6;

}