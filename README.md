## ML a11y Assessment Platform

[View current demo](https://54.70.239.42)

## Narwha11y Introduction

Welcome to Narwha11y (**narh**-*wah*-lee), a tool for keeping track of progressive accessibility remediation. To get started, enter a URL, select your team and click Create New Assessment. (**Note**: The URL doesn't have to be public or even valid, this tool does not do the checking.) This will create a new entry in the database to keep track of your a11y work. Each assessment consists of a filterable list which combines the [WCAG 2.0 A-AA and the Macmillan Baseline Accessibility Requirements](https://macmillanlearning.atlassian.net/wiki/display/a11y/Macmillan+BLARs+and+WCAG+Guidelines). So if for instance you only wish to see the dev tasks for BLAR phase 1 you'd check `dev`, `onlyBLAR`, and `phase1` to see a manageable list of tasks to get started on.

## Contributing

To add more tests to a section, find the section's WCAG key in `src/data/customData.js` and add another string to end of the respective array 

### To Do

* JIRA integration
* List assessments by team
* Better filtering
* Handle concurrent edits

**Philosophy**: We need a way to track progress on a11y remediation
efforts. Instead of just pointing teams to the full WCAG and
having them figure it out on their own, which results in many
disparate implementations, it would be better to have a
centralized tool for assessing the remediation progress.
To that end I built Narwha11y, a persistent a11y assessment
checklist tool. It combines the WCAG 2.0 AA and the
Macmillan Baseline Accessibility Requirements into a
filterable persistent checklist so teams can create and
update their a11y assessments, going through each phase
of the BLAR on their way to accessibility.
