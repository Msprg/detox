[![Build Status](https://travis-ci.com/dharple/detox.svg?branch=master)](https://travis-ci.com/dharple/detox)

# Notice

I renaming the `master` branch to `main` on or after February 15th, 2021.  If 
you have a checkout, you can update your checkout to point at the new branch 
using [these steps](https://gist.github.com/dharple/79b51d1c2fc0fea64fb84659581a6dc9).
Alternatively, you can check out a fresh copy of the repo.

# Overview

detox is a program that renames files to make them easier to work with under
Unix and related operating systems.  Spaces and various other unsafe
characters (such as "$") get replaced with "_".  ISO 8859-1 (Latin-1)
characters can be replaced as well, as can UTF-8 characters.  More details
are contained in the detox.1 man page.

# Runtime Notes

The most important option to learn is `-n`, aka `--dry-run`.  This will let you
run detox without actually changing any files, so that you can get an idea
of what detox is all about.

The simplest way to run detox is to just run it on a directory containing
files that need work:

	detox xfer_files/

You can also just to specify the filename:

	detox my\ bad\ file.txt

You can also specify recursion (this works best on directories):

	detox -r /music/transferred_from_elsewhere/

# Contact

Doug Harple <detox.dharple@gmail.com>
