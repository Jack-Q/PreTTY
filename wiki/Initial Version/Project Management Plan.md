| Item                     | Value                                              |
|:------------------------:|:---------------------------------------------------|
| **Project Title**        | PreTTY: a pretty SSH connection management toolkit |
| **Document Type**        | project management asset                           |
| **Document Title**       | Project Management Plan                            |
| **Document Status**      | initial draft                                      |
| **Revision**             | N/A                                                |

## Overview

**PreTTY** is a team project for about 6 weeks with 6 project members.

The project sponsor of this project is [@TinkerAC](https://github.com/TinkerAC).

Refer to [Project Charter](./Project-Charter) and 
[Scope Statement](./Scope-Statement) for detailed introduction to project.

### Deliverables

Refer to [Management-related Deliverables Section in Scope Statement](./Scope-Statement#Management-related%20Deliverables).

### Referenced Materials

Some descriptions mentioned in this document should keep consistency with
the following referenced document. When conflict statements occurs, the statement
expressed in this document should be changed to keep align with them.

* [Project Charter](./Project-Charter)
* [Scope Statement](./Scope-Statement)

Besides, the implementation should be compatible with existing and widely used SSH
servers. For detailed specification of the SSH protocol, this implementation should
refer to following RFC documents/draft.

* [RFC4251: The Secure Shell (SSH) Protocol Architecture](https://tools.ietf.org/html/rfc4251)
* [RFC4252: The Secure Shell (SSH) Authentication Protocol](https://tools.ietf.org/html/rfc4252)
* [RFC4253: The Secure Shell (SSH) Transport Layer Protocol](https://tools.ietf.org/html/rfc4253)
* [RFC4254: The Secure Shell (SSH) Connection Protocol](https://tools.ietf.org/html/rfc4254)
* [IETF Draft: SSH File Transfer Protocol](https://tools.ietf.org/html/draft-ietf-secsh-filexfer-13)

### Terms & Acronyms

Some terms and acronyms widely used in this project:

* **SSH**: the secure shell protocol, a protocol for secure remote login
           and other secure network services. On some context, the term SSH mainly
           refers to virtual terminal and execution service;
* **SFTP**: the SSH file transfer protocol, a secure remote file transfer protocol
            based on SSH protocol;
* **host**: SSH server to be connected, it should be identified by host name
            (or its IP address) and port number. One or several public keys
            should be also tied to a host to ensure its identity;
* **host key**: server host key is used for claiming the identity of server.
                The public key of a server host should be trusted by client before
                connection establishment (and the host becomes a
                **known host**/**trust host**);
* **known host**/**trusted host**: as defined in **host key** entry;
* **identity**/**client identity**: client identity used for authentication with
            server. An identity can based on symmetric key or password;

## Project Organization

The project organization consists of 6 members whose detailed information is
listed as follows.

| # | Name                                         | Position   | Description                |
|:-:|:--------------------------------------------:|:----------:|:--------------------------:|
| 1 | [@meetviolet](https://github.com/meetviolet) | Manager    | overall project management |
| 2 | [@tang9812](https://github.com/tang9812)     | Designer   | project design             |
| 3 | [@TinkerAC](https://github.com/TinkerAC)     | Programmer | UI assets                  |
| 4 | [@sherjy](https://github.com/sherjy)         | Programmer | user interaction           |
| 5 | [@Jack-Q](https://github.com/Jack-Q)         | Programmer | connection and key mgmt.   |
| 6 | [@QianVivian](https://github.com/QianVivian) | Tester     | testing management         |

### Responsibility Structure

Project members are organized in the following managerial and responsibility structure:

```txt
                       +-----------------+
                       | Project Manager |
                       +-----------------+
        ________________________|_________________________
        |                  |               |             |
+---------------+  +--------------+  +---------+ +--------------+
| Design & Plan |  | Construction |  | Testing | | Mgmt. Assets |
+---------------+  +--------------+  +---------+ +--------------+
          _________________|_________________
          |                |                |
  +-------------+  +-----------+  +-------------+
  | Conn. / Key |  | UI Assets |  | Interaction |
  +-------------+  +-----------+  +-------------+
```

The internal structure is used as a guide to management process planning and
project task assignment in detail.

### Responsibility Statement & Assignment

For each leaf vertex in the management structure diagram represents an aspect of
the major responsibility to the whole project.

* **Project Manager** & **Mgmt. Assets**: 
  The team member in this position is responsible to manage and coordinate
  the whole project and finally deliver all required management documents.
  This position is assigned to **@meetviolet**;
* **Design & Plan**:
  The team member in this position is responsible to coordinate the whole design
  process with other team members and deliver concrete design to the UI elements.
  This position is assigned to **@tang9812**;
* **Construction**: 
  This group of team members are responsible to construct the application based 
  on the design documents. The initial setup of application development environment
  should also be achieved by this team. 
  This team consists of three members, including **@TinkerAC**, **@sherjy** and **@Jack-Q**;
* **Construction: Conn. / Key**:
  The team member in this position is responsible to implement the SSH connection
  management service and identity management services, as well as relevant UI pages.
  Detailed implementation assignment may be coordinated within construction team.
  This position is assigned to **@Jack-Q**;
* **Construction: UI Assets**:
  The team member in this position is responsible to implement UI controls and 
  adopt UI design assets into application artifacts. The implementation of
  application-wide global UI elements should also be constructed by this team member.
  Detailed implementation assignment may be coordinated within construction team.
  This position is assigned to **@TinkerAC**;
* **Construction: Interaction**:
  The team member in this position is responsible to implement the design of user
  interaction and integrate UI pages with under-laying application services.
  Detailed implementation assignment may be coordinated within construction team.
  This position is assigned to **@sherjy**;
* **Testing**:
  The team member in this position is responsible to implement test cases based on 
  design documents and the implementation. He should also collect the final 
  result of testing execution and deliver testing report as a statement of
  application quality. This position is assigned to **@QianVivian**.

## Managerial Process Plan

The following section specifies the process plan for managerial activities.

### Objectives

This project is a team project with 6 team members and a period of 6 weeks.
The subject of this project is proposed by a team member, which is accepted
by the whole project team. The object for this project is to deliver
the product in time with acceptable quality specified in Scope Statement.

### Work Breakdown Structure

The tasks in this project should be managed according to the project management
process, including initiating, planning, executing, monitoring and closing.
For executing stage, the work should be break down with respect to the project
planning, whereas for other stage, the work should be break down according to 
the required meetings and documentations.

The scheduling of the project is based on work breakdown structure in
the planning phase of the project. The tracing of the progress should also
be reflected in the scheduling to provide information for changes to adopt
to the latest progress.

The work breakdown structure and scheduling of this project is managed and traced
using Microsoft Project. The relevant Microsoft Project document is available in
[Work Breakdown Structure](./Work-Breakdown-Structure) page.

### Risk Analysis

The project may execute at the risks form various sources. The risks analysis
should be performed at the initial stage of the project. The spotted risks should
be tracked and evaluated in monitoring stage.

Currently, the spotted risks of the project including the following ones.

* **schedule conflict**:
  Since the team member are not fulltime participants, the planned activity may be
  intervened by other stuffs. Thus it would result the invalidation of planning.
* **inadequate plan**:
  As in lack of experiences in relevant projects, the estimation of effort
  of project task may mislead the project execution. The arrangement or assignment
  of task may also pose some team member working in a low productive stage.
* **technical difficulty**:
  Some project members have no prior knowledge in some detail of application framework,
  which may result in technical difficulty in execution phase.
* **package dependency**:
  Some modules and application framework depend on external projects which is
  out of range of the project management.
* **lack of management**:
  The lack of management experience may let the project team perform with
  insufficient engagement. Thus the whole project plan may not be able to be
  effectively executed.
* **newly established team**:
  The project team is newly constructed without prior cooperations, which may
  lead to conflict or productivity issues in team working phases. 
  The estimation of communication cost for the newly established team may also 
  raise problem for the project.

### Changes & Evolution

The change of this project may be raised during the execution of the project.
To monitor project progress, a weekly progress report should be produced to
track the progress with the plan and scheduling. This should be performed by 
project manager with survey of each other team members.

As the time constraints to this project, most changes should be avoided.
If the changes of project is inevitable, project manager should initiate
a meeting with relevant team members to evaluate the change and potential
influence to the existing product and progress, and evolve the project plan
accordingly. This should be documented in a format change record.
The project manager should also notify relevant team members about the updated plan.

## Technical Process Plan

The following section specifies the process guide for construction
relevant activities.

### Process Model

The basis of the process model for this project is waterfall model while it also
absorbs some other practices used in other project models.

The application architectural design should support loosely coupled component to
be used as basic blocks for the application, each of which may be constructed and
tested as a independent branch, like some ideas in incremental process model.
Besides, before the formal construction of the application, several prototype
should be constructed as a verification of viability and illustration of concept
to achieve fully agreement with in the development group, like some of the ideas
in rapid prototyping process model. In a higher level of perspective,
this project is an initial version of a application which may be iterated later,
which is following the process of spiral process model.

In detail, this application should be constructed as following guides.

* **Prototyping**

  Implement application with core functionality (that is SSH connection
  establishment and remote virtual terminal representation for this project)
  with limited consideration of robustness and user well-designed 
  user interface as an verification of viability and illustration
  of project concept. This should be finished before the architectural design
  phase, which may utilize this as a reference. This phase do not require
  each project member to participate in.

* **Architectural Design**

  Design architectural level structure of application specifying component of
  application and the connection in between. This phase requires each member of
  project to participate in in order to achieve a unified understanding of the
  application to be constructed and utilize this as an prime guide for further 
  component level design and construction.

* **Component Design**

  Design the functions and interface of component of the application.
  The component may include UI pages, application services, utilities, etc.
  This phase requires to start after the architectural design and may progress
  in an order that minimize the risk of introduction of incompatible interfaces.

* **Component Construction**

  Construct the component and integrate them to existing component
  as soon as possible. The construction phase of each component can be started
  when the corresponding component design is finished. The integration should be
  conducted in an early stage to spot inconsistency and apply modification to
  design or implementation in time.

* **Component Testing**

  Test the functionality of echo individual component to ensure its conformation
  to the design specification. The test case can be prepared after the design or
  construction phase of a component. When a fault is revealed in the execution of
  test cases, the team member should notify the other team member for construction
  or design in time and record the issue.

* **Testing**

  Test the whole application in the aspect of integration, performance and compatibility.
  The check of the product relevant documentation should also done in this phase.
  This phase requires a dedicate team member to prepare test cases and execute them.

* **Delivering**

  Package application into platform specific installers and perform required
  testing on them. This phase should start after the testing phase.

### Development Environment

The development environment should be setup on the basis of the exiting configuration
of devices of each team member. Most of common desktop environment that
supports the tools specified in later sections should be considered as approachable.

### Tools and Techniques

The basic requirement of tooling and techniques are listed in a form of required
software packages.

* `git`, v2 or later: source code base and configuration assets management;
* `Node.js`, v6 LTS or later: programming language environment;
* `npm.js`, v4 or later: dependency management system;
* `Electron.js`: execution framework for the product application;

For application testing, the member responsible to testing can determine extra
tools and techniques to achieve testing requirement. If necessary, the additional
requirement should also be applied to development environment of the whole team.

For application packaging, some other components are required, which should
refer to the environment requirement specification of `electron-build` tool.

### External Component Management

The application framework as well as some of external JavaScript package are
integrated into this application as project dependency. The modification
(upgrading or updating) of the package may result in build failure of the
application. Thus, when an upstream package is updated, it should be tested before
commit the update into project code base.

## Supporting Process Plan

The following sections specifies the process guide other then the construction
process.

### Configuration Assets Management

The configuration assets should be management centrally with trackable history 
and modification. It should also be reliable to resist local environment faults.
Besides, the managerial and constructional assets should be managed independently
to avoid intervention and conflict between them.

For this project, the configuration assets are managed using [GIT](https://git-scm.com/)
tool as version control system and using [GitHub](https://github.com/) as cloud back-end
to backup the configuration assets. 

For managerial assets, they should be managed in *PreTTY.wiki* repository and 
be accessible via GitHub Wiki service,
whereas for the constructional assets, they should be managed in *PreTTY* repository.

### Documentation

The documentation of this project includes managerial and production documents, 
which follows different process.

#### Management relevant documentation

Most of the managerial process may produce formal document for further reference,
which should be managed following guides.

* use markdown as a modifiable and modification-trackable format with the use of
  CVS (Git for this project). Any modification to a document is required to be
  committed by a team member who is responsible to that;
* use Wiki pages of this project to provide quick access to management documents
  to simplify the procedure to refer to them;
* export the markdown document to PDF or other designated format for document
  submission to a external organization or document archive of a managerial
  milestone. These document should also be maintained for later reference;

The detailed process of management to these documents should follow that specified
in the [Configuration Assets Management](#configuration-assets-management) section.

#### Product relevant documentation

The documentation of this application consists of two modules, including
the user manual for end user and development instruction for further
maintaining or development of this application.

* **User Manual**:
  This document is to provide a detailed guide to end user of this application 
  with respect to the application installation, initial setup, and basic usage.
  This document may be delivered as a serials of web page in consideration of 
  accessibility. It should be a portion of the final product installation.

* **Development Instruction**:
  This document is to provide a detailed guide to developer of maintainer who
  wish to setup development environment of this application and get an initial
  understanding of the organization and architecture of the implementation of
  this application. This document may be delivered as a portion of the source
  code base of this project in a form of modifiable format.

### Testing & Quality Assurance

The testing & quality assurance process should be conducted in the whole period of
the project execution. Several types of testing should be applied for this
application to ensure an acceptable quality of the product deliverables.

A dedicated member of project team should be assigned for testing relevant tasks,
and the construction team should provides sufficient support to the requirements
raised by testing member to ensure the testability of each component or the packaged 
application.

* **Unit Test**:

  Unit test should be implemented as executed for each UI pages and application services.
  For each UI pages, the unit test should ensure the adoption of design decisions
  specified in UI design specifications. For each application service, the unit testing 
  should ensure the functionality of the application to satisfy the user
  interaction requirements.

  Unit test applied in this application should be implemented alongside 
  the corresponding testing target. The selection of unit testing framework 
  should be determined in the design stage of application.

  Before the conduction of unit testing, the testing framework should be set up 
  on both construction environment and testing environment.

* **Compatibility Test**:

  Since this project is to deliver product that communicate to serve 
  via a well-known protocols, the application should be ensure to work properly with
  the external implementation of servers.

  The SSH virtual terminal functionality require cooperation with remote application
  that remotely manipulate either character or cursor that rendered locally. Thus it
  is required to ensure the compatibility with common applications. The concrete
  list for testing should be specified by testing member.

  The project is designed to provide support to various platform, it should be 
  functional in common desktop operation systems, including Windows and Linux.
  The specified version and variation of testing environment should be determined 
  in the design stage of the application.

* **Non-functionality Test**:

  There are also some non-functionality requirement specified in the scope statement.
  Relevant testing should be conducted to ensure the product satisfying these statements.

### Process Improvement

To improvement the whole management process to benefit current both current
project as well as later project, the process improvement process is specified 
as a guide to it. This section should be considered as an further explanation of 
the [Changes & Evolution](#changes--evolution) section.


The monitoring of the progress of the project is a integral part of the management of 
the project. A weekly progress inspection should be executed to spot potential
issues and faults in the project team. The result of the inspection process should 
be formalized as a weekly progress report as an additional guide to later 
project execution process. The relevant document should also be updated with respect 
to the additional processes specified in the weekly progress report.

In the closing phase of the project, a summary report of the whole project period 
should be delivered based on the review of the entire management and execution process
of the project. Each member should also review the project process independently and
submit a project lessen-learned report.
