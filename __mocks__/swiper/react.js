const React = require('react');

module.exports = {
  Swiper: ({ children }) => React.createElement('div', { className: 'swiper-mock' }, children),
  SwiperSlide: ({ children }) => React.createElement('div', { className: 'swiper-slide-mock' }, children),
};
