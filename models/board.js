"use strict";

function Model(rows,cols){
	this.rows = rows;
	this.cols = cols;
	this.board = [];
	this.players = [];
	this.playerTurnIndex = 0;
	this.maxMoves = rows*cols;
	this.currMoves = 0;

	for(var i = 0; i < rows; i++){
		this.board.push([]);
		for(var j = 0; j < columns; j++){
			this.board[j].push("");
		}
	}
}

Model.prototype.addPlayer = function (str){
	this.players.push(str);
};

Model.prototype.isValidMove = function (row,col){
	var isValid = false;
	if(this.board[row][col] == ""){
		isValid = true;
	}

	return isValid;
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
		if(this.board[j][col] !== this.player[this.playerTurnIndex]){
			break;
		} else {
			consecutiveInCol += 1;
		}
	}

	// CHECK FOR DIAGONAL
	var consecutiveInDiag = 0;
	if(row == col){
		for(var k = 0; k < this.rows || k < this.cols; k++){
			if(this.board[k][k] !== this.player[this.playerTurnIndex]){
				break;
			} else {
				consecutiveInDiag += 1;
			} 
		}
	}

	// CHECK FOR OPPOSITE DIAGONAL
	// 
	// TODO FIND IF CONDITION FOR NON DIAGONAL RESULTS
	var consecutiveInOppositeDiag = 0;
	for(var l = 0; l < this.rows || l < this.cols; l++){
		if(this.board[l][(this.cols-1)-l] !== this.player[this.playerTurnIndex]){
			break;
		} else {
			consecutiveInOppositeDiag += 1;
		}
	}

	if(consecutiveInRow === 3 || consecutiveInCol === 3 || consecutiveInDiag === 3 || consecutiveInOppositeDiag === 3){
		winBool = true;
	}


	return winBool;
};

Model.prototype.isDraw = function(player1,player2){
	if(this.currMoves === this.maxMoves && this.playerWin() === false){
		return true;
	} else {
		return false;
	}
};

Model.prototype.makeMove = function(row,col){

	// CHECK FOR VALID MOVE
	if(this.isValidMove(row,col)){

		//SET TARGET CELL TO CURRENT PLAYER AND ADD CURRENT MOVES COUNT	
		this.board[row][col] = this.players[this.playerTurnIndex];
		this.currMoves += 1;

		// CHECK IF MOST RECENT MOVE ACHIEVES WIN CONDITION
		if(this.playerWin(row,col)){
			return this.players[this.playerTurnIndex];
		}

		// IF PLAYER TURN INDEX IS NOT EQUAL TO PLAYER ARRAY LENGTH
		// INCREMENT INDEX, OTHERWISE IF EQUAL THEN RESET TO INDEX 0 STARTING PLAYER
		if(this.playerTurnIndex !== this.players.length-1) {
			this.playerTurnIndex += 1;
		} else {
			this.playerTurnIndex = 0;
		}
	} 
};

Model.prototype.getPlayer = function(row,col){
	return this.board[row][col];
};

Model.prototype.newGame = function(rows,cols){
	var game = new Model(rows,cols);
};
