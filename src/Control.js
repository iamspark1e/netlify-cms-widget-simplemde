import PropTypes from 'prop-types';
import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default class Control extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mediaControlId: ""
    }
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
    onOpenMediaLibrary: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: '',
  }

  log = (msg) => {
    console.log(msg)
  }

  shouldComponentUpdate(nextProps) {
    /**
     * Always update if the value or getAsset changes.
     */
    let shouldUpdate = false
    if ((this.props.value !== nextProps.value && this.state.mediaControlId) || this.props.getAsset !== nextProps.getAsset) {
      shouldUpdate = true;
    }
    return shouldUpdate;
  }

  componentWillUpdate(nextProps, nextState) {
    let path = nextProps.mediaPaths.get(this.state.mediaControlId)
    if (path && nextState.mediaControlId !== "") {
      var filename = path.replace(/^.*[\\\/]/, '').split('.')[0]
      nextProps.onChange(nextProps.value + `![${filename || ""}](${path})`)
      this.setState({
        mediaControlId: ""
      })
    }
  }

  handleAppendImage = () => {
    let newId = Date.now()
    this.setState({
      mediaControlId: newId,
    }, () => {
      this.props.onOpenMediaLibrary({
        controlID: newId,
        value: this.props.value,
        multiple: false
      })
    })
  }

  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
    } = this.props;

    const imageGallery = {
      name: "image-gallery",
      action: this.handleAppendImage,
      // text: "Gallery",
      title: "Open Media Gallery",
      className: "fa fa-camera-retro"
    }

    const oldToolbar = [
      'bold',
      'italic',
      "heading",
      "|", // Separator
      "quote",
      'unordered-list',
      'ordered-list',
      "|", // Separator
      'link',
      'image', // keep normal image quick tool
      imageGallery,
      // 'preview', // preview is not needed in Netlify CMS
      // 'side-by-side',
      // 'fullscreen',
      "|", // Separator
      'guide'
    ]

    return (
      <div>
        <SimpleMDE
          id={forID}
          className={classNameWrapper}
          value={value || ''}
          options={{
            toolbar: oldToolbar
          }}
          onChange={(val) => {
            onChange(val);
          }} />
      </div>
    );
  }
}