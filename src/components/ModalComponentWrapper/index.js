import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";

export default class ModalComponentWrapper extends Component {
  render() {
    return createPortal(
      <Fragment>{this.props.children}</Fragment>,
      document.getElementById("modal_root")
    );
  }
}
