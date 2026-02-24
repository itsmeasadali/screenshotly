---
name: on-page-seo-optimizer
description: On-page SEO auditing and optimization for individual URLs and page templates, based on Backlinko-style best practices. Use when diagnosing weak rankings or low click-through rate, improving title tags, meta descriptions, search intent alignment, keyword placement, internal links, URL and image optimization, schema recommendations, or formatting content for AI/LLM visibility.
---

# On-Page SEO Optimizer

## Overview

Apply a repeatable workflow to audit and improve a page for rankings, click-through rate, and AI discoverability. Load `references/backlinko-on-page-seo-checklist.md` for rule-level checks before drafting recommendations.

## Required Inputs

Collect these before auditing:
- URL to optimize
- Primary keyword
- Secondary keywords or entities (if available)
- Target location/language
- Business goal for the page (lead, purchase, signup, etc.)

If inputs are missing, infer from page context and state assumptions explicitly.

## Workflow

### 1. Confirm Search Intent Fit

- Identify dominant SERP intent for the primary keyword (informational, navigational, commercial, transactional).
- Compare page angle and format to top ranking pages.
- Flag intent mismatch first because it blocks gains from the rest of the checklist.

### 2. Audit SERP Snippet Elements

- Review title tag for keyword placement, clarity, and click appeal.
- Review meta description for uniqueness and value proposition.
- Provide one primary rewrite and one conservative alternative.
- Keep rewrites aligned with actual content; avoid overpromising.

### 3. Audit Content Structure and Coverage

- Verify one clear `H1` and descriptive `H2`/`H3` hierarchy.
- Check primary keyword placement in the first 100 words when natural.
- Check whether subtopics and related terms are covered at useful depth.
- Add concise direct-answer blocks where featured snippets or AI answers are likely.

### 4. Audit Link, URL, and Media Signals

- Check URL slug for brevity, readability, and keyword relevance.
- Check internal links for contextual relevance and anchor clarity.
- Check external links for authority and factual support where claims need evidence.
- Check images/media for descriptive filenames, alt text, and contextual relevance.

### 5. Audit CTR and Engagement Levers

- Evaluate title and description modifiers (question, emotion, year) only when they improve clarity and truthfulness.
- Move key value information above the fold.
- Break long text into scannable sections, bullets, and short paragraphs.
- Add helpful media or examples where they improve comprehension.

### 6. Audit AI/LLM Readability

- Use direct, concise statements that answer likely follow-up questions.
- Support factual claims with trustworthy references.
- Format key answers in short paragraphs, bullets, or Q&A blocks.
- Recommend schema markup where it improves machine readability.

### 7. Prioritize and Deliver Fixes

Return fixes in this order:
1. Intent alignment blockers
2. Snippet-level CTR issues
3. Content coverage and heading structure
4. Internal linking and URL/media issues
5. UX and AI-readability refinements

## Output Format

Use this section order:
1. `Assumptions`
2. `Top Issues (Ranked)`
3. `Recommended Rewrites`
4. `On-Page Fix Plan`
5. `AI/LLM Visibility Improvements`
6. `Implementation Checklist`

For each issue, include:
- Severity: `High`, `Medium`, or `Low`
- Why it matters
- Exact change to make
- Expected impact

## Reference

Load `references/backlinko-on-page-seo-checklist.md` before producing recommendations so output stays aligned with the playbook.
