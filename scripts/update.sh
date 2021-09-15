#! /bin/sh 

RIDB_FILE=./data/ridb.xlsx
RRMD_FILE=./data/rrmd.xlsx


RIDB_TMP_FILE=./data/~\$ridb.xlsx
RRMD_TMP_FILE=./data/~\$rrmd.xlsx

if test -f $RIDB_TMP_FILE; then
    echo "Please close the RIDB file before udpating."
    exit -1
fi

if test -f $RRMD_TMP_FILE; then
    echo "Please close the RRMD file before udpating."
    exit -1
fi

echo "Updating RRMD based on the RIDB..."
python3 scripts/ridb_to_rrmd.py


if [ $? -eq 0 ]
then
    echo "Exporting RIDB to JSON..."
    python3 scripts/ridb_to_json.py

    echo "Exporting RRMD to JSON..."
    python3 scripts/rrmd_to_json.py
else
    echo "Error during the update of the RRMD."
    exit -1 
fi
