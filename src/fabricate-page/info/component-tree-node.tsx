import React, { createElement, FunctionComponent, ReactElement } from "react";

export default class ComponentTreeNode {
  private key: string;
  private parent: ComponentTreeNode | null;
  private children: ComponentTreeNode[];
  private depth: number;
  private elementInfo: { [key: string]: unknown };
  private element: React.ReactElement | HTMLElement | null = null;

  constructor(
    key: string,
    parent: ComponentTreeNode | null = null,
    children: ComponentTreeNode[] = [],
    depth: number = 0,
    elementInfo: { [key: string]: unknown }
  ) {
    this.key = key;
    this.parent = parent;
    this.children = children;
    this.depth = depth;
    this.elementInfo = elementInfo;
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

  // Element
  getElement() {
    return this.element;
  }

  setElement(value: React.ReactElement | HTMLElement) {
    this.element = value;
  }

  // StyledOption
  getStyleOption(key: string) {
    const styleOption = (
      this.elementInfo["props"] as { [key: string]: unknown }
    )["style"] as { [key: string]: string };

    return styleOption[key];
  }

  // return react element
  createReactElementTree(): ReactElement {
    const elems = [];

    for (const child of this.children) {
      const childTree = child.createReactElementTree();
      const elem = createElement(
        child.elementInfo["type"] as FunctionComponent,
        {
          key: child.getKey(),
          compKey: child.getKey(),
          ...(child.elementInfo["props"] as { [key: string]: unknown }),
        } as React.Attributes,
        childTree
      ) as React.ReactElement;
      child.setElement(elem);
      elems.push(elem);
    }

    return <>{elems}</>;
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
