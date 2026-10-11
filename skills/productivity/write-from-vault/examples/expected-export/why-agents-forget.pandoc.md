---
title: "Why Agents Forget"
references:
  - id: context-windows-reset-per-session
    type: webpage
    title: "Context Windows Reset Per Session"
    note: author's research notes
  - id: notes-vault-as-agent-memory
    type: webpage
    title: "Notes Vault As Agent Memory"
    URL: https://github.com/ChidiOkoene/optimal-brain
  - id: re-explaining-is-the-top-complaint
    type: webpage
    title: "Re-explaining Is The Top Complaint"
    note: author's research notes
  - id: long-context-may-not-replace-memory
    type: webpage
    title: "Long Context May Not Replace Memory"
    note: author's research notes
---

# Why Coding Agents Forget Your Project

Your coding agent forgets your project because every session starts empty, and the fix is to give it somewhere to write things down: a vault of small, linked notes it reads when it starts [@context-windows-reset-per-session; @notes-vault-as-agent-memory].

## Every session starts from zero

Whatever the agent worked out yesterday is gone today unless it lives in a file loaded at startup [@context-windows-reset-per-session]. In my interviews with developers who use agents daily, re-explaining the project was the most common frustration, named by 9 of 12 [@re-explaining-is-the-top-complaint].

## Notes the agent reads back

When research and decisions land as short linked notes with an index the agent reads first, the next session picks up where the last one stopped. That has held across three months of my own projects [@notes-vault-as-agent-memory].

## What about bigger context windows?

I expect longer context to help less than it seems: a bigger window holds more, but someone still has to choose which past decisions matter. That is a hunch from my own testing, not a measured result [@long-context-may-not-replace-memory].

Start small: next time your agent figures something out, have it write a note.

## References

::: {#refs}
:::
