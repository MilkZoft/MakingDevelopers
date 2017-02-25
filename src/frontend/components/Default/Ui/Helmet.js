// Dependencies
import React, { PropTypes } from 'react';

// Configuration
import { $app } from '../../../../lib/config';

// Utils
import { removeHTML } from '../../../../lib/utils/string';

class Helmet extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    meta: PropTypes.array
  }

  componentDidMount() {
    const { title, meta } = this.props;

    // Updating the title
    document.title = `${$app().mainTitle} - ${title}`;

    // Updating metatags
    meta.forEach(meta => {
      let metaTag = document.head.querySelector(`[name="${meta.name}"]`);

      if (metaTag) {
        metaTag.setAttribute('content', removeHTML(meta.content));
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', meta.name);
        metaTag.setAttribute('content', meta.content);

        document.head.appendChild(metaTag);
      }
    });
  }

  render() {
    return null;
  }
}

export default Helmet;
