import Board from '../board/board';
import Panel from '../panel/panel';

class Game {
    board: Board;
    panel: Panel;
    currentPlayer: number;

    constructor() {
        this.board = new Board();
        this.panel = new Panel();

        this.currentPlayer = 1;
        this.addClickListener();
    }

    addClickListener(): void {
        document.querySelectorAll('.field').forEach((field: HTMLDivElement) => {
            field.addEventListener('click', this.onFieldClick.bind(this));
        });
    }

    onFieldClick(e: Event): void {
        const target = e.target! as HTMLDivElement;
        if (!target.innerHTML) {
            this.board.renderFigure(target, this.currentPlayer);
            this.board.updateState(target, this.currentPlayer);
            this.updateCurrentPlayer();
            this.panel.printGameInfo(`Player ${this.currentPlayer} moves`);
            const playerWon = this.board.checkWin();
            if (playerWon) {
                if (playerWon > 0)
                    this.panel.printGameInfo(`Player ${playerWon} wins!!!`);
                if (playerWon === -1)
                    this.panel.printGameInfo(`There was a draw!`);
                this.panel.updateScore(playerWon);
                this.panel.printScore();
                this.panel.storeScore();
                this.restart();
            }
        }
    }

    updateCurrentPlayer(): void {
        if (this.currentPlayer === 1) this.currentPlayer++;
        else this.currentPlayer--;
    }

    restart(): void {
        this.board.disable();
        this.panel.toggleAnimate();
        setTimeout(() => {
            this.currentPlayer = 1;
            this.board.clear();
            this.panel.printGameInfo('Player 1 moves');
            this.board.enable();
            this.panel.toggleAnimate();
        }, 3000);
    }
}

export default Game;
