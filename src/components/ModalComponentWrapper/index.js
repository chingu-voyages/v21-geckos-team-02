import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";

export default class ModalComponentWrapper extends Component {
  render() {
    return createPortal(
      <Fragment>{this.props.children}</Fragment>,
      document.getElementById("modal_root")
    );
  }
}
