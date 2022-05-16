class ProjectInput {
  // Goal: Render form template

  templateEl: HTMLTemplateElement

  containerEl: HTMLDivElement

  element: HTMLFormElement

  constructor() {
    this.templateEl = document.getElementById(
      "project-input",
    )! as HTMLTemplateElement

    this.containerEl = document.getElementById("app")! as HTMLDivElement

    const importedNode = document.importNode(this.templateEl.content, true)
    this.element = importedNode.firstElementChild as HTMLFormElement

    this.attach()
  }

  private attach() {
    this.containerEl.insertAdjacentElement("afterbegin", this.element)
  }
}

const projectInput = new ProjectInput()
