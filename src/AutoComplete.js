/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
    };
  }

  escapeRegExp = (string) => string.replace(/[^a-zA-Z-\-']/g, '');

  onChange = (e) => {
    const { escapeRegExp } = this;
    const { suggestions } = this.props;
    // console.log(escapeRegExp(e.target.value));
    const userInput = escapeRegExp((e.target.value)).toLowerCase();
    // console.log(userInput);
    const filteredSuggestions = suggestions
      .filter((s) => s.toLowerCase().includes(userInput));
    // console.log(filteredSuggestions);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput,
    });
  }

  onClick = (e) => {
    // console.log(e.target);
    // console.log(e.target.innerText);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.target.innerText,
    });
  }

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    const { keyCode } = e;
    // 13 return
    // 38 up
    // 40 down
    // console.log(filteredSuggestions, activeSuggestion);
    if (keyCode === 13) {
      // if (!this.userInput) return;
      this.setState((prevState) => (
        {
          ...prevState,
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: filteredSuggestions[activeSuggestion - 1],
        }
      ));
    } else if (keyCode === 38) {
      // console.log('up!!!');
      e.preventDefault();
      // if (activeSuggestion === 0) return;
      const newActiveSuggestion = activeSuggestion <= 0
        ? filteredSuggestions.length
        : activeSuggestion;
      this.setState((prevState) => (
        {
          ...prevState,
          activeSuggestion: newActiveSuggestion,
          userInput: filteredSuggestions[newActiveSuggestion - 1],
        }
      ));
    } else if (keyCode === 40) {
      // console.log('down!!!');
      let newActiveSuggestion;
      if (activeSuggestion === 0 || activeSuggestion === filteredSuggestions.length) {
        newActiveSuggestion = 1;
      } else {
        newActiveSuggestion = activeSuggestion >= filteredSuggestions.length - 1
          ? filteredSuggestions.length
          : activeSuggestion + 1;
      }
      this.setState((prevState) => (
        {
          ...prevState,
          activeSuggestion: newActiveSuggestion,
          userInput: filteredSuggestions[newActiveSuggestion - 1],
        }
      ));
    }
  }

  renderSuggestionsList = () => {
    const {
      onClick,
      state: { filteredSuggestions },
    } = this;
    return (
      <ul>
        {
          filteredSuggestions
            .map((sug, index) => (<li key={index} onClick={onClick}>{sug}</li>))
        }
      </ul>
    );
  }

  rednerEmptySuggestion = () => (
    <div className="no-suggestions">
      <em>No Suggestions!</em>
    </div>
  )

  render() {
    let suggestionsListComponent;
    const {
      onChange,
      onKeyDown,
      renderSuggestionsList,
      rednerEmptySuggestion,
      state: {
        showSuggestions,
        userInput,
        filteredSuggestions,
      },
    } = this;
    // console.log(userInput);
    console.log(filteredSuggestions);
    if (showSuggestions && userInput) {
      suggestionsListComponent = (filteredSuggestions.length > 0)
        ? (renderSuggestionsList(filteredSuggestions))
        : (rednerEmptySuggestion());
    }
    console.log(userInput);
    const isShowSuggestions = userInput && userInput.length > 0
      // && filteredSuggestions.length > 0
      && showSuggestions;
    return (
      <div className="container">
        <div className="main_title">
          <h1>React AutoComplete</h1>
        </div>
        <div className="wrap">
          <div className="content">
            <input
              type="text"
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
            />
          </div>
          {
            (isShowSuggestions) && (
              <div className="suggestions">
                {suggestionsListComponent}
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

AutoComplete.defaultProps = {
  suggestions: [],
};

AutoComplete.propTypes = {
  suggestions: PropTypes,
};

export default AutoComplete;
