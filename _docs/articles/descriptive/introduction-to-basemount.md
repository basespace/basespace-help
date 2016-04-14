---
layout: article
title: Introduction To BaseMount
---




## Table of Contents

 - [Overview](#Overview)
 - [Tutorial Videos](#TutorialVideos)
 - [Installation](#Installation)
 - [Using BaseMount](#Mounting)
    - [Mounting, Authentication, Unmounting](#Mounting)
    - [Directory Structure](#DirectoryStructure)
    - [Downloading Data](#DownloadingData)
    - [Writing and Uploading data](#WriteMode)
    - [The basemount-cmd tool](#BasemountCmd)
 - [Appendix 1: BSFS plugin](#AppendixBsfsPlugin)
 - [Troubleshooting](#Troubleshooting)
 - [FAQ](#FAQ)
 - [ChangeLog](#ChangeLog)



<a name="Overview"></a>

## Overview

The main mechanism to interact with your BaseSpace Hub data is via the website at [basespace.illumina.com](https://basespace.illumina.com). However, for some use-cases, it can be useful to work with the same data using the Linux command line interface (CLI). This allows direct ad-hoc programmatic access so that users can write ad-hoc scripts and use tools like find, xargs and command line loops to work with their data in bulk.

This is the concept behind our BaseSpace Hub command line tool, [BaseMount](https://basemount.basespace.illumina.com "BaseMount"), a [FUSE driver](https://en.wikipedia.org/wiki/Filesystem_in_Userspace "FUSE userspace driver") that allows command line access to your [BaseSpace Hub](https://basespace.illumina.com "BaseSpace") data.



<a name="WhatIsBaseMount"></a>

## What is BaseMount?

[BaseMount](https://basemount.basespace.illumina.com "BaseMount") is a tool to mount your BaseSpace Hub data as a Linux file system. You can navigate through projects, samples, runs and app results and interact directly with the associated files exactly as you would with any other local file system. BaseMount is based on [FUSE](https://en.wikipedia.org/wiki/Filesystem_in_Userspace "FUSE userspace driver") and uses the [BaseSpace Hub API](https://developer.basespace.illumina.com "BaseSpace API") to populate the contents of each directory.



<a name="TutorialVideos"></a>

## Tutorial Videos

This video series starts by preparing you for your first mount and ends with filtering samples from the command line based on their metadata.

The script of each video is included here for quick reference.


{% step 1, null, Install %} <iframe width="560" height="315" src="https://www.youtube.com/embed/jmsdDmHV-aQ" frameborder="0" allowfullscreen></iframe>

    sudo bash -c "$(curl -L https://basemount.basespace.illumina.com/install)"
    
    # As your intended user: check that fusermount is executable
    fusermount --version
    
    # Optional: Refresh bash auto-completion
    exec bash

{% endstep %}

{% step 2, null, Import Data to Account %} <iframe width="560" height="315" src="https://www.youtube.com/embed/R8ou0yLE_Ts" frameborder="0" allowfullscreen></iframe>

    In a browser, starting from basespace.illumina.com
     - Log in
     - Add public dataset (2 runs + 1 project):
       "HiSeq X Ten TruSeq PCR Free (16 NA12878 1 plex)"
       (Use the following import links to avoid going through the web GUI)
       - Run 1  : https://basespace.illumina.com/s/0FCHjcXGsMMX
       - Run 2  : https://basespace.illumina.com/s/EXDT8tjo6Zbc
       - Project: https://basespace.illumina.com/s/mYwAqCV3Pe7R

{% endstep %}

{% step 3, null, First Time Launch %} <iframe width="560" height="315" src="https://www.youtube.com/embed/VPMFKhNRYjU" frameborder="0" allowfullscreen></iframe>

    # Mount your BaseSpace account
    mkdir BaseSpace
    basemount BaseSpace/
    <copy authentication URL to browser>
    <login in browser>
    <accept authentication>
    <back in terminal: enter [empty] passphrase [not] to encrypt access token>
    
    # See the top level of your newly mounted environment!
    ls BaseSpace

{% endstep %}

{% step 4, null, Projects, Runs, Samples %} <iframe width="560" height="315" src="https://www.youtube.com/embed/afP7SogrcQs" frameborder="0" allowfullscreen></iframe>

    # Mount your BaseSpace account
    mkdir BaseSpace
    basemount BaseSpace/
    
    # List your projects and runs
    cd BaseSpace
    ls Projects
    ls -lh Runs
    
    # List files from one particular sample
    cd "Projects/HiSeq X Ten: TruSeq PCR-Free (16 replicates of NA12878)"
    cd Samples
    cd NA12878_L1_S1
    ls Files/
    
    # Extract first 2 lines of compressed fastq without having to download whole file
    zcat Files/NA12878-L1-S1_S1_L001_R1_001.fastq.gz | head -2

{% endstep %}

{% step 5, null, AppSessions and AppResults %} <iframe width="560" height="315" src="https://www.youtube.com/embed/FDRQLN5etCM" frameborder="0" allowfullscreen></iframe>

    # Mount your BaseSpace account
    mkdir BaseSpace
    basemount BaseSpace/
    
    # List appsessions and appresults
    cd "BaseSpace/Projects/HiSeq X Ten: TruSeq PCR-Free (16 replicates of NA12878)"
    ls AppSessions
    ls AppResults
    
    # List files from one particular appresult
    cd "AppSessions/BWA Whole Genome Sequencing v1.0 - NA12878_L1_S1"
    cd AppResults.20208193.NA12878_L1_S1
    cd Files
    ls
    ls -lh

{% endstep %}

{% step 6, null, Access Large Files %} <iframe width="560" height="315" src="https://www.youtube.com/embed/zCkRIKW3rZU" frameborder="0" allowfullscreen></iframe>

    # Mount your BaseSpace account
    mkdir BaseSpace
    basemount BaseSpace/
    
    # Go to the Files directory of a sample
    cd "BaseSpace/Projects/HiSeq X Ten: TruSeq PCR-Free (16 replicates of NA12878)"
    cd AppResults/NA12878_L1_S1/Files
    ls -lh
    
    # Run interactive samtools queries without having to download the full file
    samtools view -H NA12878-L1-S1_S1.bam
    samtools view NA12878-L1-S1_S1.bam chr3:456789-456789 | head -2
    samtools view NA12878-L1-S1_S1.bam chr3:456789-456789 | wc -l
    
    # Use IGV without having to download the full BAM file
    <open NA12878-L1-S1_S1.bam in IGV>
    <enter chr3:456789 in IGV>
    <admire the view>

{% endstep %}

{% step 7, null, Metadata %} <iframe width="560" height="315" src="https://www.youtube.com/embed/xknDqArvRf8" frameborder="0" allowfullscreen></iframe>

    # Mount your BaseSpace account
    mkdir BaseSpace
    basemount BaseSpace/
    
    # Enter a run and look at its metadata
    cd BaseSpace
    cd "Runs/HiSeq X Ten TruSeq PCR Free (16 NA12878 1 plex) FC_A"
    ls -al
    cat .type
    cat .id
    cat .json
    
    # Extract specific metadata fields (you may need `apt-get/yum install jq`)
    cat .json | jq .Response.SequencingStats
    cd ..
    
    # Get list of runs with yields above a specific threshold
    cat .json | jq '.Response.Items[] | select( .SequencingStats.YieldTotal > 100 )
        | { Name: .ExperimentName, Yield: .SequencingStats.YieldTotal }'
    cat .json | jq -r '.Response.Items[] | select(.SequencingStats.YieldTotal>100)
        | "\(.ExperimentName)\t\(.SequencingStats.YieldTotal)"'

{% endstep %}

{% step 8, null, File upload %} (video coming soon)

Here is a quick step-by-step guide on how easy it is to upload a file to a new AppResult:

    # Mount your BaseSpace account
    mkdir BaseSpace
    basemount BaseSpace
    
    # Create new project
    cd BaseSpace/Projects
    mkdir myNewProject
    
    # Create new AppResult (the only entity able to store files other than fastq)
    cd myNewProject/AppResults
    mkdir myNewAppResult
    cd myNewAppResult
    
    # Create a file there (or copy one with `cp`)
    echo "Hello BaseSpace" > Files/hello.txt
    
    # Mark the container as "Complete"
    basemount-cmd mark-as-complete
    # (You can now navigate to your BaseSpace account in a browser
    #  and check that the file is present in the myNewProject project)

{% endstep %}



<a name="Installation"></a>

## BaseMount Installation

Installation requires root access. Non-root CentOS users need to be added to the 'fuse' user group by an administrator before being able to run BaseMount.


### Quick install

Run the following command:

    sudo bash -c "$(curl -L https://basemount.basespace.illumina.com/install)"

This script works on both Ubuntu and CentOS. It adds BaseSpace Hub package repositories, import public keys to your system and installs BaseMount and its prerequisites.


### Manual install

#### Ubuntu

    # Add BaseMount repository
    FILE=/etc/apt/sources.list.d/basemount.list
    echo "# Packages by Illumina BaseSpace" | sudo tee ${FILE}
    echo "deb https://dl.bintray.com/basespace/BaseMount-DEB saucy main" | sudo tee -a ${FILE}
    
    # Import BaseSpace GPG key
    curl https://bintray.com/user/downloadSubjectPublicKey?username=basespace | sudo apt-key add -
    
    # Refresh db and install BaseMount
    sudo apt-get update
    sudo apt-get install basemount
    
    # Optional: Refresh bash auto-completion
    exec bash

#### CentOS

    # Add BaseMount repository
    FILE=/etc/yum.repos.d/bintray-basespace-BaseMount-RPM.repo
    echo "# Packages by Illumina BaseSpace" | sudo tee ${FILE}
    echo "[bintraybintray-basespace-BaseMount-RPM]" | sudo tee -a ${FILE}
    echo "name=bintray-basespace-BaseMount-RPM" | sudo tee -a ${FILE}
    echo "baseurl=https://dl.bintray.com/basespace/BaseMount-RPM" | sudo tee -a ${FILE}
    echo "gpgcheck=1" | sudo tee -a ${FILE}
    echo "enabled=1" | sudo tee -a ${FILE}
    
    # Import BaseSpace GPG key
    sudo rpm --import https://bintray.com/user/downloadSubjectPublicKey?username=basespace
    
    # Install BaseMount
    sudo yum install basemount
    
    # Check that your intended users have permissions to run fusermount (see FUSE doc)
    fusermount --version
    
    # Optional: Refresh bash auto-completion
    exec bash


### Uninstall

BaseMount can be uninstalled with the following command:

    sudo bash -c "$(curl -L https://basemount.basespace.illumina.com/uninstall)"



<a name="HardwareRequirements"></a>

## Minimum Hardware Requirements and System-Level Settings

We have tested the current version of BaseMount *Alpha* under the following conditions:

Supported Operating Systems:

- Ubuntu 12, 14 and 15
- CentOS 6.5 and 7


Minimum Hardware requirements:

- RAM: 4GB (check your `ulimit -v and -m`)
- Disk: 5GB /tmp


Recommended ulimit thresholds:

- Open files: tested with `ulimit -n 1024`, should be greater or equal to this value
- Stack size: tested with `ulimit -s 8192`, should be lower or equal to this value
- Max user processes: tested with `ulimit -u 16384`, should be greater or equal to this value
- Virtual memory size: tested with `ulimit -v unlimited`, should be greater or equal to 4GB
- Max memory size: tested with `ulimit -m unlimited`, should be greater or equal to 4GB
- Max locked memory: tested with `ulimit -l 64`, should be greater or equal to this value



<a name="Mounting"></a>

## Mounting Your BaseSpace Hub Account

After a successful installation, you can mount your BaseSpace Hub account with BaseMount. 
Basic usage is as follows:

    basemount [--config <config name>] <mount-point folder>

where the --config parameter is optional, and useful when a user has multiple BaseSpace Hub accounts to be mounted.  
The config name is used to create a `<config name>.cfg` file in the ~/.basespace/ directory.  
The mount point directory becomes the top level folder in your mounted file tree.

Example:

    mkdir ~/BaseSpace_Mount
    basemount --config user1 ~/BaseSpace_Mount


### Special configuration needs

#### Proxy

If you are behind a proxy, as BaseMount is sending all HTTPS requests to libcurl, you may need to configure it using the `https_proxy` environment variable (if this doesn't work, please refer to libcurl's manual).

#### Docker

To run BaseMount inside a docker container, the container must run in privileged mode.

Note: If you need a more secure alternative to `docker run --privileged`, you may look around `docker run --cap-add SYS_ADMIN --device /dev/fuse --security-opt apparmor:unconfined` (but please don't ask us for any help with this obscure thing).


### Mounting a BaseSpace Hub Onsite System

BaseMount can also be used to mount user account data for BaseSpace Hub Onsite.  
This is supported starting with BaseSpace Hub Onsite 2.1.  

In order to mount your account data, you must use an additional command-line parameter `--api-server`.  
This will direct BaseMount to connect via the API URL of the BaseSpace Onsite system.  

    basemount [--config <config name>] --api-server <API URL> <mount-point folder>

The API URL follows the format `http://{BaseSpace-IP-Address}:8080` for BaseSpace Onsite.

Once authenticated, BaseMount will remember the API server URL for all subsequent accesses.



<a name="Authentication"></a>

## Authentication

The first time you run BaseMount, you will be directed to a web URL and asked to enter your BaseSpace Hub user credentials. BaseMount will use these credentials to authenticate your interactions with BaseSpace Hub. By default, the credentials are cached in your home directory and they can be password-encrypted for security, just like an ssh key.



<a name="Unmounting"></a>

## Unmounting

Stopping BaseMount can be done in one of the following ways:

 - `basemount --unmount <mount point>` (this actually just calls the fusermount line below)
 - `basemount <mount point or subdirectory>` (same as above, after detecting that it refers to a mounted directory)
 - `fusermount -u <mount point>`
 - `echo unmount > <mount point>/.commands` (brutal method, which kills BaseMount from within)

These unmount commands only succeed when all processes have stopped using the mounted filesystem. You also need to `cd` out of the filesystem's subdirectories in all your terminals.

In some circumstances, lazy unmount using `fusermount -uz <mount point>` may be useful.

You can list the currently mounted directories using `mount | grep basemount`.



<a name="DirectoryStructure"></a>

## Directory Structure

BaseMount uses the natural structure of the BaseSpace Hub API to create an appropriate directory hierarchy, summarized below.


### Overview

BaseMount mimics the structure of the major resources represented in the BaseSpace Hub API.
The root of this structure starts with the Href link that you would find in the API call *[https://api.basespace.illumina.com/v1pre3/users/current](https://api.basespace.illumina.com/v1pre3/users/current)*.


### Root

A mount point's root directory contains the following entries:

 - **Runs**      : sub-directory containing the runs to which the user has access
 - **Projects**  : sub-directory containing the projects
 - **README**
 - **.basemount**: special directory, which shows and controls the configuration of the current BaseMount instance. This directory is accessible from anywhere in the BaseMount filesystem (even though we make it visible by `ls` only at the top level).
 - **.commands** : special file used by `basemount-cmd`
 - **.ResourceById**: (Experimental) special directory to access resources by id without the need to find their full directory hierarchy

![Root](/images/articles/tree-root.png)


### Entity lists directories

These directories are:

 - {mount-point}/**Projects**
 - {mount-point}/**Runs**
 - {mount-point}/Project/{project-name}/**AppResults**
 - {mount-point}/Project/{project-name}/**AppSessions**
 - {mount-point}/Project/{project-name}/**Samples**

Inside these directories, each BaseSpace Hub entity is represented as a sub-directory with the corresponding name.

Entities can also be accessed by ID via the symbolic links `.id.{entity-id} -> {entity-name}`.

With the appropriate access token and permissions, you may be able to create entities with the `mkdir` command.


### Entity directories

These directories are:

 - {mount-point}/**Projects/{project-name}**
 - {mount-point}/**Runs/{run-name}**
 - {mount-point}/Project/{project-name}/**AppResults/{appresult-name}**
 - {mount-point}/Project/{project-name}/**AppSessions/{appsession-name}**
 - {mount-point}/Project/{project-name}/**Samples/{sample-name}**

These directories all contain a Properties directory described later.

#### Entities of type Project

Entities of type Project contain project sub-entities:

![Project Detail](/images/articles/tree-project.png)

 - **AppSessions**, aka "Analyses" on the BaseSpace Hub website: list of all appsessions started in or written to this project.
 - **AppResults**: app outputs (with output files) associated with the project. This is a flattened out list, not broken down by analysis.  
 - **Samples**: flattened list of Samples that are in the project and will have a Files directory containing your fastq.gz files.

#### Entities of type AppSession

These contain:

 - one sub-directory per appresult or sample generated during the appsession
 - one sub-directory per child appsession for multi-node appsessions
 - when generated by the app: a Logs subdirectory containing log files


#### Entities of type AppResult

These contain:

 - **Files**: app output files
 - **Files.metadata** (described below)

These directories are described in more details in the "Download" and "Upload" sections below.

If the entity was created with `mkdir`, it would first appear in write mode, makign it possible to copy files to the Files directory. Once this is done, you can mark the entity as Complete with the command `basemount-cmd mark-as-complete`.


#### Entities of type Sample

These contain:

 - **Files**: that's where you'll find your FASTQ files
 - **Files.metadata** (described below)
 - **SampleProperties**: Information extracted from .json

These directories are described in more details in the "Download" section below. (BaseMount doesn't support sample creation for the moment, as they need to go through a validation stage).



### BaseMount metadata files

In each directory, BaseMount provides a number of hidden files with extra BaseSpace Hub metadata. These hidden files follow the Unix convention of starting with a "." and can be seen using the command `ls -a`.

These metadata files are:

 - **.href**: the API entry point used to query this directory's contents
 - **.curl**: the API request, which could be used in standalone scripts
 - **.json**: the result of the BaseSpace Hub API query. This includes metadata associated with the relevant BaseSpace Hub entity. For example a sample's metadata includes the number and length of reads, the number of reads passing filter, etc.
 - **.id**  : the id of the basespace entity, if it exists, extracted from .href
 - **.type**: the entity (or group thereof)'s type, extracted from .href



<a name="DownloadingData"></a>

## Downloading Data

In appresult and sample directories, `Files` sub-directories expose data files, which can we copied or used interactively.

Just use `cp`, `rsync`, or any command line tool to copy the files from your BaseMount space to your chosen destination.

File accesses use direct HTTPS connections to Amazon S3 storage (i.e. they don't go through the BaseSpace Hub API) to expose files at the block level so users can access any part of a file without needing to download all the preceding blocks, such as when using a tabix or bam index. Caching makes repeated accesses to the same file more efficient.


### Interactive access

Although BaseMount does facilitate file download, and since BaseMount allows for convenient, fast, cached access to your BaseSpace Hub metadata and files, you may find that many operations can be carried out without the need to download entire files locally.

During our testing, we have used BaseMount to grep through FASTQ files, extracted blocks of reads from BAM files and even used IGV on BAM files directly, all without downloading files locally. This can be more convenient than including a download step and saves on the overheads of local storage.


### Multi-threaded download

BaseMount automatically uses multiple threads even for single file accesses.  
Copying multiple files in parallel may be slower or faster than one-at-a-time file copy: it will vary based on your system and on the way files were stored on Amazon servers.

Multi-threading can be configured by launching BaseMount with the command line options `--threads=<n>` and `--cache-opts=<interactive block size>:<large block size>:<total cache size>`

The default values are:

- `n=8`: 8 concurrent threads, shared between all concurrently downloaded files
- `interactive block size=2`: accesses to non-contiguous blocks in a file use 2MB-size blocks
- `large block size=16`: contiguous accesses use 16MB-size blocks
- `total cache size=512`: max 512MB of RAM is used to cache downloaded blocks, which is 32 large blocks.

Important: the number of large blocks able to be stored in the total cache size should be kept greater than the number of threads (even greater than 2x the number of threads to be conservative).  
Failing that, fast threads may get blocked by slow threads when the cache becomes full, reducing the overall download speed. In the worst case, some threads may even overwrite useful cached blocks before they have time to be used, forcing them to be downloaded again later.

#### Timeouts

Two timeouts are in place:

- A fixed speed-based timeout, when less than 1000 bytes are received in any 30-second window, to catch rare occurrences of broken connections to the S3 object store. The 30-second timeout is here to restart downloading the affected blocks on those occasions.

- A fixed timeout of 300 seconds: when a block takes longer than this to be downloaded, BaseMount stops and resumes its download. This is intended to catch unexpected bandwidth throttling problems where one download thread becomes much slower than the other ones.

In both cases, an error message is issued to /tmp/basemount.errorlog and BaseMount resumes downloading the block 3 times before aborting.


#### Bandwidth requirements

These default values show that BaseMount will try to download 16MB blocks using 8 threads with a 300 seconds timeout: `16MB/thread * 8 threads * 8 bits/byte / 300s = 3.4 Mbps` => If your connection is slower than that, you should reduce the number of threads or block size using the two above-mentioned parameters.

The Troubleshooting sections on timeout contain useful advice.


#### Validation

Unfortunately, the data downloaded from BaseSpace is not currently validated (for example using MD5 sums). We hope to implement this soon, but for the moment, any data corruption occurring during download may go through BaseMount undetected.


### BSFS plugin

A back-end with different caching strategies can be selected when launching BaseMount: the BSFS plugin

BSFS is optimising data accesses for large machines with good connection to S3, such as large EC2 instances. BSFS is the filesystem currently used by BaseSpace Hub when running native apps.

Without the BSFS plugin, caching is handled by the Linux disk cache, using (and restricted to) any available RAM.
With BSFS, downloaded data is kept in a disk-based LRU (Least Recently Used) cache. 


This plugin can be activated as follows:

	basemount --plugin=bsfs <mountpoint>


"Appendix 1: BSFS" explains how to install and configure the BSFS plugin for optimal performance.


### Files.metadata

Next to each `Files` directory, you will see a special `Files.metadata` directory.

These directories contain "sneaky" sub-directories, which don't appear in `ls` results. 
Each file that you can see in a Files/ directory has a hidden matching directory entry in File.metadata/.  
For example, if Files/ contains a file `Files/mySubDir/myFile`, then you can do: `cd Files.metadata/mySubDir/myFile` to access this file's metadata.  
In there you will find the usual BaseMount metadata special files (such as .json), as well as a useful Content/Url file exposing the S3 URL of the file itself.

Note: This S3 URL is only valid for 7 days after it got generated by the API call used by BaseMount to create the Content/Url file.



<a name="WriteMode"></a>

## Writing and Uploading data to BaseSpace Hub

Starting with version 0.12, BaseMount offers write mode capabilities.

This brings in the following 3 major and 2 minor features:

- Creation of new BaseSpace Hub entities: Projects, AppResults
- File upload to AppResults
- Property editing
- Marking AppSessions as Complete
- Renaming AppSessions


### Warning about access token scopes

Access tokens obtained through authentication are created with a specific set of scopes.  
Starting with version 0.11, the "CREATE GLOBAL" scope is requested.  
If you authenticated with an older version of BaseMount, your stored access token may not contain the scope needed for write-mode.  
To solve this, you need to delete your current configuration (by using `basemount --remove-config [--config=<config>]`) and run BaseMount again to re-authenticate.


### Creation of new BaseSpace Hub entities

In any Projects or AppResults directory, the `mkdir <name>` command will create a new directory with the specified name.

A matching BaseSpace Hub entity is created on the BaseSpace Hub server.

- Projects are always created in write mode
- AppResults are created together with an associated AppSession called "BaseSpaceCLI - {creation time}". This appsession's status is set as "Running". Files can be added as long as the appsession stays in Running mode.


### File upload to AppResults

After creating a new appresult entity with mkdir, enter the directory.
You can copy any file (including any subdirectory hierarchy) to the Files directory.

The upload will automatically be multi-threaded, with a default of 8 threads per uploaded file (configurable with `basemount --threads=<n>` option - note that this command line parameter is also controlling the number of download threads. Expect this to change in a future version).

Note: Uploaded blocks are validated using their MD5 sums.  
(Note 2: Run upload is not supported yet)  
(Note 3: For Sample upload, please use the BaseSpaceCLI tools, which are implementing FASTQ validation)
(Note 4: BaseSpace doesn't allow files of size 0)


### Property editing

A directory called "Properties" can be found under most BaseSpace Hub entity directories.  

Special rules dictate who can edit those properties:

- Only the owner of an entity can add/edit its properties
- In the current implementation, only the access token used to create the entity can add/edit its properties
- On the plus side, you can add or edit properties even after the entity (or its associated appsession) is marked as "Complete"

Properties can be of type string (manipulated in BaseMount as text files), array (subdirectory containing sequential entries called 0, 1, 2, etc.), map (subdirectory containing named entries), or reference to entities (symbolic link to entity directory).

For example:

    # Add string property
    echo "female" > gender
    
    # Add Sample property
    ln -s ../../../Samples/myExistingSample mySampleProperty
    
    # ... or any path
    ln -s <path to any BaseSpace Hub entity in BaseMount filesystem> myNiceEntity


The BaseSpace Hub Web interface is able to display a relationship between your appresult and an existing Sample. Such a relationship may be established by creating an `input.sample` property as follows:

    <Enter the Properties directory of your new appresult>
    # Add Sample property
    ln -s <path to a BaseMount Sample directory> input.sample


Alternatively, you may create a property called `input.samples` with the type "array of samples":

    <Enter the Properties directory of your new appresult>
    # Add Sample[] property
    mkdir input.samples
    cd input.samples
    ln -s <path to a BaseMount Sample directory> 0
    ln -s <path to a BaseMount Sample directory> 1
    ln -s <path to a BaseMount Sample directory> 2
    ...


### Marking AppSessions as Complete

Inside an AppResult directory, run `basemount-cmd mark-as-complete` to change the status of the associated appsession to "Complete".

The directory will become read-only.  
In case of failure, an explicit error message is issued.


### Renaming AppSessions

When creating an appresult, BaseSpace Hub automatically creates an associated appsession and automatically allocates it the name "BaseSpaceCLI - {creation time}".  
If you wish to choose a different name to organise your workspace more effectively, you can use the `mv` command in the AppSessions directory to rename appsessions.



<a name="BasemountCmd"></a>

## The basemount-cmd tool

Running `basemount-cmd` displays the list of available commands.
This list of commands will vary, based on your current directory, for example `mark-as-complete` is only valid for incomplete AppResults.


The `basemount-cmd` tool was introduced to:

 - Enable bi-directional communication between the user and BaseMount (typical filesystem commands such as `cat`, `echo`, etc. only read or write to a file, but can't return explicit information or error messages conveniently)
 - Give a higher level of abstraction for certain commands, allowing to group multiple filesystem commands, which are intentionally kept at the same granularity as the BaseSpace Hub API
 - Give access to bash-completion (the ability to see the list of commands by typing `basemount-cmd <TAB><TAB>`)


The current version of basemount-cmd is the first version and is still experimental.


### How it works

In a selected subset of BaseMount directories, extra commands are available, which you can call using

    basemount-cmd <command>

Typing `basemount-cmd <TAB><TAB>` displays the list of available commands.  
Running `basemount-cmd` without arguments also shows a description for each command.


### List of commands by entity

 - Projects/{project-name}/AppResults/{appresult-name}: mark-as-complete
 - Projects/{project-name}/Samples/{sample-name}: mark-as-complete


### Description of commands

 - mark-as-complete: Finalize and switch (sample or appresult) to read-only. Change the state of the associated appsession to Complete.


Note: Commands that are not listed here are "use at your own risk", and may disappear in future versions (well... those listed here may disappear as well anyway... it's an alpha release after all).



<a name="Limitations"></a>

## Limitations of BaseMount *Alpha*

Each new directory access made by BaseMount relies on the local FUSE device (/dev/fuse), the BaseSpace Hub API and the user's credentials. This mechanism means that, as currently available, BaseMount does not support the following types of accesses:

- Cluster access, where many compute nodes can access the files. FUSE-mounted filesystems are per-host and cannot be accessed from other hosts without additional infrastructure.
- BaseMount doesn't refresh files or directories. In order to reflect changes done via the Web GUI in your command line tree, you currently need to unmount (`basemount --unmount <mountpoint>`) and restart BaseMount.
- In general, lots of concurrent requests can cause stability issues on a resource-constrained system.  Keep in mind, this is an early release and stability will increase.
- If you have terabytes of data in BaseSpace Hub, doing a "find" command or recursive "ls" or recursive "grep" on the mount is not recommended: it is likely to start consuming many GB of RAM and crash when the RAM runs out. Yes, we'll handle this better soon!



<a name="AppendixBsfsPlugin"></a>

## Appendix 1: The BSFS plugin

The BSFS plugin is a high performance FUSE-based plugin for BaseMount.


### BSFS installation

#### Ubuntu

    # Add BSFS repository
    FILE=/etc/apt/sources.list.d/basespacefs.list
    echo "# Packages by Illumina BaseSpace" | sudo tee ${FILE}
    echo "deb https://dl.bintray.com/basespace/BaseSpaceFS-DEB saucy main" | sudo tee -a ${FILE}
    
    # Import BaseSpace GPG key
    curl https://bintray.com/user/downloadSubjectPublicKey?username=basespace | sudo apt-key add -
    
    # Refresh db and install BSFS
    sudo apt-get update
    sudo apt-get install bsfs

#### CentOS

    # Add BSFS repository
    FILE=/etc/yum.repos.d/bintray-basespace-BaseSpaceFS-RPM.repo
    echo "# Packages by Illumina BaseSpace" | sudo tee ${FILE}
    echo "[bintraybintray-basespace-BaseSpaceFS-RPM]" | sudo tee -a ${FILE}
    echo "name=bintray-basespace-BaseSpaceFS-RPM" | sudo tee -a ${FILE}
    echo "baseurl=https://dl.bintray.com/basespace/BaseSpaceFS-RPM" | sudo tee -a ${FILE}
    echo "gpgcheck=1" | sudo tee -a ${FILE}
    echo "enabled=1" | sudo tee -a ${FILE}
    
    # Import BaseSpace GPG key
    sudo rpm --import https://bintray.com/user/downloadSubjectPublicKey?username=basespace
    
    # Install BSFS
    sudo yum install bsfs


### Using BSFS with BaseMount

This plugin can be activated as follows:

	basemount --plugin=bsfs <mountpoint>


### Differences in behavior when using the BSFS plugin

* A new directory `/tmp/BsfsMount` is created (the location can be configured), and will contain BSFS mount points.
* The "Files" directories containing your actual files are symlinks to these folders in /tmp. If, for example, you wish to tar the files, you may need to use the "h" option to follow the symlinks.
* BSFS does not support proxies
* BSFS may behave less interactively than the default back-end when accessing parts of files as BSFS uses larger blocks by default
* BSFS does not show AppSessionLogs


### BSFS options

To optimize the BSFS plugin's behavior, the following values can be set in the configuration file under a [BSFS] tag.
Configuration options are case-sensitive.

#### LRU Cache Mode

There are currently three caching methods implemented in BSFS as described below:

**SparseFile**: This mode is used in EC2 instances, where the cache path is on an XFS file system. If this mode is specified and the cache path is not on XFS, then BlockFile mode will be used automatically. Ejection of blocks from cache will use the hole-punching feature of XFS.

	LruCacheMode = SparseFile

**BlockFile**: This mode can be used with any file system. In this mode, each file-block is represented as a separate file in the cache folder. If lots of blocks are being accessed, then the number of open file limit (ulimit -n) of the OS will be reached. Therefore it is recommended to increase this value to more than 20,000.

	LruCacheMode = BlockFile

**RamBuffer** (default): In this mode, the cached data is kept in RAM, and not on disk. You should ensure the cache size limit fits in your available RAM, and adjust your block size to have enough blocks if you plan to access multiple files in parallel.

	LruCacheMode = RamBuffer

#### Prefetch Strategy

**NextBlock** (default): In addition to the block(s) containing the current request the "next block" in sequence is also fetched. In our production EC2 instances, this mode is used.

	PrefetchStrategy = NextBlock

**OnDemand**: Only the block(s) containing the current read request is fetched, i.e. pre-fetching of blocks are not done.

	PrefetchStrategy = OnDemand

#### BlockSize

This represents the maximum size (in bytes) of a file block in BSFS's cache. The value you set gets rounded up to a multiple of the filesystem's block size. In our production EC2, block size of 5242880 (5MB) is used. 

	BlockSize = 5242880

#### CacheFolder

This is the location on disk (not needed for RamBuffer mode) where the parts/blocks of the accessed files are cached. In our production EC2, this is on a 1TB XFS file system.

	CacheFolder = /tmp/bsfsCache

#### CacheSizeLimit

This represents the maximum size (in bytes) of the disk (or RAM in case of RamBuffer mode) which can be used for buffering the data. At runtime, if the cache size limit is reached, then some (least recently used) file blocks are purged to make space for the new incoming blocks. Ensure that the disk where you specify the cache folder location has enough free space. For example, the following line will configure a 100 GB cache.

	CacheSizeLimit = 107374182400

#### NumberOfBlocksToPurgeOnCacheFull

This represents the number of file-blocks to purge when the LRU cache becomes full. In our production EC2, this value is set to 20.

	NumberOfBlocksToPurgeOnCacheFull = 20


### Example of BSFS plugin configuration

The default configuration used in BaseMount is:

    [BSFS]
	LruCacheMode = RamBuffer
	PrefetchStrategy = NextBlock
	CacheFolder = /tmp/bsfs
	CacheSizeLimit = 262144000
	BlockSize = 4194304
	NumberOfBlocksToPurgeOnCacheFull = 20


The default configuration used by BaseSpace Hub Native Apps running on Amazon instances is:

    [BSFS]
	LruCacheMode = SparseFile
	PrefetchStrategy = NextBlock
	CacheFolder = /data/input
	CacheSizeLimit = 107374182400
	BlockSize = 5242880
	NumberOfBlocksToPurgeOnCacheFull = 20


These lines should be added to the end of the config file `/home/user/.basemount/default.cfg` (Note: replace "default" by the basemount config name you wish to configure).



<a name="Troubleshooting"></a>

## Troubleshooting


### Generic BaseMount debugging

When experiencing problems with BaseMount, the following actions can help identify the root cause:

 - Check .error files, created in the directory where the error occurred. Disadvantage: multiple errors in the same directory overwrite each other.

 - Check latest entries from /tmp/basemount.errorlog . Critical errors and crash stack traces (very useful to developers, in case you plan to report the problem) are reported there.

 - Re-launch Basemount with the -f option (`basemount -f ...`) to keep BaseMount in the foreground and give you a (very!) comprehensive log output. Disadvantage: it keeps one terminal busy and slows BaseMount down.


### Error: "Bad address"

As BaseMount is exposed as a filesystem, it has the inconvenience of only being accessible by unidirectional commands: either you read from a file or you write to a file. Commands operating on files (such as echo, cat, cp, etc.) don't have the ability to return a personalized error message from the filesystem driver to the user. 
When an error occurs, BaseMount returns a generic error code (usually translated as "Bad address") and stores a more comprehensive error message in a file called .error, created in the directory where the error occurred.
Very important errors are also logged in the /tmp/basemount.errorlog file.

Follow "Generic BaseMount debugging" to figure out what they mean.


### Error: "Timeout was reached - Shared error buffer: Operation too slow. Less than 1000 bytes/sec transfered [in] the last 30 seconds"

This error message is reported in the /tmp/basemount.errorlog file and is related to file (from Files directories) download.

Rare occurrences (fewer than once per 100 GB) of this message can be ignored, as connections to the S3 object store seem to break from time to time. The 30-second timeout is here to restart downloading the affected blocks on those occasions.

Regular occurrences, on the other hand, are important to address, and usually indicate a connection to S3 worse than our expected worst case, or a deeper problem with the stability of your internet connection.

If you believe the problem comes from BaseMount, the answer to the next question describes command line parameters that may ease the bandwidth/latency requirements.


### Error: "Timeout was reached - Shared error buffer: Operation timed out after 300000 milliseconds with 8668643 out of 16777216 bytes received"

This error message is reported in the /tmp/basemount.errorlog file and is related to file (from Files directories) downloads.

By default, BaseMount tries to download 16MB blocks using 8 threads. If a block takes more than 300 seconds to arrive, it issues this error message (and tries to resume the download 3 times before aborting).

16MB/thread * 8 threads * 8 bits/byte / 300s = 3.4 Mbps.

If your connection is slower than that, two BaseMount options may help address this problem:

 - `--threads=<n>` sets the number of concurrent download threads

By default, n=8, so `--threads=2` may help.

But... in many settings, download speed is improved by using multiple threads.
In this case, Reducing the size of each downloaded block to something smaller than 16MB may be a good option:

 -  `--cache-opts=<interactive block size>:<large block size>:<total cache size>`

Default value, in MB, are: 2:16:512 (Note: interactive block size is used when files are accessed in a non-sequential manner).

For example `--cache-opts=2:4:512` would make BaseMount download 4MB blocks.


A middle ground can be achieved with both options: `--threads=4 --cache-opt=2:8:512`



<a name="FAQ"></a>

## Questions and Answers


### How can I refresh the contents of BaseMount's directories?

Feature coming soon.
For the moment, the only way is to unmount and remount BaseMount.


### How can I install a previous version of Basemount?

The install script always installs the latest version of BaseMount. If you want to lock in a specific version as part of your system setup scripts, please use the following steps.

- Configure the BaseMount repository as described in the "BaseMount Installation, Manual Install" section, but without the final `apt-get/yum install basemount` command
- Optional: Configure the BSFS repository as described in the "Appendix 1 - BSFS installation" section, but without the final `apt-get/yum install bsfs` command
- Install BaseMount using the following commands:

#### v0.1 Alpha

##### Ubuntu

    # Install BSFS, which was a required dependency for this early version
    sudo apt-get install bsfs=1.1.631-1
    
    # Install BaseMount
    sudo apt-get install basemount=0.1.2.463

##### CentOS

    # Install BSFS, which was a required dependency for this early version
    sudo yum install bsfs-1.1.632-1

    # Install BaseMount
    sudo yum install basemount-0.1.2.464


#### v0.11 Alpha

##### Ubuntu

    # Configure repository, then:
    sudo apt-get install basemount=0.11.1.1342

    # Optional BSFS plugin
    sudo apt-get install bsfs=1.3.771-1

##### CentOS

    # Configure repository, then:
    sudo yum install basemount-0.11.1.1343

    # Optional BSFS plugin
    sudo yum install bsfs-1.3.772-1


#### Package version discovery

You can discover which versions of BaseMount are available with the following commands:

##### Ubuntu

    # Configure repository, then:
    sudo apt-cache policy basemount

##### CentOS
    
    # Configure repository, then:
    sudo yum --showduplicates list basemount



<a name="ChangeLog"></a>

## ChangeLog


### Tue Mar 1 2016 - v0.12 Alpha
- Write-mode: project and appresult creation, file upload
- Properties can be viewed and edited
- Improved documentation
- Relaxed timeout for low bandwidth
- Offers to create mount point when it doesn't exist
- Offers to unmount if mount point refers to a mounted path
- Unmount assistance, listing blocking processes and offering lazy-unmount
- Raised RAM requirements to 1.5GB, allowing to proceed after confirmation prompt


### Tue Jan 26 2016 - v0.11 Alpha
- Proxy support
- "Files" directories are not symlinks anymore
- Run Files are automatically mounted, now that they load more interactively
- .basemount directories for BaseSpaceCLI support
- BSFS available as a plugin


### Fri Jul 24 2015 - v0.1 Alpha
- Initial release



<a name="Feedback"></a>

## Feedback

Please visit our [BaseSpace Hub google group](https://groups.google.com/forum/#!forum/basespace-developers) for inquiries and to submit feedback. 
