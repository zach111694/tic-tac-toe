
function Model(rows,cols){
	this.newGame(rows,cols);
}

Model.prototype.addPlayer = function (str){
	this.players.push(str);
};

Model.prototype.isValidMove = function (row,col){
	if(this.getPlayer(row,col) === ""){
		return true;
	} else {
		return false;
	}
};

Model.prototype.playerWin = function(){

	var lastPlayer = this.players[(this.currMoves-1) % (this.players.length)];

	// CHECKING CONSECUTIVE AT ROW
	
	var consecutiveInRow = 0;

	for(var r = 0; r < this.rows; r++){
		if(consecutiveInRow === 3){
			return lastPlayer;
		} else {
			for(var c = 0; c < this.cols; c++){
			if(this.board[r][c] !== lastPlayer){
				break;
			} else {
				consecutiveInRow += 1;
			}
			}
		}
	}
	// CHECKING CONSECUTIVE AT COL
	
	var consecutiveInCol = 0;

	for(var c = 0; c < this.cols; c++){
		if(consecutiveInCol === 3){
			return lastPlayer;
		} else {
			for(var r = 0; r < this.rows; r++){
			if(this.board[r][c] !== lastPlayer){
				break;
			} else {
				consecutiveInCol += 1;
			}
			}
		}
	}

	// CHECK FOR DIAGONAL
	var consecutiveInDiag = 0;
	for(var k = 0; k < this.rows || k < this.cols; k++){
		if(this.board[k][k] !== lastPlayer || consecutiveInCol == 3){
			break;
		} else {
			consecutiveInDiag += 1;
		} 
	}

	if(consecutiveInDiag === 3){
		
		return lastPlayer;
	}

	// CHECK FOR OPPOSITE DIAGONAL
	var consecutiveInOppositeDiag = 0;
	for(var l = 0; l < this.rows || l < this.cols; l++){
		if(this.board[l][(this.cols-1)-l] !== lastPlayer || consecutiveInCol == 3){
			break;
		} else {
			consecutiveInOppositeDiag += 1;
		}
	}

	if(consecutiveInOppositeDiag === 3){
		return lastPlayer;
	}

	return "";
};

Model.prototype.isDraw = function(){
	return(this.currMoves === this.maxMoves && (this.playerWin() === ""));
};

Model.prototype.makeCopy = function(game){
	var boardCopy = [];
	
	game.board.forEach(function(ele){
		boardCopy.push(ele.slice());
	});
	
	var newGame = new Model(game.rows,game.cols);
	newGame.board = boardCopy;
	newGame.players = game.players;
	newGame.currMoves = game.currMoves;
	newGame.playerTurnIndex = game.playerTurnIndex;
	

	return newGame;
};

Model.prototype.makeMove = function(row,col){

	// CHECK FOR VALID MOVE
	if(this.isValidMove(row,col)){

		//SET TARGET CELL TO CURRENT PLAYER AND ADD CURRENT MOVES COUNT	
		this.board[row][col] = this.players[(this.currMoves) % (this.players.length)];

		if(this.currMoves !== this.maxMoves){
			this.currMoves += 1;
		}

		return true;
	} else {
		return false;
	}
};

Model.prototype.getPlayer = function(row,col){
	return this.board[row][col];
};

Model.prototype.newGame = function(rows,cols){
	this.rows = rows;
	this.cols = cols;
	this.players = ["X","O"];
	this.maxMoves = rows*cols;
	this.board = [];
	this.currMoves = 0;
	this.playerTurnIndex = 0;
	
	for(var i = 0; i < rows; i++){
		this.board.push([]);
		for(var j = 0; j < cols; j++){
			this.board[i].push("");
		}
	}
};

function ai(game,maxPlayer){

	if(game.isDraw()){
		return 0;
	} else if (game.playerWin() === game.players[0]){
		return 1;
	} else if (game.playerWin() === game.players[1]){
		return -1;
	} else {
	
	var currentBest = -Infinity;
	var currentWorst = Infinity;
	
	console.log("base case not hit");
	for(var r = 0; r < game.rows; r++){
		for(var c = 0; c < game.cols; c++){
			if(game.isValidMove(r,c)){
				
					var boardCopy = game.makeCopy(game);

					if(boardCopy.makeMove(r,c)){
						// console.log(boardCopy);
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
	
	return maxPlayer? currentBest:currentWorst;
	
}
}


var testGame = new Model(3,3);

testGame.board = [["O","","X"],
				  ["X","X",""],
				  ["O","",""]];
testGame.currMoves = 5;
// console.log(testGame.playerWin());

console.log(ai(testGame,false));

