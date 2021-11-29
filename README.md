# DWC Risk Explorer

[![DOI](https://zenodo.org/badge/426639272.svg)](https://zenodo.org/badge/latestdoi/426639272)

This application is part of Deliverable D4.2 of the [Digital Water City project](https://www.digital-water.city/). Deliverable 4.2 (D4.2) combines the results of two sub-tasks of WP4 "Interoperable and secure flow of information", 4.2.1 and 4.2.2 aiming at developing a risk identification database (RIDB) and a risk reduction measure database (RRMD) respectively.

<img src="https://github.com/SINTEF-Infosec/dwc-risk-explorer/blob/master/screenshots/events.png" width="50%">


## Running the explorer

### Using npm
To run the explorer locally, and given that you have node installed, issue the following commands:

```
npm install
npm run start 
```

The explorer should be available at http://localhost:3000/

### Using Docker

You can also use Docker. First build the image:

```
docker build -t dwc-risk-explorer:latest .
```

Then:

```
docker run -p 3000:80 dwc-risk-explorer:latest
```

## Adding new risks and measures

If you want to add a risk event or a measure to the databases, you can do so in two ways:

### Update the project and submit a Pull Request

1. Update the [RIDB and RRMD Excel files](https://github.com/SINTEF-Infosec/dwc-risk-explorer/tree/master/data) and then run the update script:

```
./scripts/update.sh
```
The script updates the RRMD based on the RIDB, then dumps both databases as JSON files which are used by the web application.

2. Once done, commit and submit a Pull Request. 

### Open an issue

[Open an issue](https://github.com/SINTEF-Infosec/dwc-risk-explorer/issues/new/choose) with the exact changes/additions to be made. Please use the pre-made template "Adding risks and/or risk reduction measures".
