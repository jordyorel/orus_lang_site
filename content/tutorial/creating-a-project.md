+++
title = "Creating a Project"
description = "Setting up and managing Orus projects"
template = "tutorial.html"
weight = 11
+++

# Creating a Project

A project directory organizes multiple files. Place an optional `orus.json` manifest at the root and your source files under `src/`.

```text
my_proj/
  orus.json
  src/
    main.orus
    helper.orus
```

The manifest may specify an `entry` file:

```json
{
  "name": "my_proj",
  "version": "0.1.0",
  "entry": "src/main.orus"
}
```

Run the project with:

```sh
./orusc --project path/to/my_proj
```

If no `entry` is provided, the interpreter searches all files for a single `main` function.

## Project Structure

Here's a more complete example of a project structure:

```text
my_app/
├── orus.json
├── src/
│   ├── main.orus
│   ├── models/
│   │   ├── user.orus
│   │   └── product.orus
│   └── utils/
│       ├── logger.orus
│       └── helpers.orus
└── tests/
    ├── test_user.orus
    └── test_product.orus
```

## Managing Dependencies

You can specify dependencies in your `orus.json` file:

```json
{
  "name": "my_proj",
  "version": "0.1.0",
  "entry": "src/main.orus",
  "dependencies": {
    "http_client": "1.2.0",
    "json_parser": "0.5.1"
  }
}
```

## Next Steps

Now that you've completed this tutorial, you might want to explore:

- The standard library documentation
- Example projects in the repository
- Advanced topics like concurrency and optimization

Join our community to share your projects and ask questions!

<div class="tutorial-navigation">
    <a href="/tutorial/built-in-helpers/" class="nav-button prev">Previous: Built-in Helpers</a>
    <a href="/tutorial/" class="nav-button prev">Tutorial Index</a>
</div>
