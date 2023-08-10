import { Component } from "./component";

const sleep = (x: number) => new Promise((r) => setTimeout(r, x));

describe("Component", () => {
  let el: HTMLDivElement;
  beforeEach(() => {
    el = document.createElement("div");
  });
  it("is a class", () => {
    class TestComponent extends Component {
      render() {
        return `<h1>${this.el.innerHTML}</h1>`;
      }
    }
    expect(Component).toBeInstanceOf(Function);
    expect(new TestComponent(el)).toBeInstanceOf(Component);
  });
  it("renders", async () => {
    const text = "Hello";
    class TestComponent extends Component {
      render() {
        return `<h1>${this.state.text}</h1>`;
      }
    }

    new TestComponent(el, { text });

    await sleep(0);

    expect(el.innerHTML).toBe(`<h1>${text}</h1>`);
  });

  it("updates component view", async () => {
    const a = "Hello";
    const b = "world";
    class TestComponent extends Component {
      render(): string {
        return `${JSON.stringify(this.state)}`;
      }
    }
    const item = new TestComponent(el, { a, a1: b });
    await sleep(0);
    expect(el.innerHTML).toBe(`${JSON.stringify({ a, a1: b })}`);
    const c = "123";
    item.setState({ a1: c });
    expect(el.innerHTML).toBe(`${JSON.stringify({ a, a1: c })}`);
  });
});
