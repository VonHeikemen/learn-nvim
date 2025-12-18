import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Learn nvim',
  description: 'Learn how to use Neovim and survive the experience',
  base: '/learn-nvim/',
  outDir: './output',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
    },
    nav: [
      {text: 'Donate', link: '/donate'},
    ],

    sidebar: sidebar(),

    socialLinks: [
      {icon: 'github', link: 'https://github.com/VonHeikemen/learn-nvim'}
    ]
  },
});

function sidebar() {
  return [
    {
      text: 'Getting started',
      items: [
        {text: 'Installation', link: '/101/installation'},
        {text: 'The nvim command', link: '/101/the-nvim-command'},
        {text: 'Vim modes', link: '/101/vim-modes'},
        {text: 'The help page', link: '/101/the-help-page'},
      ]
    },
    {
      text: 'Out of the box',
      items: [
        {text: 'Basic editing', link: '/101/basic-editing'},
        {text: 'Edit multiple files', link: '/101/edit-multiple-files'},
        {text: 'Searching', link: '/101/searching'},
        {text: 'File manager', link: '/101/file-manager'},
      ]
    },
    {
      text: 'Customization',
      items: [
        {text: 'Your first config', link: '/101/your-first-config'},
        {text: 'An introduction to lua', link: '/101/lua-intro'},
        {text: 'From vimscript to lua', link: '/101/from-vimscript-to-lua'},
        {text: 'Installing plugins', link: '/101/installing-plugins'},
      ],
    },
    {
      text: 'Features',
      items: [
        {text: 'Global plugin', link: '/feature/global-plugin'},
        {text: 'Filetype plugin', link: '/feature/filetype-plugin'},
        {text: 'LSP client', link: '/feature/lsp-client'},
        {text: 'LSP setup', link: '/feature/lsp-setup'},
        {text: 'Lua modules', link: '/feature/lua-modules'},
        {text: 'Treesitter', link: '/feature/treesitter'},
        {text: 'Colorscheme', link: '/feature/colorscheme'},
      ],
    }
  ];
}

