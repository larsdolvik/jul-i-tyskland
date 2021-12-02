import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {

  render() {
    const { handleClick } = this.props;
    return (
     <div className="modal__container">
         <p>Hohoho, det var vel lidt tidlig!</p>
         <button className="modal__button" onClick={handleClick}>
            Unnskyld
          </button>
     </div>
    );
  }
}

export default Modal;

