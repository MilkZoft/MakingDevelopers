// Dependencies
import React, { Component, PropTypes } from 'react';

export default class Html extends Component {
  static propTypes = {
    appCssFilename: PropTypes.string,
    baseUrl: PropTypes.string.isRequired,
    bodyHtml: PropTypes.string.isRequired,
    helmet: PropTypes.object.isRequired
  };

  render() {
    const { appCssFilename, bodyHtml, helmet, baseUrl } = this.props;
    const linkStyles = appCssFilename && <link href={appCssFilename} rel="stylesheet" />;

    return (
      <html>
        <head>
          <base href={baseUrl} />
          <link href="images/favicon.png" rel="icon" type="image/png" />
          {helmet.base.toComponent()}
          {helmet.link.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.script.toComponent()}
          {helmet.title.toComponent()}
          {linkStyles}
        </head>
        <body dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </html>
    );
  }
}
