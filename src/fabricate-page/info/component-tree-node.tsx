import {
  Attributes,
  createElement,
  FunctionComponent,
  ReactElement,
} from "react";

export default class ComponentTreeNode {
  private key: string;
  private element: JSX.Element | null;
  private parent: ComponentTreeNode | null;
  private children: ComponentTreeNode[];
  private depth: number;
  private type: FunctionComponent;
  private attributes: { [key: string]: unknown } = {
    style: {
      // Transform
      position: "absolute",
      // "{*ElementId} {left, center, right} {top, center, bottom}"
      // ex) If pivot is "panel1 right top",
      // this element will adjust its coordinates to panel1's top-right corner.
      // If 2nd, 3rd param don't exist, {left} {top} will be default option.
      pivot: "",
      left: "0px",
      top: "0px",
      width: "0px",
      height: "0px",
    },
  };

  constructor(
    key: string,
    parent: ComponentTreeNode | null = null,
    children: ComponentTreeNode[] = [],
    depth: number = 0,
    type: FunctionComponent,
    attributes: { [key: string]: unknown }
  ) {
    this.key = key;
    this.element = null;
    this.parent = parent;
    this.children = children;
    this.depth = depth;
    this.type = type;
    this.attributes = attributes;
  }

  // Key
  getKey() {
    return this.key;
  }

  setKey(value: string) {
    this.key = value;
  }

  // Parent
  getParent() {
    return this.parent;
  }

  setParent(value: ComponentTreeNode | null = null) {
    this.parent = value;
  }

  // Children
  getChild(key: string) {
    for (const child of this.children) {
      if (child.getKey() === key) {
        return child;
      }
    }
    return null;
  }

  searchChild(name: string): ComponentTreeNode | null {
    for (const child of this.children) {
      if (child.getKey() === name) {
        return child;
      }

      const ch = child.searchChild(name);
      if (ch) {
        return ch;
      }
    }
    return null;
  }

  appendChild(value: ComponentTreeNode) {
    this.children.push(value);
  }

  getChildren() {
    return this.children;
  }

  deleteChild(key: string) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].getKey() === key) {
        this.deleteChild(this.children[i].getKey());
        this.children.splice(i, 1);
      }
    }
  }

  // Depth
  getDepth() {
    return this.depth;
  }

  setDepth(depth: number) {
    this.depth = depth;
  }

  // Style
  getStyleOption(key: string): string {
    const style = this.attributes["style"] as { [key: string]: unknown };
    return style[key] as string;
  }

  updateStyleOption<K extends keyof CSSStyleDeclaration>(
    styleKey: K,
    value: CSSStyleDeclaration[K]
  ) {
    if (this.element) {
      const styleOption = this.attributes["style"] as {
        [key: string]: unknown;
      };
      const oldVal = styleOption[styleKey as string];
      styleOption[styleKey as string] = value;

      const htmlElement = document.getElementById(this.key);
      if (htmlElement) {
        htmlElement.style[styleKey] = value;
      }

      return oldVal;
    }
    return null;
  }

  // Return tree
  createReactElementTree(): ReactElement[] {
    const elems = [];

    for (const child of this.children) {
      const childTree = child.createReactElementTree();

      child.element = createElement(
        child.type,
        {
          key: child.getKey(),
          compKey: child.getKey(),
          ...child.attributes,
        } as Attributes,
        ...childTree
      ) as ReactElement;
      elems.push(child.element);
    }
    return elems;
  }

  createHierarchyTreeComponent(): ComponentTreeNode[] {
    const elems = [];

    elems.push(this);
    for (const child of this.children) {
      elems.push(...child.createHierarchyTreeComponent());
    }

    return elems;
  }
}
