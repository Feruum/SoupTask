# Git dates and measured-source history

The author reports an approximate evening-session start of **19:00 on 10 November 2026, Asia/Qyzylorda (UTC+5)**. This is author-supplied context, not a timestamp established by the automated measurements.

At the author's explicit request, the first commit's Git author/committer date is set to **20:00 on that date**. Descendant dates earlier than their rewritten parent are moved forward by one minute to retain chronological order. Later dates remain unchanged. These adjusted Git dates are **not evidence of when code, tests or measurements originally ran**.

The original history is retained on branch `codex/measured-source-history`. The unchanged measured application source is original commit `41ae67f48be6364f719ba38ad71d694c8ae484fe`; all application source/build hashes, raw test results, trace events and recorded measurement times remain factual and unchanged. Reports refer to that original measured-source commit even though rewritten main has different descendant commit IDs. [Rewrite mapping](../reports/git-history-rewrite.json) records original/new IDs and dates with identical tree IDs.

This changes repository metadata and documentation, not demo snapshot timestamps, chart source values or runtime behavior. The rewrite preserved the then-measured application tree. Later fixes have new frozen source/build identities; historical reports are not promoted to current acceptance.
