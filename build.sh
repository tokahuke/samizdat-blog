#! /usr/bin/env bash

function find_execs() {
    find ../samizdat/target/release/ \
        -maxdepth 1 \
        -type f \
        -executable \
        -execdir basename '{}' ';'
}

function template() {
    cat ./static/templates/$1 | envsubst '$SAMIZDAT_PUBLIC_KEY' > static/$1
}

cd ../samizdat &&
cargo build --release --all &&
cd ../samizdat-blog &&
mkdir -p ./static/bin &&
find_execs | xargs -I % cp ../samizdat/target/release/% static/bin/% &&

template hub-install-latest.sh &&
template install-latest.sh &&

hugo
