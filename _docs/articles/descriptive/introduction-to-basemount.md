---
layout: article
title: Introduction To BaseMount
---

##Overview
The main mechanism to interact with your BaseSpace data is via the website at [www.basespace.illumina.com](https://basespace.illumina.com). However, for some use-cases, it can be useful to work with the same data using the Linux command line interface (CLI). This allows direct ad-hoc programmatic access so that users can write ad-hoc scripts and use tools like find, xargs and command line loops to work with their data in bulk.

This is the concept behind our first major BaseSpace command line tool, BaseMount, a [FUSE](https://en.wikipedia.org/wiki/Filesystem_in_Userspace "FUSE driver") that allows command line read access to your [BaseSpace](https://basespace.illumina.com "BaseSpace") data.

##What is BaseMount?
[BaseMount](https://basemount.basespace.illumina.com "BaseMount") is a tool to mount your BaseSpace data as a Linux file system. You can navigate through projects, samples, runs and app results and interact directly with the associated files exactly as you would with any other local file system. BaseMount is a [FUSE](https://en.wikipedia.org/wiki/Filesystem_in_Userspace "FUSE driver"), which operates in user-space and uses the [BaseSpace API](https://developer.basespace.illumina.com "BaseSpace API") to populate the contents of each directory.

##BaseMount Installation

Installation requires root access. Non-root CentOS users need to be added to 'fuse' user group by the administrator before being able to run [BaseMount](https://basemount.basespace.illumina.com "BaseMount"). To run [BaseMount](https://basemount.basespace.illumina.com "BaseMount") inside a docker container, the container must be run in privileged mode.

### Quick install:
Run the following command:


    sudo bash -c "$(curl -L https://basemount.basespace.illumina.com/install/)"
This script work on both Ubuntu and CentOS. The script will add BaseSpace package repositories and import public key to your system and install [BaseMount](https://basemount.basespace.illumina.com "BaseMount") and its prerequisites.

###Manual install:
####Ubuntu:
    wget https://bintray.com/artifact/download/basespace/BaseMount-DEB/basemount_0.11.0.992-20151203_amd64.deb
    wget https://bintray.com/artifact/download/basespace/BaseSpaceFS-DEB/bsfs_1.2.746-1_amd64.deb
    sudo dpkg -i basemount_0.11.0.992-20151203_amd64.deb
    sudo dpkg -i --force-confmiss bsfs_1.2.746-1_amd64.deb

####CentOS
    wget https://bintray.com/artifact/download/basespace/BaseMount-RPM/basemount-0.11.0.993-20151203.x86_64.rpm
    wget https://bintray.com/artifact/download/basespace/BaseSpaceFS-RPM/bsfs-1.2.747-1.x86_64.rpm
    sudo yum install basemount-0.11.0.993-20151203.x86_64.rpm
    sudo yum install bsfs-1.2.747-1.x86_64.rpm



##Minimum Hardware Requirements and System-Level Settings
We have tested the BaseMount *Alpha* v0.11.0 release on the following systems:

Supported Operating Systems:


- Ubuntu 14 & 15
- CentOS 6.5 & 7

Minimum Hardware requirements:


- RAM: 4GB 
- Processor: 4 cores
- Disk: 5GB /tmp

With the following ulimit thresholds:


- Default settings for CentOS (-l 64, -m unlimited, -n 1024, -s 10240, -u 4553)
- Default settings for Ubuntu (-l 64, -m unlimited, -n 1024, -s 8192, -u 15722)


##Mounting Your BaseSpace Account
After successful installation, you can then mount your [BaseSpace](https://basespace.illumina.com "BaseSpace") account with [BaseMount](https://basemount.basespace.illumina.com "BaseMount"). Basic usage is as follows:

    basemount --config {config_file_prefix} {mount-point folder}

where the --config parameter is optional, and useful when a user has multiple basespace accounts to be mounted. The prefix is used to create a prefix.cfg file in the ~/.basespace/ directory. The mount point directory is going to be the top level folder in your mounted file tree.

Example:

    mkdir ~/BaseSpace_Mount    
    basemount --config user1 ~/BaseSpace_Mount

##Mounting Your BaseSpace Onsite Account
BaseMount can also be used to mount user account data for BaseSpace Onsite, which is now supported with BaseSpace Onsite version 2.1. In order to mount your account data, you must use an additional command-line parameter: --api-server. This will direct BaseMount to connect via the API Url of the BaseSpace Onsite system. Basic usage for BaseSpace Onsite is as follows:

    basemount --config {config_file_prefix} --api-server {API Url} {mount-point folder}

where the API Url is in the format of `http://{BaseSpace-IP-Address}:8080` for BaseSpace Onsite users.

##Authentication
The first time you run [BaseMount](https://basemount.basespace.illumina.com "BaseMount"), you will be directed to a web URL and asked to enter your BaseSpace user credentials. BaseMount will use these credentials to authenticate your interactions with BaseSpace. By default, the credentials are cached in your home directory and they can be password-encrypted for security, just like an ssh key.

##Directory Structure
BaseMount uses the natural structure of the BaseSpace API to create an appropriate directory hierarchy, which is summarized below:

###Overview
BaseMount mimics the structure of the major resources represented in the API.  The root of this structure starts with the Href links that you would find in the API call: *[https://api.basespace.ilumina.com/v1pre3/users/current](https://api.basespace.illumina.com/v1pre3/users/current)*:

![API Users/Current](/images/articles/api-users-current.png)

###Root
Runs and Projects are the two root directories, each containing sub-directories with the names of the Runs/Projects to which the user has access.

![Root](/images/articles/tree-root.png)

###Project Details
Inside each project directory you would find the following sub-directories:

![Project Detail](/images/articles/tree-project.png)

- **AppSessions**, known as "Analyses" in the BaseSpace website.  This directory will list all AppSessions that you started in this project or have written to this project.  A single directory will contain the AppResults and/or Samples that the app created.  
- **AppResults** directory contains all of the result data available in the project.  These are flattened out list, not broken down by analysis.  
- **Samples** directory contains the flattened list of Samples that are in the project and will have a Files directory containing your fastq.gz files.

###MetaData
In each directory, BaseMount provides a number of hidden files with extra BaseSpace metadata. These hidden files follow the Unix convention of starting with a "." and can be seen using the command:
```
ls -a
```

These metadata files are:

-  **.json**: the result of the raw BaseSpace API query. This includes metadata associated with the relevant BaseSpace entity, so for example a sample's metadata includes the number and length of reads, the number of reads passing filter etc.
-  **.curl**: the raw API request for this entity

###Access By Entity Id
In each directory, BaseMount provides hidden symlinks to the human-readable named entity folders, with the **.id** prefix. These allow navigation through a users directories by entity ID's rather than names. 

###File-level Access
At various appropriate levels, BaseMount provides access to the raw files available in your BaseSpace account. For example, the fastq.gz files associated with a sample. 

This file access is provided by BSFS, the mechanism used by the BaseSpace native app engine to expose BaseSpace files for app runs. BSFS uses HTTPS to expose files at the block level so users can make an access into the middle of a file without needing to download all the proceeding blocks, such as when using a tabix or bam index. BSFS also provides caching features to make repeated access of the same file more efficient.


##Downloading Data
You can use BaseMount to download your BaseSpace data to a local filesystem. Just use **cp**, **rsync** or any command line tool you prefer to copy the files from your BaseMount space to your chosen destination. 

Although BaseMount does facilitate file download, we would recommend that since BaseMount allows convenient, fast, cached access to your BaseSpace metadata and files, you may find that many operations can be carried out without the need to download locally. During our testing, we have used BaseMount to grep through fastq files, extract blocks of reads from bam files and even use IGV on the bam files directly all without downloading files locally. This can be more convenient than including a download step and saves on the overheads of local storage.

##Limitations of BaseMount *Alpha* v0.11.0
Every new directory access made by BaseMount relies on FUSE, the BaseSpace API and the user's credentials. This mechanism means that, as currently available, BaseMount does not support the following types of access:




- Cluster access, where many compute nodes can access the files. FUSE mounted file systems are per-host and cannot be accessed from many hosts without additional infrastructure.
- BaseMount also doesn't refresh files or directories. In order to reflect changes done via the Web GUI in your command line tree, you currently need to unmount (basemount --unmount <mountpoint>) and restart BaseMount.
- The Runs Files directory is not mounted automatically for you as there can be 100k + files available in that mount which can take a couple minutes to load for really large runs.  You can still mount this directory manually if needed.
- In general, lots of concurrent requests can cause stability issues on a resource constrained system.  Keep in mind, this is an early release and stability will increase.
- If you have terabytes of data in BaseSpace, doing a "find" command or recursive "ls" or recursive "grep" on the mount is not recommended.

## Feedback

Please visit our [BaseSpace google group](https://groups.google.com/forum/#!forum/basespace-developers) for inquiries and to submit feedback. 

##Tutorial Videos

{% step 1, , Install %}
						<iframe width="560" height="315" src="https://www.youtube.com/embed/jmsdDmHV-aQ" frameborder="0" allowfullscreen></iframe>
{% endstep %}	

{% step 2, , Import Data to Account %}
						<iframe width="560" height="315" src="https://www.youtube.com/embed/R8ou0yLE_Ts" frameborder="0" allowfullscreen></iframe>
{% endstep %}

{% step 3, , First Time Launch %}

<iframe width="560" height="315" src="https://www.youtube.com/embed/VPMFKhNRYjU" frameborder="0" allowfullscreen></iframe>

{% endstep %}

{% step 4, , Projects, Runs, Samples %}

<iframe width="560" height="315" src="https://www.youtube.com/embed/afP7SogrcQs" frameborder="0" allowfullscreen></iframe>

{% endstep %}


{% step 5, ,  AppSessions and AppResults %}

<iframe width="560" height="315" src="https://www.youtube.com/embed/FDRQLN5etCM" frameborder="0" allowfullscreen></iframe>

{% endstep %}

{% step 6, ,  Access Large Files %}

<iframe width="560" height="315" src="https://www.youtube.com/embed/zCkRIKW3rZU" frameborder="0" allowfullscreen></iframe>

{% endstep %}

{% step 7, ,  Metadata %}

<iframe width="560" height="315" src="https://www.youtube.com/embed/xknDqArvRf8" frameborder="0" allowfullscreen></iframe>

{% endstep %}
						
						
			
