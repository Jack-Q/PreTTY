| Item                     | Value                                              |
|:------------------------:|:---------------------------------------------------|
| **Project Title**        | PreTTY: a pretty SSH connection management toolkit |
| **Document Type**        | project technical asset                            |
| **Document Title**       | Project Design Specification                       |
| **Document Status**      | initial draft                                      |
| **Revision**             | N/A                                                |


## Overview

This project is to create a **desktop** application based on **Electron.js** platform
to support remote terminal connection and file management based on **`ssh`** protocol.


## Functional Module


## UI Pages

* Master password page (`/protected/:path`)
* Welcome page (`/welcome`)
* Create identity page (`/identity/new`)
* Identity management page (`/identity`)
* Create host profile page (`/host/new`)
* Virtual terminal page (`/terminal/:host/:port`)
* SFTP file listing page ()
* SFTP file transfering page
* Connection history page
* Known/trusted host page
* Settings page

## Global component

* Window frame (chrome)
* Quick action control
* Command palette
* Panel & tab layout
* Notification host

## Application Services

* Connection management service
* Data storage service
* Application quick action service
* Shortcut key service

## Application Utilities

* Common UI controls
* SSH keygen
* SSH copy-id
* Global stylesheet




## Alignment and Relevant Documents

This document records architectural design and references to relevant concrete 
design materials. This document is based on Project Scope Statement, with 
concentration and elaboration of high level project characteristics and requirements.
Details in this documents should be aligned with Project Management Plan and Project
Scope Statement.
