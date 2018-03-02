import React, { Component } from 'react';
import { EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil, convertFromRaw, convertToRaw } from 'draft-js'
import Editor, { createWithContent, composeDecorators } from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createVideoPlugin from 'draft-js-video-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';

import createToolbarPlugin, { Separator } from 'last-draft-js-toolbar-plugin'

import {
  AddColorButton,
  AddEmbedButton,
  AddEmojiButton,
  AddGifButton,
  AddImageButton,
  AddLinkButton
} from 'draft-js-buttons-plugin'
import {
  ColorModal,
  EmbedModal,
  GifModal,
  LinkModal
} from 'draft-js-modal-plugin'
import PropTypes from 'prop-types'
import createEmbedPlugin from 'draft-js-embed-plugin'
import createLinkPlugin from 'draft-js-link-plugin'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'
import createDndPlugin from 'draft-js-drag-n-drop-plugin'
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import {colorStyleMap} from 'draft-js-color-picker-plugin'
import createSidebarPlugin from 'last-draft-js-sidebar-plugin'
import { fromJS } from 'immutable';

class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => // eslint-disable-next-line
          <Button key={i} {...this.props} />
        )}
      </div>
    );
  }
}

class HeadlinesButton extends Component {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className='headlineButtonWrapper'>
        <button onClick={this.onClick} className='headlineButton'>
          H
        </button>
      </div>
    );
  }
}

const toolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    CodeButton,
    Separator,
    AddEmbedButton,
    AddImageButton,
    AddLinkButton,
    Separator,
    HeadlinesButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
  ]
});
const { Toolbar } = toolbarPlugin;

const videoPlugin = createVideoPlugin();
const linkPlugin = createLinkPlugin()
const embedPlugin = createEmbedPlugin()
const focusPlugin = createFocusPlugin()
const resizeablePlugin = createResizeablePlugin()
const dndPlugin = createDndPlugin()
const alignmentPlugin = createAlignmentPlugin()
const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const { AlignmentTool } = alignmentPlugin
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  dndPlugin.decorator
)

const linkifyPlugin = createLinkifyPlugin();
const imagePlugin = createImagePlugin({ decorator })

const plugins = [ColorModal, EmbedModal, GifModal, LinkModal, toolbarPlugin, focusPlugin, resizeablePlugin, dndPlugin, alignmentPlugin, mentionPlugin, linkifyPlugin, imagePlugin, embedPlugin, linkPlugin, videoPlugin];
const text = 'This is some test text'

class TextEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {editorState: this.props.content, suggestions: props.mentions || fromJS([])};

    this.onChange = (editorState) => {this.setState({editorState}); this.props.onChange(editorState)};
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.keyBindings = this.props.keyBindings || []
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  handleReturn (event) {
    if (!event.shiftKey) { return false }
    const newState = RichUtils.insertSoftNewline(this.props.editorState)
    this.props.onChange(newState)
    return true
  }

  focus = () => {
    this.editor.focus()
  }

 onSearchChange = ({ value }) => {
    if (this.props.mentionSearchAsync !== undefined) {
      /* async */
      this.props.mentionSearchAsync(value)
      .then((data) => { this.setState({suggestions: fromJS(data.suggestions)}) })
    } else {
      /* static list of users */
      this.setState({
        suggestions: defaultSuggestionsFilter(value, this.props.mentions),
      })
    }
  }

  render() {
    return (
      <div>
        <div className='editor'>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            customStyleMap={colorStyleMap}
            handleKeyCommand={this.handleKeyCommand}
            handleReturn={this.handleReturn}
            ref={(element) => { this.editor = element }}
          />
          <Toolbar />
          <AlignmentTool />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            onClose={() => this.setState({suggestions: fromJS([])})}
          />
        </div>
      </div>
    );
  }

}

TextEditor.propTypes = {
  content: PropTypes.object,
  onChange: PropTypes.func
}

export default TextEditor