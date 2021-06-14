import React from 'react';
import Helmet from 'react-helmet';

const Article1 = () => {
  return (
    <>
      <Helmet>
        <title>Blog article 1 page</title>
        <meta name="description" content="Blog article 1 page" />
        <meta name="robots" content="INDEX,FOLLOW" />
      </Helmet>
      <h2>Blog article 1 page</h2>
    </>
  )
}

export default Article1;
