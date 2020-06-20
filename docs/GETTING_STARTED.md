# Getting Started

This document describes how to get started with the development environment.

## Prerequisites

You should have [VirtualBox][0], [Vagrant][1], and git installed. On Windows I suggest [Git Bash][2] but feel free to use whatever.

Check that Vagrant is in the path by entering `vagrant --version` in the command line.

If you are on Windows, run the command `git config --global core.autocrlf false` to ensure Unix-style line endings.


## Chat

Things relating to the level website are generally discussed in a special channel on RDL.
For now, talk about orchard goes there as well. DM me @auburnsummer for access.


## Setting up the VM

In this step, we use Vagrant to provision a VirtualBox VM running Ubuntu 20.04, which the required tools will be installed in. It
should be possible to use other hypervisors other than VirtualBox (e.g. HyperV), but I have not tested these.

First, clone this repository, then `cd` into the resulting directory. You should now be at the same directory
as the `Vagrantfile`. You can run `ls` in Git Bash (or `dir` in Command Prompt) to check this:

![](https://user-images.githubusercontent.com/37142182/85196335-e9220b00-b31c-11ea-8c3e-360fd2500831.PNG)

Now you can run `vagrant up` to make the VM. **This will take a while.**

You should be aware of a few basic Vagrant commands:

 * `vagrant status` - See the current status of the VM.
 * `vagrant halt` - Shut down the VM.
 * `vagrant destroy` - Destroy the VM completely.
 * `vagrant up` - Boot up the VM (if it's halted), or build the VM (if it's destroyed).
 * `vagrant ssh` - Start a terminal shell inside the VM.

If something has _really_ broken in the VM, your best bet is to probably just destroy it and rebuild it again.

After `vagrant up` has finished, you will see a screen with a number of IP addresses on it.
You want the IP address of the `eth1` interface. This is the IP address of the VM that you can use to access it.
(It will be different for you and me).

![](https://user-images.githubusercontent.com/37142182/85196759-af063880-b31f-11ea-92e1-ff755da70256.PNG)

## Accessing the development environment

The VM has booted up, but how do we actually code on it? There are a few ways here:

### Option 1: code-server

This option lets you edit files in a web-based environment.
This is probably the most straightforward way, since you don't need to install anything
on the host PC. 

Just visit `http://<THE IP>:8081` in a browser. For instance, the IP address of
my VM was `172.28.128.4`, so I would visit `http://172.28.128.4:8081`.

What you'll find is basically Visual Studio Code but in a browser window:

![](https://user-images.githubusercontent.com/37142182/85197051-eaa20200-b321-11ea-9da8-ff06c0ca3c71.PNG)

If you've used VS Code before, this should be fairly familiar. It will show you a warning
about lack of HTTPS, which you can just ignore (we are not exposing this to the wider internet).

Anyway, you'll want to open the folder `/vagrant`. The git repo will be here in this
directory. You will be able to see the files on the sidebar.

You can also open a terminal by clicking the Application Menu in the top-left corner, then selecting
`Terminal`->`New Terminal` (or press Ctrl-Shift-C). You can use this shell to run commands in the VM.
Keep in mind that this terminal runs as root by default, so be careful!

### Option 2: local editing

In this option, we edit the files locally, which are then synced with the VM using a synced folder.

First, run the command `vagrant ssh` to open a shell inside the VM. You will use this shell to run
commands. Run the command `cd /vagrant`

Then, open the git repo you cloned in any text editor of your choice (e.g. Visual Studio Code).
Try editing a file, then displaying that file with `cat`. The changes you made locally should be
reflected in the `/vagrant` directory of the VM.

## Running the code

In this section, we examine the commands to run the various parts of orchard.

Will write this later





[0]: https://www.virtualbox.org/
[1]: https://www.vagrantup.com/
[2]: https://gitforwindows.org/
[3]: https://github.com/cdr/code-server
