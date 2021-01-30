Master: [![Build Status](https://travis-ci.org/dharple/detox.svg?branch=master)](https://travis-ci.org/dharple/detox)
Develop: [![Build Status](https://travis-ci.org/dharple/detox.svg?branch=develop)](https://travis-ci.org/dharple/detox)

# Warning

I am not actively developing this version.  [Version 2] is under development,
but is not ready for release.  I've created a separate repository because it's
a total rewrite in a new language.

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

[Version 2]: https://github.com/dharple/detox-php
