# elephant

There are three steps to install.

# Firstly, install the nodegraph into MoI's Appdata folder. You can do this using git most easily.

Installation (Win):

    cd C:\Users\<username>\AppData\Roaming\Moi\
    
    git clone https://github.com/nkallen/elephant.git

Installation (Mac):
    cd /Users/<username>/Library/Application Support/Moi/
    
    git clone https://github.com/nkallen/elephant.git

# Secondly, initialize your MoI application folder as a git repository. This allows us to safely make changes and easily roll them back

Installation (Mac):

    cd /Applications/MoI v4.app/
    
    git init .
    
    git checkout -b elephant

# Finally, download and apply the patch file:

Installation (Win):

    cd C:\Program Files\Moi v4.0\
    git am --ignore-whitespace elephant.patch

Installation (Mac):

    cd /Applications/MoI v4.app/
    git am --ignore-whitespace elephant.patch
