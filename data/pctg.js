/* Question bank extracted from "Reviewer for PCTG" (Region 1: Ilocos Region, Region 2: Cagayan
   Valley, Region 3: Central Luzon).
   Each fact has pre/post text that surrounds the answer, so the engine can:
   - build a True/False statement (swap answer with a distractor)
   - build a Fill-in-the-blank statement (mask the answer)
   - build a Multiple Choice question (use `q` + distractor pool)
*/
(function () {
  "use strict";

  const POOLS = {
    capitals: ["Basco", "Tuguegarao City", "City of Ilagan", "Bayombong", "Cabarroguis", "Baler", "Balanga City", "Malolos City", "Palayan City", "City of San Fernando", "Tarlac City", "Iba", "Laoag City", "Vigan City", "San Fernando City (La Union)", "Lingayen"],
    provinces: ["Batanes", "Cagayan", "Isabela", "Nueva Vizcaya", "Quirino", "Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Tarlac", "Zambales", "Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"],
    landmarks: ["Mahatao Church", "Marlboro Hills", "Sabtang Island", "Callao Cave", "Anguib Beach", "Our Lady of Piat", "St. Peter Cathedral", "Palanan", "Magat Dam", "Tumauini Church", "Ilagan Sanctuary", "Mt. Pulag", "Capisaan Cave", "Lower Magat Eco-Park", "Aglipay Caves", "Landingan Viewpoint", "Siitan River", "Sabang Beach", "Dicasalarin Cove", "Millennium Balete Tree", "Mt. Samat Cross", "Las Casas Filipinas de Acuzar", "Pawikan Center", "Barasoain Church", "Biak-na-Bato", "Minalungao Park", "Pantabangan Dam", "Mt. Arayat", "Betis Church", "Monasterio de Tarlac", "Anawangin Cove", "Nagsasa Cove", "Silanguin Coves"],
    festivals: ["Palu-Palu", "Kulay", "Sinabalu Festival", "Bambanti Festival", "Ammungan Festival", "Ginamaluan Festival", "Coco-Sabutan Festival", "Siege of Baler", "Pawikan Festival", "Obando Fertility Rites", "Taong Putik Festival", "Giant Lantern Festival", "Cutud Lenten Rites", "Malatarlac Festival", "Dinamulag Mango Festival", "Pamulinawen Festival", "Longganisa Festival", "Dinengdeng Festival", "Bangus Festival"],
    languages: ["Ivatan", "Ibanag", "Gaddang & Yogad", "Isinai", "Bugkalot/Agta", "Ilocano", "Kapampangan", "Sambal", "Tagalog"],
  };

  // pre + [ANSWER] + post ; q = question phrasing for MCQ
  const FACTS = [
    // ---------------- CAPITALS ----------------
    { id: "cap-batanes", poolKey: "capitals", q: "What is the capital of Batanes?", pre: "The capital of Batanes is ", post: ".", answer: "Basco" },
    { id: "cap-cagayan", poolKey: "capitals", q: "What is the capital of Cagayan?", pre: "The capital of Cagayan is ", post: ".", answer: "Tuguegarao City" },
    { id: "cap-isabela", poolKey: "capitals", q: "What is the capital of Isabela?", pre: "The capital of Isabela is ", post: ".", answer: "City of Ilagan" },
    { id: "cap-nvizcaya", poolKey: "capitals", q: "What is the capital of Nueva Vizcaya?", pre: "The capital of Nueva Vizcaya is ", post: ".", answer: "Bayombong" },
    { id: "cap-quirino", poolKey: "capitals", q: "What is the capital of Quirino?", pre: "The capital of Quirino is ", post: ".", answer: "Cabarroguis" },
    { id: "cap-aurora", poolKey: "capitals", q: "What is the capital of Aurora?", pre: "The capital of Aurora is ", post: ".", answer: "Baler" },
    { id: "cap-bataan", poolKey: "capitals", q: "What is the capital of Bataan?", pre: "The capital of Bataan is ", post: ".", answer: "Balanga City" },
    { id: "cap-bulacan", poolKey: "capitals", q: "What is the capital of Bulacan?", pre: "The capital of Bulacan is ", post: ".", answer: "Malolos City" },
    { id: "cap-necija", poolKey: "capitals", q: "What is the capital of Nueva Ecija?", pre: "The capital of Nueva Ecija is ", post: ".", answer: "Palayan City" },
    { id: "cap-pampanga", poolKey: "capitals", q: "What is the capital of Pampanga?", pre: "The capital of Pampanga is ", post: ".", answer: "City of San Fernando" },
    { id: "cap-tarlac", poolKey: "capitals", q: "What is the capital of Tarlac?", pre: "The capital of Tarlac is ", post: ".", answer: "Tarlac City" },
    { id: "cap-zambales", poolKey: "capitals", q: "What is the capital of Zambales?", pre: "The capital of Zambales is ", post: ".", answer: "Iba" },

    // ---------------- NICKNAMES ----------------
    { id: "nick-corn", poolKey: "provinces", q: 'Which province is known as the "Corn Capital"?', pre: 'The province known as the "Corn Capital" is ', post: ".", answer: "Isabela" },
    { id: "nick-citrus", poolKey: "provinces", q: 'Which province is known as the "Citrus Capital"?', pre: 'The province known as the "Citrus Capital" is ', post: ".", answer: "Nueva Vizcaya" },
    { id: "nick-forest", poolKey: "provinces", q: 'Which province is known as the "Forest Heartland"?', pre: 'The province known as the "Forest Heartland" is ', post: ".", answer: "Quirino" },
    { id: "nick-culinary", poolKey: "provinces", q: 'Which province is known as the "Culinary Capital" and "Christmas Capital"?', pre: 'The province known as the "Culinary Capital" and "Christmas Capital" is ', post: ".", answer: "Pampanga" },
    { id: "nick-melting", poolKey: "provinces", q: 'Which province is known as the "Melting Pot"?', pre: 'The province known as the "Melting Pot" is ', post: ".", answer: "Tarlac" },
    { id: "nick-beach", poolKey: "provinces", q: 'Which province is known as the "Beach Capital"?', pre: 'The province known as the "Beach Capital" is ', post: ".", answer: "Zambales" },
    { id: "nick-milkrice", poolKey: "provinces", q: 'Which province is known as the "Milk & Rice Capital"?', pre: 'The province known as the "Milk & Rice Capital" is ', post: ".", answer: "Nueva Ecija" },
    { id: "nick-heroes", poolKey: "provinces", q: 'Which province is known as the "Land of Heroes" and "Cradle of the Republic"?', pre: 'The province known as the "Land of Heroes" and "Cradle of the Republic" is ', post: ".", answer: "Bulacan" },
    { id: "nick-ibanag", poolKey: "provinces", q: 'Which province is home to the "Premier Ibanag City"?', pre: 'The province home to the "Premier Ibanag City" (Tuguegarao) is ', post: ".", answer: "Cagayan" },

    // ---------------- NAME ORIGINS ----------------
    { id: "origin-aurora", poolKey: "custom", q: "Aurora province was named after whom?", pre: "Aurora province was named after ", post: ".", answer: "Aurora Aragon Quezon", wrongOptions: ["Aurora Pijuan", "Corazon Aquino", "Imelda Marcos"] },
    { id: "origin-isabela", poolKey: "custom", q: "Isabela province's name originates from which Spanish royal?", pre: "Isabela province's name originates from ", post: ".", answer: "Queen Isabella II of Spain", wrongOptions: ["Queen Isabella I of Spain", "King Philip II of Spain", "Queen Maria Cristina"] },
    { id: "origin-quirino", poolKey: "custom", q: "Quirino province is named after which president?", pre: "Quirino province is named after ", post: ".", answer: "Pres. Elpidio Quirino", wrongOptions: ["Pres. Manuel Roxas", "Pres. Sergio Osmeña", "Pres. Ramon Magsaysay"] },
    { id: "origin-tarlac", poolKey: "custom", q: "Tarlac's name is derived from which local grass?", pre: "Tarlac's name is derived from ", post: ", a local tall grass (talahib).", answer: "Matatarlac", wrongOptions: ["Malatarlac tree", "Kugon grass", "Talahib lang"], noFill: true },
    { id: "origin-bulacan", poolKey: "custom", q: "Bulacan's name derives from which two words?", pre: "Bulacan's name derives from ", post: ".", answer: "Bulak and Burak", wrongOptions: ["Bulaklak and Buhok", "Balaan and Bukal", "Bughaw and Bakal"], noFill: true },

    // ---------------- LANDMARKS ----------------
    { id: "lm-mahatao", poolKey: "landmarks", q: "Which Batanes church is a National Cultural Treasure (2001) known for its Blank Book Archive?", pre: "The Batanes church that is a National Cultural Treasure (2001) known for its Blank Book Archive is ", post: ".", answer: "Mahatao Church" },
    { id: "lm-marlboro", poolKey: "landmarks", q: "What is Batanes' famous communal pastureland offering 360° views of hills, livestock, and ocean?", pre: "Batanes' famous communal pastureland offering 360° views is ", post: ".", answer: "Marlboro Hills" },
    { id: "lm-sabtang", poolKey: "landmarks", q: "Which Batanes island, reached by faluwa boat, is home to Chavayan village and the Nakabuang Arch?", pre: "The Batanes island reached by faluwa boat, home to Chavayan village and the Nakabuang Arch, is ", post: ".", answer: "Sabtang Island" },
    { id: "lm-callao", poolKey: "landmarks", q: "Which 7-chamber cave in Cagayan has a natural chapel and is a Homo luzonensis discovery site?", pre: "The 7-chamber cave in Cagayan with a natural chapel, a Homo luzonensis discovery site, is ", post: ".", answer: "Callao Cave" },
    { id: "lm-anguib", poolKey: "landmarks", q: 'Which Cagayan beach is known as the "Boracay of the North"?', pre: 'The Cagayan beach known as the "Boracay of the North" is ', post: ".", answer: "Anguib Beach" },
    { id: "lm-piat", poolKey: "landmarks", q: 'Which shrine in Piat, Cagayan is the "Pilgrimage Center of the North"?', pre: 'The shrine in Piat, Cagayan known as the "Pilgrimage Center of the North" is ', post: ".", answer: "Our Lady of Piat" },
    { id: "lm-stpeter", poolKey: "landmarks", q: "Which major red-brick church in Cagayan, built by Dominican friars, has a three-story bell tower?", pre: "The major red-brick church in Cagayan built by Dominican friars with a three-story bell tower is ", post: ".", answer: "St. Peter Cathedral" },
    { id: "lm-palanan", poolKey: "landmarks", q: "Which isolated Isabela town, behind the Sierra Madre, is where Gen. Aguinaldo was captured?", pre: "The isolated Isabela town behind the Sierra Madre where Gen. Aguinaldo was captured is ", post: ".", answer: "Palanan" },
    { id: "lm-magat", poolKey: "landmarks", q: "Which dam, spanning Isabela and Ifugao, is one of the largest dams in Asia?", pre: "The dam spanning Isabela and Ifugao that is one of the largest dams in Asia is ", post: ".", answer: "Magat Dam" },
    { id: "lm-tumauini", poolKey: "landmarks", q: "Which Isabela church is famous for its unique circular red-brick bell tower?", pre: "The Isabela church famous for its unique circular red-brick bell tower is ", post: ".", answer: "Tumauini Church" },
    { id: "lm-ilagan", poolKey: "landmarks", q: "What is Isabela's top eco-tourism park, home to a Japanese Tunnel, mini-zoo, and cable cars?", pre: "Isabela's top eco-tourism park with a Japanese Tunnel, mini-zoo, and cable cars is the ", post: ".", answer: "Ilagan Sanctuary" },
    { id: "lm-pulag", poolKey: "landmarks", q: 'Which peak, the highest in Luzon, is famous for its "sea of clouds"?', pre: 'The highest peak in Luzon, famous for its "sea of clouds," is ', post: ".", answer: "Mt. Pulag" },
    { id: "lm-capisaan", poolKey: "landmarks", q: "Which cave in Nueva Vizcaya is the 5th longest cave in the Philippines?", pre: "The cave in Nueva Vizcaya that is the 5th longest cave in the Philippines is ", post: ".", answer: "Capisaan Cave" },
    { id: "lm-lowermagat", poolKey: "landmarks", q: "What is the 112-hectare eco-tourism zone in Diadi, Nueva Vizcaya with a lagoon?", pre: "The 112-hectare eco-tourism zone in Diadi, Nueva Vizcaya with a lagoon is the ", post: ".", answer: "Lower Magat Eco-Park" },
    { id: "lm-aglipay", poolKey: "landmarks", q: "Which 37-cave complex in Quirino is known for limestone formations and spelunking?", pre: "The 37-cave complex in Quirino known for limestone formations and spelunking is the ", post: ".", answer: "Aglipay Caves" },
    { id: "lm-landingan", poolKey: "landmarks", q: "What is Quirino's top scenic hill in Nagtipunan, known for flower beds and the Cagayan River view?", pre: "Quirino's top scenic hill in Nagtipunan, known for flower beds and the Cagayan River view, is the ", post: ".", answer: "Landingan Viewpoint" },
    { id: "lm-siitan", poolKey: "landmarks", q: "Which Quirino river features the ship-shaped Bimmapor rock formation?", pre: "The Quirino river featuring the ship-shaped Bimmapor rock formation is the ", post: ".", answer: "Siitan River" },
    { id: "lm-sabang", poolKey: "landmarks", q: "Which Baler beach is considered the birthplace of Philippine surfing?", pre: "The Baler beach considered the birthplace of Philippine surfing is ", post: ".", answer: "Sabang Beach" },
    { id: "lm-dicasalarin", poolKey: "landmarks", q: "Which secluded white-sand cove in Baler is owned by the Angara family?", pre: "The secluded white-sand cove in Baler owned by the Angara family is ", post: ".", answer: "Dicasalarin Cove" },
    { id: "lm-balete", poolKey: "landmarks", q: "What is the name of the over-600-year-old tree in Baler, the largest of its kind in Asia?", pre: "The over-600-year-old tree in Baler, the largest of its kind in Asia, is the ", post: ".", answer: "Millennium Balete Tree" },
    { id: "lm-samat", poolKey: "landmarks", q: "Which Bataan memorial shrine sits atop Mt. Samat?", pre: "The Bataan memorial shrine atop Mt. Samat is the ", post: ".", answer: "Mt. Samat Cross" },
    { id: "lm-lascasas", poolKey: "landmarks", q: "Which Bataan park features restored heritage houses?", pre: "The Bataan park featuring restored heritage houses is ", post: ".", answer: "Las Casas Filipinas de Acuzar" },
    { id: "lm-pawikancenter", poolKey: "landmarks", q: "What is the sea turtle sanctuary in Morong, Bataan called?", pre: "The sea turtle sanctuary in Morong, Bataan is called the ", post: ".", answer: "Pawikan Center" },
    { id: "lm-barasoain", poolKey: "landmarks", q: "Which Bulacan church is featured on the ₱200 bill?", pre: "The Bulacan church featured on the ₱200 bill is ", post: ".", answer: "Barasoain Church" },
    { id: "lm-biaknabato", poolKey: "landmarks", q: "What mountain cave hideout of revolutionaries is located in Bulacan?", pre: "The mountain cave hideout of revolutionaries in Bulacan is ", post: ".", answer: "Biak-na-Bato" },
    { id: "lm-minalungao", poolKey: "landmarks", q: "Which Nueva Ecija park has an emerald river with limestone cliffs?", pre: "The Nueva Ecija park with an emerald river and limestone cliffs is ", post: ".", answer: "Minalungao Park" },
    { id: "lm-pantabangan", poolKey: "landmarks", q: "Which dam in Nueva Ecija is one of the largest in Southeast Asia?", pre: "The dam in Nueva Ecija that is one of the largest in Southeast Asia is the ", post: ".", answer: "Pantabangan Dam" },
    { id: "lm-arayat", poolKey: "landmarks", q: "Which Pampanga mountain is the legendary home of the deity Mariang Sinukuan?", pre: "The Pampanga mountain that is the legendary home of the deity Mariang Sinukuan is ", post: ".", answer: "Mt. Arayat" },
    { id: "lm-betis", poolKey: "landmarks", q: 'Which Pampanga church is called the "Sistine Chapel of the Philippines"?', pre: 'The Pampanga church called the "Sistine Chapel of the Philippines" is ', post: ".", answer: "Betis Church" },
    { id: "lm-monasterio", poolKey: "landmarks", q: "Which Tarlac site holds a verified relic of the True Cross of Christ?", pre: "The Tarlac site holding a verified relic of the True Cross of Christ is the ", post: ".", answer: "Monasterio de Tarlac" },
    { id: "lm-anawangin", poolKey: "landmarks", q: "Which Zambales cove has volcanic ash/gray sand from the 1991 Pinatubo eruption?", pre: "The Zambales cove with volcanic ash/gray sand from the 1991 Pinatubo eruption is ", post: ".", answer: "Anawangin Cove" },
    { id: "lm-nagsasa", poolKey: "landmarks", q: "What is the larger, quieter cove near Anawangin in Zambales called?", pre: "The larger, quieter cove near Anawangin in Zambales is ", post: ".", answer: "Nagsasa Cove" },

    // ---------------- FESTIVALS ----------------
    { id: "fest-palupalu", poolKey: "festivals", q: "What is the Batanes stick-fighting dance called?", pre: "The Batanes stick-fighting dance is called ", post: ".", answer: "Palu-Palu" },
    { id: "fest-kulay", poolKey: "festivals", q: "Which Batanes festival celebrates dried produce like garlic and fish?", pre: "The Batanes festival celebrating dried produce like garlic and fish is ", post: ".", answer: "Kulay" },
    { id: "fest-sinabalu", poolKey: "festivals", q: "Which Cagayan festival involves cooking glutinous rice inside bamboo over open fire?", pre: "The Cagayan festival involving cooking glutinous rice inside bamboo over open fire is the ", post: ".", answer: "Sinabalu Festival" },
    { id: "fest-bambanti", poolKey: "festivals", q: "Which Isabela festival honors farm heritage with scarecrows?", pre: "The Isabela festival honoring farm heritage with scarecrows is the ", post: ".", answer: "Bambanti Festival" },
    { id: "fest-ammungan", poolKey: "festivals", q: "Which Nueva Vizcaya festival celebrates the \"gathering\" of native tribes like Gaddang, Isinai, and Ifugao?", pre: "The Nueva Vizcaya festival celebrating the \"gathering\" of native tribes is the ", post: ".", answer: "Ammungan Festival" },
    { id: "fest-ginamaluan", poolKey: "festivals", q: "Which Quirino festival (June 20-21, Cabarroguis) celebrates the native banana harvest?", pre: "The Quirino festival (June 20-21, Cabarroguis) celebrating the native banana harvest is the ", post: ".", answer: "Ginamaluan Festival" },
    { id: "fest-cocosabutan", poolKey: "festivals", q: "Which Aurora festival (Aug 13-19, Baler) celebrates weaving with sabutan leaves?", pre: "The Aurora festival (Aug 13-19, Baler) celebrating weaving with sabutan leaves is the ", post: ".", answer: "Coco-Sabutan Festival" },
    { id: "fest-siegebaler", poolKey: "festivals", q: "What 337-day standoff inside Baler Church is celebrated as PH-Spanish Friendship Day?", pre: "The 337-day standoff inside Baler Church, celebrated as PH-Spanish Friendship Day, is the ", post: ".", answer: "Siege of Baler" },
    { id: "fest-pawikan", poolKey: "festivals", q: "Which Bataan festival features sea turtle hatchling releases?", pre: "The Bataan festival featuring sea turtle hatchling releases is the ", post: ".", answer: "Pawikan Festival" },
    { id: "fest-obando", poolKey: "festivals", q: "Which Bulacan ritual involves street dancing as a prayer for a child?", pre: "The Bulacan ritual involving street dancing as a prayer for a child is the ", post: ".", answer: "Obando Fertility Rites" },
    { id: "fest-taongputik", poolKey: "festivals", q: "Which Nueva Ecija festival in Aliaga has devotees cover themselves in mud and leaves?", pre: "The Nueva Ecija festival in Aliaga where devotees cover themselves in mud and leaves is the ", post: ".", answer: "Taong Putik Festival" },
    { id: "fest-lantern", poolKey: "festivals", q: "Which Pampanga festival features giant 20-ft lanterns with synchronized lights?", pre: "The Pampanga festival featuring giant 20-ft lanterns with synchronized lights is the ", post: ".", answer: "Giant Lantern Festival" },
    { id: "fest-cutud", poolKey: "festivals", q: "Which Pampanga Good Friday ritual involves real-nail crucifixions?", pre: "The Pampanga Good Friday ritual involving real-nail crucifixions is the ", post: ".", answer: "Cutud Lenten Rites" },
    { id: "fest-malatarlac", poolKey: "festivals", q: "Which Tarlac City festival (Jan 20) celebrates the native grass the city is named after?", pre: "The Tarlac City festival (Jan 20) celebrating the native grass the city is named after is the ", post: ".", answer: "Malatarlac Festival" },
    { id: "fest-dinamulag", poolKey: "festivals", q: "Which Zambales festival (April, Iba) celebrates the world-record sweet Carabao mango?", pre: "The Zambales festival (April, Iba) celebrating the world-record sweet Carabao mango is the ", post: ".", answer: "Dinamulag Mango Festival" },

    // ---------------- LANGUAGES ----------------
    { id: "lang-batanes", poolKey: "languages", q: "What language/dialect is spoken in Batanes?", pre: "The language spoken in Batanes is ", post: ".", answer: "Ivatan" },
    { id: "lang-cagayan", poolKey: "languages", q: "What language/dialect is spoken in Cagayan and North Isabela?", pre: "The language spoken in Cagayan and North Isabela is ", post: ".", answer: "Ibanag" },
    { id: "lang-isabela", poolKey: "languages", q: "What languages are spoken in Central/South Isabela?", pre: "The languages spoken in Central/South Isabela are ", post: ".", answer: "Gaddang & Yogad" },
    { id: "lang-nvizcaya", poolKey: "languages", q: "What language is spoken in Nueva Vizcaya's southern gateway towns?", pre: "The language spoken in Nueva Vizcaya's southern gateway towns is ", post: ".", answer: "Isinai" },
    { id: "lang-quirino", poolKey: "languages", q: "What language is spoken by forest/highland tribes in Quirino?", pre: "The language spoken by forest/highland tribes in Quirino is ", post: ".", answer: "Bugkalot/Agta" },
    { id: "lang-lingua", poolKey: "languages", q: "What language serves as the universal mainland lingua franca of Region 2?", pre: "The universal mainland lingua franca of Region 2 is ", post: ".", answer: "Ilocano" },
    { id: "lang-pampanga", poolKey: "languages", q: "What language is spoken in Pampanga, South Tarlac, and Bataan borders?", pre: "The language spoken in Pampanga, South Tarlac, and Bataan borders is ", post: ".", answer: "Kapampangan" },
    { id: "lang-zambales", poolKey: "languages", q: "What language is spoken in coastal Zambales (Iba, Botolan)?", pre: "The language spoken in coastal Zambales (Iba, Botolan) is ", post: ".", answer: "Sambal" },
    { id: "lang-tagalog", poolKey: "languages", q: "What language dominates Bulacan, Bataan, South Nueva Ecija, and Aurora?", pre: "The dominant language in Bulacan, Bataan, South Nueva Ecija, and Aurora is ", post: ".", answer: "Tagalog" },

    // ---------------- CUSTOM TRIVIA ----------------
    { id: "tv-ranges", poolKey: "custom", q: "How many mountain ranges surround Cagayan Valley?", pre: "Cagayan Valley is surrounded by ", post: " mountain ranges (Sierra Madre, Cordillera, Caraballo).", answer: "3", wrongOptions: ["2", "4", "5"] },
    { id: "tv-river", poolKey: "custom", q: "What is the longest and largest river in the Philippines?", pre: "The longest and largest river in the Philippines is the ", post: ".", answer: "Cagayan River", wrongOptions: ["Pasig River", "Agno River", "Rio Grande de Mindanao"] },
    { id: "tv-babuyan", poolKey: "custom", q: "The Babuyan Islands belong to which province?", pre: "The Babuyan Islands belong to ", post: ", not Batanes.", answer: "Cagayan", wrongOptions: ["Batanes", "Isabela", "Ilocos Norte"] },
    { id: "tv-ludong", poolKey: "custom", q: "What is the most expensive edible fish in the Philippines, found in Cagayan (~₱3.5k-5k/kg)?", pre: "The most expensive edible fish in the Philippines, found in Cagayan, is ", post: ".", answer: "Ludong", wrongOptions: ["Bangus", "Tilapia", "Maya-maya"] },
    { id: "tv-pancit", poolKey: "custom", q: "What Cagayan noodle dish is topped with fried egg and served with egg drop broth?", pre: "The Cagayan noodle dish topped with fried egg and egg drop broth is ", post: ".", answer: "Pancit Batil Patung", wrongOptions: ["Pancit Habhab", "Pancit Malabon", "Pancit Cabagan"] },
    { id: "tv-isabelasize", poolKey: "custom", q: "Isabela is the ___ largest province in the Philippines overall.", pre: "Isabela is the ", post: " largest province in the Philippines overall (largest in Luzon).", answer: "2nd", wrongOptions: ["1st", "3rd", "4th"] },
    { id: "tv-aguinaldo", poolKey: "custom", q: "On what date was Gen. Emilio Aguinaldo captured in Palanan, Isabela?", pre: "Gen. Emilio Aguinaldo was captured in Palanan, Isabela on ", post: ".", answer: "March 23, 1901", wrongOptions: ["June 12, 1898", "December 30, 1896", "February 4, 1899"], noFill: true },
    { id: "tv-freeports", poolKey: "custom", q: "Which two former U.S. military bases became major freeports in Central Luzon?", pre: "", post: " are the two major freeports in Central Luzon, both former U.S. military bases.", answer: "Clark and Subic", wrongOptions: ["Sangley and Clark", "Subic and Sangley Point", "Clark and Wallace Air Station"], noFill: true },
    { id: "tv-surfing", poolKey: "custom", q: "Whose film crew left surfboards behind in Baler in 1979, introducing surfing to the Philippines?", pre: "Philippine surfing began when ", post: "'s film crew (Apocalypse Now) left surfboards behind in Baler in 1979.", answer: "Francis Ford Coppola", wrongOptions: ["Steven Spielberg", "George Lucas", "Martin Scorsese"] },
    { id: "tv-balete-age", poolKey: "custom", q: "How old is the Millennium Balete Tree in Baler?", pre: "The Millennium Balete Tree in Baler is ", post: " old, the largest of its kind in Asia.", answer: "Over 600 years", wrongOptions: ["Over 300 years", "Over 900 years", "Over 1,000 years"], noFill: true },
    { id: "tv-deathmarch-count", poolKey: "custom", q: "About how many POWs were forced on the Bataan Death March?", pre: "About ", post: " POWs were forced on the Bataan Death March.", answer: "75,000", wrongOptions: ["25,000", "50,000", "100,000"] },
    { id: "tv-deathmarch-end", poolKey: "custom", q: "The Bataan Death March went from Mariveles/Bagac to which town?", pre: "The Bataan Death March went from Mariveles/Bagac to ", post: ".", answer: "San Fernando", wrongOptions: ["Balanga", "Olongapo", "Angeles City"] },
    { id: "tv-malolos1899", poolKey: "custom", q: "In what year did Malolos become capital of the First Philippine Republic?", pre: "Malolos, Bulacan became capital of the First Philippine Republic in ", post: ".", answer: "1899", wrongOptions: ["1896", "1898", "1901"] },
    { id: "tv-balagtas", poolKey: "custom", q: 'Who wrote "Florante at Laura"?', pre: '"Florante at Laura" was written by ', post: ", of Bulacan.", answer: "Francisco Balagtas", wrongOptions: ["Jose Rizal", "Andres Bonifacio", "Marcelo H. del Pilar"] },
    { id: "tv-delpilar-m", poolKey: "custom", q: "Who led the Propaganda Movement and edited La Solidaridad, born in Bulakan, Bulacan?", pre: "", post: " led the Propaganda Movement and edited La Solidaridad; born in Bulakan, Bulacan.", answer: "Marcelo H. del Pilar", wrongOptions: ["Jose Rizal", "Graciano Lopez Jaena", "Emilio Jacinto"] },
    { id: "tv-delpilar-g", poolKey: "custom", q: 'Who was the "Boy General" hero of the Battle of Tirad Pass, born in Bulakan, Bulacan?', pre: "", post: ', the "Boy General," was the hero of the Battle of Tirad Pass; born in Bulakan, Bulacan.', answer: "Gregorio del Pilar", wrongOptions: ["Antonio Luna", "Gregorio Aglipay", "Miguel Malvar"] },
    { id: "tv-flagray", poolKey: "custom", q: "Nueva Ecija represents how many of the 8 rays of the sun on the Philippine flag?", pre: "Nueva Ecija represents ", post: " of the 8 rays of the sun on the Philippine flag, for being among the first provinces to revolt against Spain.", answer: "1", wrongOptions: ["2", "0", "3"] },
    { id: "tv-cabanatuan", poolKey: "custom", q: "What famous WWII POW rescue mission took place in Nueva Ecija?", pre: "The famous WWII POW rescue mission in Nueva Ecija was the ", post: ".", answer: "Raid at Cabanatuan", wrongOptions: ["Battle of Bataan", "Leyte Landing", "Battle of Manila"] },
    { id: "tv-sisig", poolKey: "custom", q: "Who created the original Sisig in Angeles City, Pampanga?", pre: "The original Sisig was created by ", post: " in Angeles City, Pampanga.", answer: "Lucing Cunanan", wrongOptions: ["Chef Sandy Daza", "Chef Claude Tayag", "Aling Nena"] },
    { id: "tv-guagua", poolKey: "custom", q: "What does \"Wawa,\" the native word Guagua (Pampanga) derives from, mean?", pre: "Guagua, Pampanga derives from the native word \"Wawa,\" meaning ", post: ".", answer: "river mouth", wrongOptions: ["mountain pass", "rice field", "fishing village"] },
    { id: "tv-hacienda", poolKey: "custom", q: "What agricultural products is Hacienda Luisita in Tarlac associated with?", pre: "Hacienda Luisita in Tarlac is associated with ", post: " production.", answer: "sugar and rice", wrongOptions: ["corn and coconut", "tobacco and cotton", "coffee and cacao"], noFill: true },
    { id: "tv-magsaysay", poolKey: "custom", q: 'Which president, called the "Man of the People," was born in Zambales?', pre: "", post: ', called the "Man of the People," was born in Zambales.', answer: "Ramon Magsaysay", wrongOptions: ["Manuel Roxas", "Elpidio Quirino", "Carlos P. Garcia"] },
    { id: "tv-pulagheight", poolKey: "custom", q: "What is the elevation of Mt. Pulag, the highest peak in Luzon?", pre: "Mt. Pulag, the highest peak in Luzon, stands at ", post: ".", answer: "2,928 meters", wrongOptions: ["2,642 meters", "3,144 meters", "2,037 meters"] },
    { id: "tv-tapulaoheight", poolKey: "custom", q: "What is the elevation of Mt. Tapulao in Zambales?", pre: "Mt. Tapulao in Zambales stands at ", post: ".", answer: "2,037 meters", wrongOptions: ["1,845 meters", "2,928 meters", "1,200 meters"] },
    { id: "tv-mango", poolKey: "custom", q: "What mango variety from Zambales holds a Guinness World Record for sweetest mango?", pre: "The ", post: " mango variety from Zambales holds a Guinness World Record for sweetest mango.", answer: "Dinamulag", wrongOptions: ["Carabao", "Pico", "Indian"] },
    { id: "tv-ricegranary", poolKey: "custom", q: '"Rice Granary of the Philippines" is the nickname of which region?', pre: "", post: ' is known as the "Rice Granary of the Philippines."', answer: "Central Luzon (Region 3)", wrongOptions: ["Cagayan Valley (Region 2)", "Western Visayas", "Ilocos Region"], noFill: true },

    // ================= REGION 1: ILOCOS REGION =================

    // ---------------- CAPITALS ----------------
    { id: "cap-ilocosnorte", poolKey: "capitals", q: "What is the capital of Ilocos Norte?", pre: "The capital of Ilocos Norte is ", post: ".", answer: "Laoag City" },
    { id: "cap-ilocossur", poolKey: "capitals", q: "What is the capital of Ilocos Sur?", pre: "The capital of Ilocos Sur is ", post: ".", answer: "Vigan City" },
    { id: "cap-launion", poolKey: "capitals", q: "What is the capital of La Union?", pre: "The capital of La Union is ", post: ".", answer: "San Fernando City (La Union)" },
    { id: "cap-pangasinan", poolKey: "capitals", q: "What is the capital of Pangasinan?", pre: "The capital of Pangasinan is ", post: ".", answer: "Lingayen" },

    // ---------------- NICKNAMES ----------------
    { id: "nick-ilocosnorte", poolKey: "provinces", q: 'Which province is nicknamed "Home of Great Leaders" and "City of My Dreams" (for its capital)?', pre: 'The province nicknamed "Home of Great Leaders" / "City of My Dreams" is ', post: ".", answer: "Ilocos Norte" },
    { id: "nick-ilocossur", poolKey: "provinces", q: 'Which province is nicknamed "The Heritage of the Philippines"?', pre: 'The province nicknamed "The Heritage of the Philippines" is ', post: ".", answer: "Ilocos Sur" },
    { id: "nick-launion", poolKey: "provinces", q: 'Which province is nicknamed the "Garden Coast"?', pre: 'The province nicknamed the "Garden Coast" is ', post: ".", answer: "La Union" },
    { id: "nick-pangasinan", poolKey: "provinces", q: 'Which province is nicknamed the "Most Romantic Place in the Philippines"?', pre: 'The province nicknamed the "Most Romantic Place in the Philippines" is ', post: ".", answer: "Pangasinan" },

    // ---------------- TOURIST ATTRACTIONS (province) ----------------
    { id: "attr-pagudpud", poolKey: "provinces", q: "Pagudpud Beach is a major tourist attraction in which province?", pre: "Pagudpud Beach is a major tourist attraction in ", post: ".", answer: "Ilocos Norte" },
    { id: "attr-paoay", poolKey: "provinces", q: "The San Agustin Church of Paoay is located in which province?", pre: "The San Agustin Church of Paoay is located in ", post: ".", answer: "Ilocos Norte" },
    { id: "attr-patapat", poolKey: "provinces", q: "The Patapat Viaduct is a major tourist attraction in which province?", pre: "The Patapat Viaduct is a major tourist attraction in ", post: ".", answer: "Ilocos Norte" },
    { id: "attr-callecrisologo", poolKey: "provinces", q: "Calle Crisologo is a major tourist attraction in which province?", pre: "Calle Crisologo is a major tourist attraction in ", post: ".", answer: "Ilocos Sur" },
    { id: "attr-bantay", poolKey: "provinces", q: "The Bantay Church Bell Tower is located in which province?", pre: "The Bantay Church Bell Tower is located in ", post: ".", answer: "Ilocos Sur" },
    { id: "attr-vigancathedral", poolKey: "provinces", q: "Vigan Cathedral is a major tourist attraction in which province?", pre: "Vigan Cathedral is a major tourist attraction in ", post: ".", answer: "Ilocos Sur" },
    { id: "attr-baluarte", poolKey: "provinces", q: "The Baluarte Watch Tower is a major tourist attraction in which province?", pre: "The Baluarte Watch Tower is a major tourist attraction in ", post: ".", answer: "La Union" },
    { id: "attr-machotemple", poolKey: "provinces", q: "The Ma-Cho Temple is a major tourist attraction in which province?", pre: "The Ma-Cho Temple is a major tourist attraction in ", post: ".", answer: "La Union" },
    { id: "attr-christredeemer", poolKey: "provinces", q: "The Christ Redeemer Statue is a major tourist attraction in which province?", pre: "The Christ Redeemer Statue is a major tourist attraction in ", post: ".", answer: "La Union" },
    { id: "attr-hundredislands", poolKey: "provinces", q: "The Hundred Islands is a major tourist attraction in which province?", pre: "The Hundred Islands is a major tourist attraction in ", post: ".", answer: "Pangasinan" },
    { id: "attr-skyplaza", poolKey: "provinces", q: "Sky Plaza is a major tourist attraction in which province?", pre: "Sky Plaza is a major tourist attraction in ", post: ".", answer: "Pangasinan" },
    { id: "attr-patarbeach", poolKey: "provinces", q: "Patar Beach Resort is a major tourist attraction in which province?", pre: "Patar Beach Resort is a major tourist attraction in ", post: ".", answer: "Pangasinan" },

    // ---------------- ACTIVITIES (province) ----------------
    { id: "act-dingras", poolKey: "provinces", q: "In which province can you take a hike in Dingras?", pre: "Taking a hike in Dingras is a major activity in ", post: ".", answer: "Ilocos Norte" },
    { id: "act-bojeador", poolKey: "provinces", q: "In which province can you climb up to Cape Bojeador Lighthouse?", pre: "Climbing up to Cape Bojeador Lighthouse is a major activity in ", post: ".", answer: "Ilocos Norte" },
    { id: "act-sandboard", poolKey: "provinces", q: "In which province can you go sand boarding and ride a 4x4 at the sand dunes?", pre: "Sand boarding and 4x4 riding at the sand dunes is a major activity in ", post: ".", answer: "Ilocos Norte" },
    { id: "act-bantaytower", poolKey: "provinces", q: "In which province can you climb the winding staircase of the Bantay Bell Tower?", pre: "Climbing the winding staircase of the Bantay Bell Tower is a major activity in ", post: ".", answer: "Ilocos Sur" },
    { id: "act-empanada", poolKey: "provinces", q: "In which province is trying the famous Empanada a major activity?", pre: "Taking a bite of the famous Empanada is a major activity in ", post: ".", answer: "Ilocos Sur" },
    { id: "act-antiques", poolKey: "provinces", q: "In which province can you hunt for antiques and furniture as a major activity?", pre: "Hunting for antiques and furniture is a major activity in ", post: ".", answer: "Ilocos Sur" },
    { id: "act-beachchill", poolKey: "provinces", q: "In which province is chilling out at the beach listed as a major activity?", pre: "Chilling out at the beach is a major activity in ", post: ".", answer: "La Union" },
    { id: "act-surfing", poolKey: "provinces", q: "Surfing is a major activity in which province?", pre: "Surfing is a major activity in ", post: ".", answer: "La Union" },
    { id: "act-cliffjump", poolKey: "provinces", q: "Cliff-jumping is a major activity in which province?", pre: "Cliff-jumping is a major activity in ", post: ".", answer: "La Union" },
    { id: "act-islandhop", poolKey: "provinces", q: "Island hopping in the Hundred Islands is a major activity in which province?", pre: "Island hopping in the Hundred Islands is a major activity in ", post: ".", answer: "Pangasinan" },
    { id: "act-zipline", poolKey: "provinces", q: "Zip-lining over the water in Virgin Islands is a major activity in which province?", pre: "Zip-lining over the water in Virgin Islands is a major activity in ", post: ".", answer: "Pangasinan" },
    { id: "act-enchantedcave", poolKey: "provinces", q: "Exploring the Enchanted Cave in Bolinao is a major activity in which province?", pre: "Exploring the Enchanted Cave in Bolinao is a major activity in ", post: ".", answer: "Pangasinan" },

    // ---------------- FESTIVALS ----------------
    { id: "fest-pamulinawen", poolKey: "festivals", q: "What is the major festival of Ilocos Norte called?", pre: "The major festival of Ilocos Norte is the ", post: ".", answer: "Pamulinawen Festival" },
    { id: "fest-longganisa", poolKey: "festivals", q: "What is the major festival of Ilocos Sur called?", pre: "The major festival of Ilocos Sur is the ", post: ".", answer: "Longganisa Festival" },
    { id: "fest-dinengdeng", poolKey: "festivals", q: "What is the major festival of La Union called?", pre: "The major festival of La Union is the ", post: ".", answer: "Dinengdeng Festival" },
    { id: "fest-bangus", poolKey: "festivals", q: "What is the major festival of Pangasinan called?", pre: "The major festival of Pangasinan is the ", post: ".", answer: "Bangus Festival" },

    // ---------------- REGION 1 OVERVIEW TRIVIA ----------------
    { id: "tv-ilocosname", poolKey: "custom", q: "Region 1 is also known as which region?", pre: "Region 1 is also known as the ", post: ".", answer: "Ilocos Region", wrongOptions: ["Cagayan Valley", "Central Luzon", "Cordillera Administrative Region"] },
    { id: "tv-ilocosprovcount", poolKey: "custom", q: "How many provinces make up the Ilocos Region (Region 1)?", pre: "The Ilocos Region (Region 1) is composed of ", post: " provinces.", answer: "4", wrongOptions: ["3", "5", "6"] },
    { id: "tv-ilocossea", poolKey: "custom", q: "Which body of water lies to the west of the Ilocos Region?", pre: "The body of water to the west of the Ilocos Region is the ", post: ".", answer: "South China Sea", wrongOptions: ["Pacific Ocean", "Sulu Sea", "Philippine Sea"] },
    { id: "tv-ilocossouth", poolKey: "custom", q: "Which region borders the Ilocos Region to the south?", pre: "The region bordering the Ilocos Region to the south is ", post: ".", answer: "Central Luzon", wrongOptions: ["Cagayan Valley", "CALABARZON", "Cordillera Administrative Region"] },
    { id: "tv-ilocoseast", poolKey: "custom", q: "Which two regions border the Ilocos Region to the east?", pre: "The regions bordering the Ilocos Region to the east are the ", post: ".", answer: "Cordillera Administrative Region and Cagayan Valley", wrongOptions: ["Central Luzon and CALABARZON", "Cagayan Valley and Central Luzon", "Bicol Region and Cagayan Valley"], noFill: true },
  ];

  function categoryFor(fact) {
    if (fact.id.startsWith("cap-")) return "Capitals";
    if (fact.id.startsWith("nick-")) return "Nicknames";
    if (fact.id.startsWith("origin-")) return "Name Origins";
    if (fact.id.startsWith("lm-")) return "Landmarks";
    if (fact.id.startsWith("fest-")) return "Festivals";
    if (fact.id.startsWith("lang-")) return "Language";
    if (fact.id.startsWith("attr-")) return "Tourist Spots";
    if (fact.id.startsWith("act-")) return "Activities";
    if (fact.id.startsWith("tv-")) return "Trivia";
    return "General";
  }

  registerSubject({
    id: "pctg",
    label: "PCTG",
    badge: "REGION I–III",
    subtitle: "Ilocos Region, Cagayan Valley & Central Luzon — capitals, landmarks, festivals, trivia.",
    pools: POOLS,
    facts: FACTS,
    categoryFn: categoryFor,
  });
})();
