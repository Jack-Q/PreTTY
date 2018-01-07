| Item                     | Value                                              |
|:------------------------:|:---------------------------------------------------|
| **Project Title**        | PreTTY: a pretty SSH connection management toolkit |
| **Document Type**        | project management asset                           |
| **Document Title**       | Scope Statement                                    |
| **Document Status**      | initial draft                                      |
| **Revision**             | N/A                                                |

## Project Summary & Justification

The goal of this is project is to create a desktop remote connection management
application that provides convenient management of multiple SSH connection
profiles and intuitive user interface for remote shell access (virtual terminal)
and remote file management (SSH FTP).

The project organization consists of 6 members who shall spent at least 10 hrs/wk
in project period.

This project should be completed within 6 weeks. The total resource allowance for
this project is about 360 labor hours (`6 * 6 * 10 = 360`).

## Project Characteristics & Requirements

This project shall provide appropriate design & implementation
to support following functional requirements.

* SSH shell/exec connection:
  * session management: maintain connection to multiple hosts;
  * connection buffer manipulation: provide capability to
    support following operations on shell buffer, including
    resize, scroll, highlight, search, save, export,
    restore, grab screenshot, etc.;
  * alert/keyword based monitoring: push notification when certain event triggers
    like alert or keyword found, etc.
* SSH sftp connection:
  * File listing: provide graphical interface listing folders, files,
    as well as their properties including size, permission, etc.;
  * Upload file (including folders) to remote host;
  * Update listing of file dynamically (monitor folder update);
* User interface requirement:
  * mixed tab/panel layout to manage multiple active connection with flexibility;
  * quick action button (like a floating action button in material design);
  * global action menu (like end-line mode in Vim or command palette in VS Code);
  * color palette/terminal theme settings;
* Key/identity management:
  * trusted host (known host) management: connection information and public key fingerprint;
  * SSH key generation (`ssh-keygen`): generate SSH key via completing a form;
  * SSH identity authorize (`ssh-copy-id`): copy local SSH identity to remote host
    with password authorization for the first time;
  * Key file storage encryption (key derivation from password);
  * Local open-ssh identity import;
* History management:
  * Connection history: last login time, buffer snapshot of last session
    (continuous experience);
  * Connection statistics: total connection time etc.

This project shall satisfy following non-functional requirements.

* Support 30 active simultaneously connection;
* Support file listing inside of directory with 1000 files;
* Support cache buffer with 1000 lines.

## Management-related Deliverables

Deliverables listed as follows should be management as formal document
for project management process. The document are managed in various format with
consideration of version management requirements and accessibility.

* Markdown: document requires frequent update and full update history
* PDF: formal/stable version of document for submission/archive
* docx: informal document with rich layout/typology requirement
* mpp: Microsoft Project 2016 project for computer aided scheduling

Following documents should be delivered by the end of each phase according 
to project scheduling:

* Initializing phase:
  * Project Charter (Markdown, PDF): overall project information
    and project goal agreement between team members;
* Planning phase:
  * Scope Statement (Markdown, PDF):
    definition of project scope and required deliverable;
  * Project Management Plan (Markdown, PDF):
    management relevant planning for project with organization structure
    and management process definition;
  * Work Breakdown Structure (Markdown, mpp):
    coarse-grained project work definition (with description), work scheduling
    and responsibility assignment;
  * Task Schedule (mpp):
    fine-grained task defined and scheduling (based on Work Breakdown Structure);
* Monitoring phase:
  * Progress Report (Markdown, docx): weekly progress report by echo project
    member, summary report for overall project by the whole team;
* Closing phase:
  * Final Project Report (Markdown, docx, PDF):
    project self-assessment by project team;
  * Project Lesson-learned Report (docx, PDF).

## Product-related Deliverables

Following product-related deliverables should be ready before the closing of project.

* Design phase:
  * Project Design Specification
  * User Interface Design Illustration
* Construction phase:
  * complete source code base
* Testing phase:
  * Testing Plan
  * Testing Case Design/Test Code
  * Testing Execution Report
  * Fault/Issue Report
  * Testing Summary
* Delivering phase:
  * development environment set-up instructions
  * installation package (for supported platforms)
  * user guide

## Assessment Criteria

The assessment criteria is based on Project Charter.

* Implement functions covering all functional requirements
* Implement functions satisfying all non-functional requirements
* Provide completed product deliverables as listed above within project period