/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 1,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
    };
  }

  escapeRegExp = (string) => string.replace(/[^a-zA-Z-\-']/g, '');

  onChange = (e) => {
    const {
      escapeRegExp,
      props: { suggestions },
    } = this;
    // const { suggestions } = this.props;
    const userInput = escapeRegExp((e.target.value)).toLowerCase();
    const filteredSuggestions = suggestions
      .filter((s) => s.toLowerCase().includes(userInput));
    this.setState({
      activeSuggestion: 1,
      filteredSuggestions,
      showSuggestions: true,
      userInput,
    });
  }

  onClick = (e) => {
    this.setState({
      activeSuggestion: 1,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.target.innerText,
    });
  }

  onKeyDown = (e) => {
    const {
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
    } = this.state;
    const { keyCode } = e;
    let newActiveSuggestion;
    let newState;
    if (!showSuggestions) return;
    switch (keyCode) {
      case 13:
        // key return
        newState = {
          activeSuggestion: 1,
          showSuggestions: false,
          userInput: filteredSuggestions[activeSuggestion - 1],
        };
        break;
      case 38:
        // key up
        e.preventDefault();
        newActiveSuggestion = activeSuggestion === 1
          ? filteredSuggestions.length
          : activeSuggestion - 1;
        newState = {
          activeSuggestion: newActiveSuggestion,
          userInput: filteredSuggestions[newActiveSuggestion - 1],
        };
        break;
      case 40:
        // key down
        if (activeSuggestion === filteredSuggestions.length) {
          newActiveSuggestion = 1;
        } else {
          newActiveSuggestion = activeSuggestion >= filteredSuggestions.length - 1
            ? filteredSuggestions.length
            : activeSuggestion + 1;
        }
        newState = {
          activeSuggestion: newActiveSuggestion,
          userInput: filteredSuggestions[newActiveSuggestion - 1],
        };
        break;
      default:
        break;
    }
    this.setState({
      ...newState,
    });
  }

  renderSuggestionsList = () => {
    const {
      onClick,
      state: { filteredSuggestions, activeSuggestion },
    } = this;
    return (
      <ul>
        {
          filteredSuggestions
            .map((sug, index) => (
              <li
                className={`card card-sm card-body ${index === activeSuggestion - 1 ? 'item-style' : 'bg-primary'} border-light mb-0`}
                key={index}
                onClick={onClick}
              >
                {sug}
              </li>
            ))
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
    if (showSuggestions && userInput) {
      suggestionsListComponent = (filteredSuggestions.length > 0)
        ? (renderSuggestionsList())
        : (rednerEmptySuggestion());
    }
    const isShowSuggestions = userInput
      && userInput.length > 0
      && showSuggestions;
    return (
      <div className="container card bg-primary shadow-soft border-light px-4 py-5">
        <div className="main_title">
          <h1>React AutoComplete</h1>
        </div>
        <div className="wrap">
          <div className="content">
            <input
              type="text"
              className="form-control form-control-xl border-light"
              id="subscribeInputEmail"
              placeholder="pick a color :)"
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
