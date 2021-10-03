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

echo Dowloading assets... &&
download $BASE_URL/bin/samizdat-node $TEMP/samizdat-node &&
download $BASE_URL/samizdat-node.service $TEMP/samizdat-node.service &&
download $BASE_URL/bin/samizdat $TEMP/samizdat &&

echo Configuring Samizdat \(needs SUDO!\) &&
systemctl disable --now samizdat-node &&
cp $TEMP/samizdat-node /usr/local/bin/samizdat-node &&
cp $TEMP/samizdat /usr/local/bin/samizdat &&
cp $TEMP/samizdat-node.service /etc/systemd/system/samizdat-node.service &&
systemctl enable --now samizdat-node &&

echo Done
