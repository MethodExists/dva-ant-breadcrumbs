import React, {Component} from 'react';
import './styles.less';
import './styles.css';

export default class extends Component {
  render() {
    return (
      <div>
        <div className='styleLess'>Style from less</div>
        <div className='styleCss'>Style from css</div>
      </div>
    );
  }
}
