
function gameStatus(){

	if(this.isDraw()){
		return 0;
	} else if (this.playerWin() == this.players[0]){
		return 1;
	} else if (this.playerWin() == this.players[1]){
		return -1;
	} else {
		return null;
	}

};


function ai(game,maxPlayer){

	var currentBest = -Infinity;
	var currentWorst = Infinity;

	// BASE CASE
	if(gameStatus() !== null){
		// make new object
		return gameStatus();
	}

	for(var r = 0; r < game.rows; r++){
		for(var c = 0; c < game.cols; c++){
			if(game.isValidMove(r,c)){

					var boardCopy = game.makeCopy(game);

					if(boardCopy.makeMove(r,c)){
						if(maxPlayer){
							var result = ai(boardCopy,false);
							if(result > currentBest){
								currentBest = result;
							}
						} else {
							var result = ai(boardCopy,true);
							if(result < currentWorst){
								 currentWorst = result;
							}
						}
					}
			}	
		}
	}
}


