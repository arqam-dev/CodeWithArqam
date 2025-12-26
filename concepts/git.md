# Primary Concepts

<expand title="Commands">
## Commands

- How to check your Git configuration:
- git config -l
- How to setup your Git username:
- git config --global user.name "Fabio"
- How to setup your Git user email:
- git config --global user.email "signups@fabiopacifici.com"
- How to cache your login credentials in Git:
- git config --global credential.helper cache
- How to initialize a Git repo:
- git init
- How to add a file to the staging area in Git:
- git add filename_here
- How to add all files in the staging area in Git
- git add .
- How to add only certain files to the staging area in Git
- git add fil*
- How to check a repository's status in Git:
- git status
- How to commit changes in the editor in Git:
- git commit
- How to commit changes with a message in Git:
- git commit -m "your commit message here"
- How to see your commit history in Git: (shows the commit history for the current repository)
- git log
- How to see your commit history including changes in Git: (shows the commit's history including all files and their changes)
- git log -p
- How to see a specific commit in Git:
- git show commit-id
- How to see log stats in Git:
- git log --stat
- How to see changes made before committing them using "diff" in Git:
- git diff
- git diff all_checks.py
- How to rename files in Git:
- git mv oldfile newfile
- How to ignore files in Git:
- Create a .gitignore file and commit it.
- How to revert unstaged changes in Git:
- git checkout filename
- How to revert staged changes in Git:
- git reset HEAD filename
- How to rollback the last commit in Git:
- git revert HEAD
- How to rollback an old commit in Git:
- git revert comit_id_here
- How to create a new branch in Git:
- git branch branch_name
- How to switch to a newly created branch in Git:
- git checkout branch_name
- How to list branches in Git:
- git branch
- How to merge two branches in Git:
- git merge branch_name
- How to add a remote repository in Git
- git add remote https://repo_here
- How to see remote URLs in Git:
- git remote -v
- How to push changes to a remote repo in Git:
- git push
- How to pull changes from a remote repo in Git:
- git pull
- How to fetch remote repo changes in Git:
- git fetch
- How to merge a remote repo with your local repo in Git:
- git merge origin/main
- How to push a new branch to a remote repo in Git:
- git push -u origin branch_name
- How to remove a remote branch in Git:
- git push --delete origin branch_name_here
- How to use Git rebase:
- git rebase branch_name_here
- How to force a push request in Git:
- git push -f
- How to delete a branch in Git:
- git branch -d branch_name

GIT:

git checkout tkxel/dev

git pull origin tkxel/dev

git checkout -b branchNAmeWithPath

git add .

git commit -m “message”

git push origin branchNAmeWithPath

——————

git commit —amend. —> shif + : —> wq

git push -f origin branchNAmeWithPath

git reset —hard

git reset --soft <commit> // moves the branch pointer to a specific commit while preserving the changes in the working directory and staging area

git reset --mixed <commit>

git reset --hard <commit> // moves the branch pointer to a specific commit and discards all changes in the working directory and staging area

git reset HEAD^ OR git reset HEAD~1  // Undo the last commit

git merge <branch-to-merge>

git fetch origin     // If you want to incorporate the changes from the remote branch (origin/<branch-name>) into your local branch before pushing, you can run the following command to fetch the remote changes

git push origin tkxel/dev.    // If you want to publish your local commits to the remote repository, you can simply run the following command to push your changes

——————

git reset —hard origin mainParentBranch // will make the branch similar to the mainParentBranch. Just like we have created a new branch from it.

git cherry-pick commitHash // this will merge all the code of that specific commit

Commands used in Cygov

GIT/Amplify Commands:

GIT:

git checkout tkxel/dev

git pull origin tkxel/dev

git checkout -b branchNAmeWithPath

git add .

git commit -m “message”

git push origin branchNAmeWithPath

——————

git commit —amend. —> shif + : —> wq

git push -f origin branchNAmeWithPath

git reset —hard

git reset --soft <commit> // moves the branch pointer to a specific commit while preserving the changes in the working directory and staging area

git reset --mixed <commit>

git reset --hard <commit> // moves the branch pointer to a specific commit and discards all changes in the working directory and staging area

git reset HEAD^ OR git reset HEAD~1  // Undo the last commit

git merge <branch-to-merge>

git fetch origin     // If you want to incorporate the changes from the remote branch (origin/<branch-name>) into your local branch before pushing, you can run the following command to fetch the remote changes

git push origin tkxel/dev.    // If you want to publish your local commits to the remote repository, you can simply run the following command to push your changes

git push -u origin <branch-name> // push a newly create branch to remote if does not contains any changes

——————

git reset —hard origin mainParentBranch // will make the branch similar to the mainParentBranch. Just like we have created a new branch from it.

git cherry-pick commitHash // this will merge all the code of that specific commit

git revert HEAD // revert the last commit. creates another commit.

git reset HEAD~ // remove the last commit from your branch's history without modifying the working directory.

git reset HEAD <file> // unstaged a file

git rebase —abort

git reset --hard origin/tkxel/dev

NOTE:  If you have already pushed the commit, it is generally recommended to use git revert

———————————————————————————

git add origin ,,, git remove origin,,,

git diff filename

git stash --include-untracked

git commit -a

git checkout -- <file>. //  to discard changes in a specific file

git checkout -- .  // Discard all the updated files

———————————————————————————

Ways of git pull:

1. git pull origin <branch-name>

2. git branch --set-upstream-to=origin/<branch-name> <local-branch-name>

3. git pull --rebase origin <branch-name>

———————————————————————————

git tag --list

git tag <tag-name> // to add a tag

git tag -a <tag-name> -m "Tag message" // add a tag with message

git push origin <tag-name> // push the tag to remote after adding it

git tag -d <tag-name> // remove the tag locally

git push --delete origin <tag-name> // remove the tag from local and remote as well.

git checkout <tag-name> // to go to that tag

——————————————————————————————

git config user.name // to check the GitHub logged-in account username

git config user.email

git config —list

——————————————————————————————

AMPLIFY:

amplify pull tkxel

Main Commands (verified by implementation)

</expand>

<expand title="Git Concepts in Sequence">
## Git Concepts in Sequence

Certainly, here is a list of Git commands in a suggested sequence for teaching your team, starting with fundamental commands and gradually introducing more advanced concepts:

1. `git init`: Initialize a new Git repository.

2. `git clone`: Create a local copy of a remote repository.

3. `git config`: Configure Git settings.

4. `git status`: Check the status of your working directory.

5. `git add`: Stage changes for a commit.

6. `git commit`: Create a new commit.

7. `git branch`: List, create, or delete branches.

8. `git checkout`: Switch between branches or commits.

9. `git pull`: Fetch and merge changes from a remote repository.

10. `git push`: Push changes to a remote repository.

11. `git remote`: Manage remote repositories.

12. `git log`: View commit history.

13. `git diff`: View differences between commits or branches.

14. `git merge`: Merge changes from one branch into another.

15. `git rebase`: Reapply changes on top of another branch.

16. `git stash`: Temporarily save changes for later.

17. `git tag`: Create and manage tags for releases.

18. `git cherry-pick`: Apply specific commits to the current branch.

19. `git reset`: Unstage changes or reset to a previous commit.

20. `git revert`: Create a new commit that undoes changes.

21. `git fetch`: Download changes from a remote repository.

22. `git remote add`: Add a new remote repository.

23. `git remote remove`: Remove a remote repository.

24. `git remote rename`: Rename a remote repository.

25. `git remote set-url`: Change the URL of a remote repository.

26. `git remote -v`: List remote repositories and their URLs.

27. `git pull --rebase`: Fetch and rebase changes from a remote repository.

This sequence provides a logical order for introducing Git commands, starting with the basics of repository management and gradually moving into more advanced concepts like branching, merging, and rebasing. It's a structured way to help your team learn and understand Git effectively.

</expand>

<expand title="General Info">
## General Info

- Branches:
  - Long Running - main, dev, prod, qa, etc.
  - Short Lived - features and bugs
  - Alternates: SVN, Mercurial, etc.

</expand>

<expand title="Git vs GitHub">
## Git vs GitHub

- Git: Distributed version control tool that manages source code history locally
- GitHub: Cloud-based platform/hosting service developed around Git
- Git: Installs locally as a tool => GitHub: Online service/platform
- Git: Focused on version control and code sharing => GitHub: Focused on centralized source code hosting
- Git: Command-line tool => GitHub: Web interface + command-line integration

</expand>

<expand title="Git vs SVN (Subversion)">
## Git vs SVN (Subversion)

- Git: Distributed version control => SVN: Centralized version control
- Git: Multiple repositories (local + remote) => SVN: Single centralized repository
- Git: Works offline => SVN: Requires online connection
- Git: Faster commits (local repo) => SVN: Slower (pushes to centralized repo)
- Git: Content stored as metadata => SVN: Stores files as content
- Git: Supports cloning => SVN: No cloning feature
- Git: Excellent branching/merging => SVN: Limited branching/merging support
- SVN Structure:
  - Trunk: Original/stable code (never commit broken code here)
  - Branches: Feature development branches (merge back to trunk when done)
  - Tags: Snapshots for deployment/releases (used for reverting if needed)

</expand>

<expand title="Git vs Mercurial">
## Git vs Mercurial

- Git: More complex, Linux heritage => Mercurial: Simpler, Python-based
- Git: Slightly slower => Mercurial: Faster performance
- Git: Supports unlimited number of parents => Mercurial: Allows only two parents

Secondary Concepts

</expand>

<expand title="Git Tools">
## Git Tools

- Git Bash: Command-line interface for Git
- Git GUI: Graphical version of Git commands with visual diff tools
- Gitk: Graphical history viewer (GUI shell over git log and git grep)
- Third-Party Tools: SourceTree, GitHub Desktop, GitKraken, etc.

</expand>

<expand title="Git Branching Model (Git Flow)">
## Git Branching Model (Git Flow)

- Standard set of guidelines for using Git in projects
- Main Branches:
  - Master/Main: Contains final production-ready code
  - Develop: Integration branch with latest development changes for next release
- Supporting Branches:
  - Feature branches: New features (branch from develop)
  - Release branches: Preparing new release (branch from develop)
  - Hotfix branches: Critical production fixes (branch from master)

</expand>

<expand title="Git Terminology">
## Git Terminology

- Repository (Repo): Collection of files and complete history of changes, stored as metadata
- Branch: Version of repository that diverges from main working project
- HEAD: Pointer to the last commit in current checked-out branch
- Checkout: Act of switching between different versions/branches
- Clone: Create a local copy of a remote repository
- Origin: Reference name for the remote repository from which project was initially cloned
- Remote: Shared repository on code hosting service (GitHub, GitLab, etc.)
- Index (Staging Area): Intermediate area between working directory and repository
- Master/Main: Default branch name (convention, can be renamed)
- Pull Request: Process to notify team members that feature is ready for review and merge
- Fork: Copy of repository that allows free experimentation without affecting original
- Stash: Temporarily save uncommitted changes to switch branches without committing
- Tag: Marker for specific point in Git history (lightweight or annotated)
- Cherry-Pick: Apply specific commit from one branch into another branch

</expand>

<expand title="Git Fetch vs Git Pull">
## Git Fetch vs Git Pull

- Git Fetch:
  - Downloads content from remote repository to local repository only
  - Does NOT merge changes into working directory
  - Safer: Doesn't modify your working files
  - Command: git fetch <remote> <branch>
- Git Pull:
  - Downloads content AND merges into current working directory
  - Combination of fetch + merge
  - Less safe: Directly modifies your working files
  - Command: git pull <branch> or git pull --rebase <branch>
- Use Case: Fetch when you want to review changes first, Pull when ready to integrate

</expand>

<expand title="General Commands">
## General Commands

- git status
- git clean -f // clean untracked files
- git clean -df // clean untracked directories as well.
- git branch -m new-branch-name // rename a local branch

</expand>

<expand title="Checking-out/creating a branch">
## Checking-out/creating a branch

- git checkout "branch_name"
- git checkout -b "branch_name" // will create a new branch
- git checkout - // this will take you to the branch and commit where you were standing before moving the head

</expand>

<expand title="Staging/Adding the Files">
## Staging/Adding the Files

- git add file_nameWithPath
- git add -p file_nameWithPath // divide the file into pathes and will ask rather you would like to push the current patch or not
- git add .

</expand>

<expand title="Committing the Files">
## Committing the Files

- git commit -m "message"
- git commit -am "message", git add -A && git commit -m "updated" // Stagging and commiting at the same time
- git commit --amend -m "message" // do not create a new commit with this message
- git commit --amend --no-edit // do not create a new commit and even message.

</expand>

<expand title="Pushing the Files"">
## Pushing the Files"

- git push origin branch_name
- git push origin branch_name --force
- git push --set-upstream origin branch_name // used for new branch only. Push the newly created local branch to the remote and set up tracking

</expand>

<expand title="Reverting the commit">
## Reverting the commit

- git revert commit_no // with create a new commit with revert changes. Do not remove the last commit.

</expand>

<expand title="Stashing">
## Stashing

- git stash
- git stash save "label name for the stash"
- git stash apply, git stash apply index_number
- git stash pop

</expand>

<expand title="Bisect">
## Bisect

- Command and process used to perform a binary search through the commit history of a repository to find the specific commit that introduced a bug or issue.
- Helps you automate the process of finding the commit responsible for introducing a bug by iteratively checking out specific commits and allowing you to determine whether the bug is present in each commit.
- STEPS:
  - git bisect start
  - git bisect bad commit_no // if commit_no will not be give, current commit will be taken. commit where the current code is buggy.
  - git bisect good commit_no // commit on which you think code is correct
  - NOTE: Here, it will tell you the buggy commit
  - git bisect reset // stop the bisecting

</expand>

<expand title="Squash">
## Squash

- Combine multiple, often smaller, commits into a single, more meaningful commit.
- Ways:
  - Identify the range of commits
  - Command: git log <start-commit>^..<end-commit> (git log abc123^..def456)
  - Interactively rebase:
  - This command will open a text editor displaying a list of commits in the specified range. You can then mark commits for squashing (by replacing "pick" with "squash" or just "s") or edit the commit messages.
  - Command:
    - git rebase -i <start-commit>^
- Steps:
  - up-to-date the branches:
  - git checkout main
  - git pull origin main   # Update the "dev" branch from the remote repository
  - git checkout feature
  - git pull origin feature   # Update the "feature" branch from the remote repository
  - Squash Commits:
  - git checkout feature
  - git rebase -i main // opens an interactive rebase session
  - Merge the Squashed Commit
  - git checkout main
  - git merge feature
  - Push Changes:
  - git push origin main

</expand>

<expand title="Destructuring">
## Destructuring

- Steps:
  - git fetch origin
  - git reset --hard origin/master

</expand>

<expand title="Discard unstaged changes">
## Discard unstaged changes

- git checkout .
- git clean -f
- git stash --include-untracked

</expand>

<expand title="Deleting a branch">
## Deleting a branch

- git branch -d "branch_name", git branch -D "branch_name" // delete locally
- git push origin --delete my-feature // delet remotely

</expand>

<expand title="Tags">
## Tags

- 

</expand>

<expand title="Merge Conflicts">
## Merge Conflicts

- Git Merge:
  - Simple Merge:
  - Also known as "three-way merge".
  - USE CASE: When we DO HAVE more commits after extracting the required branch (target branch). (see initial Structure Tree)
  - Working:
    - Git identifies a common ancestor commit shared by both branches. This common ancestor serves as a reference point for Git to understand the differences between the two branches.
    - Git then compares the changes made in the source branch and the target branch since their common ancestor. If there are no conflicts, Git will automatically merge thees changes, creating a new merge commit.
    - Tree Structure:
    - Initial Structure:

(main)

A---B---C

\

(feature)

D---E

    - After Merging:

(main)

A---B---C---M

\     /

(feature)

D---E

  - Fast Forward Merge:
  - USE CASE: When we DO NOT HAVE more commits after extracting the required branch (target branch). (see initial Structure Tree)
  - A fast-forward merge is a special type of merge that occurs when there is a clear, linear path from the target branch to the source branch. This typically happens when:
    - The target branch is up-to-date with the source branch.
    - The target branch is directly ahead of the source branch, and there have been no additional changes in the source branch.

- Git Pull:
  - By default, git pull performs a merge.
  - If you prefer to rebase your local changes on top of the remote changes instead of merging, you can use the --rebase option.
  - git pull --rebase
  - This will apply your local commits on top of the newly fetched remote commits.
  - Merge VS Pull:
  - Merge:
    - Primarily used to combine changes from one branch into another, either within the same repository or between branches within the same repository.
    - More control over the merge process.
    - Fetch then merge for creating the PR.
    - Create another commit.
  - Pull:
    - Primarily used to update your local branch with changes from a remote branch in a collaborative development environment (process of staying up-to-date).
    - Limited control over the merge process.
    - Pull:
    - Pull = fetch + rebase (git pull --rebase)
    - Pull = fetch + merge (git pull --no-rebase) (git pull) // default configured
    - Do not create a new commit.
- Git Rebase:
  - Maintains a linear and clean commit history.
  - Improves the readability of the project's timeline.
  - Reduces the clutter of merge commits.
  - Simplifies the integration of feature branches.
  - Tree Structure:
  - Initial Structure:

(main)

A---B---C

\

(feature)

D---E

  - After Rebasing: (HEAD is at "c")

(main)

A---B---C---D'---E'

\

(feature)

  - Merging: (HEAD is at "M")

(main)

A---B---C---D'---E'---M

\

(feature)

- Git Cherry-Pick:
  - Primarily used when you want to pick specific changes from one branch and incorporate them into another.
  - Command: git cherry-pick <commit-hash>
  - USE CASE:
  - Selective Changes
  - If changes mistakenly pushes to the wrong branch.
  - Applying Hotfixes: When a critical bug is discovered in a stable release (e.g., main), you can fix it in a feature branch, test it thoroughly, and then cherry-pick the fix into the stable branch without bringing in unrelated changes.
  - Backporting: going to the older version of a branch like feature-v2 to feature-v1.
- Git Stash Apply:
  - Simply apply the stashed changes.

</expand>

<expand title="Reflog">
## Reflog

- A protocol for HEAD pointer movement.
- USE CASES:
  - Mistakenly reset the head to a branch and wanted to go back to the original state.
  - Recovering the deleted branch.

</expand>

<expand title="SubModules">
## SubModules

- 

</expand>

<expand title="Aliases">
## Aliases

- git config --get-regexp alias // view the aliases already set
- git config --global alias.alias-name 'command' // set a new alias
- git blame

husky???

</expand>

<expand title="Scenarios where we need to use "-f" with git push">
## Scenarios where we need to use "-f" with git push

- Overwriting Commits:
  - You've made changes in your local branch, and you want to push them to a remote branch that has new commits that you don't have in your local branch.
  - NOTE: avoid it as it overwrites
- Rewriting History:
  - You've "amended", "rebased", or "squashed" commits in your local branch, resulting in a different commit history than what's on the remote branch.
- Forced Deletion:
  - 
- Renaming Branches:
  - If you're renaming a branch locally and want the remote branch to have the same name.
  - git branch -m new-branch-name // rename a local branch
  - git push -f origin new-branch-name // forcefully push
- Sync with a Fresh Start:
  - In situations where you want to make a clean start with your branch, discarding all previous history.
- After Squash

</expand>

<expand title="Logs">
## Logs

- git log branch_name // local Logs
- git log origion/branch_name // remote logs
- git log --after="2021-7-1" // date filter
- git log --grep="string_to_search" // show commits having this string
- git log --author="arqam-dev"
- git log -- file_name
- git log branch_name
- git log --graph --oneline --decorate, git log --graph // in graphical way

</expand>

<expand title="Git Log Graphical Tree Understanding">
## Git Log Graphical Tree Understanding

* d891798 (main) commit H

|\

| * e1b2c1c (feature2) commit G

| |\

| | * 1cfccdf commit F

| |/

| * 5f98e29 commit E

| |\

| | * 712a95e (feature1) commit D

| |/

| * 2d84c04 commit C

| |\

| | * 50bbae4 commit B

| |/

| * 8657cd5 commit A

</expand>

<expand title="Reapply the changes">
## Reapply the changes

- Scenario:
  - Create PR1 from "feature" to "main" branch.
  - Created PR2 by reverting the PR1.
  - Created PR3 from "feature" to main - This PR contains few of the additional changes (above changes in PR1).
  - Expected Behavior:
  - PR3 will contains all the changes - PR1 + newly added changes
  - Actual Behavior:
  - PR3 doesn't contains the changes of PR1 even though we have merged the revert of it and "main" does not include those chnages.
  - Reason:
  - Actually, Git assumes that if you have merged the revert of a PR, then intentially you do not want to send those changes in the PR (althogh the main branch does not contans the changes)
- WAYS:
  - Way1 - Cheryy-Pcik
  - Ways2 - Patch:
  - Step1: git format-patch -1 <original-commit-SHA>
  - Step2: git am < your-patch-file.patch // applying the patch
  - Ways3 - Rebase Interactive:
  - Step1: git rebase -i <commit-before-original-commit>
  - Step2: git rebase --continue
  - Way4 - Manual Copy-Paste

</expand>

<expand title="Single commit">
## Single commit

- --ammend
- format-patc

Common Commit Types:

feat: - A new feature (new functionality)

fix: - A bug fix

docs: - Documentation changes

style: - Code style changes (formatting, etc.)

refactor: - Code refactoring without changing functionality

test: - Adding or updating tests

chore: - Maintenance tasks, build changes, etc.

`

https://www.freecodecamp.org/news/git-cheat-sheet/

</expand>

