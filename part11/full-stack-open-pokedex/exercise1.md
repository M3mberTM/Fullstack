# Exercise 11.1

I have picked the programming language Python for this exercise.

## Linting, Testing, Building

I will skip building, as Python doesn't require it.

For Linting, Python today mostly follows the PEP 8 guidelines. There seem to be multiple Linters that are possible to use,
some of which are: Pylint, Flake8 and Ruff. Each of these does the same thing, however they differ in implementation. For
my projects, I would probably use Pylint, as it seems the simplest to set up and does all of what I would need at the moment.

For testing, the main library used is called unittest. It is a Unit Testing Framework that allows for easy writing of tests
and I have used it in the past. 

## Alternatives to Github Actions and Jenkins

After some research, I found several that are relevant to me. One of which is TeamCity, which is a CI/CD that can be self-hosted
or in the cloud. It is especially relevant to me, as it's made by JetBrains, which also made the IDE I use (IntellijIDEA).

Other ones I found are Semaphore. Another one that seems to be highly relevant is Gitlab CI/CD which seems to be used a lot
in companies that have their own internal Gitlab for security reasons.

## Self-hosted or Cloud?

That is a hard question to answer. If I worked only myself, I would probably do self-hosted as there is no need to share
anything with anyone and I have full control. However, in a team, it would definitely make more sense to go for cloud as
everyone can have easy access to it and can easily set it up. 