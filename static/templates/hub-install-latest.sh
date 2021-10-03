#! /usr/bin/env bash

if [ $1 == "test" ]; then
    export BASE_URL=http://0.0.0.0:4510/_series/$SAMIZDAT_PUBLIC_KEY
else
    export BASE_URL=https://proxy.hubfederation.com/_series/$SAMIZDAT_PUBLIC_KEY
fi

export TEMP=/tmp/samizdat

function download() {
    echo Dowloading $1 to $2 &&
    curl -L --no-progress-meter -X GET $1 > $2
}

mkdir -p $TEMP &&

download $BASE_URL/bin/samizdat-hub $TEMP/samizdat-hub &&
download $BASE_URL/samizdat-hub.service $TEMP/samizdat-hub.service &&

echo Configuring Samizdat \(needs SUDO!\) &&
systemctl disable --now samizdat-hub &&
cp $TEMP/release/samizdat-hub /usr/local/bin/samizdat-hub &&
cp $TEMP/samizdat-hub.service /etc/systemd/system/samizdat-hub.service &&
systemctl enable --now samizdat-hub &&

echo Done
