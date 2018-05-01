import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import IframeLoader from '../IFRAME'
import Paper from 'material-ui/Paper';

const floatingLabelStyle = {
  color: 'black',
  fontSize: 20,
  fontWeight: 700
}
const badUrl = function(url) {
  return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
};

const checkUrl = function(url) {
  let urlToUse = '';
  _.each(urlFormats, function (format) {
    if (format(url)) {
      urlToUse = format(url);
    }
  });
  return urlToUse;
}

const urlFormats = [
  function (url) {
    if (url.indexOf('https://s3-eu-west-1.amazonaws.com/nubz-snapcards/video') !== -1) {
      return url;
    }
    return false;
  },

  function (url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? 'https://www.youtube.com/embed/' + RegExp.$1 + '?rel=0' : false ;
  },

  function (url) {
    if (url.indexOf('vimeo.com') !== -1) {
      var parts = url.split('/');
      return 'https://player.vimeo.com/video/'+ parts[parts.length - 1] + '?badge=0';
    }
    return false;
  },

  function (url) {
    if (url.indexOf('soundcloud.com') !== -1) {
      return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) +'&format=json';
    }
    return false;
  },

  function (url) {
    if (url.indexOf('mixcloud.com') !== -1) {
      var parts = url.split('https://www.mixcloud.com');
      console.log('mixcloud parts', parts[1]);
      return 'https://www.mixcloud.com/widget/iframe/?feed=' + encodeURIComponent(parts[1]);
    }
    return false;
  }
];

const checkOEmbed = function (url) {
  if (url.indexOf('vimeo.com') !== -1) {
    return 'https://vimeo.com/api/oembed.json?url=' + encodeURIComponent(url);
  }

  if (url.indexOf('soundcloud.com') !== -1) {
    return 'https://soundcloud.com/oembed?url=' + encodeURIComponent(url) +'&format=json';
  }

  if (url.indexOf('mixcloud.com') !== -1) {
    return 'https://mixcloud.com/oembed/?url=' + encodeURIComponent(url) +'&format=json';
  }

  if (url.indexOf('scribd.com') !== -1) {
    return  'https://www.scribd.com/services/oembed/?url=' + encodeURIComponent(url) +'&format=json';
  }

  return url;
}

class EmbedEditor extends Component {

  constructor(props) {
    super(props);

    if (!props.card.content) {
      props.card.content = {Embed: {url: '', embedUrl: ''}}
    }

    const { Embed } = props.card.content
 
    this.state = {
      content: Embed
    }

  }

  handleInputChange = (event, index, value) => this.setState({'content': { ...this.state.content, [event.target.dataset.field] : event.target.value, 'url': checkUrl(event.target.value), 'oEmbed': checkOEmbed(event.target.value) } })

  render() {
    return (
      <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
        <h3 className="paperHead">Media url</h3>
        <TextField
          floatingLabelStyle={floatingLabelStyle}
          floatingLabelText={"Paste or enter an embed url"}
          floatingLabelFixed={true}
          id={"embedUrl"}
          data-field={"embedUrl"}
          onChange={this.handleInputChange.bind(this)}
          value={this.state.content.embedUrl}
        />
        { this.state.content.url !== '' ?
          (<IframeLoader src={this.state.content.url} width="100%" height="260"/>)
        : ''}
      </Paper>
    )
  }

}

EmbedEditor.propTypes = {
  card: PropTypes.object
}
 
export default EmbedEditor