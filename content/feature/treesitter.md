---
prev:
  text: Features
  link: /feature/index
next: false
---

# Treesitter

Neovim's **treesitter support** has been an experimental feature for a few years now. Even today, on the latest stable (`v0.12`) is marked as experimental. Since treesitter is a buzzword some people like to shout without any explanation here I'll try my best to shed a light on this topic.

## What's treesitter?

[The official documentation](https://tree-sitter.github.io/tree-sitter/) describes treesitter as an incremental parsing library. In other words, treesitter's main job is to read plain text and transform it into a data structure.

*And how is that useful?*

It's easier to extract information from structured data in comparison to plain text. This is the same thing "compiled languages" do. They process plain text and generate an **Abstract Syntax Tree** (AST). And all the fancy analysis a compiler can do is based on the AST.

To be clear, treesitter only reads plain text and generates an Abstract Syntax Tree. And it's Neovim's job to do something useful with this "tree."

Treesitter's other job is to provide tools so the editor and plugin authors can extract data out of the AST.

## Syntax highlight

Syntax highlight was one of the first areas where treesitter was used, is **the** feature that made treesitter famous in the Neovim community. Because in many cases treesitter's AST was more accurate than Vim's syntax files.

This new treesitter based highlight has the same purpose as syntax files. All it does is create "highlight groups." And the colorscheme author is the one that needs to use these new highlight groups.

And this shows perfectly why treesitter is so hard to explain in simple words. Treesitter by itself is not a feature for casual users. It's the editor itself and the people that knows how to extend it (plugin authors) the ones creating the features that casual users see and interact with.

## Other use cases

In Neovim's lua api we have access to a module called [vim.treesitter](https://neovim.io/doc/user/treesitter.html#_lua-module:-vim.treesitter) and this means any user with enough patience can start implementing features based on treesitter. This is what many plugins use internally. For example...

[mini.snippets](https://github.com/nvim-mini/mini.nvim/blob/main/readmes/mini-snippets.md) (a module of [mini.nvim](https://github.com/echasnovski/mini.nvim)) can use treesitter to help provide context aware snippets. When setup correctly `mini.snippets` can use treesitter to figure out what is the language of the symbol under the cursor. Then it uses this information to search the user's personal snippet collection.

[nvim-treesitter-context](https://github.com/nvim-treesitter/nvim-treesitter-context) is another interesting plugin. It uses treesitter to figure out where you are in the current function and decide if it should display the context at the top of the window.

Hopefully these examples showcase the value of Neovim's treesitter integration. It isn't just something for colorschemes, it's a tool that can be used to build cool features.

## Language support

This is where things get interesting.

Treesitter doesn't have support for any language by default. Is not like the developers of treesitter have to add support for a specific language. They decided to make it modular in a way. So there are three components to treesitter: parsers, queries and the library.

### Treesitter library

The "library" is the part of treesitter that is integrated into Neovim. Is the thing that process the content of a file.

### Treesitter parsers

Parsers are language specific. This is the component that knows how to read the code of a programming language and generates the AST.

I believe parsers are also "libraries" but these are like modules other people can implement. This is how you add support for a language, you install a treesitter parser for the language you want to use.

### Treesitter queries

This is the mechanism we use to extract information out of the AST. Queries are written in a lisp-like language and it's basically how we search within the AST.

This is an example query for the json parser.

```txt
(object
  (pair
    key: (string) @some-thing))
```

The entire AST treesitter creates can be represented in this syntax and a query is a pattern that can match one or more nodes in the file.

In some cases the query is the component that powers a specific feature. The syntax highlight for example. In this case Neovim will search the [runtimepath](/feature/global-plugin#the-runtimepath) any file that matches the pattern `queries/*/highlights.scm`. Where `*` is replaced by the name of a treesitter parser. And so `highlight.scm` will be the file that contains the queries that assigns the highlight groups.

## About nvim-treesitter

[nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) was probably the first plugin to ever implement features based on treesitter. It had multiple goals:

* Provide commands to install treesitter parsers
* Provide queries for the supported parsers
* Implement experimental features that may land in Neovim in the future

The overall idea of this plugin was to make it easier to use treesitter within Neovim. Starting with the treesitter parsers, `nvim-treesitter` provides the command `:TSInstall` so we can add new treesitter parsers. Additionally, it provides queries for highlights, indents and folds.

On april 2026 the plugin was archived. The Neovim team [is planning something](https://github.com/neovim/neovim/issues/39006) to replace it, but we will have to wait before something concrete happens.

In its current state nvim-treesitter is only compatible with Neovim **v0.12**. And its usage is pretty simple:

First we install a parser using the command `:TSInstall`, for example.

```vim
:TSInstall bash
```

This will download the treesitter parser for bash, compile it and copy all the query files into Neovim's runtimepath.

Once everything is in place we procede to enable whatever features we have available. Right now it's just syntax highlight and code folding. For this we can use an autocommand.

```lua
-- neovim filetypes where you want to enable treesitter
local ts_filetypes = {'sh'}

vim.api.nvim_create_autocmd('FileType', {
  pattern = ts_filetypes,
  callback = function()
    -- enable syntax highlight
    vim.treesitter.start()

    -- enable folds
    vim.wo[0][0].foldexpr = 'v:lua.vim.treesitter.foldexpr()'
    vim.wo[0][0].foldmethod = 'expr'
  end
})
```

The equivalent in vimscript would something like this:

```vim
function TreesitterStart()
  " enable syntax highlight
  lua vim.treesitter.start()

  " enable folds
  setlocal foldexpr=v:lua.vim.treesitter.foldexpr()
  setlocal foldmethod=expr
endfunction

autocmd FileType sh call TreesitterStart()
```

Notice how these two features we enabled come from `vim.treesitter`. This means they are built into Neovim. They can work as long as the parser and the query files are located in the runtimepath. If we were to delete nvim-treesitter but keep the parser and the queries, the features would still work.

## Treesitter without plugins

Some people seem to think treesitter features were introduced in Neovim **v0.12**. That's just not true. [vim.treesitter.start()](https://neovim.io/doc/user/treesitter/#vim.treesitter.start()) and [vim.treesitter.foldexpr()](https://neovim.io/doc/user/treesitter/#vim.treesitter.foldexpr()) were introduced in Neovim **v0.9**. So using treesitter without plugins has been a possibility since april 2022. We just have to know how to install a parser.

To compile a parser we need [treesitter's CLI tool](https://github.com/tree-sitter/tree-sitter) and a C compiler available in our system.

Now let's assume we are on a linux system and we want to install the [treesitter parser for bash](https://github.com/tree-sitter/tree-sitter-bash).

First thing we should do is download the source code for the parser. A good old `git clone` would do the trick.

```sh
git clone https://github.com/tree-sitter/tree-sitter-bash
```

Now we navigate to the directory we just downloaded.

```sh
cd tree-sitter-bash
```

And this is were we compile the parser using the CLI tool. In most cases this command is all we need:

```sh
tree-sitter build -o parser.so
```

Once the parser has been compiled we can move it to a directory in Neovim's [runtimepath](/feature/global-plugin#the-runtimepath). Our Neovim config directory can be an option.

```sh
cp ./parser.so ~/.config/nvim/parser/bash.so
```

Note that treesitter parsers must be located in a directory called `parser`. So, if you don't have one, create it. Here, the name of the file becomes the name of the parser.

Usually the name of the parser determines in which filetype is going to be used. But in this case `bash` is not a filetype name in Neovim. For bash we must "register" the filetype where we want this parser to be used. We add this somewhere in our Neovim configuration.

```lua
vim.treesitter.language.register('bash', {'sh'})
```

Here we are saying we want to use the `bash` parser whenever we encounter the filetype `sh`.

Now we need the query files that will power the features we want to enable. Some parsers do have query files included in the source code. Notice in the bash repository there is a directory called [queries](https://github.com/tree-sitter/tree-sitter-bash/tree/a06c2e4415e9bc0346c6b86d401879ffb44058f7/queries). We can use that if we want.

```sh
cp ./queries/highlights.scm ~/.config/nvim/queries/bash/highlights.scm
```

Query files must be located in a directory called `queries`. And the specific queries for a parser must be in a sub-directory that has the same name as the parser.

Do note that query files that come with the parser source code are generic. They should work but there is no guarantee. Remember that queries are tied to the specific implementation of a feature. See for example [queries/highlights.scm](https://github.com/tree-sitter/tree-sitter-bash/blob/a06c2e4415e9bc0346c6b86d401879ffb44058f7/queries/highlights.scm) in the bash parser. And compare that to the queries provided by nvim-treesitter in [runtime/queries/bash/highlights.scm](https://github.com/nvim-treesitter/nvim-treesitter/blob/4916d6592ede8c07973490d9322f187e07dfefac/runtime/queries/bash/highlights.scm). The one in nvim-treesitter has a lot more information and is aware of the convention Neovim uses for highlight groups. The one in the bash parser uses generic names and is smaller in size.

Back to Neovim, now that we have the parser library compiled and the query file for highlights in place is time to enable the feature. For this we just have to execute the function `vim.treesitter.start()` after the `FileType` event.

This is how we do it in lua.

```lua
vim.api.nvim_create_autocmd('FileType', {
  pattern = {'sh'},
  callback = function()
    vim.treesitter.start()
  end
})
```

And this is the equivalent in vimscript.

```vim
autocmd FileType sh lua vim.treesitter.start()
```

If you are wondering why we only enable highlights and not code folding, that is because the bash parser does not have queries for code folding. We would have to copy the query file from nvim-treesitter ([runtime/queries/bash/folds.scm](https://github.com/nvim-treesitter/nvim-treesitter/blob/4916d6592ede8c07973490d9322f187e07dfefac/runtime/queries/bash/folds.scm)) if we want to make `vim.treesitter.foldexpr()` work.

And this is it. That's all you need to know to make treesitter work in Neovim.

