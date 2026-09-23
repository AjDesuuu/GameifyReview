/* Question bank for MMW (Mathematics in the Modern World): Fibonacci & nature, patterns and
   sequences, mathematical language, sets, logic, reasoning & problem solving, data management,
   and modular arithmetic. Every fact carries a worked `solution`, so questions are asked as
   Multiple Choice or typed answers (never True/False) and the steps are shown on a wrong answer.
   `accept` lists alternate typed answers; `noFill` keeps a fact multiple-choice only. */
(function () {
  "use strict";

  const FACTS = [
    // ---------------- FIBONACCI & NATURE ----------------
    {
      id: "fib-20", category: "Fibonacci & Nature",
      q: "Let Fib(n) be the nth term of the Fibonacci sequence with Fib(2) = 1, Fib(3) = 2, Fib(4) = 3, and so on. Find Fib(20).",
      answer: "6765", wrongOptions: ["6735", "8976", "5238"],
      solution: [
        "Each term is the sum of the two terms before it: Fib(n) = Fib(n−1) + Fib(n−2).",
        "Fib(1)–Fib(10): 1, 1, 2, 3, 5, 8, 13, 21, 34, 55",
        "Fib(11)–Fib(20): 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765",
        "So Fib(20) = 2584 + 4181 = 6765.",
      ],
    },
    {
      id: "fib-pattern", category: "Fibonacci & Nature", noFill: true,
      q: "What is the Fibonacci number pattern?",
      answer: "Adding the two numbers before it to get the next number.",
      wrongOptions: ["Subtracting the two numbers before it to get the next number.", "Multiplying the two numbers before it to get the next number.", "Counting up starting from 1 by 1."],
      solution: [
        "The Fibonacci rule is Fib(n) = Fib(n−1) + Fib(n−2).",
        "Example: 1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8 …",
        "So each number is the SUM of the two numbers before it.",
      ],
    },
    {
      id: "fib-24", category: "Fibonacci & Nature",
      q: "If Fib(23) = 17,711 and Fib(25) = 46,368, what is Fib(24)?",
      answer: "28657", accept: ["28,657"], wrongOptions: ["28567", "28765", "29876"],
      solution: [
        "By the Fibonacci rule: Fib(25) = Fib(24) + Fib(23).",
        "Rearrange: Fib(24) = Fib(25) − Fib(23).",
        "Fib(24) = 46,368 − 17,711 = 28,657.",
      ],
    },
    {
      id: "fib-12th", category: "Fibonacci & Nature",
      q: "The first four Fibonacci numbers are 1, 1, 2, and 3. What is the twelfth number?",
      answer: "144", wrongOptions: ["89", "55", "233"],
      solution: [
        "Keep adding the last two numbers:",
        "1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144",
        "Counting them, the 12th number is 144.",
      ],
    },
    {
      id: "fib-missing", category: "Fibonacci & Nature",
      q: "What is the missing number in the Fibonacci sequence? … 55, __, 144",
      answer: "89", wrongOptions: ["79", "99", "109"],
      solution: [
        "The next term is the sum of the two before it, so 55 + (missing) = 144.",
        "Missing = 144 − 55 = 89.",
        "Check: 55 + 89 = 144 ✓",
      ],
    },
    {
      id: "fib-15th", category: "Fibonacci & Nature",
      q: "Starting 1, 1, 2, 3, 5, …, what is the 15th Fibonacci number?",
      answer: "610", wrongOptions: ["377", "987", "600"],
      solution: [
        "List the terms: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610",
        "The 14th term is 377 and the 13th is 233, so the 15th = 233 + 377 = 610.",
      ],
    },
    {
      id: "fib-sum10", category: "Fibonacci & Nature",
      q: "What is the sum of the first 10 Fibonacci numbers (1, 1, 2, 3, 5, 8, 13, 21, 34, 55)?",
      answer: "143", wrongOptions: ["144", "142", "133"],
      solution: [
        "Add them: 1 + 1 + 2 + 3 + 5 + 8 = 20",
        "20 + 13 + 21 = 54",
        "54 + 34 + 55 = 143",
        "Shortcut: the sum of the first n Fibonacci numbers = Fib(n+2) − 1 = 144 − 1 = 143.",
      ],
    },
    {
      id: "fib-goldenratio", category: "Fibonacci & Nature",
      q: "The ratio of consecutive Fibonacci numbers (like 89 ÷ 55) approaches the Golden Ratio. What is its approximate value, to 3 decimal places?",
      answer: "1.618", accept: ["1.62"], wrongOptions: ["1.414", "3.142", "2.718"],
      solution: [
        "Divide a Fibonacci number by the one before it: 89 ÷ 55 ≈ 1.618, 144 ÷ 89 ≈ 1.618.",
        "The exact value is φ = (1 + √5) ÷ 2 ≈ (1 + 2.236) ÷ 2 ≈ 1.618.",
        "Note: 1.414 is √2, 3.142 is π, and 2.718 is e.",
      ],
    },
    {
      id: "fib-phi", category: "Fibonacci & Nature",
      q: "Which Greek letter is used to represent the Golden Ratio?",
      answer: "Phi", accept: ["φ", "Φ"], wrongOptions: ["Pi", "Theta", "Sigma"],
      solution: [
        "The Golden Ratio is written as φ (phi) ≈ 1.618.",
        "π (pi) ≈ 3.1416 is the ratio of a circle's circumference to its diameter — a different constant.",
      ],
    },
    {
      id: "fib-estimate", category: "Fibonacci & Nature",
      q: "Using the Golden Ratio (≈ 1.618), estimate the Fibonacci number that comes after 144.",
      answer: "233", wrongOptions: ["232", "234", "288"],
      solution: [
        "Next Fibonacci number ≈ current × 1.618.",
        "144 × 1.618 ≈ 232.99, which rounds to 233.",
        "Check with the rule: 89 + 144 = 233 ✓",
      ],
    },
    {
      id: "fib-leonardo", category: "Fibonacci & Nature",
      q: "Which mathematician introduced the Fibonacci sequence to Western Europe in his book Liber Abaci (1202)?",
      answer: "Leonardo of Pisa", accept: ["Fibonacci", "Leonardo Pisano", "Leonardo Fibonacci", "Leonardo"], wrongOptions: ["Blaise Pascal", "Euclid", "Pythagoras"],
      solution: [
        "Leonardo of Pisa, better known as Fibonacci, wrote Liber Abaci in 1202.",
        "The book included the famous rabbit-breeding problem whose answer follows the sequence 1, 1, 2, 3, 5, 8, …",
      ],
    },
    {
      id: "fib-notfib", category: "Fibonacci & Nature", noFill: true,
      q: "Which of the following is NOT a Fibonacci number?",
      answer: "100", wrongOptions: ["89", "144", "233"],
      solution: [
        "Fibonacci numbers near 100: … 55, 89, 144, 233 …",
        "89 + 55 = 144 and 89 + 144 = 233, so these are all in the sequence.",
        "100 falls between 89 and 144, so it is NOT a Fibonacci number.",
      ],
    },

    // ---------------- PATTERNS & SEQUENCES ----------------
    {
      id: "seq-arith-20th", category: "Patterns & Sequences",
      q: "Find the 20th term of the arithmetic sequence 3, 7, 11, 15, …",
      answer: "79", wrongOptions: ["83", "75", "80"],
      solution: [
        "First term a₁ = 3, common difference d = 7 − 3 = 4.",
        "Formula: aₙ = a₁ + (n − 1)d",
        "a₂₀ = 3 + (20 − 1)(4) = 3 + 76 = 79.",
      ],
    },
    {
      id: "seq-arith-sum", category: "Patterns & Sequences",
      q: "Find the sum of the first 20 terms of the arithmetic sequence 3, 7, 11, 15, … (the 20th term is 79).",
      answer: "820", wrongOptions: ["800", "840", "1640"],
      solution: [
        "Formula: Sₙ = n/2 × (a₁ + aₙ)",
        "S₂₀ = 20/2 × (3 + 79) = 10 × 82",
        "S₂₀ = 820.",
      ],
    },
    {
      id: "seq-geo-7th", category: "Patterns & Sequences",
      q: "Find the 7th term of the geometric sequence 2, 6, 18, 54, …",
      answer: "1458", accept: ["1,458"], wrongOptions: ["486", "4374", "1452"],
      solution: [
        "First term a₁ = 2, common ratio r = 6 ÷ 2 = 3.",
        "Formula: aₙ = a₁ × r^(n − 1)",
        "a₇ = 2 × 3⁶ = 2 × 729 = 1458.",
      ],
    },
    {
      id: "seq-squares", category: "Patterns & Sequences",
      q: "What is the next number in the pattern 1, 4, 9, 16, 25, __?",
      answer: "36", wrongOptions: ["30", "35", "49"],
      solution: [
        "These are perfect squares: 1², 2², 3², 4², 5².",
        "The next one is 6² = 36.",
      ],
    },
    {
      id: "seq-diff-odd", category: "Patterns & Sequences",
      q: "What is the next number in the pattern 2, 5, 10, 17, 26, __?",
      answer: "37", wrongOptions: ["35", "36", "39"],
      solution: [
        "Differences between terms: 3, 5, 7, 9 — they go up by 2 each time.",
        "The next difference is 11, so 26 + 11 = 37.",
        "(Also: each term is n² + 1, and 6² + 1 = 37.)",
      ],
    },
    {
      id: "seq-common-diff", category: "Patterns & Sequences",
      q: "What is the common difference of the arithmetic sequence 12, 9, 6, 3, …?",
      answer: "-3", wrongOptions: ["3", "-2", "9"],
      solution: [
        "Common difference d = (any term) − (the term before it).",
        "d = 9 − 12 = −3 (check: 6 − 9 = −3, 3 − 6 = −3).",
        "It is negative because the sequence is decreasing.",
      ],
    },
    {
      id: "seq-common-ratio", category: "Patterns & Sequences",
      q: "What is the common ratio of the geometric sequence 81, 27, 9, 3, …?",
      answer: "1/3", wrongOptions: ["3", "-3", "1/9"],
      solution: [
        "Common ratio r = (any term) ÷ (the term before it).",
        "r = 27 ÷ 81 = 1/3 (check: 9 ÷ 27 = 1/3).",
        "A ratio between 0 and 1 means each term gets smaller.",
      ],
    },
    {
      id: "seq-gauss", category: "Patterns & Sequences",
      q: "What is the sum 1 + 2 + 3 + … + 100?",
      answer: "5050", accept: ["5,050"], wrongOptions: ["5000", "10100", "5500"],
      solution: [
        "Use Sₙ = n(n + 1) ÷ 2 (Gauss's trick: pair 1+100, 2+99, … each pair = 101).",
        "S = 100 × 101 ÷ 2 = 10100 ÷ 2",
        "S = 5050.",
      ],
    },
    {
      id: "seq-letters", category: "Patterns & Sequences",
      q: "What letter comes next in the pattern A, C, F, J, O, __?",
      answer: "U", wrongOptions: ["T", "V", "S"],
      solution: [
        "Convert to alphabet positions: A=1, C=3, F=6, J=10, O=15.",
        "The gaps are 2, 3, 4, 5 — so the next gap is 6.",
        "15 + 6 = 21, and the 21st letter is U.",
      ],
    },
    {
      id: "seq-powers3", category: "Patterns & Sequences",
      q: "What is the next number in the pattern 1, 3, 9, 27, __?",
      answer: "81", wrongOptions: ["54", "36", "243"],
      solution: [
        "Each term is multiplied by 3 (a geometric sequence with r = 3).",
        "27 × 3 = 81.",
      ],
    },

    // ---------------- MATHEMATICAL LANGUAGE ----------------
    {
      id: "lang-atleast", category: "Mathematical Language", noFill: true,
      q: "Which expression correctly translates \"x is at least 5\"?",
      answer: "x ≥ 5", wrongOptions: ["x > 5", "x ≤ 5", "x < 5"],
      solution: [
        "\"At least 5\" means 5 or more — 5 itself is allowed.",
        "So we use \"greater than or equal to\": x ≥ 5.",
        "Tip: \"at most\" would be ≤.",
      ],
    },
    {
      id: "lang-translate-solve", category: "Mathematical Language",
      q: "\"Seven more than twice a number is 25.\" What is the number?",
      answer: "9", wrongOptions: ["16", "18", "8"],
      solution: [
        "Translate: 2x + 7 = 25.",
        "Subtract 7: 2x = 18.",
        "Divide by 2: x = 9.",
      ],
    },
    {
      id: "lang-function", category: "Mathematical Language",
      q: "If f(x) = 2x + 3, what is f(4)?",
      answer: "11", wrongOptions: ["9", "14", "24"],
      solution: [
        "Replace every x with 4: f(4) = 2(4) + 3.",
        "f(4) = 8 + 3 = 11.",
      ],
    },
    {
      id: "lang-function2", category: "Mathematical Language",
      q: "If g(x) = x² − 5x + 6, what is g(5)?",
      answer: "6", wrongOptions: ["0", "56", "-4"],
      solution: [
        "Substitute x = 5: g(5) = 5² − 5(5) + 6.",
        "= 25 − 25 + 6",
        "= 6.",
      ],
    },

    // ---------------- SETS ----------------
    {
      id: "set-union-card", category: "Sets",
      q: "Let A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7}. What is n(A ∪ B)?",
      answer: "7", wrongOptions: ["9", "2", "5"],
      solution: [
        "A ∪ B = all elements in A or B (no repeats) = {1, 2, 3, 4, 5, 6, 7}.",
        "Count them: n(A ∪ B) = 7.",
        "Formula check: n(A) + n(B) − n(A ∩ B) = 5 + 4 − 2 = 7 ✓",
      ],
    },
    {
      id: "set-intersection", category: "Sets",
      q: "Let A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7}. What is A ∩ B?",
      answer: "{4, 5}", accept: ["4 5", "4,5"], wrongOptions: ["{1, 2, 3}", "{6, 7}", "{1, 2, 3, 4, 5, 6, 7}"],
      solution: [
        "A ∩ B (intersection) = elements found in BOTH A and B.",
        "Only 4 and 5 appear in both sets.",
        "A ∩ B = {4, 5}.",
      ],
    },
    {
      id: "set-difference", category: "Sets",
      q: "Let A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7}. What is A − B?",
      answer: "{1, 2, 3}", accept: ["1 2 3", "1,2,3"], wrongOptions: ["{6, 7}", "{4, 5}", "{1, 2, 3, 6, 7}"],
      solution: [
        "A − B = elements in A that are NOT in B.",
        "Remove 4 and 5 (they're in B) from A.",
        "A − B = {1, 2, 3}.",
      ],
    },
    {
      id: "set-complement", category: "Sets",
      q: "Let U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} and A = {2, 4, 6, 8, 10}. What is A′ (the complement of A)?",
      answer: "{1, 3, 5, 7, 9}", accept: ["1 3 5 7 9", "1,3,5,7,9"], wrongOptions: ["{2, 4, 6, 8, 10}", "{1, 2, 3, 4, 5}", "{ }"],
      solution: [
        "A′ = elements of the universal set U that are NOT in A.",
        "Remove 2, 4, 6, 8, 10 from U.",
        "A′ = {1, 3, 5, 7, 9}.",
      ],
    },
    {
      id: "set-subsets", category: "Sets",
      q: "How many subsets does a set with 5 elements have?",
      answer: "32", wrongOptions: ["25", "10", "31"],
      solution: [
        "A set with n elements has 2ⁿ subsets (each element is either in or out).",
        "2⁵ = 2 × 2 × 2 × 2 × 2 = 32.",
      ],
    },
    {
      id: "set-proper-subsets", category: "Sets",
      q: "How many proper subsets does the set {a, b, c, d} have?",
      answer: "15", wrongOptions: ["16", "14", "8"],
      solution: [
        "Total subsets = 2ⁿ = 2⁴ = 16.",
        "A proper subset excludes the set itself, so subtract 1.",
        "Proper subsets = 16 − 1 = 15.",
      ],
    },
    {
      id: "set-powerset", category: "Sets",
      q: "How many elements are in the power set of {x, y, z}?",
      answer: "8", wrongOptions: ["6", "3", "9"],
      solution: [
        "The power set is the set of ALL subsets, so it has 2ⁿ elements.",
        "n = 3, so 2³ = 8.",
        "They are: { }, {x}, {y}, {z}, {x,y}, {x,z}, {y,z}, {x,y,z}.",
      ],
    },
    {
      id: "set-cartesian", category: "Sets",
      q: "If n(A) = 3 and n(B) = 4, how many ordered pairs are in A × B?",
      answer: "12", wrongOptions: ["7", "64", "81"],
      solution: [
        "The Cartesian product A × B pairs every element of A with every element of B.",
        "n(A × B) = n(A) × n(B) = 3 × 4 = 12.",
      ],
    },
    {
      id: "set-empty", category: "Sets",
      q: "What is the cardinality of the empty set { }?",
      answer: "0", accept: ["zero"], wrongOptions: ["1", "Undefined", "Infinite"],
      solution: [
        "Cardinality = the number of elements in a set.",
        "The empty set (∅ or { }) has no elements, so its cardinality is 0.",
      ],
    },
    {
      id: "set-venn-languages", category: "Sets",
      q: "In a class of 30 students, 19 are studying French, 12 are studying Spanish, and 7 are studying both. How many students are not taking any foreign language?",
      answer: "6", wrongOptions: ["24", "13", "1"],
      solution: [
        "Given: Total = 30, French (F) = 19, Spanish (S) = 12, Both = 7.",
        "At least one language = F + S − Both = 19 + 12 − 7 = 24 (subtract Both so they aren't counted twice).",
        "None = Total − At least one = 30 − 24 = 6.",
      ],
    },
    {
      id: "set-venn-only", category: "Sets",
      q: "In a survey of 50 students, 28 like Math, 20 like Science, and 10 like both. How many like Math only?",
      answer: "18", wrongOptions: ["28", "10", "8"],
      solution: [
        "\"Math only\" = Math − Both.",
        "Math only = 28 − 10 = 18.",
      ],
    },
    {
      id: "set-venn-neither", category: "Sets",
      q: "In a survey of 50 students, 28 like Math, 20 like Science, and 10 like both. How many like neither subject?",
      answer: "12", wrongOptions: ["2", "22", "38"],
      solution: [
        "At least one = Math + Science − Both = 28 + 20 − 10 = 38.",
        "Neither = Total − At least one = 50 − 38 = 12.",
      ],
    },
    {
      id: "set-venn-three", category: "Sets",
      q: "n(A) = 30, n(B) = 25, n(C) = 20, n(A∩B) = 10, n(A∩C) = 8, n(B∩C) = 5, n(A∩B∩C) = 3. Find n(A ∪ B ∪ C).",
      answer: "55", wrongOptions: ["52", "75", "58"],
      solution: [
        "Use: n(A∪B∪C) = n(A) + n(B) + n(C) − n(A∩B) − n(A∩C) − n(B∩C) + n(A∩B∩C).",
        "= 30 + 25 + 20 − 10 − 8 − 5 + 3",
        "= 75 − 23 + 3 = 55.",
      ],
    },

    // ---------------- LOGIC ----------------
    {
      id: "logic-and", category: "Logic",
      q: "If p is TRUE and q is FALSE, what is the truth value of p ∧ q (p AND q)?",
      answer: "False", accept: ["F"], wrongOptions: ["True"],
      solution: [
        "A conjunction (∧) is true only when BOTH parts are true.",
        "q is false, so p ∧ q = T ∧ F = FALSE.",
      ],
    },
    {
      id: "logic-or", category: "Logic",
      q: "If p is TRUE and q is FALSE, what is the truth value of p ∨ q (p OR q)?",
      answer: "True", accept: ["T"], wrongOptions: ["False"],
      solution: [
        "A disjunction (∨) is true when AT LEAST ONE part is true.",
        "p is true, so p ∨ q = T ∨ F = TRUE.",
      ],
    },
    {
      id: "logic-cond-tf", category: "Logic",
      q: "If p is TRUE and q is FALSE, what is the truth value of p → q (if p, then q)?",
      answer: "False", accept: ["F"], wrongOptions: ["True"],
      solution: [
        "A conditional p → q is false ONLY when p is true and q is false (a broken promise).",
        "Here p = T and q = F, so p → q = FALSE.",
      ],
    },
    {
      id: "logic-cond-ft", category: "Logic",
      q: "If p is FALSE and q is TRUE, what is the truth value of p → q?",
      answer: "True", accept: ["T"], wrongOptions: ["False"],
      solution: [
        "p → q is false only in the case T → F.",
        "When the hypothesis p is false, the conditional is automatically true (vacuously true).",
        "So F → T = TRUE.",
      ],
    },
    {
      id: "logic-bicond", category: "Logic",
      q: "If p is FALSE and q is FALSE, what is the truth value of p ↔ q (p if and only if q)?",
      answer: "True", accept: ["T"], wrongOptions: ["False"],
      solution: [
        "A biconditional (↔) is true when both parts have the SAME truth value.",
        "p and q are both false, so p ↔ q = TRUE.",
      ],
    },
    {
      id: "logic-neg-and", category: "Logic",
      q: "If p is FALSE and q is TRUE, what is the truth value of ~p ∧ q?",
      answer: "True", accept: ["T"], wrongOptions: ["False"],
      solution: [
        "First negate p: ~p = ~F = T.",
        "Then ~p ∧ q = T ∧ T = TRUE.",
      ],
    },
    {
      id: "logic-rows", category: "Logic",
      q: "How many rows does a truth table with 3 simple propositions (p, q, r) have?",
      answer: "8", wrongOptions: ["6", "9", "16"],
      solution: [
        "Each proposition has 2 possible values (T or F).",
        "Number of rows = 2ⁿ where n is the number of propositions.",
        "2³ = 8 rows.",
      ],
    },
    {
      id: "logic-converse", category: "Logic", noFill: true,
      q: "What is the CONVERSE of \"If it rains, then the ground is wet\"?",
      answer: "If the ground is wet, then it rains.",
      wrongOptions: ["If it does not rain, then the ground is not wet.", "If the ground is not wet, then it does not rain.", "It rains and the ground is not wet."],
      solution: [
        "Original: p → q (p = it rains, q = the ground is wet).",
        "Converse: SWAP the parts → q → p.",
        "\"If the ground is wet, then it rains.\"",
        "(Inverse = ~p → ~q, Contrapositive = ~q → ~p.)",
      ],
    },
    {
      id: "logic-contrapositive", category: "Logic", noFill: true,
      q: "What is the contrapositive of p → q?",
      answer: "~q → ~p", wrongOptions: ["q → p", "~p → ~q", "p ∧ ~q"],
      solution: [
        "Contrapositive = SWAP and NEGATE both parts.",
        "p → q becomes ~q → ~p.",
        "The contrapositive always has the same truth value as the original statement.",
      ],
    },
    {
      id: "logic-neg-cond", category: "Logic", noFill: true,
      q: "Which statement is the negation of p → q?",
      answer: "p ∧ ~q", wrongOptions: ["~p → ~q", "~p ∧ q", "q → p"],
      solution: [
        "p → q is false only when p is true and q is false.",
        "So its negation is true exactly in that case: p ∧ ~q.",
      ],
    },
    {
      id: "logic-neg-all", category: "Logic", noFill: true,
      q: "What is the negation of \"All students passed the exam\"?",
      answer: "Some students did not pass the exam.",
      wrongOptions: ["No student passed the exam.", "All students failed the exam.", "Some students passed the exam."],
      solution: [
        "The negation of \"All are\" is \"Some are not\".",
        "To disprove \"all passed\", you only need at least one who did not pass.",
        "So: \"Some students did not pass the exam.\"",
      ],
    },
    {
      id: "logic-tautology", category: "Logic",
      q: "A compound statement that is ALWAYS true, like p ∨ ~p, is called a ______.",
      answer: "Tautology", wrongOptions: ["Contradiction", "Contingency", "Fallacy"],
      solution: [
        "p ∨ ~p: if p is T → T ∨ F = T; if p is F → F ∨ T = T.",
        "Every row of its truth table is TRUE, so it is a tautology.",
      ],
    },
    {
      id: "logic-contradiction", category: "Logic",
      q: "A compound statement that is ALWAYS false, like p ∧ ~p, is called a ______.",
      answer: "Contradiction", wrongOptions: ["Tautology", "Contingency", "Converse"],
      solution: [
        "p ∧ ~p: if p is T → T ∧ F = F; if p is F → F ∧ T = F.",
        "Every row of its truth table is FALSE, so it is a contradiction.",
      ],
    },
    {
      id: "logic-proposition", category: "Logic", noFill: true,
      q: "Which of the following is a proposition?",
      answer: "Manila is the capital of the Philippines.",
      wrongOptions: ["Close the door.", "What time is it?", "Wow, what a view!"],
      solution: [
        "A proposition is a declarative sentence that is either true or false (not both).",
        "Commands, questions, and exclamations have no truth value.",
        "\"Manila is the capital of the Philippines\" is a statement that is true, so it is a proposition.",
      ],
    },

    // ---------------- REASONING ----------------
    {
      id: "reason-inductive", category: "Reasoning",
      q: "What type of reasoning reaches a GENERAL conclusion from SPECIFIC observations or patterns?",
      answer: "Inductive", accept: ["Inductive reasoning", "Induction"], wrongOptions: ["Deductive", "Circular", "Abductive"],
      solution: [
        "Inductive reasoning: specific examples → general conclusion (e.g., \"the sun rose every day, so it will rise tomorrow\").",
        "Deductive reasoning goes the other way: general rules → specific conclusion.",
      ],
    },
    {
      id: "reason-deductive", category: "Reasoning",
      q: "What type of reasoning reaches a SPECIFIC conclusion from GENERAL statements or rules?",
      answer: "Deductive", accept: ["Deductive reasoning", "Deduction"], wrongOptions: ["Inductive", "Circular", "Intuitive"],
      solution: [
        "Deductive reasoning: general premises → specific, certain conclusion.",
        "Example: All humans are mortal. Juan is human. So Juan is mortal.",
      ],
    },
    {
      id: "reason-polya-1", category: "Reasoning", noFill: true,
      q: "What is the FIRST step in Polya's four-step problem-solving strategy?",
      answer: "Understand the problem", wrongOptions: ["Devise a plan", "Carry out the plan", "Look back"],
      solution: [
        "Polya's 4 steps, in order:",
        "1) Understand the problem  2) Devise a plan  3) Carry out the plan  4) Look back (review/check).",
      ],
    },
    {
      id: "reason-polya-3", category: "Reasoning", noFill: true,
      q: "What is the THIRD step in Polya's four-step problem-solving strategy?",
      answer: "Carry out the plan", wrongOptions: ["Understand the problem", "Devise a plan", "Look back"],
      solution: [
        "Polya's 4 steps, in order:",
        "1) Understand the problem  2) Devise a plan  3) Carry out the plan  4) Look back (review/check).",
      ],
    },
    {
      id: "reason-handshake", category: "Reasoning",
      q: "At a meeting of 10 people, each person shakes hands with every other person exactly once. How many handshakes are there?",
      answer: "45", wrongOptions: ["90", "100", "50"],
      solution: [
        "Each of the 10 people shakes hands with 9 others: 10 × 9 = 90.",
        "But every handshake is counted twice (once for each person), so divide by 2.",
        "90 ÷ 2 = 45 handshakes.",
      ],
    },

    // ---------------- PROBLEM SOLVING ----------------
    {
      id: "ps-two-numbers", category: "Problem Solving",
      q: "The sum of two numbers is 45. The first number is twice the second. What is the first number?",
      answer: "30", wrongOptions: ["15", "20", "25"],
      solution: [
        "Let x = second number, so first number = 2x.",
        "Equation: 2x + x = 45 → 3x = 45 → x = 15.",
        "First number = 2(15) = 30. (The numbers are 30 and 15.)",
      ],
    },
    {
      id: "ps-consec-odd", category: "Problem Solving",
      q: "The sum of 3 consecutive odd numbers is 315. What is the smallest number?",
      answer: "103", wrongOptions: ["105", "101", "107"],
      solution: [
        "Let x = 1st odd number; the next odd numbers are x + 2 and x + 4.",
        "x + (x + 2) + (x + 4) = 315 → 3x + 6 = 315 → 3x = 309 → x = 103.",
        "The numbers are 103, 105, 107.",
      ],
    },
    {
      id: "ps-consec-odd-largest", category: "Problem Solving",
      q: "The sum of 3 consecutive odd numbers is 315. What is the largest number?",
      answer: "107", wrongOptions: ["105", "103", "109"],
      solution: [
        "Let x, x + 2, x + 4 be the numbers: 3x + 6 = 315 → x = 103.",
        "Largest = x + 4 = 103 + 4 = 107.",
      ],
    },
    {
      id: "ps-fruits", category: "Problem Solving",
      q: "Maria, Paul, and Jack have 16 fruits in total. Jack has x fruits, Maria has 3 more than three times Jack's (3x + 3), and Paul has 1 less than three times Jack's (3x − 1). How many fruits does Maria have?",
      answer: "9", wrongOptions: ["5", "2", "7"],
      solution: [
        "Equation: x + (3x + 3) + (3x − 1) = 16.",
        "Combine: 7x + 2 = 16 → 7x = 14 → x = 2.",
        "Maria = 3(2) + 3 = 9. (Paul = 5, Jack = 2; 9 + 5 + 2 = 16 ✓)",
      ],
    },
    {
      id: "ps-eight-eights", category: "Problem Solving", noFill: true,
      q: "Using exactly eight 8s and only addition, which expression equals 1000?",
      answer: "888 + 88 + 8 + 8 + 8",
      wrongOptions: ["888 + 88 + 8 + 8 + 8 + 8", "88 + 88 + 88 + 888", "888 + 8 + 8 + 8 + 88 + 8"],
      solution: [
        "Start big: 888 uses three 8s and leaves 1000 − 888 = 112.",
        "888 + 88 = 976 (five 8s used), leaving 24 = 8 + 8 + 8 (three more 8s).",
        "888 + 88 + 8 + 8 + 8 = 1000 using exactly 3 + 2 + 1 + 1 + 1 = 8 eights.",
      ],
    },
    {
      id: "ps-age", category: "Problem Solving",
      q: "A father is 4 times as old as his son. In 20 years, he will be twice as old as his son. How old is the son now?",
      answer: "10", wrongOptions: ["20", "40", "5"],
      solution: [
        "Let x = son's age now, so father = 4x.",
        "In 20 years: 4x + 20 = 2(x + 20) → 4x + 20 = 2x + 40.",
        "2x = 20 → x = 10. (Father is 40; in 20 years: 60 = 2 × 30 ✓)",
      ],
    },
    {
      id: "ps-coins", category: "Problem Solving",
      q: "Juan has 20 coins made up of ₱5 and ₱10 coins, worth ₱160 in total. How many ₱10 coins does he have?",
      answer: "12", wrongOptions: ["8", "10", "16"],
      solution: [
        "Let x = number of ₱10 coins, so (20 − x) = number of ₱5 coins.",
        "10x + 5(20 − x) = 160 → 10x + 100 − 5x = 160 → 5x = 60 → x = 12.",
        "Check: 12 × ₱10 + 8 × ₱5 = 120 + 40 = ₱160 ✓",
      ],
    },
    {
      id: "ps-consec-even", category: "Problem Solving",
      q: "The sum of two consecutive even numbers is 86. What is the smaller number?",
      answer: "42", wrongOptions: ["44", "43", "40"],
      solution: [
        "Let x = smaller even number, x + 2 = next even number.",
        "x + (x + 2) = 86 → 2x + 2 = 86 → 2x = 84 → x = 42.",
        "The numbers are 42 and 44.",
      ],
    },

    // ---------------- DATA MANAGEMENT ----------------
    {
      id: "data-mean", category: "Data Management",
      q: "Find the mean of 4, 8, 6, 5, 7.",
      answer: "6", wrongOptions: ["5", "7", "30"],
      solution: [
        "Mean = sum ÷ number of values.",
        "Sum = 4 + 8 + 6 + 5 + 7 = 30.",
        "Mean = 30 ÷ 5 = 6.",
      ],
    },
    {
      id: "data-median", category: "Data Management",
      q: "Find the median of 3, 9, 4, 7, 12, 5.",
      answer: "6", wrongOptions: ["7", "5", "5.5"],
      solution: [
        "Arrange in order: 3, 4, 5, 7, 9, 12.",
        "There are 6 values (even), so the median is the average of the two middle values.",
        "Median = (5 + 7) ÷ 2 = 6.",
      ],
    },
    {
      id: "data-mode", category: "Data Management",
      q: "Find the mode of 2, 3, 3, 5, 7, 7, 7, 9.",
      answer: "7", wrongOptions: ["3", "5", "9"],
      solution: [
        "Mode = the value that appears most often.",
        "3 appears twice, 7 appears three times, the rest once.",
        "Mode = 7.",
      ],
    },
    {
      id: "data-range", category: "Data Management",
      q: "Find the range of 12, 5, 20, 8, 15.",
      answer: "15", wrongOptions: ["12", "20", "8"],
      solution: [
        "Range = highest value − lowest value.",
        "Range = 20 − 5 = 15.",
      ],
    },
    {
      id: "data-sd", category: "Data Management",
      q: "Find the population standard deviation of 2, 4, 4, 4, 5, 5, 7, 9.",
      answer: "2", wrongOptions: ["4", "5", "2.5"],
      solution: [
        "Mean μ = (2 + 4 + 4 + 4 + 5 + 5 + 7 + 9) ÷ 8 = 40 ÷ 8 = 5.",
        "Squared deviations (x − 5)²: 9, 1, 1, 1, 0, 0, 4, 16 → sum = 32.",
        "Variance σ² = 32 ÷ 8 = 4.",
        "Standard deviation σ = √4 = 2.",
      ],
    },

    // ---------------- MODULAR ARITHMETIC ----------------
    {
      id: "mod-basic", category: "Modular Arithmetic",
      q: "What is 17 mod 5?",
      answer: "2", wrongOptions: ["3", "12", "0"],
      solution: [
        "a mod n = the remainder when a is divided by n.",
        "17 ÷ 5 = 3 remainder 2 (since 5 × 3 = 15, and 17 − 15 = 2).",
        "17 mod 5 = 2.",
      ],
    },
    {
      id: "mod-days", category: "Modular Arithmetic",
      q: "Today is Monday. What day of the week will it be 100 days from today?",
      answer: "Wednesday", accept: ["Wed"], wrongOptions: ["Tuesday", "Thursday", "Saturday"],
      solution: [
        "Days repeat every 7, so find 100 mod 7.",
        "100 ÷ 7 = 14 remainder 2 (7 × 14 = 98).",
        "Move 2 days ahead of Monday → Wednesday.",
      ],
    },
    {
      id: "mod-clock", category: "Modular Arithmetic",
      q: "It is 9 o'clock now. What time will it be on a 12-hour clock after 50 hours?",
      answer: "11", accept: ["11 o'clock", "11:00"], wrongOptions: ["2", "7", "10"],
      solution: [
        "A 12-hour clock works in mod 12.",
        "9 + 50 = 59, and 59 mod 12 = 11 (12 × 4 = 48, 59 − 48 = 11).",
        "It will be 11 o'clock.",
      ],
    },
  ];

  registerSubject({
    id: "mmw",
    label: "MMW",
    badge: "MATH IN THE MODERN WORLD",
    subtitle: "Mathematics in the Modern World — Fibonacci, sequences, sets, logic, problem solving, and data. Solve it, and get the step-by-step solution if you miss.",
    pools: {},
    facts: FACTS,
  });
})();
