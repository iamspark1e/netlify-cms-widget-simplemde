import PropTypes from 'prop-types';
import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { nanoid } from 'nanoid';

export default class Control extends React.Component {
  constructor(props) {
    super(props)
    let id = nanoid();
    this.controlID = id;
    this.state = {
      mediaValue: null,
    }
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
    onOpenMediaLibrary: PropTypes.func.isRequired,
    onAddAssets: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: '',
  }

  log = (msg) => {
    console.log(msg)
  }

  handleCustomMedia = () => {
    this.props.onOpenMediaLibrary({
      controlID: this.controlID,
      value: this.state.mediaValue
    })
  }

  shouldComponentUpdate(nextProps) {
    /**
     * Always update if the value or getAsset changes.
     */
    if (this.props.value !== nextProps.value || this.props.getAsset !== nextProps.getAsset) {
      return true;
    }

    /**
     * If there is a media path for this control in the state object, and that
     * path is different than the value in `nextProps`, update.
     */
    const mediaPath = nextProps.mediaPaths.get(this.controlID);
    if (mediaPath && nextProps.value !== mediaPath) {
      return true;
    }

    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps.mediaPaths.get(this.controlID))
  }

  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
    } = this.props;

    function handleAppendImage() {
      this.props.value += `![](/assets/test.png)`
    }

    return (
      <div>
        <button onClick={this.handleCustomMedia}>Open Media Gallery</button>
        <SimpleMDE 
        id={forID} 
        className={classNameWrapper} 
        value={value || ''} 
        options={{
          toolbar: [
            {
              name: "upload to media gallery",
              action: handleAppendImage,
              text: "Images",
              title: "Open Media Gallery"
            }
          ]
        }}
        onChange={(val) => {
          onChange(val);
        }} />
      </div>
    );
  }
}