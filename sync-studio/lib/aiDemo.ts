/**
 * Knowledge of the AI WhatsApp demo (a fictional café, clearly labelled as a demo on the page).
 * The bot runs in the browser (public/features.js): it detects the language and the intent of a
 * message with these keywords, and answers in the same language. No data leaves the page.
 */

export type DemoLang = "fr" | "en" | "darija" | "ar";
export type DemoIntent = "greet" | "hours" | "location" | "menu" | "book" | "delivery" | "thanks" | "fallback";

/** Words that identify each intent, in every language (lowercase, without accents). */
export const intentKeywords: Record<Exclude<DemoIntent, "fallback">, string[]> = {
  book: ["reserv", "table", "book", "booking", "n7jz", "nhjz", "7jz", "hjz", "nreservi", "reservi", "حجز", "نحجز", "طابلة", "طاولة", "نريزرفي"],
  hours: ["heure", "horaire", "ouvert", "ferme", "ce soir", "aujourd", "open", "close", "hours", "tonight", "today", "m7lol", "mhlol", "7allin", "7alin", "hallin", "fo9ach", "foqach", "wa9t", "lyoum", "lyouma", "llila", "حالين", "محلول", "فوقاش", "وقت", "الليلة", "اليوم", "مفتوح", "ساعة"],
  location: ["adresse", "ou etes", "ou se trouve", "localisation", "situe", "address", "where", "location", "fin kayn", "fin ntoma", "fin", "blasa", "lblasa", "عنوان", "فين", "موقع", "بلاصة", "أين"],
  menu: ["menu", "prix", "tarif", "combien", "carte", "price", "how much", "cost", "bch7al", "ch7al", "chhal", "bchhal", "taman", "منيو", "المنيو", "شحال", "بشحال", "الثمن", "ثمن", "الأسعار"],
  delivery: ["livr", "delivery", "deliver", "glovo", "katwslo", "twsil", "tawsil", "توصيل", "كتوصلو", "ليفريزون"],
  thanks: ["merci", "thanks", "thank", "choukran", "chokran", "shukran", "chkran", "شكرا", "شكراً", "بارك الله"],
  greet: ["salam", "slm", "bonjour", "bonsoir", "salut", "hello", "hi ", "hey", "السلام", "سلام", "مرحبا", "أهلا", "اهلا"],
};

/** Words that give away the language of a message written in Latin letters. */
export const langMarkers = {
  darija: ["salam", "wach", "bghit", "3afak", "chhal", "ch7al", "bch7al", "lyoum", "daba", "mzyan", "kayn", "kayna", "katwslo", "fin", "dyal", "wakha", "safi", "n7jz", "llila", "m7lol", "7allin", "chokran", "choukran", "nta", "ntoma", "bzaf", "l 4", "lwa7ed", "mn wa7ed"],
  en: ["the", "what", "when", "where", "open", "how", "do you", "please", "hello", "hi", "hey", "table for", "tonight", "thanks", "thank", "menu?", "book", "you", "are you", "is it", "can i"],
  fr: ["le", "la", "les", "vous", "ouvert", "combien", "bonjour", "bonsoir", "merci", "je", "est", "une", "pour", "ce soir", "réserver", "reserver", "livrez", "c'est", "quel", "quelle"],
};

/** Replies of the demo café. {people} and {time} are filled in for bookings. */
export const replies: Record<DemoLang, Record<string, string>> = {
  fr: {
    greet: "Bonjour et bienvenue au Café Atlas 👋 Je suis l'assistant automatique. Horaires, menu, réservation : je vous réponds tout de suite.",
    hours: "Nous sommes ouverts tous les jours de 8h à 23h, y compris ce soir 🙂",
    location: "Nous sommes sur le boulevard Mohammed V, à Agadir. Je vous envoie la localisation 📍",
    menu: "Petit-déjeuner, tajines et jus frais. Je vous envoie le menu complet en photo 📸",
    bookAsk: "Avec plaisir ! Pour combien de personnes et à quelle heure ?",
    bookAskPeople: "Parfait. Pour combien de personnes ?",
    bookAskTime: "Très bien. À quelle heure souhaitez-vous venir ?",
    booked: "C'est noté : une table pour {people} à {time}. Je vous envoie un rappel 1 heure avant 👍",
    delivery: "Oui, nous livrons dans Agadir via Glovo, ou directement en commandant ici sur WhatsApp 🛵",
    thanks: "Avec plaisir ! À très vite au Café Atlas 🙏",
    fallback: "Bonne question ! Je la transmets à l'équipe, qui vous répond dans quelques minutes.",
  },
  en: {
    greet: "Hello and welcome to Café Atlas 👋 I'm the automatic assistant. Hours, menu, bookings: I'll answer right away.",
    hours: "We're open every day from 8am to 11pm, tonight included 🙂",
    location: "We're on Boulevard Mohammed V in Agadir. Sending you the location 📍",
    menu: "Breakfast, tagines and fresh juices. Sending you the full menu as a photo 📸",
    bookAsk: "With pleasure! For how many people, and at what time?",
    bookAskPeople: "Perfect. For how many people?",
    bookAskTime: "Great. What time would you like to come?",
    booked: "Done: a table for {people} at {time}. I'll send you a reminder 1 hour before 👍",
    delivery: "Yes, we deliver in Agadir through Glovo, or directly by ordering here on WhatsApp 🛵",
    thanks: "My pleasure! See you soon at Café Atlas 🙏",
    fallback: "Good question! I'm passing it to the team, they'll reply within minutes.",
  },
  darija: {
    greet: "Wa 3alaykom salam, mrhba bik f Café Atlas 👋 Ana l'assistant automatique. Swwelni 3la l'wa9t, l'menu wla l'7jz.",
    hours: "Mftou7in kol nhar mn 8 d sba7 7ta l 11 d lil, 7ta lyouma 🙂",
    location: "Kaynin f Boulevard Mohammed V, Agadir. Hak l'localisation 📍",
    menu: "3andna ftour, tajines w 3asir tbi3i. Ghadi nsiftlik l'menu kaml f tswira 📸",
    bookAsk: "Mrhba! Ch7al mn wa7ed w f ina sa3a?",
    bookAskPeople: "Mzyan. Ch7al mn wa7ed?",
    bookAskTime: "Wakha. F ina sa3a bghiti tji?",
    booked: "Safi, tsjjlat likom tabla l {people} f {time}. Ghadi nsiftlik rappel 9bel b sa3a 👍",
    delivery: "Ah, kanwslo f Agadir b Glovo, wla commandi direct hna f WhatsApp 🛵",
    thanks: "Bla jmil! Mrhba bik f ay wa9t 🙏",
    fallback: "Mzyan, ghadi n3ti so2al dyalk l l'équipe, w ghadi yjawbouk f d9i9at.",
  },
  ar: {
    greet: "وعليكم السلام، مرحبا بك في Café Atlas 👋 أنا المساعد الآلي. اسألني عن المواعيد، المنيو أو الحجز.",
    hours: "مفتوحين كل نهار من 8 د الصباح حتى 11 د الليل، حتى الليلة 🙂",
    location: "كاينين ف شارع محمد الخامس، أكادير. ها الموقع 📍",
    menu: "عندنا الفطور، الطواجن والعصير الطبيعي. غادي نصيفط ليك المنيو كامل ف تصويرة 📸",
    bookAsk: "مرحبا! شحال من واحد وفوقاش؟",
    bookAskPeople: "مزيان. شحال من واحد؟",
    bookAskTime: "واخا. فوقاش بغيتي تجي؟",
    booked: "صافي، تسجلات ليكم طابلة ل {people} على {time}. غادي نصيفط ليك تذكير قبل بساعة 👍",
    delivery: "إيه، كنوصلو ف أكادير ب Glovo، ولا كوماندي ديريكت هنا ف واتساب 🛵",
    thanks: "بلا جميل! مرحبا بك ف أي وقت 🙏",
    fallback: "مزيان، غادي نعطي السؤال ديالك للفريق، وغادي يجاوبوك ف دقائق.",
  },
};

/** How a reply's details line reads in the "what the AI understands" panel. */
export const detailFormats: Record<DemoLang, { people: string; time: string }> = {
  fr: { people: "{n} pers.", time: "{t}" },
  en: { people: "{n} guests", time: "{t}" },
  darija: { people: "{n} nas", time: "{t}" },
  ar: { people: "{n} أشخاص", time: "{t}" },
};
