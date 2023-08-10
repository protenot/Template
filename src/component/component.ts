export class Component<State = Record<string, any>> {
  state: Partial<State> = {};

  el: HTMLElement;

  events: Record<string, (e: Event) => void> = {};
  constructor(el: HTMLElement, state?: Partial<State>) {
    this.el = el;
    this.state = state ?? {};

    setTimeout(() => {
      this.onMount();
    }, 0);
  }

  render() {
    return `${this.el.innerHTML}`;
  }

  onMount() {
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
  }
  setState(obj: Partial<State>) {
    this.state = { ...this.state, ...obj };
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
  }
  /* subscribeToEvents() {
    Object.entries(this.events).forEach(([key, value]) => {
      const eName = key.split("@").toString();
      const selector = key.split("@").splice(1, 1).toString();
      this.el.querySelector(selector)?.addEventListener(eName, value);
    });
  } */

  subscribeToEvents(): void {
    Object.keys(this.events).forEach((key: string) => {
      const [eventName, selector] = key.split("@");
      [...Array.from(this.el.querySelectorAll(`${selector}`))].forEach(
        (elem) => {
          elem.addEventListener(`${eventName}`, this.events[key]);
        },
      );
    });
  }
}
