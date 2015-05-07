function shootRequest(){
    
    if (shooting == false){
        shooting = true;

        shootId = generateRandom(1,9999);
        shootingData = [myself, shootId, lastMove]
        socket.emit("askToShoot", shootingData);
    }

}

function deathRequest(id){
    
    if (lastdeath != id){
        socket.emit("gotShoot", id);
        lastdeath = id;
    }
}



function respawnRequest(){
    
    socket.emit("respawn");
}



