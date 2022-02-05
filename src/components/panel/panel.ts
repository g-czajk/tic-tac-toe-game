import UIElement from '../uiElement/uiElement';

interface score {
    wins: {player_1: number; player_2: number};
    draws: number;
}

class Panel extends UIElement {
    gameInfo: HTMLDivElement;
    drawsCount: HTMLSpanElement;
    score: score;
    player1WinsCount: HTMLParagraphElement;
    player2WinsCount: HTMLParagraphElement;
    clearBtn: HTMLDivElement;

    constructor() {
        super('app', 'panel');

        this.gameInfo = this.element.querySelector(
            '.game-info',
        )! as HTMLDivElement;
        this.drawsCount = document.getElementById(
            'draws_count',
        )! as HTMLSpanElement;
        this.player1WinsCount = document.getElementById(
            'player1_win-count',
        )! as HTMLParagraphElement;
        this.player2WinsCount = document.getElementById(
            'player2_win-count',
        )! as HTMLParagraphElement;
        this.clearBtn = document.getElementById('clear')! as HTMLDivElement;
        this.clearBtn.addEventListener('click', this.clearScore.bind(this));
        this.score = localStorage.getItem('tictactoe')
            ? JSON.parse(localStorage.getItem('tictactoe') as string)
            : {wins: {player_1: 0, player_2: 0}, draws: 0};
        this.printScore();
    }

    storeScore(): void {
        localStorage.setItem('tictactoe', JSON.stringify(this.score));
    }

    updateScore(playerWon: number): void {
        switch (playerWon) {
            case -1:
                this.score.draws++;
                break;
            case 1:
                this.score.wins.player_1++;
                break;
            case 2:
                this.score.wins.player_2++;
                break;
            default:
                console.error('There was an error updating the score!');
        }
    }

    printScore(): void {
        this.drawsCount.textContent = this.score.draws.toString();
        this.player1WinsCount.textContent = this.score.wins.player_1.toString();
        this.player2WinsCount.textContent = this.score.wins.player_2.toString();
    }

    clearScore(): void {
        localStorage.removeItem('tictactoe');
        this.score = {wins: {player_1: 0, player_2: 0}, draws: 0};
        this.printScore();
    }

    printGameInfo(message: string): void {
        this.gameInfo.textContent = message;
    }

    toggleAnimate(): void {
        this.gameInfo.classList.toggle('animate');
    }
}

export default Panel;
