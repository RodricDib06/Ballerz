function getVolleyballProducts() {
  return [
    {
      id: 7,
      name: 'Pro Volleyball',
      image: require('./Assets/volleyball-item.jpg'),
      price: 39.99,
      description: 'High-quality volleyball for indoor and beach play.',
      category: 'Balls',
      sport: 'Volleyball'
    },
    {
      id: 8,
      name: 'Knee Pads',
      image: require('./Assets/volleyball-kneepads.jpg'),
      price: 29.99,
      description: 'Protective knee pads for safe dives and slides on the court.',
      category: 'General Equipment',
      sport: 'Volleyball'
    },
    {
      id: 9,
      name: 'Volleyball Shoes',
      image: require('./Assets/volleyballshoes.jpg'),
      price: 179.99,
      description: 'Lightweight volleyball shoes designed for agility and support.',
      category: 'Shoes',
      sport: 'Volleyball'
    },
    {
      id: 10,
      name: 'Wrist Support',
      image: require('./Assets/volleyball-wrist-support.jpg'),
      price: 14.99,
      description: 'Comfortable wrist support for powerful serves and blocks.',
      category: 'General Equipment',
      sport: 'Volleyball'
    },
    {
      id: 11,
      name: 'Volleyball Net',
      image: require('./Assets/volleyball-net.jpeg'),
      price: 599.99,
      description: 'Durable volleyball net suitable for professional and recreational play.',
      category: 'Miscellaneous',
      sport: 'Volleyball'
    },
    {
      id: 12,
      name: 'Ankle Brace',
      image: require('./Assets/volleyball-ankle-brace.jpg'),
      price: 24.99,
      description: 'Sturdy ankle brace for enhanced stability during intense matches.',
      category: 'General Equipment',
      sport: 'Volleyball'
    }
  ];
}

export default getVolleyballProducts;