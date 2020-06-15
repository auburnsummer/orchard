Getting Started
===============

This document is a guide on how to install the development environment.

Prerequisites
-------------

You should have [Vagrant][1], [VirtualBox][2], and git installed. The development environment _probably_
works with other virtualisation providers other than VirtualBox, but I haven't tried.

Check that Vagrant is in the path. You can run something like `vagrant --version` in a terminal to check.
If it's not, you need to add it to the path. That's OS-specific, so search yourself for instructions.



Booting the development environment
------------

1. Clone this repository
2. Change directories into the repository (`cd orchard`)
3. Run the command `vagrant up`
   - It will take a while the first time, depending on your internet connection speed



[1]: https://www.vagrantup.com/
[2]: https://www.virtualbox.org/
