function AutoBind(
  _: any,
  __: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  const originalMethod = descriptor.value

  return {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    },
  }
}

interface Validatable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

function validate(input: Validatable) {
  let isValid = true
  const { value } = input
  if (input.required) {
    isValid = isValid && !!value.toString().trim()
    console.log(isValid, "required")
  }
  if (input.maxLength != null && typeof value === "string") {
    isValid = isValid && value.length <= input.maxLength
    console.log(isValid, "maxLength")
  }
  if (input.minLength != null && typeof value === "string") {
    isValid = isValid && value.length >= input.minLength
    console.log(isValid, "minLength")
  }
  if (input.max != null && typeof value === "number") {
    isValid = isValid && +value <= input.max
    console.log(isValid, "max")
  }
  if (input.min != null && typeof value === "number") {
    isValid = isValid && +value >= input.min
    console.log(isValid, "min")
  }
  return isValid
}

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
    this.form.addEventListener("submit", this.submitHandler)
  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault()
    const userInput = this.gatherInput()
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput
      console.log(title, description, people)
    }

    this.clearInput()
  }

  private gatherInput(): [string, string, number] | void {
    const title = this.titleInput.value
    const description = this.descriptionInput.value
    const people = this.peopleInput.value

    const titleValidateConfig: Validatable = {
      value: title,
      required: true,
    }

    const descriptionValidateConfig: Validatable = {
      value: description,
      required: true,
      minLength: 5,
    }

    const peopleValidateConfig: Validatable = {
      value: people,
      required: true,
      min: 1,
      max: 5,
    }

    if (
      !validate(titleValidateConfig) ||
      !validate(descriptionValidateConfig) ||
      !validate(peopleValidateConfig)
    ) {
      alert("Invalid input")
    }
    return [title, description, +people]
  }

  private clearInput() {
    this.titleInput.value = ""
    this.descriptionInput.value = ""
    this.peopleInput.value = ""
  }
}

const projectInput = new ProjectInput()
