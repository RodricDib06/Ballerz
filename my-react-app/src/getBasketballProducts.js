// getbasketballProducts.js

function getBasketballProducts() {
  return [
    {
      id: 1,
      name: 'Pro Basketball',
      image: require('./Assets/basket-ball.png'),
      price: 49.99,
      description: 'High-quality leather basketball suitable for indoor and outdoor play.',
    },
    {
      id: 2,
      name: 'Arm Sleeve',
      image: require('./Assets/armsleeve.png'),
      price: 14.99,
      description: 'Compression arm sleeve for better blood circulation and style on court.',
    },
    {
      id: 3,
      name: 'Basketball Shoes',
      image: require('./Assets/basketballshoes.png'),
      price: 199.99,
      description: 'Durable basketball shoes designed for performance and comfort.',
    },
    {
      id: 4,
      name: 'Headband',
      image: require('./Assets/headband.png'),
      price: 19.99,
      description: 'Moisture-wicking headband to keep sweat out of your eyes during the game.',
    },
    {
      id: 5,
      name: 'Basketball Shorts',
      image: require('./Assets/shorts.png'),
      price: 24.99,
      description: 'Lightweight, breathable basketball shorts with excellent mobility.',
    },
    {
      id: 6,
      name: 'Portable Hoop',
      image: require('./Assets/hoop.jpg'),
      price: 1299.99,
      description: 'Adjustable portable hoop perfect for backyard practice and drills.',
    }
  ];
}

export default getBasketballProducts;
