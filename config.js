'use strict';

module.exports = {
  url: 'https://marclundgren.github.io/gatsby-starter-lumen/',
  pathPrefix: '/gatsby-starter-lumen',
  title: 'Blog by Marc Lundgren',
  subtitle: 'Developer, Hacker, Driving enthusiast',
  copyright: '© All rights reserved.',
  disqusShortname: '',
  postsPerPage: 4,
  googleAnalyticsId: '',
  menu: [
    {
      label: 'Articles',
      path: '/'
    },
    {
      label: 'About me',
      path: '/pages/about'
    },
    {
      label: 'Contact me',
      path: '/pages/contacts'
    }
  ],
  author: {
    name: 'Marc Lundgren',
    photo: '/photo.jpg',
    bio: 'I build Web applications, React Native, Node and anything else with JavaScript.',
    contacts: {
      email: 'marclundgren2.0@gmail.com',
      // telegram: '#',
      twitter: '@then_marc_says',
      github: 'marclundgren'
      // rss: '#',
      // vkontakte: '#'
    }
  }
};
