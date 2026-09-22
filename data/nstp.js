/* Question bank for NSTP (National Service Training Program): history & legal basis,
   the three components, values and ethics, and citizenship training. */
(function () {
  "use strict";

  const POOLS = {
    nstp_components: ["ROTC", "CWTS", "LTS"],
    monitoring_agencies: ["CHED", "TESDA", "DND", "AFP"],
    shared_values: ["Reciprocity", "Good intent", "Appreciation of merit"],
    ph_constitutions: ["Biak-na-Bato Constitution", "Malolos Constitution", "Commonwealth Constitution", "1943 Constitution", "1973 Constitution", "Freedom Constitution", "1987 Constitution"],
    citizenship_modes: ["Jus Soli", "Jus Sanguinis"],
    nstp_core_values: ["Unity", "Patriotism", "Faith in God", "Respect for Life", "Truth", "Justice", "Freedom", "Equality", "Peace", "Concern for Family", "Concern for the Environment", "Volunteerism"],
  };

  const FACTS = [
    // ---------------- WHAT IS NSTP ----------------
    { id: "nstp-fullname", poolKey: "custom", category: "What is NSTP?", q: "What does NSTP stand for?", pre: "NSTP stands for ", post: ".", answer: "National Service Training Program", wrongOptions: ["National Student Training Program", "National Service Training Policy", "National Skills Training Program"], noFill: true },
    { id: "nstp-ra", poolKey: "custom", category: "What is NSTP?", q: "Under which Republic Act was NSTP established, to develop civic consciousness and defense preparedness among the youth?", pre: "NSTP was established under ", post: ", to develop civic consciousness and defense preparedness among the youth.", answer: "RA 9163", wrongOptions: ["RA 7077", "RA 1478", "RA 710"] },

    // ---------------- HISTORY & LEGAL BASIS ----------------
    { id: "hist-ra9163-year", poolKey: "custom", category: "History & Legal Basis", q: "In what year was RA 9163, the NSTP Act, signed into law?", pre: "RA 9163, the NSTP Act, was signed into law in ", post: ".", answer: "2002", wrongOptions: ["2001", "1999", "2003"] },
    { id: "hist-ra9163-president", poolKey: "custom", category: "History & Legal Basis", q: "Which president signed RA 9163, the NSTP Act of 2002?", pre: "RA 9163, the NSTP Act of 2002, was signed by President ", post: ".", answer: "Gloria Macapagal Arroyo", wrongOptions: ["Cory Aquino", "Ferdinand Marcos", "Joseph Estrada"] },
    { id: "hist-pd1706", poolKey: "custom", category: "History & Legal Basis", q: "Which president issued Presidential Decree No. 1706, the National Service Law, in 1980?", pre: "Presidential Decree No. 1706, the National Service Law (1980), was issued by President ", post: ".", answer: "Ferdinand Marcos", wrongOptions: ["Manuel L. Quezon", "Cory Aquino", "Gloria Macapagal Arroyo"] },
    { id: "hist-ra7077", poolKey: "custom", category: "History & Legal Basis", q: "Which Republic Act required all male college students to complete a 2-year ROTC program as a graduation requirement?", pre: "The Republic Act requiring all male college students to complete a 2-year ROTC program as a graduation requirement was ", post: ".", answer: "RA 7077", wrongOptions: ["RA 9163", "PD 1706", "RA 9139"] },
    { id: "hist-chua", poolKey: "custom", category: "History & Legal Basis", q: "Which UST student's 2001 death, after exposing ROTC corruption, sparked nationwide protests and led to NSTP reform?", pre: "The UST student whose 2001 death, after exposing ROTC corruption, sparked nationwide protests and led to NSTP reform was ", post: ".", answer: "Mark Welson Chua", wrongOptions: ["Plaridel Abaya", "Manuel L. Quezon", "Jose D. Aspiras"] },
    { id: "hist-abaya", poolKey: "custom", category: "History & Legal Basis", q: "Which Representative filed the bill in July 2001 that eventually became the NSTP law?", pre: "The Representative who filed the bill in July 2001 that eventually became the NSTP law was ", post: ".", answer: "Plaridel Abaya", wrongOptions: ["Mark Welson Chua", "Emilio Aguinaldo", "Gloria Macapagal Arroyo"] },
    { id: "hist-article", poolKey: "custom", category: "History & Legal Basis", q: "Which Article of the 1987 Constitution (Sections 4, 5, and 13) provides the constitutional basis for NSTP?", pre: "The constitutional basis for NSTP (Sections 4, 5, and 13) is found in ", post: " of the 1987 Constitution.", answer: "Article II", wrongOptions: ["Article III", "Article IV", "Article XIV"] },

    // ---------------- THE THREE PROGRAM COMPONENTS ----------------
    { id: "comp-rotc", poolKey: "nstp_components", category: "NSTP Components", q: "Which NSTP component prepares students for national defense and military service as AFP reservists?", pre: "The NSTP component that prepares students for national defense and military service as AFP reservists is ", post: ".", answer: "ROTC" },
    { id: "comp-cwts", poolKey: "nstp_components", category: "NSTP Components", q: "Which NSTP component focuses on community development, health, education, and environmental welfare?", pre: "The NSTP component focusing on community development, health, education, and environmental welfare is ", post: ".", answer: "CWTS" },
    { id: "comp-lts", poolKey: "nstp_components", category: "NSTP Components", q: "Which NSTP component teaches literacy and numeracy to children and out-of-school youth?", pre: "The NSTP component that teaches literacy and numeracy to children and out-of-school youth is ", post: ".", answer: "LTS" },
    { id: "comp-rotc-full", poolKey: "custom", category: "NSTP Components", q: "What does ROTC stand for?", pre: "ROTC stands for ", post: ".", answer: "Reserve Officers' Training Corps", wrongOptions: ["Reserve Officers' Training Command", "Regional Officers' Training Corps", "Reserve Operations Training Corps"], noFill: true },
    { id: "comp-cwts-full", poolKey: "custom", category: "NSTP Components", q: "What does CWTS stand for?", pre: "CWTS stands for ", post: ".", answer: "Civic Welfare Training Service", wrongOptions: ["Community Welfare Training Service", "Civic Work Training Service", "Civil Welfare Training System"], noFill: true },
    { id: "comp-lts-full", poolKey: "custom", category: "NSTP Components", q: "What does LTS stand for?", pre: "LTS stands for ", post: ".", answer: "Literacy Training Service", wrongOptions: ["Literacy Teaching Service", "Local Training Service", "Learning Training Service"], noFill: true },

    // ---------------- FAQS ----------------
    { id: "faq-units", poolKey: "custom", category: "NSTP FAQs", q: "NSTP is equivalent to how many academic units, taken over 2 semesters?", pre: "NSTP is equivalent to ", post: " academic units, taken over 2 semesters.", answer: "3", wrongOptions: ["2", "4", "6"] },
    { id: "faq-nsrc", poolKey: "custom", category: "NSTP FAQs", q: "Non-ROTC NSTP graduates join which organization for literacy and civic welfare work?", pre: "Non-ROTC NSTP graduates join the ", post: " for literacy and civic welfare work.", answer: "National Service Reserve Corps", wrongOptions: ["Citizen Armed Force", "AFP Reserve", "Philippine Tourism Authority"], noFill: true },
    { id: "faq-tuitioncap", poolKey: "custom", category: "NSTP FAQs", q: "NSTP fees must not exceed what percentage of the normal tuition charge per unit?", pre: "NSTP fees must not exceed ", post: " of the normal tuition charge per unit.", answer: "50%", wrongOptions: ["25%", "75%", "100%"] },
    { id: "faq-ched", poolKey: "monitoring_agencies", category: "NSTP FAQs", q: "Which agency, the Commission on Higher Education, monitors NSTP?", pre: "The Commission on Higher Education, which monitors NSTP, is abbreviated ", post: ".", answer: "CHED" },
    { id: "faq-tesda", poolKey: "monitoring_agencies", category: "NSTP FAQs", q: "Which agency, the Technical Education and Skills Development Authority, monitors NSTP?", pre: "The Technical Education and Skills Development Authority, which monitors NSTP, is abbreviated ", post: ".", answer: "TESDA" },
    { id: "faq-dnd", poolKey: "monitoring_agencies", category: "NSTP FAQs", q: "Which department jointly supervises the ROTC component together with schools?", pre: "The department that jointly supervises the ROTC component together with schools is the ", post: ".", answer: "DND" },

    // ---------------- CORE VALUES ----------------
    { id: "core-volunteerism", poolKey: "nstp_core_values", category: "Core Values", q: "Which NSTP core value means giving time and effort freely to help others without expecting anything in return?", pre: "The NSTP core value meaning giving time and effort freely to help others without expecting anything in return is ", post: ".", answer: "Volunteerism" },
    { id: "core-patriotism", poolKey: "nstp_core_values", category: "Core Values", q: "Which NSTP core value means love, loyalty, and devotion to the country through responsible citizenship?", pre: "The NSTP core value meaning love, loyalty, and devotion to the country through responsible citizenship is ", post: ".", answer: "Patriotism" },
    { id: "core-justice", poolKey: "nstp_core_values", category: "Core Values", q: "Which NSTP core value means fair treatment and giving everyone their rights without discrimination?", pre: "The NSTP core value meaning fair treatment and giving everyone their rights without discrimination is ", post: ".", answer: "Justice" },
    { id: "core-unity", poolKey: "nstp_core_values", category: "Core Values", q: "Which NSTP core value means willingness to work together toward a common goal despite differences?", pre: "The NSTP core value meaning willingness to work together toward a common goal despite differences is ", post: ".", answer: "Unity" },
    { id: "core-truth", poolKey: "nstp_core_values", category: "Core Values", q: "Which NSTP core value means being honest and factual, even when it's difficult?", pre: "The NSTP core value meaning being honest and factual, even when it's difficult, is ", post: ".", answer: "Truth" },

    // ---------------- VALUES AND ETHICS ----------------
    { id: "valethics-valere", poolKey: "custom", category: "Values and Ethics", q: "The word \"value\" comes from which Latin word, meaning \"to measure the worth of something\"?", pre: "The word \"value\" comes from the Latin word \"", post: ",\" meaning \"to measure the worth of something.\"", answer: "valere", wrongOptions: ["veritas", "virtus", "valor"] },
    { id: "valethics-reciprocity", poolKey: "shared_values", category: "Values and Ethics", q: "Which of the 3 shared values means \"one good deed deserves another\"?", pre: "The shared value meaning \"one good deed deserves another\" is ", post: ".", answer: "Reciprocity" },
    { id: "valethics-goodintent", poolKey: "shared_values", category: "Values and Ethics", q: "Which of the 3 shared values means \"a gentleman's word is his bond\"?", pre: "The shared value meaning \"a gentleman's word is his bond\" is ", post: ".", answer: "Good intent" },
    { id: "valethics-merit", poolKey: "shared_values", category: "Values and Ethics", q: "Which of the 3 shared values means giving credit where it's due, regardless of feelings?", pre: "The shared value meaning giving credit where it's due, regardless of feelings, is ", post: ".", answer: "Appreciation of merit" },
    { id: "valethics-groupthink", poolKey: "custom", category: "Values and Ethics", q: "What term describes going along with the crowd instead of thinking independently, a group cause of unethical behavior?", pre: "The term describing going along with the crowd instead of thinking independently is ", post: ".", answer: "Groupthink", wrongOptions: ["Peer pressure", "Conformity bias", "Herd mentality"] },

    // ---------------- CITIZENSHIP TRAINING ----------------
    { id: "citizen-biaknabato", poolKey: "ph_constitutions", category: "Citizenship Training", q: "Which 1897 Philippine constitution, under Emilio Aguinaldo, was the first revolutionary constitution?", pre: "The 1897 Philippine constitution, under Emilio Aguinaldo, that was the first revolutionary constitution is the ", post: ".", answer: "Biak-na-Bato Constitution" },
    { id: "citizen-malolos", poolKey: "ph_constitutions", category: "Citizenship Training", q: "Which 1899 Philippine constitution established the First Philippine Republic?", pre: "The 1899 Philippine constitution that established the First Philippine Republic is the ", post: ".", answer: "Malolos Constitution" },
    { id: "citizen-1943", poolKey: "ph_constitutions", category: "Citizenship Training", q: "Which Philippine constitution, under President Jose P. Laurel, was used during the Japanese occupation in WWII?", pre: "The Philippine constitution, under President Jose P. Laurel, used during the Japanese occupation in WWII is the ", post: ".", answer: "1943 Constitution" },
    { id: "citizen-1973", poolKey: "ph_constitutions", category: "Citizenship Training", q: "Which Philippine constitution was in effect during Martial Law under Ferdinand Marcos Sr.?", pre: "The Philippine constitution in effect during Martial Law under Ferdinand Marcos Sr. is the ", post: ".", answer: "1973 Constitution" },
    { id: "citizen-freedom", poolKey: "ph_constitutions", category: "Citizenship Training", q: "Which provisional Philippine constitution followed the 1986 EDSA Revolution under Corazon Aquino?", pre: "The provisional Philippine constitution that followed the 1986 EDSA Revolution under Corazon Aquino is the ", post: ".", answer: "Freedom Constitution" },
    { id: "citizen-1987", poolKey: "ph_constitutions", category: "Citizenship Training", q: "Which is the current Philippine constitution, ratified in 1987 after the EDSA Revolution?", pre: "The current Philippine constitution, ratified in 1987 after the EDSA Revolution, is the ", post: ".", answer: "1987 Constitution" },
    { id: "citizen-jussoli", poolKey: "citizenship_modes", category: "Citizenship Training", q: "Which principle grants citizenship based on the place of birth?", pre: "The principle granting citizenship based on the place of birth is ", post: ".", answer: "Jus Soli" },
    { id: "citizen-jussanguinis", poolKey: "citizenship_modes", category: "Citizenship Training", q: "Which principle grants citizenship based on the citizenship of one's parents?", pre: "The principle granting citizenship based on the citizenship of one's parents is ", post: ".", answer: "Jus Sanguinis" },
    { id: "citizen-relation", poolKey: "custom", category: "Citizenship Training", q: "What is the legal relationship between a person and a state called?", pre: "The legal relationship between a person and a state is called ", post: ".", answer: "Citizenship", wrongOptions: ["Nationality", "Residency", "Domicile"] },
    { id: "citizen-nationality", poolKey: "custom", category: "Citizenship Training", q: "What term refers to the status of belonging to a nation, usually the country where a person was born?", pre: "The term referring to the status of belonging to a nation, usually where a person was born, is ", post: ".", answer: "Nationality", wrongOptions: ["Citizenship", "Naturalization", "Residency"] },
    { id: "citizen-felipe", poolKey: "custom", category: "Citizenship Training", q: "Who composed the music for the Philippine National Anthem, \"Lupang Hinirang\"?", pre: "The music for the Philippine National Anthem, \"Lupang Hinirang,\" was composed by ", post: ".", answer: "Julian Felipe", wrongOptions: ["Jose Palma", "Jose Rizal", "Emilio Aguinaldo"] },
    { id: "citizen-palma", poolKey: "custom", category: "Citizenship Training", q: "Who wrote the poem \"Filipinas,\" later adapted as the lyrics of the Philippine National Anthem?", pre: "The poem \"Filipinas,\" later adapted as the lyrics of the Philippine National Anthem, was written by ", post: ".", answer: "Jose Palma", wrongOptions: ["Julian Felipe", "Andres Bonifacio", "Emilio Aguinaldo"] },
  ];

  registerSubject({
    id: "nstp",
    label: "NSTP",
    badge: "CIVIC & VALUES",
    subtitle: "National Service Training Program — history, ROTC/CWTS/LTS, values & ethics, and citizenship training.",
    pools: POOLS,
    facts: FACTS,
  });
})();
