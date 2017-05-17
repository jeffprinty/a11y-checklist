/* eslint react/no-find-dom-node: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { string, number, func, bool } from 'prop-types';

class Trinary extends React.Component {
  componentDidMount() {
    if (this.props.indeterminate === true) {
      this.setIndeterminate(true);
    }
  }

  componentDidUpdate(previousProps) {
    if (previousProps.indeterminate !== this.props.indeterminate) {
      this.setIndeterminate(this.props.indeterminate);
    }
  }

  setIndeterminate(indeterminate) {
    const node = ReactDOM.findDOMNode(this);
    node.indeterminate = indeterminate;
  }

  handleClick = () => {
    const { title } = this.props;
    this.props.onClick(title);
  }

  render() {
    const { title, index, onClick, ...props } = this.props;
    return (
      <input
        type="checkbox"
        id={ `checklist_${title}_${index}` }
        value={ `${title}_${index}` }
        onClick={ this.handleClick.bind(this) }
        onKeyUp={ this.handleClick.bind(this) }
        readOnly
        { ...props }
      />
    );
  }
}

Trinary.propTypes = {
  indeterminate: bool,
  title: string.isRequired,
  index: number.isRequired,
  onClick: func.isRequired
};

export default Trinary;
