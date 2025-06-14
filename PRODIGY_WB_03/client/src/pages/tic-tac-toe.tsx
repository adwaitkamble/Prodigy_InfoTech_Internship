import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

type Player = 'X' | 'O';
type CellValue = Player | '';
type GameBoard = CellValue[];

interface GameState {
  board: GameBoard;
  currentPlayer: Player;
  gameActive: boolean;
  winner: Player | null;
  isDraw: boolean;
  scores: { X: number; O: number };
  winningCells: number[];
}

const initialGameState: GameState = {
  board: Array(9).fill(''),
  currentPlayer: 'X',
  gameActive: true,
  winner: null,
  isDraw: false,
  scores: { X: 0, O: 0 },
  winningCells: [],
};

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

export default function TicTacToe() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const checkWin = useCallback((board: GameBoard): { winner: Player | null; winningCells: number[] } => {
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a] as Player, winningCells: condition };
      }
    }
    return { winner: null, winningCells: [] };
  }, []);

  const handleCellClick = useCallback((cellIndex: number) => {
    if (gameState.board[cellIndex] !== '' || !gameState.gameActive) {
      return; // Invalid move
    }

    setGameState(prevState => {
      const newBoard = [...prevState.board];
      newBoard[cellIndex] = prevState.currentPlayer;

      const { winner, winningCells } = checkWin(newBoard);
      
      if (winner) {
        const newScores = { ...prevState.scores };
        newScores[winner]++;
        return {
          ...prevState,
          board: newBoard,
          gameActive: false,
          winner,
          scores: newScores,
          winningCells,
        };
      }

      // Check for draw
      const isDraw = newBoard.every(cell => cell !== '');
      if (isDraw) {
        return {
          ...prevState,
          board: newBoard,
          gameActive: false,
          isDraw: true,
        };
      }

      // Switch player
      const nextPlayer: Player = prevState.currentPlayer === 'X' ? 'O' : 'X';
      return {
        ...prevState,
        board: newBoard,
        currentPlayer: nextPlayer,
      };
    });
  }, [gameState.board, gameState.gameActive, gameState.currentPlayer, checkWin]);

  const resetGame = useCallback(() => {
    setGameState(prevState => ({
      ...initialGameState,
      scores: prevState.scores, // Keep scores
    }));
  }, []);

  const clearScores = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  const getGameStatusText = () => {
    if (gameState.winner) {
      return `Player ${gameState.winner} Wins!`;
    }
    if (gameState.isDraw) {
      return "It's a Draw!";
    }
    return `Player ${gameState.currentPlayer}'s Turn`;
  };

  const getGameStatusColor = () => {
    if (gameState.winner === 'X') {
      return 'text-player-x';
    }
    if (gameState.winner === 'O') {
      return 'text-player-o';
    }
    if (gameState.isDraw) {
      return 'text-slate-600';
    }
    return 'text-slate-800';
  };

  return (
    <div className="font-inter bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Game Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Tic-Tac-Toe</h1>
          <p className="text-slate-600">Get three in a row to win!</p>
        </div>

        {/* Game Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Game Status */}
          <div className="text-center mb-6">
            <div className={`text-xl font-semibold mb-2 ${getGameStatusColor()}`}>
              {getGameStatusText()}
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-player-x rounded-full"></div>
                <span className="text-sm font-medium text-slate-600">Player X</span>
                <span className="text-sm font-bold text-player-x">{gameState.scores.X}</span>
              </div>
              <div className="w-px h-6 bg-slate-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-player-o rounded-full"></div>
                <span className="text-sm font-medium text-slate-600">Player O</span>
                <span className="text-sm font-bold text-player-o">{gameState.scores.O}</span>
              </div>
            </div>
          </div>

          {/* Game Board */}
          <div className="grid grid-cols-3 gap-2 mb-6 bg-slate-200 p-2 rounded-xl">
            {gameState.board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                className={`
                  bg-white rounded-lg h-20 flex items-center justify-center text-6xl font-mono font-bold 
                  cursor-pointer transition-all duration-200 border-2 border-transparent hover:border-slate-300
                  ${!cell && gameState.gameActive ? 'cell-hover' : ''}
                  ${gameState.winningCells.includes(index) ? 'winning-cell' : ''}
                  ${cell === 'X' ? 'text-player-x' : cell === 'O' ? 'text-player-o' : ''}
                `}
                disabled={!!cell || !gameState.gameActive}
              >
                {cell && (
                  <span className="animate-scale-in">
                    {cell}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Game Controls */}
          <div className="text-center space-y-3">
            <Button
              onClick={resetGame}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              New Game
            </Button>
            <Button
              onClick={clearScores}
              variant="destructive"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 text-sm"
            >
              Clear Scores
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
