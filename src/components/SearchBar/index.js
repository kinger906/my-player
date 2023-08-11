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
    this.onDebouceSearch = debounce(this.onDebouceSearch, 500);
  }
  static defaultProps = {
    placeholder: '请输入',
  };

  onDebouceSearch = (val) => {
    this.props.onSearch && this.props.onSearch(val);
  };

  render() {
    const { placeholder, onFocus, onVirtualKeyboardConfirm } = this.props;
    return (
      <div className="fpi_searchbar">
        <InputItem
          className="input"
          type="text"
          onFocus={() => onFocus && onFocus()}
          onChange={this.onDebouceSearch}
          placeholder={placeholder}
          onVirtualKeyboardConfirm={() =>
            onVirtualKeyboardConfirm && onVirtualKeyboardConfirm()
          }
        />
      </div>
    );
  }
}
