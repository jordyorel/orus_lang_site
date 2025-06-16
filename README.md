# Orus Programming Language Website

This repository contains the source code for the [Orus Programming Language](https://orus-lang.org) official website.

## About Orus

Orus is a modern programming language designed for:

- **Performance**: Built for speed with efficient compilation and execution
- **Reliability**: Strong typing and memory safety without garbage collection
- **Developer Productivity**: Expressive syntax and excellent tooling

## Website Structure

This website is built using [Zola](https://www.getzola.org), a fast static site generator written in Rust.

### Directory Structure

```
orus-lang.org/
├── content/           # Markdown content for each page
├── sass/             # SCSS style files
├── static/           # Static assets (images, CSS, JS)
├── templates/        # HTML templates
└── config.toml       # Site configuration
```

## Development

### Prerequisites

- [Zola](https://www.getzola.org/documentation/getting-started/installation/) (version 0.15.0 or higher)

### Local Development

1. Clone this repository
   ```bash
   git clone https://github.com/orus-lang/website.git
   cd website
   ```

2. Start the development server
   ```bash
   zola serve
   ```

3. Open http://127.0.0.1:1111/ in your browser

### Building for Production

```bash
zola build
```

The generated site will be in the `public` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This website content is licensed under [LICENSE PLACEHOLDER].
