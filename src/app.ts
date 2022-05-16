class ProjectInput {
  // Goal: Render form template

  templateEl: HTMLTemplateElement

  containerEl: HTMLDivElement

  form: HTMLFormElement

  titleInput: HTMLInputElement

  descriptionInput: HTMLInputElement

  peopleInput: HTMLInputElement

  constructor() {
    this.templateEl = document.getElementById(
      "project-input",
    )! as HTMLTemplateElement

    this.containerEl = document.getElementById("app")! as HTMLDivElement

    const importedNode = document.importNode(this.templateEl.content, true)
    this.form = importedNode.firstElementChild as HTMLFormElement
    this.form.id = "user-input"

    this.titleInput = this.form.querySelector("#title")!
    this.descriptionInput = this.form.querySelector("#description")!
    this.peopleInput = this.form.querySelector("#people")!

    this.configure()
    this.attach()
  }

  private attach() {
    this.containerEl.insertAdjacentElement("afterbegin", this.form)
  }

  private configure() {
    this.form.addEventListener("submit", this.submitHandler.bind(this))
  }

  private submitHandler(e: Event) {
    e.preventDefault()
    console.log(this.titleInput.value)
  }
}

const projectInput = new ProjectInput()
