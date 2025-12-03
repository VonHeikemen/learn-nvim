---
prev: false
next: false
---

# Plugins for Neovim v0.9

Here I'll share some popular plugins that still work fine in Neovim `v0.9.5`.

Since there is no way to tell for how long they will support older Neovim versions I'll share the link and the specific commit that is still compatible with Neovim `v0.9.5`.

## Descriptions

| Name                                                                                            | Description                                                           |
| ---                                                                                             | ---                                                                   |
| [lazy.nvim](https://github.com/folke/lazy.nvim)                                                 | Plugin manager.                                                       |
| [tokyonight.nvim](https://github.com/folke/tokyonight.nvim)                                     | Collection of colorscheme for Neovim.                                 |
| [snacks.nvim](https://github.com/folke/snacks.nvim)                                             | Collection of QoL plugins.                                            |
| [bufferline.nvim](https://github.com/akinsho/bufferline.nvim)                                   | Show open files in tabline.                                           |
| [mini.nvim](https://github.com/nvim-mini/mini.nvim)                                             | Collection of independent lua modules that enhance Neovim's features. |
| [gitsigns.nvim](https://github.com/lewis6991/gitsigns.nvim)                                     | Shows indicators in gutter based on file changes detected by git.     |
| [vim-fugitive](https://github.com/tpope/vim-fugitive)                                           | Git integration into Neovim/Vim.                                      |
| [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)                           | Configures treesitter parsers. Provides modules to manipulate code.   |
| [nvim-treesitter-textobjects](https://github.com/nvim-treesitter/nvim-treesitter-textobjects)   | Creates textobjects based on treesitter queries.                      |
| [vim-repeat](https://github.com/tpope/vim-repeat)                                               | Add "repeat" support for plugins.                                     |
| [mason.nvim](https://github.com/williamboman/mason.nvim)                                        | Portable package manager for Neovim.                                  |
| [mason-lspconfig.nvim](https://github.com/williamboman/mason-lspconfig.nvim)                    | Integrates nvim-lspconfig and mason.nvim.                             |
| [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)                                      | Quickstart configs for Neovim's LSP client.                           |
| [nvim-cmp](https://github.com/hrsh7th/nvim-cmp)                                                 | Autocompletion engine.                                                |
| [cmp-buffer](https://github.com/hrsh7th/cmp-buffer)                                             | nvim-cmp source. Suggest words in the current buffer.                 |
| [cmp-path](https://github.com/hrsh7th/cmp-path)                                                 | nvim-cmp source. Show suggestions based on file system paths.         |
| [cmp-mini-snippets](https://github.com/abeldekat/cmp-mini-snippets)                             | nvim-cmp source. Show suggestions based on installed snippets.        |
| [cmp-nvim-lsp](https://github.com/hrsh7th/cmp-nvim-lsp)                                         | nvim-cmp source. Show suggestions based on LSP servers queries.       |
| [friendly-snippets](https://github.com/rafamadriz/friendly-snippets)                            | Collection of snippets.                                               |
| [nvim-ts-context-commentstring](https://github.com/JoosepAlviste/nvim-ts-context-commentstring) | It helps detect comment syntax.                                       |
| [which-key.nvim](https://github.com/folke/which-key.nvim)                                       | Provide clues for keymaps.                                            |


## Versions

Last updated: 2025-11-10

These already dropped support for `v0.9`. So, newer versions will no longer work.

| Plugin                        | Commit                                   |
| ---                           | ---                                      |
| gitsigns.nvim                 | ee28ba3e70ecea811b8f6d7b51d81976e94b121c |
| mason-lspconfig.nvim          | 1a31f824b9cd5bc6f342fc29e9a53b60d74af245 |
| mason.nvim                    | fc98833b6da5de5a9c5b1446ac541577059555be |
| nvim-lspconfig                | cb33dea610b7eff240985be9f6fe219920e630ef |
| nvim-treesitter               | 42fc28ba918343ebfd5565147a42a26580579482 |
| nvim-treesitter-textobjects   | 0f051e9813a36481f48ca1f833897210dbcfffde |
| snacks.nvim                   | 3a8ecf591263e4706d9b3a45da590df914ea5505 |

Newer version of these plugins might still work in `v0.9`.

| Plugin                        | Commit                                   |
| ---                           | ---                                      |
| bufferline.nvim               | 655133c3b4c3e5e05ec549b9f8cc2894ac6f51b3 |
| cmp-buffer                    | b74fab3656eea9de20a9b8116afa3cfc4ec09657 |
| cmp-mini-snippets             | 582aea215ce2e65b880e0d23585c20863fbb7604 |
| cmp-nvim-lsp                  | cbc7b02bb99fae35cb42f514762b89b5126651ef |
| cmp-path                      | c642487086dbd9a93160e1679a1327be111cbc25 |
| friendly-snippets             | 572f5660cf05f8cd8834e096d7b4c921ba18e175 |
| lazy.nvim                     | 85c7ff3711b730b4030d03144f6db6375044ae82 |
| mini.nvim                     | 72b0194c56c984476c5975b62eb340fd1aa1686a |
| nvim-cmp                      | d97d85e01339f01b842e6ec1502f639b080cb0fc |
| nvim-ts-context-commentstring | 1b212c2eee76d787bbea6aa5e92a2b534e7b4f8f |
| tokyonight.nvim               | 5da1b76e64daf4c5d410f06bcb6b9cb640da7dfd |
| vim-fugitive                  | 61b51c09b7c9ce04e821f6cf76ea4f6f903e3cf4 |
| vim-repeat                    | 65846025c15494983dafe5e3b46c8f88ab2e9635 |
| which-key                     | 3aab2147e74890957785941f0c1ad87d0a44c15a |

