import React, { Component } from 'react';
import { ConditionallyRender } from 'react-util-kit';
import { FadeIn } from 'react-anim-kit';

import CalendarDay from './CalendarDay/CalendarDay';
import CalendarDayDetail from './CalendarDayDetail/CalendarDayDetail';

import './App.css';

import data from './data/data.json';
import BackgroundAnimation from './BackgroundAnimation/index';

class App extends Component {
  state = {
    opened: [],
    activeDay: null
  };

  componentDidMount() {
    window.addEventListener('popstate', this.handleBack);

    const opened = this.getItemFromLocalStorage('opened');

    setTimeout(() => {
      if (opened && opened.length > 0) {
        this.setState({ opened });
      }

      if (window.location.hash !== '') {
        this.setAppState();
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handleBack);
  }

  handleBack = () => {
    this.resetActiveDay();
    window.history.replaceState({}, '', data.appPath);
  };

  setActiveDay = activeDay => {
    const { opened } = this.state;

    const inArray = opened.includes(activeDay.id);
    if (!inArray) opened.push(activeDay.id);

    this.setState({ activeDay, opened }, this.saveStateToLocalStorage);
  };

  setAppState = () => {
    const id = this.getId();
    const activeDay = data.calendar.find(item => item.id === id);
    if (activeDay) {
      this.setState({ activeDay });
    }
  };

  getId = () => {
    return Number(window.location.hash.match(/\d/gi).join(''));
  };

  saveStateToLocalStorage = () => {
    const { opened } = this.state;
    if (localStorage) {
      localStorage.setItem('opened', JSON.stringify(opened));
    }
  };

  getItemFromLocalStorage = key => {
    if (localStorage) {
      const item = localStorage.getItem(key);

      return JSON.parse(item);
    }
  };

  resetActiveDay = () => this.setState({ activeDay: null });

  renderDays = () => {
    return data.calendar.map(item => {
      return (
        <CalendarDay
          key={item.id}
          {...item}
          setActiveDay={this.setActiveDay}
          opened={this.state.opened}
        />
      );
    });
  };

  render() {
    const { activeDay } = this.state;
    return (
      <div className="App">
        <BackgroundAnimation numFactor={1} />
        <ConditionallyRender
          ifTrue={!activeDay}
          show={
            <FadeIn left by={300} delayBy={0.1}>
              <div className="app-container">
                {/* <img src={olaf} alt="olaf" className="app-image-left" /> */}
                {this.renderDays()}
                {/* <img src={mikke} alt="olaf" className="app-image-right" /> */}
                {/* <div className="app-bottom-image__container">
                  <img src={sled} alt="santas sled" className="app-image-bottom" />
                </div>
                <p className="app-made-with__paragraph">
                  Made with <img src={heartIcon} alt="heart" />
                </p> */}
              </div>
            </FadeIn>
          }
          elseShow={
            <CalendarDayDetail {...this.state.activeDay} resetActiveDay={this.resetActiveDay} />
          }
        />
      </div>
    );
  }
}

export default App;
