import PropTypes from 'prop-types';
import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default class Control extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
  }

  static defaultProps = {
    value: '',
  }

  log = (msg) => {
    console.log(msg)
  }

  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
    } = this.props;

    return (
      <SimpleMDE id={forID} className={classNameWrapper} value={value || ''} onChange={(val) => {
        onChange(val);
      }} />
    );
  }
}