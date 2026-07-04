---
name: korean-spelling
description: Review Korean spelling, spacing, grammatical agreement, and clear malformed sentences in a user-specified Markdown source file. Use only when the user explicitly invokes `$korean-spelling` with a Markdown file path or name. Record correction proposals and reasons at the bottom of that same `.md` file without changing its existing prose. Do not review content, argument, structure, narrative flow, or writing style, and never write the review to generated HTML.
---

# Korean Spelling

Inspect Korean prose in one Markdown source file and append a focused proofreading review to that same file.

## Resolve the Markdown source

1. Accept one `.md` path or file name following `$korean-spelling`.
2. Prefer an exact repository-relative path when provided.
3. For a file name, search the repository for matching `.md` files while excluding `.git`, `node_modules`, `dist`, and `.agents`.
4. Stop without editing anything when no file matches, and ask for a valid Markdown path.
5. Stop without editing anything when multiple files match, list the candidates, and ask the user to select one.
6. Reject `.html` and every other non-Markdown target.

Treat the resolved `.md` file as both the only review source and the only output destination. Never write findings to `dist/`, generated pages, templates, or any `.html` file.

## Review scope

Read the entire Markdown file before evaluating individual sentences. Use surrounding prose only to resolve grammar and intended meaning.

Review:

- Korean spelling and standard word forms
- Spacing
- Particle, ending, tense, and subject-predicate agreement
- Sentences that are grammatically malformed or cannot be parsed as written
- Korean prose in headings, blockquotes, lists, link labels, and the `title` and `description` frontmatter values

Ignore:

- The argument, factual content, paragraph order, narrative flow, and completeness
- Stylistic preference, tone, concision, repetition, or requests to rewrite for elegance
- `tags` and other frontmatter keys or values
- Fenced code, inline code, URLs, image paths, file names, identifiers, commands, and raw markup
- Deliberate quotations unless the surrounding author-written sentence is incorrect
- Existing review content between the review markers

Do not convert a merely awkward or unfashionable expression into an error. Report a malformed sentence only when its grammar is defective; do not propose a new idea or reorganize the sentence's reasoning.

## Verify uncertain findings

- Prefer established Korean orthography and grammar rules.
- When a word form or rule is uncertain, consult the Standard Korean Language Dictionary at `https://stdict.korean.go.kr` or the National Institute of Korean Language at `https://www.korean.go.kr`.
- Add the direct official URL in the evidence column only when a source was consulted.
- Do not present an uncertain claim as an error when it cannot be verified. Omit it rather than guessing.
- Do not search for sources for routine, unambiguous corrections.

## Write the review

Do not modify, remove, or reorder any existing source prose during the review.

At the end of the resolved `.md` file:

1. Locate content between `<!-- korean-spelling:start -->` and `<!-- korean-spelling:end -->`.
2. Replace that complete region when it already exists. Never append a second review.
3. Otherwise append one blank line and a new review region.
4. Preserve the file's final newline.

For findings, write:

```markdown
<!-- korean-spelling:start -->

## 맞춤법 검토

| 위치      | 원문    | 교정안  | 이유                               | 근거 |
| --------- | ------- | ------- | ---------------------------------- | ---- |
| 12번째 줄 | 안 된는 | 안 되는 | 동사 `되다`의 관형형은 `되는`이다. |      |

<!-- korean-spelling:end -->
```

Use the source line number for `위치`. Keep enough original text to identify the occurrence without copying an unnecessarily long sentence. Escape pipe characters that would break the table.

When no issue is found, write:

```markdown
<!-- korean-spelling:start -->

## 맞춤법 검토

검토 완료: 발견된 문제 없음

<!-- korean-spelling:end -->
```

After writing, inspect the diff and confirm:

- Only the selected `.md` file changed.
- Existing prose is byte-for-byte unchanged outside the previous review region.
- No HTML or generated file changed.
- Every finding is within the defined review scope.

Report the finding count and state that the original prose was not corrected. Tell the user that approved items can be applied in a separate request.

## Apply approved corrections

Only after the user explicitly approves all findings or identifies specific rows:

1. Re-read the selected Markdown and its current review region.
2. Apply only the approved corrections to occurrences identified by the table.
3. Do not make adjacent stylistic or structural edits.
4. Keep the review region as the record of what was proposed unless the user asks to remove or refresh it.
5. Inspect the diff and report exactly which approved rows were applied.
