import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function Page({ children }) {
  return (
    <section className="page">
      <div className="page__inner" role="presentation">
        {children}
      </div>
    </section>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default withRouter(Page);
