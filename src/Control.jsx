import PropTypes from 'prop-types';
import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default class Control extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mediaControlId: "",
      insertPos: null,
      editor: null
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
      this.insertCustomMark(this.state.insertPos, `![${filename || ""}](${path})`)
    }
  }

  insertCustomMark = (pos, mark) => {
    if(!this.state.editor || !pos) return;
    this.state.editor.setSelection(pos, pos)
    this.state.editor.replaceSelection(mark)

    this.setState({
      editor: this.state.editor,
      mediaControlId: "",
      insertPos: null
    })
  }

  handleAppendImage = (editor) => {
    let cm = editor.codemirror
    let pos = cm.getCursor()
    let newId = Date.now()
    this.setState({
      mediaControlId: newId,
      insertPos: pos,
      editor: cm
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
      '|',
      // 'preview', // preview is not needed in Netlify CMS
      // 'side-by-side',
      // 'fullscreen',
      'code',
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