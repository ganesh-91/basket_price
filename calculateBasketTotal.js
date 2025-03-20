function calculateBasketTotal(basket, prices) {
  const itemCounts = {};
  for (const item of basket) {
    itemCounts[item] = (itemCounts[item] || 0) + 1;
  }

  let total = 0;

  for (const item in itemCounts) {
    const count = itemCounts[item];
    const { price, offer } = prices[item.toLowerCase()];

    if (offer && offer.type === "buyXgetY") {
      const { buy, payFor } = offer.details;
      const groupSize = buy;
      const fullPriceGroups = Math.floor(count / groupSize);
      const remainingItems = count % groupSize;

      const offerCost = fullPriceGroups * payFor * price;

      const remainingCost = remainingItems * price;
      total += offerCost + remainingCost;
    } else {
      total += count * price;
    }
  }

  const rupee = Math.floor(total / 100);
  const pese = total % 100;
  return `Total: ${rupee} rupees and ${pese} paise`;
}

const basket = [
  "Apple",
  "Apple",
  "Banana",
  "Melon",
  "Melon",
  "Lime",
  "Lime",
  "Lime",
];
const prices = {
  apple: { price: 35 },
  banana: { price: 20 },
  melon: {
    price: 50,
    offer: {
      type: "buyXgetY", //buy one get one free
      details: { buy: 2, payFor: 1 },
    },
  },
  lime: {
    price: 15,
    offer: {
      type: "buyXgetY", //three for the price of two
      details: { buy: 3, payFor: 2 },
    },
  },
};

console.log(calculateBasketTotal(basket, prices));
