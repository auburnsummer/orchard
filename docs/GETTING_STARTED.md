# Getting Started

This document describes how to get started with the development environment.

## Chat

Things relating to the level website are generally discussed in the #pharmacy channel on the Rhythm Doctor Lounge discord server.
For now, talk about orchard goes there as well. DM me @auburnsummer for access.

## Prerequisites

### What needs to be installed

You should have [VirtualBox][0], [Vagrant][1], and git installed. On Windows I suggest [Git Bash][2] but feel free to use whatever.

Check that Vagrant is in the path by running `vagrant --version`.

If you are on Windows, run the command `git config --global core.autocrlf false` before cloning this repo to ensure Unix-style line endings.

### Google Cloud Platform service account

orchard interacts with Google Drive as one of the sources available. Unfortunately this requires a service account,
which requires a Google Cloud Platform account, which requires a **credit card**!! (The Google Drive API itself doesn't
cost anything, it's just that you need a credit card to make a GCP account in the first place.)

I'm aware this is a big hassle. Therefore, the easiest way to obtain a service account is to DM me @auburnsummer and I'll send you the service account I'm using.

(It's not a big issue, because the service account we create here has no permissions at all.)

Alternatively, you can create your own:

 1. Make a new GCP project.
 2. Search "Google Drive" in the top bar.
 3. Enable the Google Drive API.
 4. Click on "Create Credentials".
 5. Which API am I using? Google Drive API
 6. Where will you be calling the API from? Other non-UI
 7. What data will you be accessing? Application data
 8. Are you planning to use this API with App Engine or Compute Engine? Nope
 9. It should prompt you to create a service account now.
 10. Service account name doesn't matter. Leave Role empty.
 11. Key Type should be JSON.
 12. Click Continue, then create it without a Role.
 13. It will download a JSON file.
 
Put the JSON file (the one you just got or the one I sent you) in the same directory as the `.env` file and call it `secret.json`.

## Setting up the VM

In this step, we use Vagrant to provision a VirtualBox VM running Ubuntu 20.04, then install the required tools. It
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
(It will be different for you and me). Take a note of this IP address.

![](https://user-images.githubusercontent.com/37142182/85196759-af063880-b31f-11ea-92e1-ff755da70256.PNG)

If you forget the IP address, you can run `vagrant ssh` to enter the VM, then run `ip addr` inside the VM.

## Accessing the development environment

The VM has booted up, but how do we actually code on it? There are a few ways here:

### Option 1: code-server

This option lets you edit files in a web-based environment.
This is probably the most straightforward way, since you don't need to install anything
on the host PC. Unless you have a good reason, just use this.

Visit `http://<THE IP>:8081` in a browser. For instance, the IP address of
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
You could do this if you have strong opinions on what you want your IDE to look like and want to
keep your local text editor.

First, run the command `vagrant ssh` to open a shell inside the VM. You will use this shell to run
commands. Run the command `cd /vagrant`

Then, open the git repo you cloned in any text editor of your choice (e.g. Visual Studio Code).
Try editing a file, then displaying that file with `cat`. The changes you made locally should be
reflected in the `/vagrant` directory of the VM.

## Running the code

In this section, we examine the commands to run the various parts of orchard.

### Multiple terminals

There's a few different parts of orchard, so it makes sense to have a few different terminals around.
There are a few different ways to accomplish this. The easiest is to just press the `+` button in code-server
whenever you want a new terminal:

![](https://user-images.githubusercontent.com/37142182/85215093-f55aa680-b3b6-11ea-9ebb-15e9e275e801.PNG)

Alternatively, the VM also has `tmux` installed. This is a tool which lets you run multiple terminals
in a single terminal. Take a look at [A Quick and Easy Guide to tmux](https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/)
if you want to go down that path. 

Alternatively again, you could also just run `vagrant ssh` in a bunch of different windows.

### SQL stuff

The backend uses [PostgREST][4] and [Postgres][5]. PostgREST is a server which automatically creates an API
from a SQL database. I used it because I thought it would save me time. In hindsight, it probably didn't. Ah well.

The VM should already have them installed. There are a few shell scripts in the `backend/src/scripts` directory which
you should use to set up the database. For now, ignore `import.sh` and `export.sh`.

`cd` to `/vagrant/backend`. From here, run `sh src/scripts/create.sh` (making use of tab-complete to do it quickly).

You'll see a lot of SQL commands whizz on by.

![Capture5](https://user-images.githubusercontent.com/37142182/85215262-571c1000-b3b9-11ea-8148-01b0a8524722.PNG)

Then, run the command `psql -U postgres`. This will enter a postgres shell as the user `postgres`. Try running a command
like `select * from orchard.level;`.

![](https://user-images.githubusercontent.com/37142182/85215277-96e2f780-b3b9-11ea-8851-48e883edf061.PNG)

There's nothing in the table yet, since we just made it! Don't worry, we'll start to add levels in the database soon
enough. Exit the postgres shell by typing in `exit`.

By the way, what does `create.sh` actually do? If you have a look at the file, you'll find that it uses `sed` to
combine various Python scripts in the `src/procedures` directory into one big SQL file, which it then runs. This means
that if the Python scripts change, the `create.sh` script needs to be reran for those changes to actually reflect in
the database.

### PostgREST stuff

The VM has PostgREST installed already, so this is pretty straightforward. Just run `postgrest tutorial.conf`:

![Capture7](https://user-images.githubusercontent.com/37142182/85215384-158c6480-b3bb-11ea-8f19-3a01275b3bfb.PNG)

If you navigate in a web browser to `<THE_IP>:3000/levels`, you'll get a response like `[]`. This is because there are
no levels yet.

You can exit PostgREST by pressing Ctrl-C. For now, we want to keep it running, so leave it as it is and open a new
terminal to do other things in.

### Scraper stuff

#### Decentralisation

Next, let's look at the scraper, which is the part of orchard which collects rdzips from various sources. 

Right now, the level system is very centralised. The only submission method is posting a level to #rd-showcase in RDL. However,
this makes the moderators and admins of RDL culpable for copyright violations enacted in the server.

Instead, for orchard, users are **responsible for their own levels**. Instead of one large Discord server, you would
set up a small private Discord server for you and your friends / level making group, and invite the Custom Levels Chick bot
to that server. Or you would store your levels in a shared Google Drive folder, or a personal Git repository...

This is fairly similar to how [chorus](https://github.com/Paturages/chorus) operates. Which makes sense, since orchard
is based off chorus in a few ways. The difference is I hope that for RD, people will gather around small groups rather than
entirely individual folders.

It will be more annoying than the current system, but this is the only way to retain our current freedoms in level making.

#### Starting up the scraper

`cd` to the `/vagrant/scraper` directory. Then run `npm install` to install the dependencies. Then run `node src/index.js` and
let that go for a while. If you go to `<THE_IP>:3000/levels` again, there will now be levels there!




[0]: https://www.virtualbox.org/
[1]: https://www.vagrantup.com/
[2]: https://gitforwindows.org/
[3]: https://github.com/cdr/code-server
[4]: http://postgrest.org/en/v7.0.0/
[5]: https://www.postgresql.org/
