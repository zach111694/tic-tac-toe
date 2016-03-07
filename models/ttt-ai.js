


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

					if(maxPlayer){
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
			}	
			
		}

	}
}


