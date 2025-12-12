# Your first Neovim config

I want to show you how to build a simple configuration file for Vim and Neovim. So here I will teach you the basic commands and functions that you can use to customize Neovim.

I will explain enough so you understand what is happening, but I will not go in depth on every single detail and possibility. At the end there will be a snippet of code you could use as the base for your first configuration.

## The config directory

By default Neovim's main configuration file needs to be in a dedicated directory. The path to this directory can change depending on the operating system or environments variables, but these are the usual places:

```txt
~/.config/nvim/         (Unix and OSX)
~/AppData/Local/nvim/   (Windows)
```

You must create this directory yourself.

To know the exact path of Neovim's config directory execute this command on the terminal.

```sh
nvim --headless -c 'echo stdpath("config") . "\n"' -c 'quit'
```

## The init file

Here decisions need to be made. The configuration file for Neovim can be written in vimscript or lua.

I will use vimscript because I want to show a configuration that works in Vim and Neovim. But do keep in mind Vim and Neovim have different names and location for the configuration file.

In Neovim the configuration file should be called `init.vim`. And this would be the (usual) path.

```txt
~/.config/nvim/init.vim         (Unix and OSX)
~/AppData/Local/nvim/init.vim   (Windows)
```

Of course, if we were to choose lua the file wouldn't be `init.vim`, it would be `init.lua`.

## Set your settings

In vimscript we use the [:set](https://neovim.io/doc/user/options.html#set-option) command to configure Vim options. These are the settings I find useful.

```vim
set number
set norelativenumber
set signcolumn=yes
set tabstop=2
set shiftwidth=2
set expandtab
set nowrap
set nohlsearch
set smartcase
set ignorecase
set mouse=nvi
set termguicolors
set cursorline
set noswapfile
set completeopt=menu,menuone,noinsert
```

Notice some of these start with the prefix `no`. This works for a specific type called `boolean`. Boolean options can only have two values, it's either enabled or disabled. Consider this.

```vim
set relativenumber
set norelativenumber
```

`relativenumber` is the name of the option itself. But if it has the prefix `no` then it means we want to disable it.

To know more details about an option you can read the help page. Write the command `:help` and wrap the name of the option in single quotes. For example:

```vim
:help 'relativenumber'
```

## Changing the color scheme

Interestingly enough there isn't an option to change the theme of the editor. Instead we have a dedicated command, [:colorscheme](https://neovim.io/doc/user/syntax.html#%3Acolorscheme).

```vim
colorscheme habamax
```

Unfortunately the command `colorscheme habamax` will fail on older versions of Neovim below v0.8.

If we don't want the execution of our config to be interrupted by an error we can use the [:try](https://neovim.io/doc/user/eval.html#_try-conditionals) command.

```vim
try
  colorscheme habamax
endtry
```

## Check Neovim's version

Not every package manager will have the latest Neovim available in its official repository. Installing Neovim on OSX via `homebrew` can get you v0.11 or greater. But using `apt install` on Ubuntu 24.04 will get you v0.9.5.

If we want to have a configuration that's backwards compatible is a good idea to check Neovim's version before using a feature that we know is only available in newer versions.

Here's an example using a new color scheme called `retrobox`.

```vim
if has('nvim-0.10')
  colorscheme retrobox
endif
```

In this snippet we are using two features of vimscript. We have a conditional block and the [has()](https://neovim.io/doc/user/builtin.html#has()) function. In this case we check if we have Neovim v0.10, and if it's true use the `retrobox` theme.

`has()` can also be used to detect if we are using Vim or Neovim. We can do this.

```vim
if !has('nvim')
  set hidden
  set belloff=all
  set autoread
  set autoindent
  set laststatus=2
  set wildmenu
  set wildoptions=pum,tagfile

  syntax enable
endif
```

Here you can read `!has('nvim')` as "we are not inside Neovim" and so the code inside the block will only execute on Vim. Note the code inside the `if` block is already part of Neovim's default, there is no need to execute it (again) if we are already in Neovim.

## Configure Netrw

Right now Netrw is the default file explorer in Vim and Neovim. This is implemented as a plugin written in vimscript. This means we have to use **global variables** to configure it.

To modify global variables we use the [:let](https://neovim.io/doc/user/eval.html#let) command. Here is an example.

```vim
let g:netrw_banner = 0
```

Here `g:netrw_banner` is the name of the variable. The equal sign means this is an assignment. The thing on the right hand side of `=` must be valid vimscript. Although most of the time we will use numbers or text wrapped in quotes.

To know what settings are available in Netrw read the documentation.

```vim
:help netrw-browser-settings
```

Now, if your configuration is written in lua then the syntax will change a little bit. In lua we must use `vim.g` to modify global variables of vimscript plugins.

```lua
vim.g.netrw_banner = 0
```

Remember that lua is another scripting language. We can't just write valid vimscript in a lua file. In lua there are special features we can use to interact with vimscript plugins, `vim.g` is just one of them.

## Simple mappings

Keymaps in Vim are basically a way of automating keystrokes. Here is a good example.

```vim
xnoremap gy "+y
```

This command will create the keymap `gy` in visual mode. So in visual mode when you press `gy` it'll be the same as pressing `"+y`.

`"+y` is the annoying way we can copy text from Neovim to the system clipboard.

`xnoremap` is part of a [family of commands](https://neovim.io/doc/user/map.html#map-overview). These are the ones we'll be using most of the time.

```txt
nnoremap -> normal mode mapping
xnoremap -> visual mode mapping
inoremap -> insert mode mapping
```

Now, to execute ex-commands we can use `:`. Like this.

```vim
nnoremap <C-g> :echo "Hello there"<cr>
```

With this pressing `Ctrl + g` in normal mode will print the message `Hello there`. Notice the `:` before the `echo` command, and also the `<cr>` at the end.

But there is another way to trigger a command, that is using the special sequence `<cmd>`. I like this more than `:` because it'll tell you if you forget to add `<cr>` at the end. Also, according to the documentation, is a little bit more flexible than `:`.

The previous example can be written like this.

```vim
nnoremap <C-g> <cmd>echo "Hello there"<cr>
```

One more thing...

We have to talk about "the leader key." This is a special sequence people use as a prefix for their custom keymaps. If you go around in the wild you might find a keymap like this.

```vim
nnoremap <leader>w <cmd>write<cr>
```

This `<leader>` sequence can be configured, so it can be whatever we want. Most people like to use the `Space` key.

We modify the value of the leader key by assigning a value to the global variable `mapleader`. This is the most common setup.

```vim
let g:mapleader = " "
```

A more complete example would look like this.

```vim
let g:mapleader = " "

" Exit Neovim
nnoremap <leader>q <cmd>quitall<cr>

" Save file
nnoremap <leader>w <cmd>write<cr>
```

We have to configure `g:mapleader` before we use it. Here `Space + q` would exit Neovim. `Space + w` would save the current file.

## First look at autocommands

Autocommands is the mechanism we use to execute code when an "event" happens.

Consider this piece of code.

```vim
autocmd filetype help nnoremap <buffer> q <cmd>close<cr>
```

Here we are creating an autocommand on the event `filetype`. This event is triggered after Neovim figures out what type of file we are editing. In this specific example we only care about the `help` filetype. So when we open `help` page Neovim will execute the `nnoremap` command.

Sometimes people like to group autocommands together. That way they can track better the code. For example.

```vim
augroup hello_cmds
  autocmd!
  autocmd filetype netrw echo "Hello from netrw"
  autocmd filetype help echo "Hello from the help page"
augroup END
```

Here we have the `hello_cmds` group. If we want to inspect all the autocommands in this group, we execute this command.

```vim
:autocmd hello_cmds
```

## Example init.vim

```vim
" ============================================================================
" ===                           EDITOR SETTINGS                            ===
" ============================================================================

set number
set norelativenumber
set signcolumn=yes
set tabstop=2
set shiftwidth=2
set expandtab
set nowrap
set nohlsearch
set smartcase
set ignorecase
set mouse=nvi
set noswapfile
set completeopt=menu,menuone,noinsert

if !has('nvim')
  set hidden
  set belloff=all
  set autoread
  set autoindent
  set laststatus=2
  set wildmenu
  set wildoptions=pum,tagfile

  syntax enable
endif

try
  set termguicolors
  set cursorline
  colorscheme habamax
catch
  set notermguicolors
  set nocursorline
  colorscheme default
  highlight clear SignColumn
endtry

let g:netrw_banner = 0
let g:netrw_winsize = 30
let g:netrw_liststyle = 0

" ============================================================================
" ===                               KEYMAPS                                ===
" ============================================================================

" Use <Space> as a leader key
let g:mapleader = " "

" Copy/paste using system clipboard
nnoremap gy "+y
xnoremap gy "+y
nnoremap gp "+p
xnoremap gp "+p

" Exit Neovim
nnoremap <leader>q <cmd>quitall<cr>
nnoremap <leader>Q <cmd>quitall!<cr>

" Save file
nnoremap <leader>w <cmd>write<cr>

" Toggle file explorer
nnoremap <expr> <leader>e &ft=='netrw' ? '<cmd>close<cr>' : '<cmd>Lexplore<cr>'

function NetrwMapping()
  " Go back in history
  nmap <buffer> H u

  " Go up a directory
  nmap <buffer> h -^

  " Open file/directory
  nmap <buffer> l <cr>
endfunction

augroup user_cmds
  autocmd!
  autocmd filetype netrw call NetrwMapping()
  autocmd filetype help,man,checkhealth nnoremap <buffer> q <cmd>close<cr>
augroup END
```

