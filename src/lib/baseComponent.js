// Dependencies
import React from 'react';
import Component from 'react-pure-render/component';

export default function baseComponent(Wrapped) {
  class BaseComponent extends Component {
    componentDidMount() {
      const self = this;
      const componentName = Wrapped.prototype.constructor.name;

      this.el.addEventListener('click', (e) => {
        self.componentClicked(e.currentTarget.firstChild.className, componentName);
      });
    }

    render() {
      const self = this;

      return (
        <div
          ref={(el) => {
            self.el = el;
          }}
        >
          <Wrapped {...this.props} />
        </div>
      );
    }
  }

  return BaseComponent;
}
