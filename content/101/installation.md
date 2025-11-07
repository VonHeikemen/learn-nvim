---
prev: false
---

# Installing Neovim

I will show some install methods you can try to get Neovim's latest stable version, `v0.11.5`. Released on `November 2, 2025`.

To avoid compatibility issues with "modern plugins" make sure you are on the latest stable. That said, a good number of popular plugins can still [work in v0.9.5](../blog/plugins-for-nvim-v09). And plugins that are compatible with Vim 8 should work just fine in Vim and Neovim.

## Windows

```sh
winget install Neovim.Neovim
```

## macOS

```sh
brew install neovim
```

## Linux

Neovim is available in many Linux package managers. You can check the package version here: [repology.org/project/neovim](https://repology.org/project/neovim/versions).

Not every package manager has an updated version of Neovim though. If you can't use your package manager, here's an alternative method you can follow:

1. Download appimage from github releases.

::: code-group

```sh [stable]
curl -LO https://github.com/neovim/neovim/releases/download/stable/nvim-linux-x86_64.appimage
```

```sh [nightly]
curl -LO https://github.com/neovim/neovim/releases/download/nightly/nvim-linux-x86_64.appimage
```

:::

2. Make it executable.

```sh
chmod +x nvim-linux-x86_64.appimage
```

3. Verify it works correctly.

```sh
./nvim-linux-x86_64.appimage --version
```

4. If everything went well, move the appimage into a directory that's in your PATH environment variable.

```sh
sudo mv ./nvim-linux-x86_64.appimage /usr/local/bin/nvim
```

::: details Expand: if appimage did not worked

Extract the content of the appimage.

```sh
./nvim-linux-x86_64.appimage --appimage-extract
```

Rename appimage directory to something more descriptive.

```sh
mv squashfs-root neovim-app
```

Make a symlink to the executable in any directory that is in your PATH environment variable.

```sh
sudo ln -s "$PWD/neovim-app/AppRun" /usr/local/bin/nvim
```
:::

## Build from source 

This example is for Debian based systems. See [BUILD.md](https://github.com/neovim/neovim/blob/master/BUILD.md#build-prerequisites) if you are using another operating system.

1. Install build dependencies.

```sh
sudo apt install ninja-build gettext cmake unzip curl build-essential
```

2. Git clone Neovim's source code into a directory.

```sh
git clone https://github.com/neovim/neovim ~/neovim-git
```

3. Navigate into the directory where you downloaded Neovim's source code.

```sh
cd ~/neovim-git
```

4. Change to the commit of the latest stable release (this step is optional).

```sh
git switch --detach stable
```

5. Execute the build command.

```sh
make CMAKE_BUILD_TYPE=Release
```

6. Execute the install command.

```sh
sudo make install
```

