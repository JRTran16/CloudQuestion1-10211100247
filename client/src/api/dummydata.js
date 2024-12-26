

const products = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dtkxmg1yk/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735073836/lynova/products/ruslan-bardash-4kTbAMRAHtQ-unsplash_mkgcgy.jpg", // Ergonomic Chair
      name: "Ergonomic Chair",
      shortDescr: "Comfortable chair for long working hours.",
      longDescr: "This ergonomic chair is designed for maximum comfort during extended periods of work or study. It features an adjustable backrest, breathable mesh, and lumbar support to promote good posture.",
      rating: 2.5,
      price: 2500,
      available: 20,
      reviews: [
        {
          user: "Alice",
          rating: 5,
          review: "Amazing chair! Super comfortable and worth the price."
        },
        {
          user: "Bob",
          rating: 4,
          review: "Good quality, but could use more cushioning."
        },
        {
          user: "Charlie",
          rating: 5,
          review: "Perfect for my home office. Highly recommend!"
        }
      ]
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dtkxmg1yk/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735073837/lynova/products/nadine-e-iCxPxfBlvlg-unsplash_nawshh.jpg", // Wireless Keyboard
      name: "Wireless Keyboard",
      shortDescr: "A sleek and modern wireless keyboard.",
      longDescr: "This wireless keyboard offers seamless connectivity and a comfortable typing experience. It has a rechargeable battery and is compatible with various devices, making it ideal for both work and leisure.",
      rating: 4.2,
      price: 1500,
      available: 35,
      reviews: [
        {
          user: "Diana",
          rating: 4,
          review: "Good keyboard, but the battery life could be better."
        },
        {
          user: "Edward",
          rating: 5,
          review: "Love the design and responsiveness. Perfect for daily use."
        },
        {
          user: "Fiona",
          rating: 4,
          review: "Great keyboard, but the keys are slightly noisy."
        }
      ]
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dtkxmg1yk/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735073838/lynova/products/andrea-natali-otjiUhq5Zcw-unsplash_1_uho9tg.jpg", // Smartwatch
      name: "Smartwatch",
      shortDescr: "Track your fitness and notifications with ease.",
      longDescr: "This smartwatch features a sleek design, fitness tracking capabilities, and notifications from your phone. It is water-resistant and has a long battery life, making it a perfect companion for your daily activities.",
      rating: 4.7,
      price: 4000,
      available: 15,
      reviews: [
        {
          user: "George",
          rating: 5,
          review: "Fantastic smartwatch with excellent features."
        },
        {
          user: "Hannah",
          rating: 4,
          review: "Great value for the price. The screen could be brighter."
        },
        {
          user: "Ian",
          rating: 5,
          review: "Love using it during workouts. Highly functional."
        }
      ]
    }
  ];
  

export {
    products
}