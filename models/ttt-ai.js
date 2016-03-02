
function makeCopy(board){
	var boardCopy = [];
	for(var r in board){
		boardCopy.push(r);
	}
	return boardCopy;
}

function gameStatus(row,col){
	var result = null;
	if(this.isDraw(row,col)){
		result = 0;
	} else if (this.playerWin(row,col) == this.players[0]){
		result = 1;
	} else {
		result = -1;
	}

	return result;
}


function ai(game,maxPlayer){

	// BASE CASE
	if(gameStatus(row,col) !== null){
		return gameStatus(row,col);
	}

	for(var r = 0; r < game.rows; r++){
		for(var c = 0; c < game.cols; c++){
			if(game.isValidMove(r,c) && game.makeMove(r,c)){
				
					var boardCopy = makeCopy(game.board);
					var newGame = new Model(r,c);

					newGame.board = boardCopy;

					if(maxPlayer == true){
						var result = ai(newGame.board,false);
						if(result > game.max){
							game.max = result;
						}
					} else {
						var result = ai(newGame.board,true);
						if(result > game.min){
							game.min = result;
						}
					}

				// COMPARE RECURSIVE CALL TO CURRENT MAX
				// MAKE THE MOVE ON THE COPY
				// MAKE A RECURSIVE CALL WITH THE COPIED BOARD
				// & TOGGLE B/W MIN AND MAX PLAYER
			}	
			
		}

	}
}


