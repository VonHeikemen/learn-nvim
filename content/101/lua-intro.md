# An introduction to lua

Before we write any code for a Neovim configuration I think is a good idea to learn some basic concepts about lua.

I will assume you know nothing about programming and I will try to explain some fundamental ideas: **variables**, **conditionals** and **functions**. All of this while showing you how to write lua code.

## Some advice

In programming a lot of it is figuring out what part of the code you can change and what things should always be the same.

I recommend that after you learn the correct method to do something find out what happens when you do it wrong. Introduce an error and then fix it. This way you'll be able to fix common errors in a short amount of time.

## Executing lua code

Inside Neovim you can create or open any lua file and then execute the `:source` command. So you can use Neovim itself to test quickly any snippet of code I show here.

Now, to show something on the screen you can use the function `print()`. The important thing to know right now is you can put any "expression" inside the parenthesis and the result will show up at the bottom of the screen. This is an example:

```lua
print(1 + 1)
```

After executing this line of code Neovim will show the number `2` in the message area. That's the empty line at the bottom of the screen, the one below the statusline.

## Lua variables

In programming "variables" are labels we can use to store a piece of data.

In lua we have 3 kinds of basic data types: Numbers, strings and booleans. Here is an example.

```lua
local name = 'Knight'
local kind = "minor piece"
local points = 3
local can_jump = true
local notes = [[
  - Moves in L shape
  - Is usually better in closed positions
]]
```

Here we create 5 "local variables" that contain data about a chess piece. The first important thing to note is the syntax to store data in a variable. Which is this:

```lua
local name = expression
```

We call this "variable assignment."

Once we have created a variable we can use it in another part of the code as a placeholder. Consider this.

```lua
local points = 2
local more_points = points + 1

print(more_points)
```

Here `points + 1` will return the value `3` because `points` stores the value `2`.

Now, `local` is a keyword. Keywords are reserved words with special meaning. In this case `local` is used to create a variable that's only available to the code in the current file.

If we want to change the value of a variable we omit the `local` keyword.

```lua
local points = 2
points = 3
```

Here line 1 is a variable assignment. Line 2 is a re-assignment, we are not creating a new variable, we just replace the value.

## Lua strings

In many programming languages the data type that stores a piece of text is (usually) called a "string."

In lua we have 3 ways of creating strings. We can wrap text in single quotes, double quotes and `[[ ]]`. But only `[[ ]]` can store multi-line text.

## Conditionals in lua

Let's talk about booleans.

Booleans are special constants we can use to make decisions. In lua, `true` and `false` are booleans. Consider this example.

```lua
local can_jump = true
local points = 2

if can_jump then
  points = 3
end

local more_points = points + 1

print(more_points)
```

Here we have an `if` statement. The keyword `if` will evaluate the expression in from of it and IF it's equal to `false` or `nil` the block of code between `then` and `end` is ignored.

In the example `more_points` will have the value `4` because the code inside the `if` statement will be executed.

Most of the time we create booleans using comparison operators. Like this.

```lua
local name = 'Queen'
local points = 4

if name == 'Queen' then
  points = 9
end

print(points)
```

Here the expression `name == 'Queen'` will create the boolean `true`, so `points` will eventually have the value `9`.

`==` is the equality operator. We are asking if `name` is equal to the string `Queen`.

We also have the posibility to "negate" a boolean using the keyword `not`.

```lua
local can_jump = true

print(not can_jump)
```

The keyword `not` will convert the expression in from it to a boolean and then it will return the opposite.

## Empty variables

The `if` statement gives special treatment to two values: `false` and `nil`.

We know `false` is a boolean. But `nil` is something else.

The constant `nil` represents an empty value. Is like saying "there is nothing here."

Say for example we do this:

```lua
local points

print(points + 1)
```

This is a common mistake. It is valid lua code but the expression inside the `print()` function is wrong. `points` doesn't store a number. It's empty.

If you try to execute that snippet of code you'll get an error message. Reading those things is a skill on its own because you get hit by a wall of text. But in that wall there is always a "human readable" message. In this specific case we get:

```txt
attempt to perform arithmetic on local 'points' (a nil value)
```

The important thing to note is the phrase "a nil value." Every time you see this in a message is a clue, it means a variable is expected to have some value but is empty. In this case it says the local variable `points` is `nil`.

## Lua functions

Functions are basically reusable blocks code. They are very convenient because they can receive data and return new data.

```lua
local plus_one = function(some_number)
  return some_number + 1
end

local points = plus_one(1)
local more_points = plus_one(points)

print(more_points)
```

This example shows we can store a function in a variable like we do for any other data type.

To execute the code of a function we add `()` after the name, and when we do that we say is a "function call."

When we do a function call we can provide all the data we want inside the parenthesis.

Now, let's talk about variables inside functions.

```lua
local funny_sum = function(first_number, second_number)
  local the_number_two = 2

  return first_number + second_number + the_number_two
end

local points = funny_sum(3, 4)
```

If we create a local variable inside a function then it only "exists" during the execution of the function. So is only accessible to the code inside the function.

In that snippet the local variable `the_number_two` can only be used inside the function `funny_sum`.

Technically `first_number` and `second_number` are also local variables. But we call these "function parameters."

And when we provide data to a function we call that "arguments."

```lua
local points = 1 + 1

print("Points:", points)
```

Here for example we provide two arguments to the function `print()`.

## Lua tables

A lua table is the data type we use when we need to store multiple things inside a single variable.

The first snippet of code I showed could have be written like this.

```lua
local Knight = {
  kind = 'minor piece',
  points = 3,
  can_jump = true,
  notes = [[
    - Moves in L shape
    - Is usually better in closed positions
  ]],
}
```

These are important details you should remember:

* The curly braces mark the beginning and the end of the lua table.
* Inside the curly braces we have **table field** assignments.
* At the end of each assignment there should be a comma.
* The comma can be omitted at the end of the last assignment.
* A table can hold any type of data, including nested tables and functions.

To access the data inside a table we use a dot and then the name of a table field.

```lua
local Knight = {points = 3}

print(Knight.points + 1)
```

To re-assignment a table field we don't need keywords. It's just like a regular variable.

```lua
local Knight = {points = 3}

Knight.points = 2

print(Knight.points + 1)
```

## Lua global variables

A global variable is a piece of data that is accessible in multiple files.

The lua interpreter defines global variables we can use. If you know their names you can just use it.

```lua
local smallest_number = math.min(9, 7, 11)

print(smallest_number)
```

Here `math` is a lua table that contains a bunch of math related functions.

Note there are few global variables in lua. `math` and `print` are not the only one. And we can create global variables ourselves.

```lua
Print = function(data)
  print(vim.inspect(data))
end
```

If we omit `local` keyword we create a global variable. So this `Print` function will be stored in memory until Neovim closes.

I called this global variable `Print` to highlight a potential problem: It is possible to override an existing global variable. And that's bad.

For example, if you were to create your own `math` global variable a lot of things will fail. Don't do that.

## Meta tables

This is an advanced topic that I wish I didn't have to mention but Neovim uses them in a few places. So here we are.

A meta table is a lua table that redefines the behavior of certain operations. Let me show you one.

```lua
local empty_table = {}

local meta_methods = {
  __index = function()
    return 1
  end,
  __call = function()
    return 100
  end,
}

setmetatable(empty_table, meta_methods)

local points = empty_table.two + 2
local more_points = empty_table() + 100

print('Points:', points)
print('More points:', more_points)
```

Here we have an empty table called `empty_table`. In a normal situation the expression `empty_table.two + 2` would fail because there is no `two` field inside the table. But here every time we access a field in `empty_table` our function `__index` will kick in and it will return the value `1`.

This is where it gets interesting. Notice that `empty_table()`? We are trying to use `empty_table` like a function? Yeah... and that actually works because we have that `__call` function in the meta table. So `empty_table` can be used as a "regular table" and a function.

Neovim uses meta tables to provide a nice interface over features that are implemented in other programming languages. For example, to manipulate vim options we can use `vim.o`. And we use this like a regular table, we just assign values to it.

```lua
vim.o.tabstop = 2
```

But vim options are not implemented in lua. You are not going to find a lua table with 300 options hardcoded. It just looks like there is one.

## Syntax sugar

Syntax sugar is when a programming language tries to be cute. It's like a short hand for something that is considered tedious. Here is an example.

```lua
local pieces = {
  [1] = 'Queen',
  [2] = 'Bishop',
  [3] = 'Knight',
}
```

It turns out we can use numbers as table fields. But we can't just write `1 = 'Queen'`, that's not valid lua syntax. So we have to wrap the number inside square brackets.

There is a use case for a table with number fields but it would be annoying for us to keep track of the order of each item. That's why lua allows us to write lua tables using this syntax.

```lua
local pieces = {
  'Queen',
  'Bishop',
  'Knight',
}
```

This is the same as before. The exact same thing. But here the lua interpreter is the one that keeps track of each table field. `Queen` will be `1`, `Bishop` will be `2` and so on.

There is a downside to this. It can get confusing because we can mix number fields and "regular" alphanumeric fields. Imagine this.

```lua
local Knight = {
  kind = 'minor piece',
  points = 3,
  function()
    return true
  end,
}
```

The code is valid lua. But what is that random function doing? Is that on purpose? Should it be assigned to a field? We will find out when another part of the code tries to use the variable `Knight`.

There is also some syntax sugar for tables and functions.

```lua
local print_name = function(something)
  if something.name then
    print(something.name)
    return
  end

  print(something)
end

print_name({name = 'Queen'})

print_name {name = 'Queen'}

print_name 'Queen'
```

These are valid function calls.

We can omit the parentheses if the function call only receives one argument, and that argument is a table or a string.

Keep in mind these exceptions do not apply to variables. The following code does not work:

```lua
local Knight = {name = 'Knight'}

print Knight
```

We know `print` is a global function but here `print Knight` is not a valid function call.

