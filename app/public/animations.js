function drawF(element){
    draw(element[0], element[1], element[2], element[3]);
}
function draw(id, background, topPos, leftPos){

    document.body.innerHTML += '<div class ="hero" id = "' + id + '" style=" top:' + topPos + '%;left:' + leftPos + '%;"></div>';
}

function move(player){
    $("#"+player[0]).css("left",player[3]+"%");
    $("#"+player[0]).css("top",player[2]+"%");
}

function shoot(player, bulletId, lastMove){

    topPos = player[2];
    leftPos = player[3];
    document.body.innerHTML += '<div class = "bullet ' + lastMove + '" id = "bullet_' + bulletId + '" style="top: ' + topPos + '%; left:' + leftPos + '%;"></div>';
    moveBullet(player, bulletId, lastMove);

}

function moveBullet(shooter, bulletId, lastMove){

    topInst = "=";
    leftInst = "=";

    if (lastMove == "up"){
        topInst = "-=500";
    }

    if (lastMove == "down"){
        topInst= "+=500";
    }

    if (lastMove == "right"){
        leftInst = "+=500";
    }

    if (lastMove == "left"){
       leftInst = "-=500";
    }

    $( "#bullet_" + bulletId ).animate({
        opacity: 0.25,
        top: topInst,
        left: leftInst
      }, {
        duration: 1000, 
        complete: function() {
                      $( "#bullet_" + bulletId ).remove();
                      shooting = false;
                  },
        step: function(){
                    thisBulletsTop = $(this).position().top;
                    thisBulletsLeft = $(this).position().left;
                    thisBullet = $(this)

                    $( ".hero" ).each(function( index ) {
                        thisHerosTop = $( this ).position().top;
                        thisHerosLeft = $( this ).position().left;


                        if ((thisHerosTop-15 <= thisBulletsTop) && (thisHerosTop+15 >= thisBulletsTop)){

                            if ((thisHerosLeft-15 <= thisBulletsLeft) && (thisHerosLeft+15 >= thisBulletsLeft)){

                                if ($(this).attr("id") != shooter[0]){
                                    respawnRequest($(this).attr("id"));
                                    thisBullet.remove();
                                }

                            }


                        }
                    });



              }
      });


}

