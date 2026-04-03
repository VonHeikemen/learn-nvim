# Installing plugins

Here we are going to talk about two features: [Vim packages](https://neovim.io/doc/user/pack.html#_using-vim-packages) and [vim.pack](https://neovim.io/doc/user/pack.html#_plugin-manager).

**Vim package** is the mechanism used in Vim to include a plugin into the [runtimepath](https://neovim.io/doc/user/options.html#'runtimepath'). This means the possibility to use a plugin *without a plugin manager* exists in Vim and Neovim.

**vim.pack** is a Neovim feature, a plugin manager. Do note is only available on **Neovim v0.12** or greater.

## Vim package

The documentation says...

> A Vim "package" is a directory that contains plugins.

But the story doesn't end there. There are two types of packages: optional and automatically loaded. And as many other things in Vim, packages need to follow a specific file structure. Imagine this.

```txt
example
├── opt
│   └── package-one
│       └── plugin
│           └── plugin-one.vim
└── start
    ├── package-two
    │   └── plugin
    │       └── plugin-two.lua
    └── package-three
        ├── doc
        │   └── plugin-three.txt
        └── lua
            └── plugin-three.lua
```

Packages in the `opt` directory are considered optional. Neovim will not use them until we execute the command [:packadd](https://neovim.io/doc/user/repeat.html#%3Apackadd).

Packages in `start` will be loaded automatically during Neovim's startup process.

A package can actually contain any number of runtime files. It can have color schemes, syntax files, documentation, and more. On the other hand, a plugin is just a script that's executed at some point in time. In the real world though you won't find a single soul using the term **Vim package**. What the documentation calls a package we (the community) call it a plugin.

## The pack directory

This is where we learn how to create a new package. In other words, how to install new plugins without a plugin manager.

There is an option called [packpath](https://neovim.io/doc/user/options.html#'packpath'), this is a list of directories where we can add a `pack` directory. And inside this `pack` directory we can have one or more packages.

Let's try to setup an example:

Usually our Neovim config directory is already included in the `packpath` list. This can be a valid location for packages.

Inside `pack` we need to create the top level directory that will contain the `opt` and `start` directories. I want to call this `bundle` (you can choose any name). So, depending on the operating system it could be in one of these paths:

```txt
~/.config/nvim/pack/bundle/         (Unix and OSX)
~/AppData/Local/nvim/pack/bundle/   (Windows)
```

Let's pretend we are on a linux system and we want to install [tokyonight.nvim](https://github.com/folke/tokyonight.nvim), which is a fancy color scheme. All we have to do is execute this command on our terminal.

```sh
git clone https://github.com/folke/tokyonight.nvim \
  ~/.config/nvim/pack/bundle/start/tokyonight.nvim
```

After we download a plugin we should generate the help tags, so the `:help` command can find the documentation of the plugin.

```sh
nvim --headless -c 'helptags ALL' -c 'quit'
```

And that's it. Now `tokyonight.nvim` will be available to us.

## Built-in plugin manager

The Vim package mechanism has a very limited scope. It's only goal is to make the editor aware that a plugin exists. The burden of management is on the **user**. How to install a new plugin? How to update a plugin? How to delete a plugin? **You** need to find the solution to all those problems.

On Neovim `v0.12` there is a plugin manager in the form of a lua module. This will be under the `vim` global, in a table field called `pack`. In a lua file we could do something like this.

```lua
vim.pack.add({
  'https://github.com/neovim/nvim-lspconfig',
  'https://github.com/nvim-mini/mini.nvim',
})
```

`vim.pack` will use `git` to download plugins. And the plugins will be installed as optional packages. So we have the possibility to install a plugin but choose when to load it. Do note the default behavior in [vim.pack.add()](https://neovim.io/doc/user/pack.html#vim.pack.add()) is to load the plugin immediately. So if we need to use a feature that needs one these plugins, we do it after the call to `vim.pack.add()`.

Here the first argument will be the list of plugins we want to install. And each plugin can be a string which contains the link to the git repository or a "[plugin spec](https://neovim.io/doc/user/pack.html#vim.pack.Spec)." For example, the following function call does the same thing as the one I showed before.

```lua
vim.pack.add({
  {
    src = 'https://github.com/neovim/nvim-lspconfig',
    name = 'nvim-lspconfig',
    version = 'master',
  },
  {
    src = 'https://github.com/nvim-mini/mini.nvim',
    name = 'mini.nvim',
    version = 'main',
  },
})
```

We would use the **plugin spec** form if we need to provide more information to `vim.pack`. We could download a specific version of the plugin instead fetching the latest commit from the default branch (`main` or `master`).

To update plugins we use the function [vim.pack.update()](https://neovim.io/doc/user/pack.html#vim.pack.update()). This will download the latest commits from the git repository and show a "confirmation buffer." This will give us the opportunity to review the changes before the plugin manager updates the code of the plugin. To confirm the changes we simply save the buffer with the `:write` command, and to discard them we close the buffer with the `:quit` command.

To delete a plugin we use the function [vim.pack.del()](https://neovim.io/doc/user/pack.html#vim.pack.del()). This will delete the plugin directory from disk.

Is worth mention `vim.pack` does not offer any "Ex-command" or vim function. If we want to update our plugins in Neovim's command-line mode we have to use the `:lua` command. Like this.

```vim
:lua vim.pack.update()
```

This is a little bit of a problem for users that have all their configuration in vimscript, in an `init.vim` file. But there is a solution, the `v:lua` variable. With it we can call a lua function using vimscript syntax. So this should work just fine in an `init.vim` file.

```vim
call v:lua.vim.pack.add([
\   "https://github.com/neovim/nvim-lspconfig",
\   "https://github.com/nvim-mini/mini.nvim",
\])
```

Notice here we use a regular vimscript array, and that will be converted to a lua table internally. If you need to use a plugin spec then you use a vimscript dictionary.

```vim
call v:lua.vim.pack.add([
\   {"src": "https://github.com/neovim/nvim-lspconfig", "version": "master"},
\   {"src": "https://github.com/nvim-mini/mini.nvim", "version": "main"},
\])
```

Be aware that `:lua` is a command and `v:lua` is an expression. They are different and expect different syntax.

## Preparing for the future

For some linux users it will take a couple of years before Neovim `v0.12` is available in their package managers. For example, any system based on Debian stable will only have Neovim `v0.10`. In this case if you want to use a plugin manager I recommend [mini.deps](https://nvim-mini.org/mini.nvim/doc/mini-deps.html).

The design of `vim.pack` is actually based on `mini.deps`. Because of this I believe the transition from `mini.deps` to `vim.pack` should be fairly simple. So you can start using `mini.deps` right now and then migrate to the native solution whenever you have the chance.

The first thing we would have to do is install [mini.nvim](https://github.com/nvim-mini/mini.nvim), which is the project that has `mini.deps`. But we have to do it in such a way that the plugin manager can manage itself.

`mini.deps`' documentation recommends downloading it in a sub-directory of Neovim's data directory. The location of this directory varies depending on the operating system, so to know the exact path execute this command on your terminal.

```sh
nvim --headless -c 'echo stdpath("data") . "/site/pack/deps/start"' -c 'quit'
```

Navigate to that location, you would want to execute the `git clone` command in that directory.

Now download `mini.nvim` with this command.

```sh
git clone --filter=blob:none https://github.com/nvim-mini/mini.nvim
```

If you are using **Neovim v0.9** make sure to pin to the commit [3923662](https://github.com/nvim-mini/mini.nvim/tree/3923662bf3d6ca49a9503f8d7196ea0450983e6a) since that's the last version that supports it.

```sh
git switch --detach 3923662bf3d6ca49a9503f8d7196ea0450983e6a
```

The last step is to generate the help tags.

```sh
nvim --headless -c 'helptags ALL' -c 'quit'
```

We are ready to start using `mini.deps`, but in our personal configuration we have to make sure the module is present. So we load the lua module in a safe way.

```lua
local ok, MiniDeps = pcall(require, 'mini.deps')
if not ok then
  vim.notify('[WARN] mini.deps module not found', vim.log.levels.WARN)
  return
end
```

We do this to avoid any scary error message in case we forget to download `mini.deps` before copying our personal configuration into a new system. In that case we just get a warning and Neovim stays in a usable state.

If everything goes well all the functions of the `mini.deps` module will be stored in the variable `MiniDeps`. And so we can enable the module using the `.setup()` function.

```lua
MiniDeps.setup({})
```

`mini.deps` default settings should be good enough so we just have an empty lua table as the first argument. If we need to change any setting we add a table field inside the `{}`.

To install new plugins we use the `.add()` function.

```lua
MiniDeps.add('neovim/nvim-lspconfig')
```

And this works just like `vim.pack.add()`, it'll download the plugin as an optional package and load it immediately.

In `mini.deps` the `.add()` function can only handle one plugin. If we want more plugins we call `.add()` as many times as needed. For example:

```lua
MiniDeps.add('neovim/nvim-lspconfig')
MiniDeps.add('nvim-mini/mini.nvim')
```

Notice here that `github` links have a special treatment, we don't have to write the entire URL, just the user (or organization) and the name of the repository. 

We do have to be careful with `mini.nvim`, if we are using Neovim v0.9 we would want to "freeze" the plugin so it doesn't receive updates that break the editor. So we should do something like this:

```lua
MiniDeps.add({
  source = 'nvim-mini/mini.nvim',
  checkout = vim.fn.has('nvim-0.10') == 1 and 'main' or 'HEAD'
})
```

Here if we detect that we are using Neovim v0.10 or greater then `checkout` will reference the `main` branch. Otherwise it'll reference `HEAD` which always points to the current commit, so this will make the plugin skip any updates and stay "frozen" in the current state.

Also, notice the plugin spec is different from the one in `vim.pack`. Instead of `src` we use `source`, instead of `version` we have `checkout`.

Now, if we put everything together we would end up with something like this in our personal configuration.

```lua
local ok, MiniDeps = pcall(require, 'mini.deps')
if not ok then
  vim.notify('[WARN] mini.deps module not found', vim.log.levels.WARN)
  return
end

-- See :help MiniDeps.config
MiniDeps.setup({})

MiniDeps.add('neovim/nvim-lspconfig')
MiniDeps.add({
  source = 'nvim-mini/mini.nvim',
  checkout = vim.fn.has('nvim-0.10') == 1 and 'main' or 'HEAD'
})
```

I highly recommend reading [mini.deps' documentation](https://nvim-mini.org/mini.nvim/doc/mini-deps.html) to know more about it.

