import React from 'react';
import Helmet from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About page</title>
        <meta name="description" content="about page" />
        <meta name="robots" content="INDEX,FOLLOW" />
      </Helmet>
      <h2>About page</h2>
    </>
  )
}

export default About;
