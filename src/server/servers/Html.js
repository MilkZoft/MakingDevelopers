import React, { Component, PropTypes } from 'react';

export default class Html extends Component {
  static propTypes = {
    appCssFilename: PropTypes.string,
    bodyHtml: PropTypes.string.isRequired,
    helmet: PropTypes.object.isRequired
  };

  render() {
    const { appCssFilename, bodyHtml, helmet } = this.props;
    const linkStyles = appCssFilename && <link href={appCssFilename} rel="stylesheet" />;

    return (
      <html>
        <head>
          {helmet.title.toComponent()}
          {helmet.base.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {helmet.script.toComponent()}
          {linkStyles}
        </head>
        <body dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </html>
    );
  }
}
