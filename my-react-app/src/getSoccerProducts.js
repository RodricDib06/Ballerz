function getSoccerProducts() {
  return [
    {
      id: 1,
      name: 'Pro Soccer Ball',
      image: require('./Assets/soccer-ball.png'),
      price: 44.99,
      description: 'High-quality soccer ball for professional and recreational play.',
      category: 'Balls',
      sport: 'Soccer'
    },
    {
      id: 2,
      name: 'Shin Guards',
      image: require('./Assets/soccer-shin-guards.jpg'),
      price: 19.99,
      description: 'Lightweight shin guards for optimal protection during matches.',
      category: 'General Equipment',
      sport: 'Soccer'
    },
    {
      id: 3,
      name: 'Soccer Cleats',
      image: require('./Assets/soccer-cleats.jpg'),
      price: 189.99,
      description: 'Performance-driven soccer cleats for speed and control.',
      category: 'Shoes',
      sport: 'Soccer'
    },
    {
      id: 4,
      name: 'Goalkeeper Gloves',
      image: require('./Assets/soccer-goalkeeper-gloves.jpg'),
      price: 34.99,
      description: 'Grip-enhanced goalkeeper gloves for superior ball handling.',
      category: 'General Equipment',
      sport: 'Soccer'
    },
    {
      id: 5,
      name: 'Soccer Jersey',
      image: require('./Assets/soccer-jersey.jpg'),
      price: 59.99,
      description: 'Breathable soccer jersey designed for comfort and style.',
      category: 'General Equipment',
      sport: 'Soccer'
    },
    {
      id: 6,
      name: 'Portable Goal',
      image: require('./Assets/soccer-goal.jpg'),
      price: 249.99,
      description: 'Portable soccer goal for backyard practice and small-sided games.',
      category: 'Miscellaneous',
      sport: 'Soccer'
    }
  ];
}

export default getSoccerProducts;