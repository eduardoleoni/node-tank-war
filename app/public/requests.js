function shootRequest(){
    
    if (shooting == false){
        shooting = true;

        shootId = generateRandom(1,9999);
        shootingData = [myself, shootId, lastMove]
        socket.emit("askToShoot", shootingData);
    }

}

function respawnRequest(id){
    socket.emit("gotShoot", id);
}

function destroyRequest(playerId){
    socket.emit("destroy", playerId);
}




