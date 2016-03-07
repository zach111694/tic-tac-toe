"use strict";

function Model(rows,cols){
	this.newGame(rows,cols);
}

Model.prototype.addPlayer = function (str){
	this.players.push(str);
};

Model.prototype.isValidMove = function (row,col){
	if((row < this.rows && col < this.cols) && this.getPlayer(row,col) == "" && !(this.isDraw(row,col))){
		return true;
	} else {
		return false;
	}
};

Model.prototype.playerWin = function(row,col){
	
	var winBool = false;

	// CHECKING HORIZONTALLY AT MOST RECENT MOVE ROW
	var consecutiveInRow = 0;
	for(var i = 0; i < this.cols; i++){
		if(this.board[row][i] !== this.players[this.playerTurnIndex] ){
			break;
		} else {
			consecutiveInRow += 1;
		}
	}

	// CHECKING VERTICALLY AT MOST RECENT MOVE COLUMN
	var consecutiveInCol = 0;
	for(var j = 0; j < this.rows; j++){
		if(this.board[j][col] !== this.players[this.playerTurnIndex]){
			break;
		} else {
			consecutiveInCol += 1;
		}
	}

	// CHECK FOR DIAGONAL
	var consecutiveInDiag = 0;
	if(row == col){
		for(var k = 0; k < this.rows || k < this.cols; k++){
			if(this.board[k][k] !== this.players[this.playerTurnIndex]){
				break;
			} else {
				consecutiveInDiag += 1;
			} 
		}
	}

	// CHECK FOR OPPOSITE DIAGONAL
	// TODO FIND IF CONDITION FOR NON DIAGONAL RESULTS
	var consecutiveInOppositeDiag = 0;
	for(var l = 0; l < this.rows || l < this.cols; l++){
		if(this.board[l][(this.cols-1)-l] !== this.players[this.playerTurnIndex]){
			break;
		} else {
			consecutiveInOppositeDiag += 1;
		}
	}

	if(consecutiveInRow === 3 || consecutiveInCol === 3 || consecutiveInDiag === 3 || consecutiveInOppositeDiag === 3){
		winBool = true;
	}

	if(winBool){
		return this.players[this.playerTurnIndex];
	} else {
		return "";
	}
};

Model.prototype.isDraw = function(row,col){
	return(this.currMoves === this.maxMoves && (this.playerWin(row,col) === ""));
};


Model.prototype.gameStatus = function(row,col){
	var result = null;
	if(this.isDraw(row,col)){
		result = 0;
	} else if (this.playerWin(row,col) == this.players[0]){
		result = 1;
	} else {
		result = -1;
	}

	return result;
};

Model.prototype.makeCopy = function(board){
	var boardCopy = [];
	
	board.forEach(function(ele){
		boardCopy.push(ele);
	});
};

Model.prototype.makeMove = function(row,col){

	// CHECK FOR VALID MOVE
	if(this.isValidMove(row,col)){

		//SET TARGET CELL TO CURRENT PLAYER AND ADD CURRENT MOVES COUNT	
		this.board[row][col] = this.players[this.playerTurnIndex];
		this.currMoves += 1;

		// CHECK IF MOST RECENT MOVE ACHIEVES WIN CONDITION
		if(this.playerWin(row,col) !== ""){
			return this.playerWin(row,col);
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
	this.board = [];
	this.players = [];
	this.playerTurnIndex = this.currMoves % this.players.length;
	this.maxMoves = rows*cols;
	this.currMoves = 0;
	this.max = -Infinity;
	this.min = Infinity;

	for(var i = 0; i < rows; i++){
		this.board.push([]);
		for(var j = 0; j < columns; j++){
			this.board[j].push("");
		}
	}
};
