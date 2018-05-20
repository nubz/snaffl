import React from 'react'
import DeckMenu from '../ui/DeckMenu'
import query from '/imports/api/decks/deckMenuQuery.js';
import {withQuery} from 'meteor/cultofcoders:grapher-react';

export default withQuery((props) => {
    console.log('deckMenu props', props)
    return query.clone({...props})
}, {reactive: true})(DeckMenu)