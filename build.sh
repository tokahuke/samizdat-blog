#! /usr/bin/env bash

# Hugo's `css.TailwindCSS` invokes whatever `tailwindcss` is first on
# PATH and rejects anything that is not a Node.js script. Homebrew's
# default `tailwindcss` in /opt/homebrew/bin is a shell wrapper; the
# real Node entrypoint lives in the cellar. Put the real one first.
# Hugo also resolves `@import "tailwindcss"` via Node module
# resolution from the project root, so symlink the bundled
# node_modules to make the package findable.
TC_LIBEXEC=/opt/homebrew/Cellar/tailwindcss/4.3.0/libexec
if [ -d "$TC_LIBEXEC/bin" ]; then
    export PATH="$TC_LIBEXEC/bin:$PATH"
fi
if [ ! -e node_modules ] && [ -d "$TC_LIBEXEC/lib/node_modules/@tailwindcss/cli/node_modules" ]; then
    ln -s "$TC_LIBEXEC/lib/node_modules/@tailwindcss/cli/node_modules" node_modules
fi

rm -rf public && hugo
