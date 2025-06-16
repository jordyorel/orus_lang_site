+++
title = "Install"
description = "Install the Orus programming language on your system"
template = "install.html"
weight = 1
+++

# Installing Orus

You can install Orus using the official installer, package managers, or by building from source.

## Using the Official Installer (Recommended)

```bash
curl -sSf https://orus-lang.org/install.sh | sh
```

This will download and run the Orus installer, which installs the latest stable version of Orus.

## Platform-Specific Instructions

### macOS

Using Homebrew:

```bash
brew install orus-lang
```

### Linux

Using apt (Debian/Ubuntu):

```bash
sudo apt update
sudo apt install orus
```

Using yum (Fedora/RHEL):

```bash
sudo yum install orus
```

### Windows

Download and run the [Windows Installer](https://orus-lang.org/download/orus-windows-installer.exe).

Alternatively, use Windows Subsystem for Linux (WSL) and follow the Linux instructions.

## Building from Source

Requirements:
- Git
- A C++ compiler (GCC, Clang, or MSVC)
- CMake (version 3.15 or higher)

```bash
git clone https://github.com/orus-lang/orus.git
cd orus
./build.sh
```

## Verifying Installation

To verify that Orus has been installed correctly:

```bash
orus --version
```

## Getting Started

Once you have Orus installed, check out the [Learn](/learn/) page to start writing your first Orus program!
