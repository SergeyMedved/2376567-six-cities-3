type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type City = {
  name: string;
  location: Location;
};

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
  previewImage?: string;
};

export type Review = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

const cities: City[] = [
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
];

const TYPES = ['apartment'];
const GOODS = [
  'Heating', 'Wi-Fi', 'Washing machine', 'Towels',
  'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher',
  'Cabel TV', 'Fridge'
];
const TITLES = [
  'Beautiful & luxurious studio at great location',
  'Wood and stone place',
  'Canal View Prinsengracht',
  'Nice, cozy, warm big bed apartment',
  'White castle',
  'Loft Studio in the Central Area',
  'Penthouse, 4-5 rooms + 5 balconies',
  'The Pondhouse - A Magical Place'
];
const DESCRIPTIONS = [
  'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'An independent House, strategically located between Rembrand Square and National Opera.',
  'This is a place for dreamers to reset, reflect, and create.',
  'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
  'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house.'
];
const NAMES = ['Oliver Conner', 'Angelina', 'Max', 'Alex', 'Sophie', 'Maria'];
const AVATARS = ['-angelina', '-max'];
const REVIEW_COMMENTS = [
  'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'The building is green and from 18th century.',
  'Perfect location for walking tours and shopping.',
  'The host was very helpful and responsive to all our questions.',
  'Would definitely stay here again!'
];

function getRandomArrayItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomSubarray<T>(array: T[], maxLength: number): T[] {
  const length = Math.floor(Math.random() * maxLength) + 1;
  return [...array].sort(() => 0.5 - Math.random()).slice(0, length);
}

function generateMockData(count: number): Offer[] {
  const result: Offer[] = [];

  for (let i = 0; i < count; i++) {
    const city = getRandomArrayItem(cities);
    const type = getRandomArrayItem(TYPES);

    result.push({
      id: crypto.randomUUID(),
      title: getRandomArrayItem(TITLES),
      type,
      price: Math.floor(Math.random() * 200) + 30,
      city,
      location: {
        latitude: city.location.latitude + (Math.random() * 0.01 - 0.005),
        longitude: city.location.longitude + (Math.random() * 0.01 - 0.005),
        zoom: city.location.zoom
      },
      isFavorite: Math.random() > 0.7,
      isPremium: Math.random() > 0.8,
      rating: Number((Math.random() * 5).toFixed(1)),
      description: getRandomArrayItem(DESCRIPTIONS),
      bedrooms: Math.floor(Math.random() * 4) + 1,
      goods: getRandomSubarray(GOODS, GOODS.length),
      host: {
        name: getRandomArrayItem(NAMES),
        avatarUrl: `img/avatar${getRandomArrayItem(AVATARS)}.jpg`,
        isPro: Math.random() > 0.5
      },
      images: Array.from({ length: 6 }, () => `img/${type}-0${(i % 3) + 1}.jpg`),
      maxAdults: Math.floor(Math.random() * 4) + 1,
      previewImage: `img/${type}-01.jpg`
    });
  }

  return result;
}

export function generateMockOffer(id: string): Offer {
  const city = getRandomArrayItem(cities);
  const type = getRandomArrayItem(TYPES);

  return {
    id,
    title: getRandomArrayItem(TITLES),
    type,
    price: Math.floor(Math.random() * 200) + 30,
    city,
    location: {
      latitude: city.location.latitude + (Math.random() * 0.01 - 0.005),
      longitude: city.location.longitude + (Math.random() * 0.01 - 0.005),
      zoom: city.location.zoom
    },
    isFavorite: Math.random() > 0.7,
    isPremium: Math.random() > 0.8,
    rating: Number((Math.random() * 5).toFixed(1)),
    description: getRandomArrayItem(DESCRIPTIONS),
    bedrooms: Math.floor(Math.random() * 4) + 1,
    goods: getRandomSubarray(GOODS, GOODS.length),
    host: {
      name: getRandomArrayItem(NAMES),
      avatarUrl: `img/avatar${getRandomArrayItem(AVATARS)}.jpg`,
      isPro: Math.random() > 0.5
    },
    images: Array.from({ length: 6 }, (_, i) => `img/${type}-0${(i % 3) + 1}.jpg`),
    maxAdults: Math.floor(Math.random() * 4) + 1,
    previewImage: `img/${type}-01.jpg`
  };
}

function generateMockReviews(count: number): Review[] {
  return Array.from({ length: count }, () => ({
    id: crypto.randomUUID(),
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    user: {
      name: getRandomArrayItem(NAMES),
      avatarUrl: `img/avatar${getRandomArrayItem(AVATARS)}.jpg`,
      isPro: Math.random() > 0.5
    },
    comment: getRandomArrayItem(REVIEW_COMMENTS),
    rating: Math.floor(Math.random() * 5) + 1
  }));
}

export { generateMockData, generateMockReviews, cities };
