const BUSINESS_PHONE = "+91 89705 74001";
const WHATSAPP_NUMBER = BUSINESS_PHONE.replace(/\D/g, "");
const RECIPE_STORAGE_KEY = "jagalur-food-recipes-v1";

// Set each pricePerPlate when actual menu pricing is confirmed.
const menuItems = [
  {
    id: "chicken-biryani",
    pricePerPlate: null,
    name: { en: "Chicken Biryani", kn: "ಚಿಕನ್ ಬಿರಿಯಾನಿ" },
    description: { en: "Fragrant rice, tender chicken and a generous helping of comfort.", kn: "ಸುವಾಸನೆಯ ಅನ್ನ, ಮೃದುವಾದ ಚಿಕನ್ — ಮನೆಯ ಊಟದ ರುಚಿ." },
    image: "photo-1631515242808-497c3fbd3972",
    tag: { en: "A GATHERING FAVOURITE", kn: "ಎಲ್ಲರ ಅಚ್ಚುಮೆಚ್ಚು" },
    alt: { en: "Chicken biryani garnished with herbs", kn: "ಸೊಪ್ಪಿನಿಂದ ಅಲಂಕರಿಸಿದ ಚಿಕನ್ ಬಿರಿಯಾನಿ" },
  },
  {
    id: "chicken-65",
    pricePerPlate: null,
    name: { en: "Chicken 65", kn: "ಚಿಕನ್ 65" },
    description: { en: "A lively, spiced chicken side for the biryani table.", kn: "ಬಿರಿಯಾನಿ ಜೊತೆ ಸವಿಯಲು ಮಸಾಲೆಯುಕ್ತ ಚಿಕನ್ ಸೈಡ್ ಡಿಶ್." },
    image: "photo-1603894584373-5ac82b2ae398",
    tag: { en: "A LITTLE SPICE", kn: "ಖಾರದ ರುಚಿ" },
    alt: { en: "Spiced Indian chicken ready to share", kn: "ಸವಿಯಲು ಸಿದ್ಧವಾದ ಮಸಾಲೆಯುಕ್ತ ಚಿಕನ್" },
  },
  {
    id: "chicken-kebab",
    pricePerPlate: null,
    name: { en: "Chicken Kebab", kn: "ಚಿಕನ್ ಕಬಾಬ್" },
    description: { en: "A flavourful chicken favourite for sharing around.", kn: "ಎಲ್ಲರೂ ಕೂಡಿ ಸವಿಯುವ ರುಚಿಕರ ಚಿಕನ್ ಕಬಾಬ್." },
    image: "photo-1599487488170-d11ec9c172f0",
    tag: { en: "MADE TO SHARE", kn: "ಹಂಚಿ ಸವಿಯಿರಿ" },
    alt: { en: "Indian chicken kebabs served on a platter", kn: "ತಟ್ಟೆಯಲ್ಲಿ ಬಡಿಸಿದ ಚಿಕನ್ ಕಬಾಬ್" },
  },
  {
    id: "chicken-gravy",
    pricePerPlate: null,
    name: { en: "Chicken Gravy", kn: "ಚಿಕನ್ ಗ್ರೇವಿ" },
    description: { en: "A comforting, savoury curry to bring to the table.", kn: "ಊಟದ ಜೊತೆ ಸವಿಯಲು ರುಚಿಯಾದ ಚಿಕನ್ ಗ್ರೇವಿ." },
    image: "photo-1565557623262-b51c2513a641",
    tag: { en: "A COMFORTING SIDE", kn: "ರುಚಿಯಾದ ಸೈಡ್ ಡಿಶ್" },
    alt: { en: "Indian chicken curry served with herbs", kn: "ಸೊಪ್ಪಿನಿಂದ ಅಲಂಕರಿಸಿದ ಚಿಕನ್ ಗ್ರೇವಿ" },
  },
  {
    id: "veg-biryani",
    pricePerPlate: null,
    name: { en: "Veg Biryani", kn: "ವೆಜ್ ಬಿರಿಯಾನಿ" },
    description: { en: "A fragrant, colourful rice dish made without meat.", kn: "ತರಕಾರಿಗಳಿಂದ ಮಾಡಿದ ಸುವಾಸನೆಯ ವೆಜ್ ಬಿರಿಯಾನಿ." },
    image: "photo-1589302168068-964664d93dc0",
    tag: { en: "A VEGGIE FAVOURITE", kn: "ತರಕಾರಿ ಪ್ರಿಯರಿಗೆ" },
    alt: { en: "Vegetable biryani with fresh herbs", kn: "ತಾಜಾ ಸೊಪ್ಪಿನೊಂದಿಗೆ ವೆಜ್ ಬಿರಿಯಾನಿ" },
  },
  {
    id: "raita",
    pricePerPlate: null,
    name: { en: "Raita", kn: "ರೈತಾ" },
    description: { en: "A cool, creamy companion for a plate of biryani.", kn: "ಬಿರಿಯಾನಿ ಜೊತೆ ಸವಿಯಲು ತಂಪಾದ ರೈತಾ." },
    image: "photo-1596797038530-2c107229654b",
    tag: { en: "COOL & CREAMY", kn: "ತಂಪಾದ ರುಚಿ" },
    alt: { en: "A bowl of Indian raita topped with herbs", kn: "ಸೊಪ್ಪಿನಿಂದ ಅಲಂಕರಿಸಿದ ರೈತಾ" },
  },
  {
    id: "boiled-eggs",
    pricePerPlate: null,
    name: { en: "Boiled Eggs", kn: "ಬೇಯಿಸಿದ ಮೊಟ್ಟೆ" },
    description: { en: "A simple, satisfying extra alongside your biryani.", kn: "ಬಿರಿಯಾನಿ ಜೊತೆ ಸೇರಿಸಿಕೊಳ್ಳಬಹುದಾದ ಮೊಟ್ಟೆ." },
    image: "photo-1506976785307-8732e854ad03",
    tag: { en: "ADD SOMETHING EXTRA", kn: "ಹೆಚ್ಚುವರಿ ಆಯ್ಕೆ" },
    alt: { en: "Boiled eggs prepared to serve with biryani", kn: "ಬಿರಿಯಾನಿ ಜೊತೆ ಸವಿಯಲು ಬೇಯಿಸಿದ ಮೊಟ್ಟೆ" },
  },
  {
    id: "green-chilli-chicken",
    pricePerPlate: null,
    name: { en: "Green Chilli Chicken", kn: "ಹಸಿಮೆಣಸಿನಕಾಯಿ ಚಿಕನ್" },
    description: { en: "A chicken dish for anyone who enjoys green chilli.", kn: "ಹಸಿಮೆಣಸಿನಕಾಯಿ ರುಚಿ ಇಷ್ಟಪಡುವವರಿಗೆ ಚಿಕನ್ ಅಡುಗೆ." },
    image: "photo-1603894584373-5ac82b2ae398",
    tag: { en: "NEW ON THE MENU", kn: "ಮೆನುವಿನಲ್ಲಿ ಹೊಸದು" },
    alt: { en: "A serving of Indian-style chicken", kn: "ಬಡಿಸಲು ಸಿದ್ಧವಾದ ಚಿಕನ್ ಅಡುಗೆ" },
  },
  {
    id: "pulav",
    pricePerPlate: null,
    name: { en: "Pulav", kn: "ಪುಲಾವ್" },
    description: { en: "A rice dish to add to your family meal or gathering.", kn: "ಕುಟುಂಬದ ಊಟ ಅಥವಾ ಕೂಟಕ್ಕೆ ಸೇರಿಸಿಕೊಳ್ಳಬಹುದಾದ ಅಕ್ಕಿ ಅಡುಗೆ." },
    image: "photo-1589302168068-964664d93dc0",
    tag: { en: "NEW ON THE MENU", kn: "ಮೆನುವಿನಲ್ಲಿ ಹೊಸದು" },
    alt: { en: "A serving of Indian rice", kn: "ಬಡಿಸಲು ಸಿದ್ಧವಾದ ಅಕ್ಕಿ ಅಡುಗೆ" },
  },
  {
    id: "kesari-bath",
    pricePerPlate: null,
    name: { en: "Kesari Bath", kn: "ಕೇಸರಿ ಬಾತ್" },
    description: { en: "A familiar sweet dish for a meal or celebration.", kn: "ಊಟ ಅಥವಾ ಸಂಭ್ರಮಕ್ಕೆ ಸಿಹಿಯಾದ ಕೇಸರಿ ಬಾತ್." },
    image: "photo-1578985545062-69928b1d9587",
    tag: { en: "SOMETHING SWEET", kn: "ಸಿಹಿಯಾದ ಆಯ್ಕೆ" },
    alt: { en: "A sweet Indian dessert served for sharing", kn: "ಹಂಚಿ ಸವಿಯಲು ಸಿದ್ಧವಾದ ಸಿಹಿ ಅಡುಗೆ" },
  },
  {
    id: "upit-upma",
    pricePerPlate: null,
    name: { en: "Upit (Upma)", kn: "ಉಪ್ಪಿಟ್ಟು" },
    description: { en: "A familiar savoury dish for breakfast or a gathering.", kn: "ಬೆಳಗಿನ ಉಪಾಹಾರ ಅಥವಾ ಕೂಟಕ್ಕೆ ರುಚಿಯಾದ ಉಪ್ಪಿಟ್ಟು." },
    image: "photo-1547592180-85f173990554",
    tag: { en: "A FAMILIAR FAVOURITE", kn: "ಎಲ್ಲರಿಗೂ ಪರಿಚಿತ ರುಚಿ" },
    alt: { en: "A savoury Indian dish ready to serve", kn: "ಬಡಿಸಲು ಸಿದ್ಧವಾದ ಖಾರದ ಅಡುಗೆ" },
  },
  {
    id: "chowchow-bath",
    pricePerPlate: null,
    name: { en: "Chowchow Bath", kn: "ಚೌಚೌ ಬಾತ್" },
    description: { en: "A well-loved Karnataka-style combination for the table.", kn: "ಊಟದ ಮೇಜಿಗೆ ಜನಪ್ರಿಯವಾದ ಕರ್ನಾಟಕ ಶೈಲಿಯ ಜೋಡಿ ಅಡುಗೆ." },
    image: "photo-1516684732162-798a0062be99",
    tag: { en: "A LOCAL FAVOURITE", kn: "ನಮ್ಮೂರಿನ ಅಚ್ಚುಮೆಚ್ಚು" },
    alt: { en: "A rice-based Indian dish served at a meal", kn: "ಊಟಕ್ಕೆ ಬಡಿಸಿದ ಅಕ್ಕಿ ಅಡುಗೆ" },
  },
  {
    id: "holige-obbattu",
    pricePerPlate: null,
    name: { en: "Holige (Obbattu)", kn: "ಹೋಳಿಗೆ (ಒಬ್ಬಟ್ಟು)" },
    description: { en: "A traditional sweet for festivals and family occasions.", kn: "ಹಬ್ಬ ಮತ್ತು ಕುಟುಂಬದ ವಿಶೇಷ ಸಂದರ್ಭಗಳಿಗೆ ಸಿಹಿ ಹೋಳಿಗೆ." },
    image: "photo-1601050690597-df0568f70950",
    tag: { en: "SOMETHING SWEET", kn: "ಸಿಹಿಯಾದ ಆಯ್ಕೆ" },
    alt: { en: "Traditional Indian sweet prepared for sharing", kn: "ಹಂಚಿ ಸವಿಯಲು ಸಿದ್ಧವಾದ ಸಾಂಪ್ರದಾಯಿಕ ಸಿಹಿ" },
  },
  {
    id: "mirchi-bajji",
    pricePerPlate: null,
    name: { en: "Mirchi Bajji", kn: "ಮೆಣಸಿನಕಾಯಿ ಬಜ್ಜಿ" },
    description: { en: "A savoury snack to share at a get-together.", kn: "ಕೂಟದಲ್ಲಿ ಹಂಚಿ ಸವಿಯಲು ಖಾರದ ತಿಂಡಿ." },
    image: "photo-1601050690117-94f5f6fa8bd7",
    tag: { en: "A SAVOURY SNACK", kn: "ಖಾರದ ತಿಂಡಿ" },
    alt: { en: "A freshly served Indian savoury snack", kn: "ಬಡಿಸಲು ಸಿದ್ಧವಾದ ಭಾರತೀಯ ಖಾರದ ತಿಂಡಿ" },
  },
  {
    id: "jalebi",
    pricePerPlate: null,
    name: { en: "Jalebi", kn: "ಜಿಲೇಬಿ" },
    description: { en: "A familiar sweet to add to the celebration table.", kn: "ಸಂಭ್ರಮದ ಊಟಕ್ಕೆ ಸೇರಿಸಬಹುದಾದ ಸಿಹಿ ಜಿಲೇಬಿ." },
    image: "photo-1601050690597-df0568f70950",
    tag: { en: "SOMETHING SWEET", kn: "ಸಿಹಿಯಾದ ಆಯ್ಕೆ" },
    alt: { en: "A traditional Indian sweet ready to serve", kn: "ಬಡಿಸಲು ಸಿದ್ಧವಾದ ಸಾಂಪ್ರದಾಯಿಕ ಸಿಹಿ" },
  },
  {
    id: "kheer",
    pricePerPlate: null,
    name: { en: "Kheer", kn: "ಪಾಯಸ" },
    description: { en: "A sweet dish to serve alongside a family meal.", kn: "ಕುಟುಂಬದ ಊಟದ ಜೊತೆ ಸವಿಯಲು ಸಿಹಿಯಾದ ಪಾಯಸ." },
    image: "photo-1488477181946-6428a0291777",
    tag: { en: "SOMETHING SWEET", kn: "ಸಿಹಿಯಾದ ಆಯ್ಕೆ" },
    alt: { en: "A bowl of sweet dessert ready to serve", kn: "ಬಡಿಸಲು ಸಿದ್ಧವಾದ ಸಿಹಿ ಪಾಯಸ" },
  },
  {
    id: "pakoda",
    pricePerPlate: null,
    name: { en: "Pakoda", kn: "ಪಕೋಡ" },
    description: { en: "A savoury snack for sharing over a cup of tea.", kn: "ಚಹಾ ಜೊತೆ ಹಂಚಿ ಸವಿಯಲು ಖಾರದ ಪಕೋಡ." },
    image: "photo-1601050690597-df0568f70950",
    tag: { en: "A SAVOURY SNACK", kn: "ಖಾರದ ತಿಂಡಿ" },
    alt: { en: "A plate of Indian savoury snacks", kn: "ತಟ್ಟೆಯಲ್ಲಿ ಬಡಿಸಿದ ಖಾರದ ತಿಂಡಿ" },
  },
];

const translations = {
  en: {
    announcement: "Taking orders for family gatherings & functions", enquire: "Enquire now ↗", brand: "Homemade Biryani", brandSub: "HOMEMADE · SERVED FRESH",
    navMenu: "Our food", navBulk: "Bulk orders", navStory: "Our story", navContact: "Contact", orderNow: "Order now ↗",
    heroEyebrow: "A LITTLE TASTE OF HOME", heroTitle: "Fresh Chicken Biryani, Made for Every Occasion", heroText: "Homemade taste. Fresh ingredients. Prepared fresh in Jagalur.",
    bulkQuote: "Get a bulk quote →", location: "Jagalur, Karnataka", madeFor: "Made with care, for your table", heroNote: "A good gathering deserves a good biryani.",
    prepared: "PREPARED FRESH", forYourPeople: "For your people", scrollHint: "GOOD FOOD, GOOD COMPANY", exploreFood: "Explore the food ↓",
    introText: "Big pots, generous portions, and the kind of food that brings everyone to the table.", introPlace: "MADE LOCALLY IN JAGALUR",
    menuEyebrow: "FROM OUR KITCHEN", menuTitle: "A table worth gathering around.", menuIntro: "Made to share at family meals, celebrations and all the ordinary days in between.",
    priceNote: "Prices are being updated. Ask us for today's price and bulk portions.", askPrice: "Ask for a price →", bulkOrder: "Bulk order ↗", perPlate: "per plate · placeholder",
    captionSmall: "MADE FOR THE MOMENTS THAT MATTER", captionBig: "One more helping?", bulkEyebrow: "A LITTLE OR A LOT",
    bulkTitle: "Planning a Function? Let Us Handle the Biryani.", bulkText: "From a weekend get-together to a big family celebration, tell us who's coming and we'll help you plan the food.",
    people: "people", quickEstimate: "Plan your order", estimateTag: "QUICK ESTIMATE", peopleLabel: "How many people?",
    calcItemsLabel: "Food items", chooseFoodsHint: "Choose all the items you would like.",
    pickup: "Pickup", delivery: "Delivery", dateLabel: "Preferred date", timeLabel: "Preferred time", calculate: "Check estimate →",
    estimateDisclaimer: "When prices are set, the estimate assumes one plate of each selected item per person. Confirm delivery and final pricing with us.",
    requestQuote: "Request a bulk quote ↗", estimateNeedPeople: "Please enter how many people you're planning for.",
    estimateNeedItems: "Please choose at least one food item so we can include it in your quote request.",
    estimateNotSet: "Estimated total: ₹XXX — prices need to be confirmed. We can still help plan your order for",
    estimateReady: "Estimated total:",
    estimatePeople: "people, with", estimateItems: "for", estimatePickup: "pickup", estimateDelivery: "delivery (availability to be confirmed).",
    estimateDate: "Preferred date:", estimateTime: "Preferred time:", estimateAsk: "Use “Request a bulk quote” and we'll confirm availability and pricing with you.",
    occasionEyebrow: "FOR ALL YOUR PEOPLE", occasionTitle: "What are we celebrating?", occasionText: "Whatever brings everyone together, we can help make the meal feel special.",
    tellUs: "Tell us about your plans ↗", occasionWedding: "Weddings & engagements", occasionBirthday: "Birthdays & parties",
    occasionFamily: "Family get-togethers", occasionCommunity: "Office & community meals",
    whyEyebrow: "THE GOOD, SIMPLE THINGS", whyTitle: "Made with care. Shared with joy.", freshTitle: "Freshly prepared",
    freshText: "Food is prepared fresh for every order.", homemadeTitle: "Homemade taste",
    homemadeText: "Traditional Indian-style preparation with a homemade feel.", bulkTitleShort: "Bulk orders",
    bulkFeatureText: "Suitable for family functions, parties and events.", deliveryTitle: "Jagalur delivery",
    deliveryText: "Serving customers in Jagalur and nearby areas. Ask us to confirm availability.",
    galleryEyebrow: "A PEEK INTO THE KITCHEN", galleryTitle: "Good things, made to share.",
    galleryIntro: "The rice, the handi, the happy table. A little glimpse of food made for people coming together.",
    galleryBiryani: "A plate of biryani", galleryChicken: "Chicken & spice", galleryRice: "Rice, ready to share",
    galleryPot: "From the handi", galleryPacked: "Packed with care", galleryGathering: "A table full of good things",
    galleryNote: "Food photos shown for illustration. We'll add pictures from our own kitchen soon.",
    reviewEyebrow: "KIND WORDS, COMING SOON", reviewTitle: "A good meal is better shared.",
    reviewText: "Real words from our customers will find a home here soon. For now, we'd love to cook for your next gathering.",
    beFirst: "Be our first review ↗", reviewEditNote: "Reviews will be added after customers share their experience.",
    storyEyebrow: "A SMALL LOCAL KITCHEN", storyTitle: "Made Locally. Served Fresh.",
    storyP1: "We're a small food business based in Jagalur, making fresh biryani and food for families, gatherings and bulk orders.",
    storyP2: "Good food has a way of bringing people closer. We'd be glad to be part of your table, whether it's a Sunday lunch or a day worth celebrating.",
    storyPhotoNote: "A seat at our table", storySign: "From our kitchen, with care", storyLocation: "Jagalur, Karnataka",
    orderEyebrow: "LET'S PLAN A MEAL", orderTitle: "Tell us what you're gathering for.",
    orderText: "Share a few details and we'll get back to you to confirm menu, availability and price. Your order isn't confirmed until we speak.",
    preferChat: "Prefer WhatsApp?", chatUs: "Chat with us directly →", formHeading: "A few details, please",
    requiredNote: "* Required fields", nameLabel: "Your name *", phoneLabel: "Phone number *", numberGuestsLabel: "Number of people *",
    foodLabel: "Food selection *", multiHint: "Choose all the items you would like.", methodLabel: "Delivery or pickup *",
    chooseFoodError: "Please choose at least one food item.",
    chooseOne: "Choose one", placeLabel: "Delivery location", messageLabel: "Anything else we should know?",
    formPrivacy: "Your details will be used only to respond to your enquiry.", sendEnquiry: "Continue with WhatsApp",
    statusReady: "Your message is ready. Continue in WhatsApp to send your enquiry.",
    statusPopup: "If WhatsApp didn't open, use this link:", whatsappLink: "Open WhatsApp ↗",
    contactEyebrow: "COME SAY HELLO", contactTitle: "Close to home. Made for sharing.",
    contactText: "We're based in Jagalur, Karnataka. Reach out to check availability, pickup and delivery options in your area.",
    findUs: "FIND US", callUs: "GIVE US A CALL", instagramPlaceholder: "Add Instagram profile",
    hoursNote: "Hours and delivery availability: please ask when you get in touch.",
    mapNote: "Map shows Jagalur town. Update with your business location when ready.",
    footerText: "Made locally. Shared with love.", copyright: "Jagalur, Karnataka", whatsappCta: "WhatsApp us",
    placeholderName: "e.g. Ananya", placeholderPhone: "+91", placeholderPeople: "e.g. 50",
    placeholderLocation: "Jagalur area", placeholderMessage: "Tell us about the occasion, preferences or questions…",
  },
  kn: {
    announcement: "ಮನೆಯ ಸಮಾರಂಭ ಮತ್ತು ವಿಶೇಷ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಆರ್ಡರ್ ಸ್ವೀಕರಿಸಲಾಗುತ್ತಿದೆ", enquire: "ವಿಚಾರಿಸಿ ↗", brand: "ಮನೆಯ ಬಿರಿಯಾನಿ", brandSub: "ಮನೆಯ ರುಚಿ · ತಾಜಾ ಅಡುಗೆ",
    navMenu: "ನಮ್ಮ ಅಡುಗೆ", navBulk: "ದೊಡ್ಡ ಆರ್ಡರ್", navStory: "ನಮ್ಮ ಕಥೆ", navContact: "ಸಂಪರ್ಕ", orderNow: "ಆರ್ಡರ್ ಮಾಡಿ ↗",
    heroEyebrow: "ಮನೆಯ ಅಡುಗೆಯ ಸವಿರುಚಿ", heroTitle: "ಪ್ರತಿ ಸಂದರ್ಭಕ್ಕೂ ತಾಜಾ ಚಿಕನ್ ಬಿರಿಯಾನಿ", heroText: "ಮನೆಯ ರುಚಿ. ತಾಜಾ ಪದಾರ್ಥಗಳು. ಜಗಳೂರಿನಲ್ಲಿ ಪ್ರೀತಿಯಿಂದ ತಯಾರಿಸಿದ ಅಡುಗೆ.",
    bulkQuote: "ದೊಡ್ಡ ಆರ್ಡರ್‌ಗೆ ದರ ಕೇಳಿ →", location: "ಜಗಳೂರು, ಕರ್ನಾಟಕ", madeFor: "ನಿಮ್ಮ ಊಟದ ಮೇಜಿಗಾಗಿ ಪ್ರೀತಿಯಿಂದ", heroNote: "ಒಳ್ಳೆಯ ಕೂಟಕ್ಕೆ ರುಚಿಯಾದ ಬಿರಿಯಾನಿ ಜೊತೆಯಾಗಲಿ.",
    prepared: "ತಾಜಾ ತಯಾರಿಸಿದ್ದು", forYourPeople: "ನಿಮ್ಮವರಿಗಾಗಿ", scrollHint: "ಒಳ್ಳೆಯ ಊಟ · ಒಳ್ಳೆಯ ಒಡನಾಟ", exploreFood: "ಅಡುಗೆ ನೋಡಿ ↓",
    introText: "ದೊಡ್ಡ ಪಾತ್ರೆಗಳಲ್ಲಿ, ಹೊಟ್ಟೆತುಂಬಾ ಅಡುಗೆ — ಎಲ್ಲರನ್ನೂ ಊಟದ ಮೇಜಿಗೆ ಕರೆಯುವ ರುಚಿ.", introPlace: "ಜಗಳೂರಿನಲ್ಲೇ ತಯಾರಿಸಿದ್ದು",
    menuEyebrow: "ನಮ್ಮ ಅಡುಗೆಮನೆಯಿಂದ", menuTitle: "ಎಲ್ಲರೂ ಕೂಡಿ ಸವಿಯುವ ಅಡುಗೆ.", menuIntro: "ಮನೆಯ ಊಟ, ಹಬ್ಬ, ಸಮಾರಂಭ — ನಿಮ್ಮ ಜೊತೆ ಹಂಚಿಕೊಳ್ಳಲು ಪ್ರೀತಿಯಿಂದ ತಯಾರಿಸಿದ್ದು.",
    priceNote: "ದರಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸಲಾಗುವುದು. ಇಂದಿನ ದರ ಮತ್ತು ದೊಡ್ಡ ಆರ್ಡರ್‌ಗಾಗಿ ನಮ್ಮನ್ನು ಕೇಳಿ.", askPrice: "ದರ ಕೇಳಿ →", bulkOrder: "ದೊಡ್ಡ ಆರ್ಡರ್ ↗", perPlate: "ಒಂದು ಪ್ಲೇಟ್‌ಗೆ · ಮಾದರಿ ದರ",
    captionSmall: "ನಿಮ್ಮ ವಿಶೇಷ ದಿನಗಳಿಗಾಗಿ", captionBig: "ಇನ್ನೊಂದು ಪ್ಲೇಟ್ ಬೇಕಾ?", bulkEyebrow: "ಸ್ವಲ್ಪವಾಗಲಿ, ಹೆಚ್ಚಾಗಲಿ",
    bulkTitle: "ಕಾರ್ಯಕ್ರಮ ಇದೆಯೇ? ಬಿರಿಯಾನಿ ಜವಾಬ್ದಾರಿ ನಮಗೆ ಬಿಡಿ.", bulkText: "ವಾರಾಂತ್ಯದ ಕೂಟದಿಂದ ಹಿಡಿದು ದೊಡ್ಡ ಕುಟುಂಬ ಸಮಾರಂಭದವರೆಗೆ — ಎಷ್ಟು ಜನ ಬರುತ್ತೀರಿ ಎಂದು ತಿಳಿಸಿ, ಊಟದ ವ್ಯವಸ್ಥೆಗೆ ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
    people: "ಜನ", quickEstimate: "ಆರ್ಡರ್ ಯೋಜಿಸಿ", estimateTag: "ತ್ವರಿತ ಅಂದಾಜು", peopleLabel: "ಎಷ್ಟು ಜನರಿಗೆ?",
    calcItemsLabel: "ಬೇಕಾದ ಅಡುಗೆ", chooseFoodsHint: "ನಿಮಗೆ ಬೇಕಾದ ಅಡುಗೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    pickup: "ನೀವೇ ಕೊಂಡೊಯ್ಯಿರಿ", delivery: "ತಲುಪಿಸುವಿಕೆ", dateLabel: "ಬೇಕಾದ ದಿನ", timeLabel: "ಬೇಕಾದ ಸಮಯ", calculate: "ಅಂದಾಜು ನೋಡಿ →",
    estimateDisclaimer: "ದರ ನಮೂದಿಸಿದ ಬಳಿಕ, ಆಯ್ಕೆ ಮಾಡಿದ ಪ್ರತಿ ಅಡುಗೆಯ ಒಂದು ಪ್ಲೇಟ್ ಅನ್ನು ಒಬ್ಬರಿಗೆಂದು ಅಂದಾಜಿಸಲಾಗುತ್ತದೆ. ದರ ಮತ್ತು ತಲುಪಿಸುವಿಕೆಯನ್ನು ನಮ್ಮೊಂದಿಗೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    requestQuote: "ದೊಡ್ಡ ಆರ್ಡರ್‌ಗೆ ದರ ಕೇಳಿ ↗", estimateNeedPeople: "ದಯವಿಟ್ಟು ಎಷ್ಟು ಜನರಿಗೆ ಎಂದು ನಮೂದಿಸಿ.",
    estimateNeedItems: "ದರ ವಿಚಾರಣೆಗೆ ಕನಿಷ್ಠ ಒಂದು ಅಡುಗೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    estimateNotSet: "ಒಟ್ಟು ಅಂದಾಜು: ₹XXX — ದರ ಖಚಿತಪಡಿಸಬೇಕು. ಈ ಆರ್ಡರ್ ಯೋಜಿಸಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ:",
    estimateReady: "ಒಟ್ಟು ಅಂದಾಜು:",
    estimatePeople: "ಜನರಿಗೆ,", estimateItems: "ಆಯ್ಕೆ ಮಾಡಿದ ಅಡುಗೆ:", estimatePickup: "ನೀವೇ ಕೊಂಡೊಯ್ಯುವುದು", estimateDelivery: "ತಲುಪಿಸುವಿಕೆ (ಸಿಗುತ್ತದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಬೇಕು).",
    estimateDate: "ಬೇಕಾದ ದಿನ:", estimateTime: "ಬೇಕಾದ ಸಮಯ:", estimateAsk: "“ದೊಡ್ಡ ಆರ್ಡರ್‌ಗೆ ದರ ಕೇಳಿ” ಆಯ್ಕೆಮಾಡಿ — ಲಭ್ಯತೆ ಮತ್ತು ದರವನ್ನು ತಿಳಿಸುತ್ತೇವೆ.",
    occasionEyebrow: "ನಿಮ್ಮ ಎಲ್ಲರಿಗಾಗಿ", occasionTitle: "ಏನು ಸಂಭ್ರಮಿಸೋಣ?", occasionText: "ನಿಮ್ಮವರನ್ನೆಲ್ಲ ಒಟ್ಟಿಗೆ ಸೇರಿಸುವ ಪ್ರತಿಯೊಂದು ಸಂದರ್ಭಕ್ಕೂ ರುಚಿಯಾದ ಊಟದ ವ್ಯವಸ್ಥೆ ಮಾಡೋಣ.",
    tellUs: "ನಿಮ್ಮ ಕಾರ್ಯಕ್ರಮದ ಬಗ್ಗೆ ತಿಳಿಸಿ ↗", occasionWedding: "ಮದುವೆ ಮತ್ತು ನಿಶ್ಚಿತಾರ್ಥ", occasionBirthday: "ಹುಟ್ಟುಹಬ್ಬ ಮತ್ತು ಪಾರ್ಟಿ",
    occasionFamily: "ಕುಟುಂಬದ ಕೂಟ", occasionCommunity: "ಕಚೇರಿ ಮತ್ತು ಸಮುದಾಯದ ಊಟ",
    whyEyebrow: "ಸರಳವಾದ ಒಳ್ಳೆಯ ವಿಷಯಗಳು", whyTitle: "ಪ್ರೀತಿಯಿಂದ ತಯಾರಿಸಿ. ಸಂತೋಷದಿಂದ ಹಂಚಿ.", freshTitle: "ತಾಜಾ ತಯಾರಿಸಿದ ಅಡುಗೆ",
    freshText: "ಪ್ರತಿ ಆರ್ಡರ್‌ಗೂ ತಾಜಾ ಅಡುಗೆ ತಯಾರಿಸುತ್ತೇವೆ.", homemadeTitle: "ಮನೆಯ ರುಚಿ",
    homemadeText: "ಮನೆಯ ಅಡುಗೆಯ ಸೊಗಡಿರುವ ಸಾಂಪ್ರದಾಯಿಕ ಭಾರತೀಯ ಶೈಲಿ.", bulkTitleShort: "ದೊಡ್ಡ ಆರ್ಡರ್‌ಗಳು",
    bulkFeatureText: "ಕುಟುಂಬ ಸಮಾರಂಭ, ಪಾರ್ಟಿ ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಸೂಕ್ತ.", deliveryTitle: "ಜಗಳೂರಿನಲ್ಲಿ ತಲುಪಿಸುವಿಕೆ",
    deliveryText: "ಜಗಳೂರು ಮತ್ತು ಹತ್ತಿರದ ಪ್ರದೇಶಗಳಿಗೆ. ನಿಮ್ಮ ವಿಳಾಸಕ್ಕೆ ಸಿಗುತ್ತದೆಯೇ ಎಂದು ಕೇಳಿ.",
    galleryEyebrow: "ಅಡುಗೆಮನೆಯ ಒಂದು ನೋಟ", galleryTitle: "ಹಂಚಿ ಸವಿಯುವ ಒಳ್ಳೆಯ ಅಡುಗೆ.",
    galleryIntro: "ಅನ್ನ, ಹಂಡಿ, ಒಟ್ಟಿಗೆ ಊಟ ಮಾಡುವ ಸಂತೋಷ — ಎಲ್ಲರೂ ಸೇರುವ ಸಂದರ್ಭದ ಅಡುಗೆಯ ಒಂದು ನೋಟ.",
    galleryBiryani: "ಒಂದು ಪ್ಲೇಟ್ ಬಿರಿಯಾನಿ", galleryChicken: "ಚಿಕನ್ ಮತ್ತು ಮಸಾಲೆ", galleryRice: "ಹಂಚಿ ಸವಿಯುವ ಅನ್ನ",
    galleryPot: "ಹಂಡಿಯಿಂದ ಬಡಿಸಿದ ಅಡುಗೆ", galleryPacked: "ಪ್ರೀತಿಯಿಂದ ಪ್ಯಾಕ್ ಮಾಡಿದ್ದು", galleryGathering: "ರುಚಿಗಳಿಂದ ತುಂಬಿದ ಊಟದ ಮೇಜು",
    galleryNote: "ಚಿತ್ರಗಳು ಮಾದರಿಗಾಗಿ. ನಮ್ಮ ಅಡುಗೆಮನೆಯ ಚಿತ್ರಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸುತ್ತೇವೆ.",
    reviewEyebrow: "ನಿಮ್ಮ ಮಾತುಗಳು ಇಲ್ಲಿ ಬರಲಿವೆ", reviewTitle: "ಒಳ್ಳೆಯ ಊಟ, ಒಟ್ಟಿಗೆ ಸವಿದರೆ ಇನ್ನೂ ರುಚಿ.",
    reviewText: "ಗ್ರಾಹಕರ ನೈಜ ಅಭಿಪ್ರಾಯಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಇಲ್ಲಿ ಸೇರಿಸುತ್ತೇವೆ. ನಿಮ್ಮ ಮುಂದಿನ ಸಮಾರಂಭಕ್ಕೆ ಅಡುಗೆ ಮಾಡಲು ನಮಗೆ ಸಂತೋಷ.",
    beFirst: "ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ಹಂಚಿಕೊಳ್ಳಿ ↗", reviewEditNote: "ಗ್ರಾಹಕರು ತಮ್ಮ ಅನುಭವ ಹಂಚಿಕೊಂಡ ಬಳಿಕ ನೈಜ ಅಭಿಪ್ರಾಯಗಳನ್ನು ಸೇರಿಸಲಾಗುತ್ತದೆ.",
    storyEyebrow: "ನಮ್ಮೂರಿನ ಪುಟ್ಟ ಅಡುಗೆಮನೆ", storyTitle: "ನಮ್ಮೂರಿನ ಅಡುಗೆ. ತಾಜಾ ರುಚಿ.",
    storyP1: "ನಾವು ಜಗಳೂರಿನ ಒಂದು ಸಣ್ಣ ಸ್ಥಳೀಯ ಆಹಾರ ಉದ್ಯಮ. ಕುಟುಂಬದ ಊಟ, ಕೂಟ ಮತ್ತು ದೊಡ್ಡ ಆರ್ಡರ್‌ಗಳಿಗೆ ತಾಜಾ ಬಿರಿಯಾನಿ ಹಾಗೂ ಅಡುಗೆ ತಯಾರಿಸುತ್ತೇವೆ.",
    storyP2: "ಒಳ್ಳೆಯ ಊಟ ಜನರನ್ನು ಹತ್ತಿರವಾಗಿಸುತ್ತದೆ. ಭಾನುವಾರದ ಊಟವಿರಲಿ, ವಿಶೇಷ ದಿನವಿರಲಿ — ನಿಮ್ಮ ಊಟದ ಮೇಜಿನ ಭಾಗವಾಗಲು ನಮಗೆ ಖುಷಿ.",
    storyPhotoNote: "ನಮ್ಮ ಊಟದ ಮೇಜಿನಲ್ಲಿ ನಿಮಗೂ ಜಾಗವಿದೆ", storySign: "ನಮ್ಮ ಅಡುಗೆಮನೆಯಿಂದ, ಪ್ರೀತಿಯಿಂದ", storyLocation: "ಜಗಳೂರು, ಕರ್ನಾಟಕ",
    orderEyebrow: "ಊಟದ ಯೋಜನೆ ಮಾಡೋಣ", orderTitle: "ಯಾವ ಸಂದರ್ಭಕ್ಕೆ ಅಡುಗೆ ಬೇಕು?", orderText: "ಕೆಲವು ವಿವರಗಳನ್ನು ಕಳುಹಿಸಿ. ಅಡುಗೆ, ಲಭ್ಯತೆ ಮತ್ತು ದರ ಖಚಿತಪಡಿಸಲು ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ. ಮಾತನಾಡಿ ಖಚಿತಪಡಿಸಿದ ಬಳಿಕವೇ ಆರ್ಡರ್ ನಿಶ್ಚಿತವಾಗುತ್ತದೆ.",
    preferChat: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಮಾತನಾಡಬೇಕೇ?", chatUs: "ನೇರವಾಗಿ ಚಾಟ್ ಮಾಡಿ →", formHeading: "ಕೆಲವು ವಿವರಗಳನ್ನು ತಿಳಿಸಿ",
    requiredNote: "* ಕಡ್ಡಾಯ ವಿವರಗಳು", nameLabel: "ನಿಮ್ಮ ಹೆಸರು *", phoneLabel: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ *", numberGuestsLabel: "ಎಷ್ಟು ಜನರಿಗೆ? *",
    foodLabel: "ಬೇಕಾದ ಅಡುಗೆ *", multiHint: "ನಿಮಗೆ ಬೇಕಾದ ಅಡುಗೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.", methodLabel: "ತಲುಪಿಸುವಿಕೆ ಅಥವಾ ನೀವೇ ಕೊಂಡೊಯ್ಯುವಿರಾ? *",
    chooseFoodError: "ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ಒಂದು ಅಡುಗೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    chooseOne: "ಒಂದನ್ನು ಆಯ್ಕೆಮಾಡಿ", placeLabel: "ತಲುಪಿಸಬೇಕಾದ ಸ್ಥಳ", messageLabel: "ಬೇರೆ ಏನಾದರೂ ತಿಳಿಸಬೇಕೇ?",
    formPrivacy: "ನಿಮ್ಮ ವಿಚಾರಣೆಗೆ ಉತ್ತರಿಸಲು ಮಾತ್ರ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಬಳಸುತ್ತೇವೆ.", sendEnquiry: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಮುಂದುವರಿಸಿ",
    statusReady: "ನಿಮ್ಮ ಸಂದೇಶ ಸಿದ್ಧವಾಗಿದೆ. ವಿಚಾರಣೆ ಕಳುಹಿಸಲು ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಮುಂದುವರಿಸಿ.",
    statusPopup: "ವಾಟ್ಸಾಪ್ ತೆರೆಯದಿದ್ದರೆ ಈ ಕೊಂಡಿ ಬಳಸಿ:", whatsappLink: "ವಾಟ್ಸಾಪ್ ತೆರೆಯಿರಿ ↗",
    contactEyebrow: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ", contactTitle: "ನಿಮ್ಮೂರಿನ ರುಚಿ. ಹಂಚಿ ಸವಿಯಿರಿ.",
    contactText: "ನಾವು ಕರ್ನಾಟಕದ ಜಗಳೂರಿನಲ್ಲಿದ್ದೇವೆ. ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕೆ ಆರ್ಡರ್, ನೀವೇ ಕೊಂಡೊಯ್ಯುವಿಕೆ ಮತ್ತು ತಲುಪಿಸುವಿಕೆ ಲಭ್ಯವಿದೆಯೇ ಎಂದು ಕೇಳಿ.",
    findUs: "ನಮ್ಮ ವಿಳಾಸ", callUs: "ದೂರವಾಣಿ ಮಾಡಿ", instagramPlaceholder: "ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್ ವಿವರ ಸೇರಿಸಿ",
    hoursNote: "ಕೆಲಸದ ಸಮಯ ಮತ್ತು ತಲುಪಿಸುವಿಕೆ: ಸಂಪರ್ಕಿಸಿದಾಗ ವಿಚಾರಿಸಿ.",
    mapNote: "ನಕ್ಷೆಯಲ್ಲಿ ಜಗಳೂರು ಪಟ್ಟಣ ತೋರಿಸಲಾಗಿದೆ. ಸಿದ್ಧವಾದ ಬಳಿಕ ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಸ್ಥಳವನ್ನು ಸೇರಿಸಿ.",
    footerText: "ನಮ್ಮೂರಿನ ಅಡುಗೆ. ಪ್ರೀತಿಯಿಂದ ಹಂಚಿ.", copyright: "ಜಗಳೂರು, ಕರ್ನಾಟಕ", whatsappCta: "ವಾಟ್ಸಾಪ್ ಮಾಡಿ",
    placeholderName: "ಉದಾ. ಅನನ್ಯ", placeholderPhone: "+91", placeholderPeople: "ಉದಾ. 50",
    placeholderLocation: "ಜಗಳೂರು ಪ್ರದೇಶ", placeholderMessage: "ಸಮಾರಂಭ, ಇಷ್ಟದ ಅಡುಗೆ ಅಥವಾ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ ತಿಳಿಸಿ…",
  },
};

let currentLanguage = "en";
const textFor = (entry) => entry[currentLanguage];
const t = (key) => translations[currentLanguage][key] || translations.en[key] || key;
const whatsappUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
});
document.querySelectorAll("[data-business-phone]").forEach((link) => {
  link.href = `tel:${BUSINESS_PHONE.replace(/\s/g, "")}`;
  link.textContent = BUSINESS_PHONE;
});
document.querySelectorAll("[data-phone-display]").forEach((element) => {
  element.textContent = BUSINESS_PHONE;
});

function renderMenu() {
  const grid = document.querySelector("#menu-grid");
  const calcItems = document.querySelector("#calc-items");
  const orderItems = document.querySelector("#order-items");
  const previouslySelected = {
    calculator: new Set(selectedMenuIds(calcItems)),
    order: new Set(selectedMenuIds(orderItems)),
  };
  grid.replaceChildren();
  calcItems.replaceChildren();
  orderItems.replaceChildren();

  for (const item of menuItems) {
    const card = document.createElement("article");
    card.className = "food-card";
    card.innerHTML = `
      <div class="food-card-image">
        <img alt="${textFor(item.alt)}" loading="lazy">
        <span class="food-card-tag">${textFor(item.tag)}</span>
      </div>
      <div class="food-card-info">
        <h3>${textFor(item.name)}</h3>
        <p>${textFor(item.description)}</p>
        <div class="food-card-bottom">
          <span class="food-card-price">${item.pricePerPlate === null ? "₹XXX" : `₹${item.pricePerPlate}`}<small>${t("perPlate")}</small></span>
          <button class="food-card-order" type="button" data-order-item="${item.id}">${t("bulkOrder")}</button>
        </div>
      </div>`;
    const menuImage = card.querySelector(".food-card-image img");
    const crop = storedRecipeCrop(item);
    menuImage.src = menuImageSource(item);
    menuImage.style.objectPosition = `${crop.x}% ${crop.y}%`;
    menuImage.style.setProperty("--image-zoom", crop.zoom);
    grid.append(card);

    for (const [container, group] of [[calcItems, "calculator"], [orderItems, "order"]]) {
      const choice = document.createElement("label");
      choice.className = "food-choice";
      const input = document.createElement("input");
      input.className = "food-choice-input";
      input.type = "checkbox";
      input.name = group === "calculator" ? "calculatorItems" : "items";
      input.value = item.id;
      input.id = `${group}-food-${item.id}`;
      input.checked = previouslySelected[group].has(item.id);
      input.addEventListener("change", () => {
        if (group === "order" && input.checked) {
          document.querySelector("#form-status").textContent = "";
        }
      });
      const name = document.createElement("span");
      name.className = "food-choice-label";
      name.textContent = textFor(item.name);
      const check = document.createElement("span");
      check.className = "food-choice-check";
      check.setAttribute("aria-hidden", "true");
      choice.append(input, name, check);
      container.append(choice);
    }
  }
}

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "kn" ? "kn" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translation = t(element.dataset.i18n);
    if (translation) element.textContent = translation;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll(".language-option").forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderMenu();
}

function selectedMenuIds(container) {
  return Array.from(container.querySelectorAll(".food-choice-input:checked"), (input) => input.value);
}

function selectedMenuNames(container) {
  const selectedIds = new Set(selectedMenuIds(container));
  return menuItems.filter((item) => selectedIds.has(item.id)).map((item) => textFor(item.name));
}

function storedRecipeImage(item) {
  try {
    const recipes = JSON.parse(localStorage.getItem(RECIPE_STORAGE_KEY) || "[]");
    const recipe = Array.isArray(recipes) ? recipes.find((entry) =>
      typeof entry?.name === "string"
      && entry.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === item.id
    ) : null;
    const imageUrl = recipe?.imageUrl;
    if (typeof imageUrl !== "string" || !imageUrl) return "";
    if (/^https?:\/\//i.test(imageUrl) || /^data:image\/jpeg;base64,/i.test(imageUrl)) return imageUrl;
  } catch {
    return "";
  }
  return "";
}

function storedRecipeCrop(item) {
  try {
    const recipes = JSON.parse(localStorage.getItem(RECIPE_STORAGE_KEY) || "[]");
    const recipe = Array.isArray(recipes) ? recipes.find((entry) =>
      typeof entry?.name === "string"
      && entry.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === item.id
    ) : null;
    const crop = recipe?.imageCrop;
    if (!crop || typeof crop !== "object") return { x: 50, y: 50, zoom: 1 };
    const x = Number(crop.x);
    const y = Number(crop.y);
    const zoom = Number(crop.zoom);
    return {
      x: Number.isFinite(x) ? Math.min(100, Math.max(0, x)) : 50,
      y: Number.isFinite(y) ? Math.min(100, Math.max(0, y)) : 50,
      zoom: Number.isFinite(zoom) ? Math.min(3, Math.max(1, zoom)) : 1,
    };
  } catch {
    return { x: 50, y: 50, zoom: 1 };
  }
}

function menuImageSource(item) {
  return storedRecipeImage(item) || `https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=700&q=80`;
}

function copyCalculatorToOrder() {
  const calculatorForm = document.querySelector("#calculator");
  const orderForm = document.querySelector("#order-form");
  const people = calculatorForm.elements.people.value;
  if (people) orderForm.elements.people.value = people;

  const selectedItems = new Set(selectedMenuIds(document.querySelector("#calc-items")));
  document.querySelectorAll("#order-items .food-choice-input").forEach((input) => {
    input.checked = selectedItems.has(input.value);
  });
  orderForm.elements.method.value = calculatorForm.elements.delivery.value === "pickup" ? "Pickup" : "Delivery";
  document.querySelector("#calc-date").value && (orderForm.elements.date.value = document.querySelector("#calc-date").value);
  document.querySelector("#calc-time").value && (orderForm.elements.time.value = document.querySelector("#calc-time").value);
}

document.querySelectorAll(".language-option").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const nav = document.querySelector(".main-nav");
  const isOpen = nav.classList.toggle("is-open");
  button.setAttribute("aria-expanded", String(isOpen));
  button.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".main-nav").classList.remove("is-open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#menu-grid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-order-item]");
  if (!button) return;
  const checkbox = document.querySelector(`#order-food-${button.dataset.orderItem}`);
  if (checkbox) checkbox.checked = true;
  document.querySelector("#order").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#calculator").addEventListener("submit", (event) => {
  event.preventDefault();
  const people = Number(document.querySelector("#calc-people").value);
  const selectedItemIds = selectedMenuIds(document.querySelector("#calc-items"));
  const selectedItems = menuItems.filter((item) => selectedItemIds.includes(item.id));
  const itemNames = selectedItems.map((item) => textFor(item.name));
  const result = document.querySelector("#estimate-result");
  result.hidden = false;

  if (!people || people < 1) {
    result.textContent = t("estimateNeedPeople");
    return;
  }
  if (itemNames.length === 0) {
    result.textContent = t("estimateNeedItems");
    return;
  }

  const pickupOrDelivery = document.querySelector("#calc-delivery").value;
  const date = document.querySelector("#calc-date").value;
  const time = document.querySelector("#calc-time").value;
  const pricesConfigured = selectedItems.every((item) => Number.isFinite(item.pricePerPlate));
  const estimatedTotal = pricesConfigured
    ? (selectedItems.reduce((total, item) => total + item.pricePerPlate, 0) * people).toLocaleString("en-IN")
    : null;
  const priceMessage = estimatedTotal
    ? `${t("estimateReady")} ₹${estimatedTotal}. `
    : `${t("estimateNotSet")} `;
  const details = [
    `${priceMessage}${people} ${t("estimatePeople")} ${itemNames.join(", ")}; ${pickupOrDelivery === "pickup" ? t("estimatePickup") : t("estimateDelivery")}`,
    date ? ` ${t("estimateDate")} ${date}.` : "",
    time ? ` ${t("estimateTime")} ${time}.` : "",
    ` ${t("estimateAsk")}`,
  ].join("");
  result.textContent = details;
  copyCalculatorToOrder();
});

document.querySelector("#order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const selectedItems = selectedMenuNames(document.querySelector("#order-items"));
  const status = document.querySelector("#form-status");
  if (selectedItems.length === 0) {
    status.textContent = t("chooseFoodError");
    document.querySelector("#order-items .food-choice-input").focus();
    return;
  }
  const message = [
    currentLanguage === "kn" ? "ನಮಸ್ಕಾರ, ಊಟದ ಆರ್ಡರ್ ಬಗ್ಗೆ ವಿಚಾರಿಸಬೇಕು." : "Hello, I'd like to enquire about a food order.",
    `${t("nameLabel").replace(" *", "")}: ${data.get("name")}`,
    `${t("phoneLabel").replace(" *", "")}: ${data.get("phone")}`,
    `${t("numberGuestsLabel").replace(" *", "")}: ${data.get("people")}`,
    `${t("foodLabel").replace(" *", "")}: ${selectedItems.join(", ")}`,
    `${t("methodLabel").replace(" *", "")}: ${data.get("method")}`,
    data.get("location") ? `${t("placeLabel")}: ${data.get("location")}` : "",
    `${t("dateLabel")}: ${data.get("date")}`,
    data.get("time") ? `${t("timeLabel")}: ${data.get("time")}` : "",
    data.get("message") ? `${t("messageLabel")}: ${data.get("message")}` : "",
  ].filter(Boolean).join("\n");
  const url = whatsappUrl(message);
  status.textContent = t("statusReady");

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = t("whatsappLink");
  link.className = "whatsapp-inline";
  link.style.display = "inline-block";
  link.style.marginTop = "5px";
  status.append(document.createElement("br"), link);
  window.open(url, "_blank", "noopener,noreferrer");
});

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
document.querySelector("#calc-date").min = localToday;
document.querySelector("#order-form").elements.date.min = localToday;
document.querySelector("#year").textContent = String(today.getFullYear());
renderMenu();
