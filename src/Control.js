import PropTypes from 'prop-types';
import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default class Control extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mediaControlIds: [],
      mediaChangesMark: false
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

  shouldComponentUpdate(nextProps) {
    /**
     * Always update if the value or getAsset changes.
     */
    // console.log(nextProps.value, this.props.value, nextProps.value === this.props.value)
    // return false;
    let shouldUpdate = false
    if (this.props.value !== nextProps.value || this.props.getAsset !== nextProps.getAsset) {
      if(this.state.mediaChangesMark) {
        return false;
      }
      shouldUpdate = true;
    }

    /**
     * If there is a media path for this control in the state object, and that
     * path is different than the value in `nextProps`, update.
     */
    if (this.state.mediaControlIds.length < 1) shouldUpdate = false;
    const mediaPath = nextProps.mediaPaths.get(this.state.mediaControlIds[this.state.mediaControlIds.length - 1]);
    if (mediaPath && nextProps.value !== mediaPath) {
      shouldUpdate = true;
    }
    return shouldUpdate;
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if(nextProps.mediaPaths.get(this.controlID)) {
  //     let path = nextProps.mediaPaths.get(this.controlID)
  //     setTimeout(() => {
  //       nextProps.onChange(nextProps.value + `![${name || ""}](${path})`)
  //     }, 200)
  //   }
  // }

  componentWillUpdate(nextProps, nextState) {
    let path = nextProps.mediaPaths.get(this.state.mediaControlIds[this.state.mediaControlIds.length - 1])
    if(path) {
      this.setState({
        mediaChangesMark: true,
        mediaControlIds: this.state.mediaControlIds
      }, () => {
        nextProps.onChange(nextProps.value + `![${name || ""}](${path})`)
        this.setState({
          mediaChangesMark: false,
          mediaControlIds: this.state.mediaControlIds
        })
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
      onOpenMediaLibrary
    } = this.props;

    const handleAppendImage = () => {
      let newId = Date.now()
      this.setState({
        mediaControlIds: this.state.mediaControlIds.concat(newId),
        mediaChangesMark: false
      }, () => {
        onOpenMediaLibrary({
          // controlID: this.state.mediaControlIds[this.state.mediaControlIds.length - 1],
          controlID: newId,
          value: this.props.value,
          multiple: false
        })
      })
    }

    const imageGallery = {
      name: "image-gallery",
      action: handleAppendImage,
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
      // 'image', // replaced
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