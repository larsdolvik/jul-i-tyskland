import React, { Component } from 'react';
import { FadeIn } from 'react-anim-kit';

import giftIcon from '../images/icons/gift.svg';

import data from '../data/data.json';

import './CalendarDayDetail.css';

class CalendarDayDetail extends Component {
  handleClick = () => {
    const { resetActiveDay } = this.props;
    window.history.replaceState({}, '', data.appPath);
    resetActiveDay();
  };

  video = (videoLeft) => {
    if(videoLeft !== "") {
      return <iframe width="600" height="338" src={videoLeft} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  } else {
    return null;
  }
}

  mainImg = (mainImage) => {
    if(mainImage !== "") {
      return <img
        src={process.env.PUBLIC_URL + mainImage}
        alt="calendar"
        className="calendar-day-detail__main-image"
      />
    } else {
      return null;
    }
  }

  secImg = (secImage) => {
    if(secImage !== "") {
      return <img
        src={process.env.PUBLIC_URL + secImage}
        alt="calendar"
        className="calendar-day-detail__main-image"
      />
    } else {
      return null;
    }
  }

  rightMedia = (videoRight, secondaryImage, link, linkText) => {
    if (videoRight !== "") {
      return <iframe width="600" height="338" src={videoRight} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    } 
    if(secondaryImage !== "") {
      return <img
      src={secondaryImage}
      alt="calendar"
      className="calendar-day-detail__secondary-image"
    />
    } 
  }

  render() {
    const { id, mainImage, secImage, secondaryImage, text1, text2, videoLeft, videoRight, link, linkText } = this.props;
    return (
      <div className="calendar-day-detail__container">
        <FadeIn left by={300} delayBy={0.3}>
          <div className="calendar-day-detail__inner-container">
            <div className="calendar-day-detail__box">
              <div className="calendar-day-detail__left-container">
                <h1>Låge {id}</h1>
                {this.mainImg(mainImage)}
                {this.secImg(secImage)}
                {this.video(videoLeft)}
              </div>
              <div className="calendar-day-detail__right-container">
                <img src={giftIcon} alt="gift" className="calendar-day-detail__gift-icon" />
                <div className="calendar-detail__text">{text1}</div>
                <div className="calendar-detail__text">{text2}</div>
                <div className="calendar-detail__link"><a href={link}>{linkText}</a></div>
                {this.rightMedia(videoRight, secondaryImage)}
              </div>
            </div>
          </div>
          <button className="calendar-day-detail__button" onClick={this.handleClick}>
            Tilbage
          </button>
        </FadeIn>
      </div>
    );
  }
}

export default CalendarDayDetail;
