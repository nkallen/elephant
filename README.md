# elephant

There are three steps to install.

# Firstly, install the nodegraph into MoI's Appdata folder. You can do this using git most easily.

Installation (Mac):

    cd /Users/<username>/Library/Application Support/Moi/
    git clone https://github.com/nkallen/elephant.git

# Secondly, initialize your MoI application folder as a git repository. This allows us to safely make changes and easily roll them back. I also recommend making a branch named "elephant" so we can keep main/master clean.

Installation (Mac):

    cd /Applications/MoI v4.app/
    git init .
    git checkout -b elephant

# Finally, download and apply the patch files:

[The patch file are here](https://github.com/nkallen/elephant/releases/tag/v0.1-alpha)

Installation (Mac):

    cd /Applications/MoI v4.app/
    git am --directory commands --ignore-whitespace ~/Downloads/commands.patch
    git am --directory ui --ignore-whitespace ~/Downloads/ui.patch
