import React, { Component } from 'react';
import './CalendarDay.css';

import heartIcon from '../images/icons/heart.svg';

class CalendarDay extends Component {
  handleClick = () => {
    const { setActiveDay, id, mainImage, secImage, secondaryImage, text1, text2, videoLeft, videoRight, isReady, isOpened } = this.props;
    const today = new Date().getDate()
    if(id <= today) {
      if(!isOpened){
        window.history.pushState({}, '', `#luke${id}`);
        setActiveDay({ id, mainImage, secImage, secondaryImage, text1, text2, videoLeft, videoRight });
      }
    } else {
      isReady();
    }
  };

  render() {
    const { opened, id } = this.props;
    const isOpened = opened.includes(id);

    const openedClass = isOpened ? 'calendar-day--opened' : '';

    return (
      <button className={`calendar-day ${openedClass}`} onClick={this.handleClick} type="button">
        {!isOpened && this.props.id}
        {isOpened && <img src={heartIcon} alt="heart" className="calendar-day-heart" />}
      </button>
    );
  }
}

export default CalendarDay;

