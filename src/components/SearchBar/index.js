import React, { Component } from 'react';
import { InputItem } from 'antd-mobile';
import debounce from 'lodash/debounce';
import 'antd-mobile/dist/antd-mobile.css';
import './index.less';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onDebouceSearch = debounce(this.onDebouceSearch, 300);
  }
  static defaultProps = {
    placeholder: '请输入',
  };

  onInputHandle = (val) => {
    this.props.onSearch && this.props.onSearch(val);
    this.setState(
      {
        value: val,
      },
      () => {
        this.onDebouceSearch(val);
      },
    );
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.value != this.state.value) {
      this.setState({ value: this.props.value });
      this.onInputHandle(this.props.value);
    }
  }
  onDebouceSearch = (val) => {
    this.props.onSearch && this.props.onSearch(val);
  };

  render() {
    const { placeholder, onFocus, onVirtualKeyboardConfirm } = this.props;
    const { value } = this.state;
    return (
      <div className="fpi_searchbar">
        <InputItem
          className="input"
          type="text"
          onFocus={() => onFocus && onFocus()}
          onChange={this.onInputHandle}
          value={value}
          placeholder={placeholder}
          onVirtualKeyboardConfirm={() =>
            onVirtualKeyboardConfirm && onVirtualKeyboardConfirm()
          }
        />
      </div>
    );
  }
}
