interface UIElementInterface {
    hostElement: HTMLElement;
    templateElement: HTMLTemplateElement;
    element: HTMLElement;
    renderElement(): void;
}

abstract class UIElement implements UIElementInterface {
    hostElement: HTMLElement;
    templateElement: HTMLTemplateElement;
    element: HTMLElement;

    constructor(hostElementID: string, templateID: string) {
        this.hostElement = document.getElementById(hostElementID)!;
        this.templateElement = document.getElementById(
            templateID,
        )! as HTMLTemplateElement;
        const importedNode = document.importNode(
            this.templateElement.content,
            true,
        );

        this.element = importedNode.firstElementChild as HTMLElement;

        this.renderElement();
    }

    renderElement(): void {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

export default UIElement;
