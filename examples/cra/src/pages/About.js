import React from 'react';
import Helmet from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About page</title>
        <meta name="description" content="1,2,3,4 - aabout" />
        <meta name="robots" content="INDEX,FOLLOW" />
      </Helmet>
      <h2>About page here</h2>
    </>
  )
}

export default About;
