export type Post = {
  slug: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  body: string[];
  bodyHi: string[];
};

export const posts: Post[] = [
  {
    slug: "organize-your-digital-files",
    title: "Give your digital files a little order",
    titleHi: "अपनी डिजिटल फ़ाइलें व्यवस्थित रखें",
    description: "A simple routine for naming, sorting and finding the files you need.",
    descriptionHi: "ज़रूरी फ़ाइलों को नाम देने, व्यवस्थित करने और खोजने का आसान तरीका।",
    body: [
      "Start with a few clearly named folders, such as Documents, Photos and Receipts. Choose names that describe what is inside so you can find things without opening every folder.",
      "Give important files descriptive names. Including a date in year-month-day order can make related documents easier to sort.",
      "Review your Downloads folder regularly. Move files you need into the right folder, and check before deleting anything you may want to keep. Keep a separate backup of important documents.",
    ],
    bodyHi: [
      "Documents, Photos और Receipts जैसे स्पष्ट नाम वाले कुछ फ़ोल्डर बनाएँ। ऐसे नाम चुनें जिनसे अंदर की सामग्री का पता चल सके।",
      "ज़रूरी फ़ाइलों को जानकारी देने वाले नाम दें। नाम में वर्ष-महीना-दिन के क्रम में तारीख जोड़ने से संबंधित दस्तावेज़ क्रम में रखना आसान हो सकता है।",
      "Downloads फ़ोल्डर नियमित रूप से देखें। ज़रूरी फ़ाइलें सही फ़ोल्डर में रखें और कुछ हटाने से पहले जाँच लें। महत्वपूर्ण दस्तावेज़ों का अलग बैकअप रखें।",
    ],
  },
  {
    slug: "make-time-away-from-notifications",
    title: "Make a little space between notifications",
    titleHi: "नोटिफ़िकेशन से थोड़ा विराम लें",
    description: "Choose which updates deserve your attention and which can wait.",
    descriptionHi: "तय करें कि किन सूचनाओं पर तुरंत ध्यान देना है और कौन-सी बाद में देख सकते हैं।",
    body: [
      "Look through the apps that send you notifications. Keep the alerts you rely on and turn off updates you regularly dismiss without reading.",
      "When you need uninterrupted time, review your phone’s focus or do-not-disturb settings. Check which contacts and alerts can still reach you before enabling them.",
      "Choose a convenient time to catch up on less urgent messages. Adjust the routine to fit your day rather than trying to check every update as it arrives.",
    ],
    bodyHi: [
      "नोटिफ़िकेशन भेजने वाले ऐप देखें। जिन सूचनाओं की ज़रूरत है उन्हें चालू रखें और जिन्हें बिना पढ़े हटा देते हैं उन्हें बंद करें।",
      "बिना बाधा काम करने के लिए फ़ोन की फ़ोकस या डू नॉट डिस्टर्ब सेटिंग देखें। चालू करने से पहले जाँच लें कि किन संपर्कों और सूचनाओं को अनुमति मिली है।",
      "कम ज़रूरी संदेश पढ़ने के लिए सुविधाजनक समय चुनें। हर सूचना तुरंत देखने के बजाय अपनी दिनचर्या के अनुसार समय तय करें।",
    ],
  },
  {
    slug: "read-online-with-care",
    title: "Pause before you share",
    titleHi: "शेयर करने से पहले ठहरें",
    description: "Small checks that help you read online information more thoughtfully.",
    descriptionHi: "ऑनलाइन जानकारी को सोच-समझकर पढ़ने के लिए कुछ आसान जाँच।",
    body: [
      "Read beyond the headline before sharing a story. Check who published it, when it was written and whether it links to the original information.",
      "Look for the surrounding context of a quote or image. A cropped picture or a short excerpt can leave out details that change its meaning.",
      "If you cannot verify a claim, leave it unshared. Saving a link to review later gives you time to look for clearer information.",
    ],
    bodyHi: [
      "किसी खबर को शेयर करने से पहले शीर्षक के आगे भी पढ़ें। देखें कि किसने प्रकाशित किया, कब लिखा गया और क्या मूल जानकारी का लिंक दिया है।",
      "किसी कथन या तस्वीर का पूरा संदर्भ देखें। काटी गई तस्वीर या छोटा अंश ऐसे विवरण छोड़ सकता है जिनसे अर्थ बदल जाता है।",
      "यदि किसी दावे की पुष्टि नहीं कर सकते तो उसे शेयर न करें। लिंक सहेजकर बाद में देखने से स्पष्ट जानकारी खोजने का समय मिलता है।",
    ],
  },
];
