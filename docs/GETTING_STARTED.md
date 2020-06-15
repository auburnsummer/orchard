Getting Started
===============

This document is a guide on how to install the development environment.

**NOT FINISHED YET**

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
4. Run the command `vagrant ssh` to enter the Ubuntu 20.04 VM.

Once you're in the VM, you can use Ctrl-D or just `logout` to exit.

You should be aware of these Vagrant commands as well, should you need them:

 * `vagrant halt` - Shutdown the VM. 
 * `vagrant destroy` - Shutdown the VM with predjudice. (This destroys the disk image)
 * `vagrant up` - Restart the VM after a halt or destroy.
 * `vagrant status` - See the status of the VM.
 
Generally speaking, you should run `vagrant halt` before turning off your computer. If Vagrant's really screwed up somewhere, just run `vagrant destroy` to get rid of everything then `vagrant up` to create a fresh VM.


[1]: https://www.vagrantup.com/
[2]: https://www.virtualbox.org/
