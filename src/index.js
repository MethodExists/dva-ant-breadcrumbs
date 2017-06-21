import React, {Component} from 'react';
import './styles.less';

export default class extends Component {
  render() {
    return <div>
      <h2>Welcome to React components</h2>
      <div className="red">
        This is a styled text
      </div>
    </div>
  }
}
