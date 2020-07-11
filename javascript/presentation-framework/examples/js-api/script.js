const data = [
  {
    title: 'Slide 1',
    content: 'This is the content for my first slide',
  },
  [
    {
      title: 'Slide 2.1',
      content: 'This is the content for my 2.1 slide',
    },
    {
      title: 'Slide 2.2',
      content: 'This is the content for my 2.2 slide',
    },
  ],
];

const slide = new Swift({
  selector: '#js-api',
  data: data,
  allowDarkTheme: true,
  slideNumbers: true,
  zoomedOutView: true,
});

slide.init();
