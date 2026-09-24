"use strict";

/* Registry of quiz subjects. Each subject file (data/<id>.js) calls registerSubject()
   with: { id, label, badge, subtitle, pools, facts, categoryFn? }
   - pools: named arrays of distractor options, referenced by fact.poolKey
   - facts: { id, poolKey, category?, q, pre, post, answer, wrongOptions?, noFill? }
   - computation facts add `solution` (array of steps) and optional `accept` (alternate typed
     answers); they skip True/False, use a typed "Solve It" input instead of the masked blank,
     and show the steps on a wrong answer. poolKey/pre/post may be omitted for these.
   - categoryFn(fact): optional override to compute a fact's category label
     instead of relying on an explicit `category` field (used by pctg for its
     legacy id-prefix scheme; new subjects should just set `category` per fact)
   SUBJECT_ORDER controls display order on the start screen. */
const SUBJECTS = {};
const SUBJECT_ORDER = ["mpth", "nstp", "pctg", "itts", "mmw", "pptc"];

function registerSubject(subject) {
  SUBJECTS[subject.id] = subject;
}
