# Contributing

## General Workflow

1. Fork the repo
1. Create a remote upstream to the original project repository with:
```
git remote add upstream https://github.com/breakfastfordinner/mindmap-react.git
```
1. Create a new branch with a name relevant to what you are working on
1. Make commits on your newly created branch
1. When you've finished with your fix or feature rebase upstream changes into your branch using `git pull rebase origin master`. Submit a pull request
   directly to master. Include a description of your changes
1. Your pull request will be reviewed by another maintainer. The point of code
   reviews is to help keep the codebase clean and of high quality and, equally
   as important, to help you grow as a programmer. If your code reviewer
   requests you make a change you don't understand, ask them why
1. Fix any issues raised by your code reviewer, and push your fixes as a single
   new commit
1. Once the pull request has been reviewed, it will be merged by another member of the team. Do *not* merge your own commits

## Detailed Workflow Notes

#### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script"
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short
- It is important that you keep your commit messages detailed.  Small, unspecific commit messages like `fix bugs` make it more difficult to follow the history of your application and its various feature changes

### Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting
your code merged into the main repo. Step 1 is to rebase upstream
changes to the master branch into yours by running this command
from your branch:

```bash
git pull --rebase origin master
```

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a
nice, clean, linear commit history.

If there are conflicting changes, git will tell you part way
through the rebasing process. Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

You pick a file by `git add`ing it - **you do not make commits during a
rebase.**

Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all
conflicts you should run the existing tests to make sure you didn’t break
anything, then run your new tests and make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards.

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.

Thanks for contributing!

### Another note on commit messages and pull requests

Try to keep your commits and pull requests as small as possible.  This doesn't mean you should only ever change one file at a time, rather it is simply a good goal to strive for when adding new features to your application.  If commits and pull requests become bloated and/or unspecific, tracking the exact history of your project revisions and updates will become much more difficult.

### Guidelines

1. Uphold the current code standard:
    - Keep your code DRY
    - Apply the boy scout rule
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Run the tests before submitting a pull request
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior

## Checklist:

This is just to help you organize your process

- [ ] Did I create a new feature branch, instead of making my changes on the master branch?
- [ ] Is my branch focused on a *single* main change?
 - [ ] Do all of my changes *directly relate* to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
 - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.
