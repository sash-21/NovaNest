export const moneyEmojis = [
    "💵", // Dollar Banknote
    "💸", // Money with Wings
    "💰", // Money Bag
    "🪙", // Coin
    "🤑", // Money-Mouth Face
    "💲", // Heavy Dollar Sign
];

export const getRandomEmoji = () => {
    return moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)];
};