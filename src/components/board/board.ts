import Figure from '../figure/figure';
import UIElement from '../uiElement/uiElement';

class Board extends UIElement {
    cross: Figure;
    circle: Figure;
    state: number[][];
    movesCount: number;

    constructor() {
        super('app', 'board');

        this.cross = new Figure('cross');
        this.circle = new Figure('circle');
        this.state = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        this.movesCount = 0;
    }

    renderFigure(target: HTMLDivElement, currentPlayer: number): void {
        if (currentPlayer === 1) this.cross.render(target);
        else this.circle.render(target);
    }

    updateState(target: HTMLDivElement, currentPlayer: number): void {
        const row = parseInt(target.dataset.row!);
        const column = parseInt(target.dataset.column!);

        if (currentPlayer === 1) this.state[row][column] = 1;
        else this.state[row][column] = 10;
    }

    clear(): void {
        this.state = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];

        this.movesCount = 0;

        const fields = this.element.querySelectorAll('.field');
        fields.forEach((field: HTMLDivElement) => {
            field.innerHTML = '';
        });
    }

    disable(): void {
        this.element.classList.add('disabled');
    }

    enable(): void {
        this.element.classList.remove('disabled');
    }

    checkWin(): number | void {
        // check rows
        for (let i = 0; i < this.state.length; i++) {
            const sum = this.state[i].reduce(
                (prev: number, curr: number) => prev + curr,
            );

            if (sum === 3) console.log('1');
            if (sum === 30) console.log('2');
            if (sum === 3) return 1;
            if (sum === 30) return 2;
        }

        // check columns
        for (let i = 0; i < this.state.length; i++) {
            const cols = [this.state[0][i], this.state[1][i], this.state[2][i]];

            const sum = cols.reduce(
                (prev: number, curr: number) => prev + curr,
            );

            if (sum === 3) console.log('1');
            if (sum === 30) console.log('2');
            if (sum === 3) return 1;
            if (sum === 30) return 2;
        }

        // check diagonal
        {
            const diag: number[] = [];

            for (let i = 0; i < this.state.length; i++) {
                diag.push(this.state[i][i]);
            }

            const sum = diag.reduce(
                (prev: number, curr: number) => prev + curr,
            );

            if (sum === 3) console.log('1');
            if (sum === 30) console.log('2');
            if (sum === 3) return 1;
            if (sum === 30) return 2;
        }

        // check antidiagonal
        {
            const antidiag: number[] = [];
            let startCol = 2;

            for (let i = 0; i < this.state.length; i++) {
                antidiag.push(this.state[i][startCol--]);
            }

            const sum = antidiag.reduce(
                (prev: number, curr: number) => prev + curr,
            );

            if (sum === 3) console.log('1');
            if (sum === 30) console.log('2');
            if (sum === 3) return 1;
            if (sum === 30) return 2;
        }

        this.updateMovesCount();

        if (this.movesCount === 9) {
            return -1;
        }
    }

    updateMovesCount(): void {
        this.movesCount++;
    }
}

export default Board;
