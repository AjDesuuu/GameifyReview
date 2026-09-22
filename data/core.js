"use strict";

/* Registry of quiz subjects. Each subject file (data/<id>.js) calls registerSubject()
   with: { id, label, badge, subtitle, pools, facts, categoryFn? }
   - pools: named arrays of distractor options, referenced by fact.poolKey
   - facts: { id, poolKey, category?, q, pre, post, answer, wrongOptions?, noFill? }
   - categoryFn(fact): optional override to compute a fact's category label
     instead of relying on an explicit `category` field (used by pctg for its
     legacy id-prefix scheme; new subjects should just set `category` per fact)
   SUBJECT_ORDER controls display order on the start screen. */
const SUBJECTS = {};
const SUBJECT_ORDER = ["mpth", "nstp", "pctg"];

function registerSubject(subject) {
  SUBJECTS[subject.id] = subject;
}
