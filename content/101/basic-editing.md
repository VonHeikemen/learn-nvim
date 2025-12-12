# Basic editing

Here I will cover the basic concepts of Vim. The kind of thing everyone else assumes you already know. I will give you the tools you need to use Vim, Neovim and any text editor with a "Vim emulation" plugin.

## Changing modes

To survive in any Vim-based editor we must know how to navigate between the four basic modes.

* [Normal mode](./vim-modes#normal-mode): From any other mode pressing the `Escape` key will make Vim go back to normal mode.

* [Insert mode](./vim-modes#insert-mode): Press `i` in normal mode.

* [Visual mode](./vim-modes#visual-mode): Press `v` in normal mode.

* [Command-line mode](./vim-modes#command-line-mode): Press `:` in normal mode.

## Moving the cursor

In Vim the commands that just move the cursor are called [motions](https://neovim.io/doc/user/motion.html). And the most basic motions move the cursor one spot.

```txt
h -> left
j -> down
k -> up
l -> right
```

The arrow keys also work, by the way.

### Moving faster

Spamming `hjkl` might be a legit method to move around but we have better. For example, we can jump around words for faster horizontal navigation.

```txt
w -> moves to the beginning of the next word
b -> moves to the beginning of the previous word
```

There are also keymaps to jump quickly between the end and the beginning of a line.

```txt
0  -> moves to the beginning of the line
$  -> moves to the end of the line
^  -> move to the first non-blank character
g_ -> move to the last non-blank character
```

And to move up and down...

```txt
ctrl-u -> scroll up by half a page.
ctrl-d -> scroll down by half a page.
gg     -> go to the beginning of the file
G      -> go to the end of the file
```

In this context a page is the number of lines in the screen. So if we have 36 lines in the screen then scrolling half a page means the cursor will move 18 lines.

### Jump to character

In normal mode the keymap `f` starts a one-character search. This is limited to the line under the cursor. So after pressing `f` Vim will wait for us to press a character, and then it will move the cursor to the next occurrence.

`F` will be the reverse version of `f`.

So, pressing `f)` would take us to the next `)` in the current line. And `F)` would take the cursor back to the previous `)`.

There is also `t` and `T` keymaps. Which is almost like `f`/`F`, is a one character search within the line. But here the cursor will be placed before the match.

To navigate between matches we use `;` and `,`. `;` will move the cursor to the next match. `,` will move to the previous match.

## Making changes

Now let's take a look at [operators](https://neovim.io/doc/user/motion.html#operator). Operators are commands that act on a region of text.

For example, if we press `d` we are telling Vim we want to delete something. But what is that **something**? A paragraph, a line, a word? We have to be specific. So after pressing `d` Vim will wait for us to provide a **motion**. This is what allows combinations like `dl`, `d$`, `dw` and many more.

### Basic operators

Operators make Vim keymaps feel like a language. This is a good thing. We don't have to memorize concrete combinations. We just have to know a few words. Let's start with operators that perform common actions:

```txt
d -> delete text
y -> yank text
c -> change text
```

This means `dw`, `yw` and `cw` are all valid Vim commands.

This idea of combining `operator + motion` is very powerful, if you learn **1 new motion** it means you know **3 new commands**. How cool is that?

By the way, in case english is not your first language, the word `yank` means copy. `y` is the copy operator.

### Text objects

[Text objects](https://neovim.io/doc/user/motion.html#text-objects) are motions that only work in visual mode or after an operator. We use them to select a region of text. They describe patterns of text like words, paragraphs or even XML tags.

These are some common text objects.

```txt
iw -> inner word
ip -> inner paragraph
it -> inside tag
i' -> inside single quotes
i" -> inside double quotes
i( -> inside parenthesis
i[ -> inside brackets
i{ -> inside curly braces
```

Notice how each one begins with the letter `i`, this is a convention built-in text-objects follow. It means each one has an `a` variant.

For example, `i"` will select text inside double quotes but it will exclude the quotes. `a"` will select everything, including the quotes.

Is worth noting `i)`, `i]` and `i}` are also valid text objects. Don't worry about choosing the open or closing character, both should work.

If you have the oportunity, try combining these text-objects with operators you already know. `di(`, `ci"`, `yap`... try it all.

## Undo, redo, repeat

Now let's learn how to deal with changes.

`u` is the keymap for undo. I believe it reverts an "undo block" or something like that. So pressing `u` one time could technically revert multiple changes. It all depends on how commands are implemented. Built-in commands in normal mode do have a predictible behavior though, the undo command will feel like it reverts one change at a time.

`U` will undo the latest changes in the current line. Yes, the whole line.

`ctrl-r` is the keymap to redo. So we can undo an undo.

The `.` keymap repeats the most recent command. For example, if we delete a word using `daw` then pressing `.` will repeat that command all over again. Vim users call this "dot repeat."

## Copy and paste

Vim has its own mechanism to copy and paste. When we copy something using the `y` keymap (by default) that goes into a register. And when we try to paste using the `p` keymap it'll use the same register. In other words, Vim will ignore the system clipboard.

If we want to use the system clipboard there are two options:

* The `+` register: in normal mode the keymap `"+y` will copy text to the clipboard. And `"+p` will paste text from the clipboard.

* Set `clipboard` option to `unnamedplus`: in command-line mode execute the command `:set clipboard=unnamedplus`.

Note these options are temporary. To make the change permanent we would need to create a [configuration file](./your-first-config#the-init-file).

## Jump list

There are [a few motions](https://neovim.io/doc/user/motion.html#jump-motions) in Vim that can move the cursor to an entire new location. Vim keeps track of these "jumps" in something called [the jumplist](https://neovim.io/doc/user/motion.html#jumplist).

Moving around between locations of the jumplist is a very common action, so we have keymaps for this: 

```txt
ctrl-o -> move to the previous location in the jumplist
ctrl-i -> move to the next location in the jumplist
```

**Important**: some terminal emulators can't distinguish between the `Tab` key and `ctrl-i`. So in normal mode pressing `Tab` could take the cursor to a random location.

## Save and exit

So we did everything we wanted and now is time to save the file or just exit.

Most people would recommend using one of these commands:

* `:wq` to save the file and close the current window
* `:quit` closes the current window and exits if it's the last one
* `:quitall` to close all files and exit safely
* `:quit!` to close the current window without saving any changes
* `:quitall!` to close all files and exit without save

But why type a command when we have keyboard shortcuts? In normal mode we have these keymaps available:

```txt
ZZ         -> save and exit
ZQ         -> exit without save
Ctrl-w + q -> closes the current window and exits if it's the last one
```

