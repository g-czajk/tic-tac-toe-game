type FigureType = 'cross' | 'circle';

interface FigureInterface {
    type: FigureType;
    figureHTML: string;
    render(target: HTMLDivElement): void;
}

class Figure implements FigureInterface {
    type: FigureType;
    figureHTML: string;

    constructor(type: FigureType) {
        this.type = type;

        if (this.type === 'cross') {
            this.figureHTML = `<svg height="100" width="100"><g><line x1="0" y1="0" x2="100" y2="100" style="stroke:#000; stroke-width:5" /><line x1="100" y1="0" x2="0" y2="100" style="stroke:#000; stroke-width:5" /></g></svg>`;
        } else {
            this.figureHTML = `<svg height="100" width="100"><circle cx="50" cy="50" r="47" stroke="#000" stroke-width="5" fill="none" /></svg>`;
        }
    }

    render(target: HTMLDivElement): void {
        target.innerHTML = this.figureHTML;
    }
}

export default Figure;
