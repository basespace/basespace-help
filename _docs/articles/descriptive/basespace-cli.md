---
layout: article
title: BaseSpace Sequence Hub Command Line Interface
---



## Table of Contents

 - [Overview](#Overview)
 - [Installation](#Installation)
 - [Demonstration Videos](#DemonstrationVideos)
 - [Authentication](#Authentication)
 - [Wrapping](#Wrapping)
    - [Usage and available commands](#Usage)
    - [Options](#Options)
        - [General Options](#GeneralOptions)
        - [Specific Options](#SpecificOptions)
    - [Selecting Configurations](#SelectingConfigurations)
    - [Verb/Noun](#VerbNoun)
    - [Auto Completion](#AutoCompletion)
    - [Adding Additional Tools](#AddingAdditionalTools)
    - [Exit Codes](#ExitCodes)
 - [Launching an App](#LaunchApp)
    - [Basic Usage](#LaunchAppUsage)
    - [Setting Options](#SettingOptions)
    - [Importing a New App](#ImportingApp)
    - [Bulk Launches](#BulkLaunches)
    - [Multiple Configurations](#MultipleConfigurations)
    - [Apps and Versions](#AppsAndVersions)
 - [Chaining Apps](#ChainingApps)
    - [Basic Usage](#ChainingAppsUsage)
    - [Options](#ChainingAppsOptions)
    - [Chaining Example](#ChainingExample)
 - [Sample Upload](#SampleUpload)
    - [Basic Usage](#SampleUploadUsage)
    - [Fastq Validation](#FastqValidation)
    - [Upload Options](#UploadOptions)
    - [Bulk Upload](#BulkUpload)
        - [Using SampleSheet.csv](#UsingSampleSheet)
        - [Using Just Files](#UsingJustFiles)
 - [List Entities](#ListEntities)
    - [Basic Usage](#ListEntitiesUsage)
        - [Static Entities](#StaticEntities)
        - [AppSessions](#AppSessions)
        - [Runs](#Runs)
    - [Formatting Options](#FormattingOptions)
    - [Listing IDs Only](#ListingIDsOnly)
        - [Using Shell Features](#UsingShellFeatures)
    - [Recipes](#Recipes)
        - [Complex Filtering](#ComplexFiltering)
        - [Names to IDs](#NamesToIDs)
 - [BaseSpace Copy](#BaseSpaceCopy)
    - [URIs](#URIs)
    - [Examples](#BscpExamples)
 - [Account Information](#AccountInformation)
    - [whoami](#Whoami)
    - [history](#History)
 - [Known Bugs](#KnownBugs)
    - [Two-word Commands](#TwoWordCommands)




<a name="Overview"></a>

##Overview
The main mechanism to interact with your BaseSpace Sequence Hub data is via the website at [www.basespace.illumina.com](https://basespace.illumina.com). However, for some use-cases, it can be useful to work with the same data using the Linux command line interface (CLI).

With BaseMount, we introduced a way to mount your BaseSpace Sequence Hub files and explore them on the command line as if they were a file system. Now, we are taking this a step further by introducing a suite of tools, BaseSpace Sequence Hub Command Line Interface (BaseSpaceCLI) to both read data from your BaseSpace Hub account and create new data, by uploading samples and launching apps. These tools integrate with BaseMount and provide a way to carry out many routine BaseSpace Sequence Hub tasks efficiently at the command line.

##System Requirements
Supported Operating Systems:
- CentOS6/CentOS7
- Ubuntu 12+

##Minimum Hardware Requirements:
- RAM 2GB


<a name="Installation"></a>

##Installation

###Quick Installation
Run the following command:

    sudo bash -c "$(curl -L https://bintray.com/artifact/download/basespace/helper/install.sh)"

###Manual Installation

####Ubuntu:

    sudo echo "deb https://basespace.bintray.com/BaseSpaceCLI-DEB trusty main" | tee /etc/apt/sources.list.d/basespace-cli.list
    sudo apt-get -y --force-yes install apt-transport-https
    sudo apt-get update
    sudo apt-get -y --force-yes install basespace-cli

####CentOS:

    sudo curl https://bintray.com/basespace/BaseSpaceCLI-RPM/rpm -o /etc/yum.repos.d/basespace-cli.repo
    sudo yum install -y basespace-cli

####MacOS (Yosemite and El Capitan)

    wget https://basespace.bintray.com/BaseSpaceCLI-TGZ/basespace-cli-latest.src.tgz
    tar xvfz basespace-cli-latest.src.tgz
    cd basespace-cli
    sudo make install
    
####Other Unix platforms

The tarball used for the Mac installation should work on any Unix platform that supports Python, but this is unsupported so use at your own risk. 


<a name="DemonstrationVideos"></a>

##Demonstration Videos
As well as this documentation, there are also [video demos](https://www.youtube.com/playlist?list=PLLCJ4-FhlRM6gc19h6GZCRXkNNqYe2N8_) of BaseSpaceCLI functionality.


<a name="Authentication"></a>

##Authentication
Before the CLI tools can be used, an authentication token must be obtained from BaseSpace Sequence Hub . This token will be used each time the CLI tools contact the BaseSpace Sequence Hub API. If you have already used BaseMount, a token will already be present that can also be used by BaseSpaceCLI and you can skip this step.

To authenticate, type bs authenticate at the terminal. BaseSpaceCLI supplies you with a URL. Copy and paste this URL into your web browser and login to BaseSpace Sequence Hub as normal. Then click the "Accept" button to allow the CLI to access your BaseSpace Sequence Hub account. Once you click accept, the word "success!" should appear in your terminal to show your BaseSpaceCLI account is now authenticated.

    $ bs authenticate
    please authenticate here: https://basespace.illumina.com/oauth/device?code=XXXXX
    ....
    Success!

{% callout troubleshoot, Encrypted Access Tokens %}
Unlike BaseMount, BaseSpaceCLI does not support access token encryption. This would mean that you would have to enter your password after every BaseSpace CLI command. If you have already authenticated though BaseMount with an encrypted access token, BaseSpaceCLI will ask you to reauthenticate to get an unencrypted access token.
{% endcallout %}

{% callout troubleshoot, App Launch Access Tokens %}
BaseSpace needed a platform update to support the generation of access tokens which permit app launch. If you have an older access token, such as one generated when BaseMount was originally released, this token may give an error message if you try to launch an app with the CLI. In this case, you should delete your access token (rm ~/.basespace/default.cfg) and reauthenticate.
{% endcallout %}

You can also authenticate against an alternative BaseSpace  instance (e.g. a BaseSpace  Onsite System) using the --api-server option:

    $ bs --config hoth authenticate --api-server https://api.cloud-hoth.illumina.com/
    # use "bs --config hoth" for successive commands to make use of this token


When deriving an access token, the scopes define the permissions a token has to access, create and manipulate BaseSpace data.
By default, `bs authenticate` requests a fairly broad set of scopes that works well with the supported operations, but sometimes it can be desirable to request a specific set of scopes.
You can achieve this by:

    $ bs --config guest --scopes="BROWSE GLOBAL,READ GLOBAL"


<a name="Wrapping"></a>

##Wrapping
All the BaseSpace  CLI tools can be accessed through a single command: `bs`. This command uses the same model as `git` and similar tools to access the underlying functionality, so in place of `git push`, `git pull`, `git commit`, the BaseSpace CLI has `bs launch`, `bs list`, `bs upload` and so on.


<a name="Usage"></a>

###Usage and available commands
To see a usage/help message and the tools that can be executed through bs, run it with the --help option:

    $ bs --help
    usage:   bs [options] <COMMAND> [cmd-options]
    
    BaseSpace's Command Line Interface (CLI).
    
    The BaseSpaceCLI tool suite is a set of command line tools for interacting with BaseSpace,
    Illumina's cloud-based sequencing informatics platform.
    
    Optional arguments:
      -v, --verbose               Increase verbosity of output. Can be repeated.
      --log-file LOG_FILE         Specify a file to log output. Disabled by default.
      -q, --quiet                 Suppress output except warnings and errors.
      -h, --help                  Show help message and exit.
      --debug                     Show tracebacks on errors.
      -V, --version               Show program's version number and exit.
      --dry-run                   Rehearsing COMMAND, without actually running it.
      -c CONFIG, --config CONFIG  Configuration id, to be used to access: ~/.basespace/<CONFIG>.cfg
      --terse                     Output relevant BaseSpace IDs to stdout, but nothing else; warnings
                                  and errors still appear on stderr
    
    Commands:
     Credentials:
      authenticate                obtain credentials for the BaseSpaceCLI tools to use
      whoami                      get information about selected config
     Creating and listing:
      create project              create a project
      history                     Get the event history for a user
      list                        list BaseSpace entities
      upload sample               upload a FASTQ-based sample into a BaseSpace project.
     Apps:
      import app                  import a new app for launch
      kill appsession             abort running appsessions.
      launch app                  launch an app.
     Filesystem:
      mount                       access BaseSpace as a filesystem.
      unmount                     stop accessing BaseSpace as a filesystem.
     Configuration:
      register                    register a BaseSpaceCLI tool
      unregister                  delete one or more BaseSpaceCLI tool from the registry
    
    See 'bs help COMMAND' for more information on a specific command.


<a name="Options"></a>

###Options


<a name="GeneralOptions"></a>

####General Options
General options are show at the top of the help message for the top level bs command. These are as follows:

- Verbose (<code>-v</code>), quiet (<code>-q</code>) and debug (<code>--debug</code>) control the level of output and the log-file option (<code>--log-file</code>) allows this output to be written to a file
- The help (<code>-h</code>) and version (<code>-V</code>) options provide information about the bs command itself
- The dry-run mode (<code>--dry-run</code>) is used as a cue by the underlying tools to report what they would do without actually doing it. This can also be useful when used with the verbose mode to see how the tools are interacting with the BaseSpace API.
- The config option (<code>-c</code>) allows the user to select a different configuration to be used. More information can be found in [selecting configurations](#SelectingConfigurations).
- The terse option (<code>--terse</code>) outputs only relevant BaseSpace IDs and nothing else, to assist with scripting bs commands together. Some examples of how the terse option is interpreted
    - When listing entities (samples, projects, appresults) only the ID is returned with no header or other output
    - When launching apps, only the appsession ID is returned
    - When uploading samples, only the sample ID is returned


<a name="SpecificOptions"></a>

####Specific Options
Running an underlying command with the --help option shows the usage message for that command. The example below shows the help for the launch command:

    $ bs app launch --help
    usage: bs app launch [-h] [-i APPID] [-a AGENTID] [-b BATCH_SIZE] [-n APPNAME]
                         [-o OPTION] [-s SAMPLE_ATTRIBUTES]
                         [--disable-consistency-checking]
                         [launch_parameters [launch_parameters ...]]
    launch an app.
    positional arguments:
      launch_parameters     compulsory parameters for app launch
    optional arguments:
      -h, --help            show this help message and exit
      -i APPID, --appid APPID
                            basespace id of app
      -a AGENTID, --agentid AGENTID
                            agent id to pass with the launch payload
      -b BATCH_SIZE, --batch-size BATCH_SIZE
                            for long lists of inputs, break them up into batches
                            of size b
      -n APPNAME, --appname APPNAME
                            substring matching app name
      -o OPTION, --option OPTION
                            set optional variables for app launch in the form
                            var:val. Can be used many times.
      -s SAMPLE_ATTRIBUTES, --sample-attributes SAMPLE_ATTRIBUTES
                            sample attributes for each sample in the froam var:val
      --disable-consistency-checking
                            disable checking consistency between launch access
                            token and any BaseMount path tokens


<a name="SelectingConfigurations"></a>

###Selecting Configurations
The bs command requires some configuration information to provide the BaseSpace API location and the access token that should be used for API calls. By default, commands launched with bs will use `$HOME/.basespace/default.cfg`, but a different configuration can be selected with eg. `--config other` pointing at the configuration file in `$HOME/.basespace/other.cfg`. This config file is also paired with its own app specification file for app launch.

Having separate configuration like this is useful if you have multiple BaseSpace users or work with multiple BaseSpace instances, which might also have different app details, so you can conveniently switch between them.

These configuration files are shared with BaseMount, so if you are already a BaseMount user you may already have configurations set up, or you can set them up with BaseSpaceCLI and they are automatically available to BaseMount.


<a name="VerbNoun"></a>

###Verb-noun
The bs commands are all provided in the form `bs <verb> <noun>` eg. `bs launch app` and `bs upload sample`. The bs command also allows this ordering to be reversed, so that you can specify `bs <noun> <verb>` eg. `bs app launch` and `bs sample upload`. This helps with command discovery, since you can type `bs sample` and see all the operations that can be performed on samples.


<a name="AutoCompletion"></a>

###Auto Completion
The bs command supports tab-completion, so you can type `bs upl<tab>` and it will autocomplete to `bs upload`. 


<a name="AddingAdditionalTools"></a>

###Adding Additional Tools
Additional tools can be added to BaseSpaceCLI and will immediately be accessible through the bs wrapping command. This can be achieved by `bs register` and `bs unregister`.


<a name="ExitCodes"></a>

###Exit Codes
The BaseSpaceCLI tools follow the convention of issuing exit codes to indicate whether a command was successful or not. The exit code will be 0 if the command was successful and non-zero otherwise. Some examples of commands that might fail are improperly formatted commands or those where the BaseSpaceAPI returns an error, such as if a sample upload or app launch fails.

As with all shell commands, the exit code is stored in the `$?` variable directly after the command has been run.


<a name="LaunchApp"></a>

##Launching an App
The `bs launch app` command is a tool to launch BaseSpace apps from the command line.


<a name="LaunchAppUsage"></a>

###Basic Usage
Apps can only be launched if the app has been "imported", which means setting up a specification how the app should be launched. Specifications for the BWA, Isaac, TopHat and Cufflinks apps comes as standard:

    $ bs list apps
    +---------+----------------------------------+------------+---------------------------------------------+-------------------------------------------------------------------------------------+
    | appid   | appname                          | appversion | source                                      | parameters                                                                          |
    +---------+----------------------------------+------------+---------------------------------------------+-------------------------------------------------------------------------------------+
    | 279279  | BWA Whole Genome Sequencing v1.0 | 1.0.0      | preset                                      | project-id (project) sample-id (sample)                                             |
    | 544544  | TopHat Alignment                 | 1.0.0      | preset                                      | project-id (project) sample-id (sample[])                                           |
    | 1825824 | Isaac Whole Genome Sequencing    | 4.0.0      | preset                                      | project-id (project) sample-id (sample[])                                           |
    | 408408  | Cufflinks Assembly & DE          | 1.1.0      | preset                                      | comparison-samples (appresult[]) control-samples (appresult[]) project-id (project) |
    +---------+----------------------------------+------------+---------------------------------------------+-------------------------------------------------------------------------------------+

If you run the same command with the --all-apps option, all the apps in BaseSpace are listed including a column for whether they are currently launchable with the CLI.

The parameters entry shows what you need to pass on the command line to launch the app. Each argument is listed in order, with the name (eg. project-id) and then the type in brackets. If a type has a [] suffix, this means multiple arguments can be supplied either via comma separation or by providing a file (prefixed with an @ sign in the same way as curl) with one entry per line. Further example are provided in the [bulk launches](#BulkLaunches) section.

Note that each specification also provides a source. This is either preset to denote the pre-made specifications that ship with BaseSpace CLI or a file containing user-derived specifications. More detail of how these specifications can be derived is provided in "Importing a New App".

You can also see the specification for a specific app by name or by BaseSpace ID:

    # note that substring matching is used to find the app with the matching name
    # in the case of multiple matching names, all matches will be listed
    $ bs list apps -n "BWA"
    +--------+----------------------------------+------------+--------+-----------------------------------------+
    | appid  | appname                          | appversion | source | parameters                              |
    +--------+----------------------------------+------------+--------+-----------------------------------------+
    | 279279 | BWA Whole Genome Sequencing v1.0 | 1.0.0      | preset | project-id (project) sample-id (sample) |
    +--------+----------------------------------+------------+--------+-----------------------------------------+
    $ bs list apps -i 278278
    +---------+-------------------------------+------------+--------+-------------------------------------------+
    | appid   | appname                       | appversion | source | parameters                                |
    +---------+-------------------------------+------------+--------+-------------------------------------------+
    | 1825824 | Isaac Whole Genome Sequencing | 4.0.0      | preset | project-id (project) sample-id (sample[]) |
    +---------+-------------------------------+------------+--------+-------------------------------------------+

The description of the app shows the mandatory arguments - what must be supplied - in order. Launch arguments can be specified as BaseMount paths (recommended) or as BaseSpace IDs eg.
 
    # assumes your BaseMount path is in $BASEMOUNT
    # when launching with BaseMount, the supplied paths must be of the proper type and in the correct order
    # in the case of BWA, a project path followed by a sample path
    # the returned string is the name of the launch which can be found through the basespace.com web page or with "bs list appsessions"
    $ bs launch app -n BWA $BASEMOUNT/Projects/MyProject $BASEMOUNT/Projects/MyProject/Samples/MySample/
    BWA Whole Genome Sequencing v1.0 : MySample
    # the same launch, but done with BaseSpace IDs for app, project and sample respectively
    $ bs launch app -i 279279 21646627 25385372
    BWA Whole Genome Sequencing v1.0 : MySample
    # Improper arguments will cause an error will be raised. This example, the arguments are in the wrong order.
    $ bs launch app -n BWA $BASEMOUNT/Projects/MyProject/Samples/MySample/ $BASEMOUNT/Projects/MyProject
    wrong type of BaseMount path selected: $BASEMOUNT/Projects/MyProject/Samples/MySample needs to be of type project

{% callout note, Project target %}
A project is required for every app launch. This is where the app data will be written; it does not have to be the same project where input samples or appresults come from. Your access token must have write access to the project.
{% endcallout %}

{% callout troubleshoot, Access token consistency %}
If you use multiple configuration files for different BaseSpace accounts, you need to make sure that any bs commands refer to a BaseMount path that is mounted with the same access token as the one referred to in the bs command. An error will be thrown if you try to mix access tokens.
{% endcallout %}

{% callout troubleshoot, Incorrect configuration options %}
If you make an error in specifying your options, such as specifying the genome-id as one that is misspelled, the error message you will get from BaseSpace is "Error with API server response: Conflict: Form validation found some errors."
{% endcallout %}


<a name="SettingOptions"></a>

###Setting Options

Most BaseSpace apps have additional options that can be specified in the web form at launch. For the command line tool, each of these options has a default value that is set when the app is imported. These can be seen by listing the apps in verbose mode:

    $ bs list apps -n BWA --app-options
    +----------------------+----------+---------+
    | optionname           | type     | default |
    +----------------------+----------+---------+
    | AnnotationSource     | string   | RefSeq  |
    | FlagPCRDuplicates-id | string[] | []      |
    | GQX-id               | string   | 30      |
    | StrandBias-id        | string   | 10      |
    | genome-id            | string   | Human   |
    +----------------------+----------+---------+
    
Each line specifies the name, type and default value for each option. 

The options can then be altered with the -c switch and using a colon-separated name/value pair, eg:
    
    $ bs launch app -n BWA -c "genome-id:E. Coli MG1655" $BASEMOUNT/Projects/MyProject $BASEMOUNT/Projects/MyProject/Samples/B2_LIB36/

Multiple options are specified with multiple uses of -c:

    $ bs launch app -n BWA -c "genome-id:E. Coli MG1655" -c "FlagPCRDuplicates-id:1" $BASEMOUNT/Projects/MyProject $BASEMOUNT/Projects/MyProject/Samples/B2_LIB36/

Some apps also have per-sample attributes like the strandedness attribute in the TopHat app. These can be specified for all samples in a particular launch:
    
    $ bs launch app -n TopHat -s Stranded:1 $BASEMOUNT/Projects/MyRNAProject $BASEMOUNT/Projects/MyProject/Samples/RZ100ngHuBr_i6_E1_01

{% callout troubleshoot, Sample attributes %}
Unlike a web launch, you cannot specify sample attributes like strandedness for samples on an individual basis - for example you cannot have half the samples in an app stranded and the other half not stranded.
{% endcallout %}

{% callout note, Discovering possible option values %}
For fields that would usually be selected with a drop-down, like genome-id, there is currently no way to see from BaseSpaceCLI what those options should be. You need to visit the BaseSpace web page and look at the app launch form to find the possible values.
{% endcallout %}


<a name="ImportingApp"></a>

###Importing a New App
To launch an app which is currently not listed, use the "import app" command. This can be used in several ways.

One method is to specify a BaseMount path to an existing AppSession. The `import app` command will use the details of the AppSession to derive a new app specification:

    # this command will return nothing by default. You can view the new app with "bs list apps"
    $ bs import app -m $BASEMOUNT/Projects/MyProject/AppSessions/MyAppSession/

When importing an app from an AppSession, it is best to choose an AppSession where as many options as possible have been chosen. If, for example, an app launch has been made with the "Call Novel Transcripts" option unchecked, this option will not appear in the AppSession and will therefore not appear in the app launch specification.

A similar method is to provide an AppSession ID, which you can obtain using the BaseSpace web interface or using `bs list appsessions`. As with a BaseMount path, the `import app` command uses the AppSession details to derive the app specification. This is a useful method if you do not have BaseMount installed:

    $ bs import app -a 24780760

You can also specify the details of the app yourself. This is an advanced and error-prone technique, but is provided for completeness. It requires the properties (-p), defaults (-e), app name (-n) and app ID (-i). Both properties and defaults are specified as json files - to see the format of these files, look at an existing app specification file.

Finally, you can also import app specifications from an existing app specification file. This facilitates the sharing of app launch specifications between users:

    $ bs import app -j input-apps.json

The new app is stored in the user's $HOME directory under .basespace/<configname>-apps.json. The app specification files are shown when listing apps with bs list apps:

    $ bs list apps
    +---------+----------------------------------+------------+---------------------------------------------+-------------------------------------------------------------------------------------+
    | appid   | appname                          | appversion | source                                      | parameters                                                                          |
    +---------+----------------------------------+------------+---------------------------------------------+-------------------------------------------------------------------------------------+
    | 279279  | BWA Whole Genome Sequencing v1.0 | 1.0.0      | preset                                      | project-id (project) sample-id (sample)                                             |
    | 544544  | TopHat Alignment                 | 1.0.0      | preset                                      | project-id (project) sample-id (sample[])                                           |
    | 1085084 | Isaac Enrichment                 | 2.0.0      | /home/psaffrey/.basespace/default-apps.json | project-id (project) sample-id (sample[])                                           |
    | 1825824 | Isaac Whole Genome Sequencing    | 4.0.0      | preset                                      | project-id (project) sample-id (sample[])                                           |
    | 408408  | Cufflinks Assembly & DE          | 1.1.0      | preset                                      | comparison-samples (appresult[]) control-samples (appresult[]) project-id (project) |
    +---------+----------------------------------+------------+---------------------------------------------+-------------------------------------------------------------------------------------+

This allows you to find the file so you can send it to other users and they can import the apps with `import apps -j`.

Note that the app specifications are paired with a configuration file, so that you can have one set of app specifications for each configuration - this is useful if you work with multiple BaseSpace instances, which might have different app configurations. More details about these configuration files are found in "Multiple Configurations".

If you import an app that is already part of the presets, this will be override the preset. This can be useful, for example, if you want to have a different set of defaults to those provided in the preset configuration.

You can also manually rename the app that you import using the -n switch. This is needed to prevent name collisions when importing a different version of the same app.


<a name="BulkLaunches"></a>

###Bulk Launches
A key advantage of programmatic app launch is the ability to launch batches of apps. The "app launch" command has been designed to take advantage of standard features of the Unix shell to enable a number of bulk launch mechanisms.

Launching many apps based on a shell loop:

    $ for sample in $BASEMOUNT/Projects/MyProject/* ; do bs launch app -n BWA $BASEMOUNT/Projects/MyProject $sample ; done
    BWA Whole Genome Sequencing v1.0 : MySample1
    BWA Whole Genome Sequencing v1.0 : MySample2

Some apps, like TopHat and Cufflinks, take lists of inputs. This can be seen as square brackets [] in the app usage description shown when using "bs list apps":

    $ bs list apps
    +--------+------------------+------------+--------+-------------------------------------------+
    | appid  | appname          | appversion | source | parameters                                |
    +--------+------------------+------------+--------+-------------------------------------------+
    | 544544 | TopHat Alignment | 1.0.0      | preset | project-id (project) sample-id (sample[]) |
    +--------+------------------+------------+--------+-------------------------------------------+

There are several ways to pass in multiple arguments to these list options. One is to use a comma separated list:

    # this will quickly become cumbersome for longer input sets!
    $ bs launch app -n TopHat $BASEMOUNT/Projects/MyProject $BASEMOUNT/Projects/MyProject/Samples/MyRNASample1,$BASEMOUNT/Projects/MyProject/Samples/MyRNASample2

Another is to create a file with the inputs to this argument and pass this file, using an @ prefix, the same syntax that curl uses to specify a data file:

    # ls -d to list the directories themselves, rather than the contents
    $ ls -d $BASEMOUNT/Projects/MyProject/Samples/*RNA* > /tmp/RNA_sample_paths.txt
    $ bs launch app -n TopHat $BASEMOUNT/Projects/MyProject/ @/tmp/RNA_sample_paths.txt

This @ prefix also works with the bash process substitution method, to remove the need for an intermediate file:

    $ bs launch app -n TopHat $BASEMOUNT/Projects/MyProject/ @<(ls -d $BASEMOUNT/Projects/MyProject/Samples/*RNA*)

In the cases where you have a large number of inputs, you can also group the app launches into batches:

    # will launch many instances of the TopHat app, each with 2 samples from the supplied list
    $ bs launch app -b 2 -n TopHat $BASEMOUNT/Projects/MyProject/ @<(ls -d $BASEMOUNT/Projects/MyProject/Samples/*RNA*)

You can also use `bs` commands to build a list of IDs, for example using `bs list samples` to pull out the samples from a particular project:

    # pull out all sample IDs from the project "MyProject" into a file
    $ bs list samples --project-name MyProject > samplelist.txt

There are more example of using `bs` commands with shell features in the [recipes](#recipes) section.


<a name="MultipleConfigurations"></a>

###Multiple Configurations

The bs wrapper command allows users to specify a configuration to be used for the underlying commands. This configuration also selects a set of local app specifications to be used. The app specifications are stored in the user's .basespace directory, adjacent to the configuration file:

    # will use app specifications from the file $HOME/.basespace/other-apps.json
    $ bs -c other list apps

These additional app specifications will be created and used automatically. In the case of an app specification that is present in both the local and the preset file, the local app specification will override the behaviour of the preset.


<a name="AppsAndVersions"></a>

###Apps and Versions
The app specifications provided with BaseSpace CLI are for specific versions of each app. If another version of the app is released, we cannot guarantee that the specification will work with this new version. Therefore, even if a new version exists, the specification file will remain tied to the older version. If you want to derive an app launch specification for the new version of the app, you can do so by importing an appsession based on launching an app with this new version. 


<a name="ChainingApps"></a>

##Chaining Apps
To facilitate the chaining of apps, BaseSpace CLI comes with a `bs chain` command, to wait for an app to finish and then derive the output produced by an app. This can then be used to parameterize a downstream app launch.

<a name="ChainingBasicUsage"></a>

###Basic Usage

The `chain` command accepts as arguments one or more appsessions and will then wait for these appsessions to finish, polling based on a specified interval (default 60 seconds). Once they have all finished, `bs chain` returns the appresults that have been generated by the provided appsessions. The default output of `bs chain` is a tabular format to maintain consistency with `bs list`.


    # assuming an appsession with ID 35715736
    $ bs chain 35715736
    +--------------+----------------+--------------------------------------------+
    | appresult id | appresult name | appsession name                            |
    +--------------+----------------+--------------------------------------------+
    | 33307449     | NA12878        | BWA Whole Genome Sequencing v1.0 : NA12878 |
    +--------------+----------------+--------------------------------------------+

Some other behaviour:

- If the AppSessions provided have already finished, `bs chain` returns immediately with the above output.
- If any of the provided AppSessions have failed (reached an Error or Aborted state) `bs chain` returns an error. This behaviour can be adjusted using the `--ignore-failed` switch. 

<a name="ChainingOptions"></a>

###Options

Most options of `bs chain` are in common with `bs list`, in particular `--terse` (to return just the IDs for the AppSession outputs) and the `-f` formatting options. There are two additional options specific to `bs chain`:

- Polling interval (`-i`/`--interval`) - select how often `bs chain` calls the API to find out if the AppSession has finished
- Ignore failed AppSessions (`--ignore-failed`) - rather than fail if any provided AppSessions have failed, continue work on the remainder


<a name="ChainingExample"></a>

###Chaining Example

Below is a script that uses `bs chain` with`bs launch app` to implement a chain of TopHat and Cufflinks apps. The script starts by launching TopHat apps on samples based on a filtered `bs list` command, storing the ID of each appsession in a file. It then uses `bs launch` to launch the Cufflinks apps, embedding `bs chain` commands on the IDs stored in the files used in the previous steps. Because files are used to store the AppSession IDs, this chain can be resumed if the script was interrupted for any reason by just rerunning the script.  

    #!/usr/bin/env bash

    PROJECT=21646627
    
    # these files don't have to exist before the script starts
    # they are just used as intermediaries, so the chain can be resumed
    UHR_id_file=/tmp/UHR_ids.txt
    Hu_id_file=/tmp/Hu_ids.txt
    
    if [ ! -f ${UHR_id_file} ]
    then
        echo "launching UHR samples..."
        $BSCLI launch app --terse -n "TopHat" $PROJECT @<($BSCLI list samples projects --project-name "Sloths test" --sample-name "RZ*UHR*" --terse) > ${UHR_id_file}
    fi
    
    if [ ! -f ${Hu_id_file} ]
    then
        echo "launching Hu samples..."
        $BSCLI launch app --terse -n "TopHat" $PROJECT @<($BSCLI list samples projects --project-name "Sloths test" --sample-name "RZ*Hu*" --terse) > ${Hu_id_file}
    fi
    
    echo "waiting for previous steps and then launching cufflinks..."
    $BSCLI launch app --terse -n "Cufflinks" @<($BSCLI chain --terse @${UHR_id_file}) @<($BSCLI chain --terse @${Hu_id_file}) $PROJECT
    
    echo "launched!"
   

<a name="SampleUpload"></a>

##Sample Upload
The sample upload tool allows users to take fastq files from the filesystem and upload them into BaseSpace as samples.

- Metadata, such as the number of reads and the read lengths, are computed automatically. 
- Files are also checked to ensure the fastq files pass the validation rules - more details about this in [Fastq validation](#FastqValidation).
- Large files are uploaded multi-part for efficiency.


<a name="SampleUploadUsage"></a>

###Basic Usage

    # run with dry-run mode, to perform validation and look at the metadata
    $ bs --dry-run upload sample -i "test sample" -p "MyProject" $HOME/fastqs/valid_S1_L001_R1_001.fastq.gz $HOME/fastqs/valid_S1_L001_R2_001.fastq.gz
    Would have uploaded 2 files into sample 'test sample'...
    ... $HOME/fastqs/valid_S1_L001_R1_001.fastq.gz
                      read number: 1
                      read length: 100
            number of reads (raw): 250
             number of reads (PF): 250
    ... $HOME/fastqs/valid_S1_L001_R2_001.fastq.gz
                      read number: 2
                      read length: 100
            number of reads (raw): 250
             number of reads (PF): 250
    # without dry-run mode
    $ bs upload sample -i "test sample" -p "MyProject" $HOME/fastqs/valid_S1_L001_R1_001.fastq.gz $HOME/fastqs/valid_S1_L001_R2_001.fastq.gz
    Uploading ...
            valid_S1_L001_R1_001.fastq.gz ..... complete
            valid_S1_L001_R2_001.fastq.gz ..... complete
    Uploaded by Peter Saffrey, using BaseSpaceCLI.SampleUpload/0.2 v0.2 on ukch-dev-lnt6-ps.local


<a name="FastqValidation"></a>

###Fastq Validation
Fastq files are validated based on the following criteria:

- The uploader will only support gzipped FASTQ files generated on Illumina instruments
- The name of the FASTQ files must conform the following convention:
    - SampleName_SampleNumber_Lane_Read_FlowCellIndex.fastq.gz (i.e. SampleName_S1_L001_R1_001.fastq.gz / SampleName_S1_L001_R2_001.fastq.gz)
    - The read descriptor in the FASTQ files must conform to the following convention:
    - @Instrument:RunID:FlowCellID:Lane:Tile:X:Y ReadNum:FilterFlag:0:SampleNumber:
        - Read 1 descriptor would look like this: 
        @M00900:62:000000000-A2CYG:1:1101:18016:2491 1:N:0:13
        - Read 2 would have a 2 in the ReadNum field, like this:
        @M00900:62:000000000-A2CYG:1:1101:18016:2491 2:N:0:13
- Quality considerations
    - The number of base calls for each read must equal the number of quality scores
    - The number of entries for Read 1 must equal the number of entries for Read 2
    - The uploader will determine if files are paired-end based on the matching file names in which the only difference is the ReadNum
    - For paired-end reads, the descriptor must match for every entry for both reads 1 and 2
    - Each read has passed filter

These options are also available from the BaseSpaceCLI with the --show-validation-rules option.


<a name="UploadOptions"></a>

###Upload Options
The only mandatory configuration switch for sample upload is the BaseSpace project which should be used as the destination (-p). This can be the project ID, the project name or a BaseMount path. The upload tool will check whether the specified token has access to a project with the specified name and issue an error if there are problems.


<a name="BulkUpload"></a>

###Bulk Upload
One advantage of uploading fastq files using the command line tool is that it is possible to script the bulk upload of many samples. This section provides some examples of using the standard features of the Unix shell to upload large numbers of samples with a handful of commands.


<a name="UsingSampleSheet"></a>

####Using SampleSheet.csv
If your fastq files have been generated using BclToFastq, you will probably have a sample sheet you can use to extract sample names, which facilitates grouping batches of fastq files together:

    # for line in $(sed "1,/Sample_ID/" | tr -d " ") - this part gets all the lines in the file after the line containing "Sample_ID". We remove spaces, which cause problems in the loop
    # samplename=$(echo $line | cut -d, -f1 | sed -r 's/[^a-zA-Z0-9]+/-/g') - this part extracts the samplename for each line, including converting any non alpha-numeric characters to dashes
    # bs upload sample -p "MyProject" fastqs/${samplename}*.fastq.gz  - the upload command itself
    $ for line in $(sed "1,/Sample_ID/" fastq/SampleSheet.csv | tr -d " ") ; do samplename=$(echo $line | cut -d, -f1 | sed -r 's/[^a-zA-Z0-9]+/-/g') ; echo "working at ${samplename}" ; bs upload sample -p "MyProject" fastqs/${samplename}*.fastq.gz ; done


<a name="UsingJustFiles"></a>

####Using Just Files
If you don't have a SampleSheet.csv or you prefer to work just from the files, you can try to extract samplenames from the filenames:

    $ for samplename in $(ls fastq/*.fastq.gz | cut -d_ -f1 | sort -u) ; do echo "working at ${samplename}" ; bs upload sample -p "MyProject" fastqs/${samplename}*.fastq.gz ; done

The code for this is simpler than using a SampleSheet.csv, but it will upload everything from the directory, including (for example) the "Undetermined" sample as derived by a demultiplexing run. 


<a name="ListEntities"></a>

##List Entities
As well as functionality to upload samples and launch apps, BaseSpaceCLI includes a group of commands to list the entities present in your BaseSpace account. This functionality overlaps with what is provided by BaseMount but is included to provide another way to access your data, including environments where BaseMount is not available. 


<a name="ListEntitiesUsage"></a>

###Basic Usage
The entity listing commands allow users to view projects, samples, appsessions and appresults. Most of the functionality is common to each entity with a few commands having separate options. 


<a name="StaticEntities"></a>

####Static Entities
The following commands show the listing of projects, samples, and appresults. Each lists the ID and name.

    $ bs list projects
    +-----------+------------------------------------------------+
    | projectid | projectname                                    |
    +-----------+------------------------------------------------+
    | 9014005   | HiSeq 2000: TruSeq Stranded Total RNA (MAQC)   |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) |
    +-----------+------------------------------------------------+
    $ bs list samples
    +----------+----------------------+
    | sampleid | samplename           |
    +----------+----------------------+
    | 9809800  | RZ100ngUHR_i5_A1_01  |
    | 9809801  | RZ100ngHuBr_i6_F1_02 |
    | 9809802  | RZ100ngUHR_i5_C1_03  |
    | 9809803  | RZ100ngUHR_i5_D1_04  |
    | 9809804  | RZ100ngHuBr_i6_G1_03 |
    | 9809805  | RZ100ngHuBr_i6_E1_01 |
    | 9809806  | RZ100ngHuBr_i6_H1_04 |
    | 9809807  | RZ100ngUHR_i5_B1_02  |
    | 19624644 | NA12877              |
    | 19624645 | NA12882              |
    | 19624646 | NA12891              |
    | 19624647 | NA12878              |
    | 19624648 | NA12892              |
    | 19624649 | NA12884              |
    | 19624650 | NA12893              |
    | 19624651 | NA12883              |
    | 19624652 | NA12888              |
    | 19624653 | NA12886              |
    | 19624654 | NA12881              |
    | 19624655 | NA12879              |
    | 19624656 | NA12885              |
    | 19624657 | NA12887              |
    | 19624658 | NA12880              |
    | 19624659 | NA12889              |
    | 19624660 | NA12890              |
    +----------+----------------------+
    # list appresults also shows the appsession name, which helps with disambiguating the appresult in some cases
    $ bs list appresults
    +--------------+-------------------------+---------------------------------------------+
    | appresult id | appresult name          | appsession name                             |
    +--------------+-------------------------+---------------------------------------------+
    | 9411403      | RZ100ngUHR-i5-C1-03     | RZ100ngUHR_i5_C1_03                         |
    | 9399392      | RZ100ngUHR-i5-D1-04     | RZ100ngUHR_i5_D1_04                         |
    | 9419410      | RZ100ngUHR-i5-A1-01     | RZ100ngUHR_i5_A1_01                         |
    | 9398395      | RZ100ngUHR-i5-B1-02     | RZ100ngUHR_i5_B1_02                         |
    | 9392393      | RZ100ngHuBr-i6-E1-01    | RZ100ngHuBr_i6_E1_01                        |
    | 9427419      | RZ100ngHuBr-i6-F1-02    | RZ100ngHuBr_i6_F1_02                        |
    | 9427420      | RZ100ngHuBr-i6-G1-03    | RZ100ngHuBr_i6_G1_03                        |
    | 9427422      | RZ100ngHuBr-i6-H1-04    | RZ100ngHuBr_i6_H1_04                        |
    | 9429443      | Cufflinks-Report        | Cufflinks Assembly & DE 04/24/2014 6:18:02  |
    | 16944930     | RZ100ngUHR-i5-C1-03     | RZ100ngUHR_i5_C1_03                         |
    | 16910926     | RZ100ngUHR-i5-A1-01     | RZ100ngUHR_i5_A1_01                         |
    | 16920938     | RZ100ngUHR-i5-B1-02     | RZ100ngUHR_i5_B1_02                         |
    | 16955939     | RZ100ngUHR-i5-D1-04     | RZ100ngUHR_i5_D1_04                         |
    | 16909942     | RZ100ngHuBr-i6-E1-01    | RZ100ngHuBr_i6_E1_01                        |
    | 16911927     | RZ100ngHuBr-i6-G1-03    | RZ100ngHuBr_i6_G1_03                        |
    | 16906930     | RZ100ngHuBr-i6-H1-04    | RZ100ngHuBr_i6_H1_04                        |
    | 16933942     | RZ100ngHuBr-i6-F1-02    | RZ100ngHuBr_i6_F1_02                        |
    | 17246265     | Cufflinks-Report        | Cufflinks Assembly & DE 10/13/2014 10:12:40 |
    | 17265260     | Cufflinks-Report        | Cufflinks Assembly & DE 10/13/2014 10:08:52 |
    | 25838835     | IlluminaPlatinumGenomes | IlluminaPlatinumGenomes                     |
    | 28484471     | HaplotypeBamsNA12882    | HaplotypeBamsNA12882                        |
    | 28910957     | NA12890                 | BWA Aligner 12/17/2015 5:27:30 1            |
    +--------------+-------------------------+---------------------------------------------+


<a name="AppSessions"></a>

####AppSessions
AppSessions differ slightly from the other entities because they are of most relevance while analysis is still underway. The bs list appsessions command allows you to see details of appsessions based on their status. This is analogous to monitoring tools from High-Performance Computing queuing systems, for example the qstat tool for Sun Grid Engine.

    $ bs list appsessions
    +--------------+--------------------------------------------+------------------+
    | appsessionid | appsessionname                             | appsessionstatus |
    +--------------+--------------------------------------------+------------------+
    | 30873850     | BWA Whole Genome Sequencing v1.0 : NA12878 | Running          |
    | 30930909     | BWA Whole Genome Sequencing v1.0 : NA12878 | Running          |
    +--------------+--------------------------------------------+------------------+

{% callout troubleshoot, Default appsession status %}
By default, the list appsessions command only lists appsessions in the Running or PendingExecution status. If you do not have any appsessions with these statuses, the command will not return anything.
{% endcallout %}

You can also add addition information about the appsession by adding the -x switch:

    $ bs list appsessions -x
    +--------------+--------------------------------------------+------------------+-----------+
    | appsessionid | appsessionname                             | appsessionstatus | appinputs |
    +--------------+--------------------------------------------+------------------+-----------+
    | 30873850     | BWA Whole Genome Sequencing v1.0 : NA12878 | Running          | NA12878   |
    | 30930909     | BWA Whole Genome Sequencing v1.0 : NA12878 | Running          | NA12878   |
    +--------------+--------------------------------------------+------------------+-----------+

Unlike other entities, AppSessions can also be selected by status with the -u switch, eg.

    $ bs list appsessions -u Aborted

The full list of supported status codes:

- Running
- Complete
- AwaitingAuthorization
- Aborting
- Aborted
- PendingExecution
- Listing with Projects

Any of the non-project entities can also be listed with their project by adding the word `projects` to the command:

    $ bs list samples projects
    +-----------+------------------------------------------------+----------+----------------------+
    | projectid | projectname                                    | sampleid | samplename           |
    +-----------+------------------------------------------------+----------+----------------------+
    | 9014005   | HiSeq 2000: TruSeq Stranded Total RNA (MAQC)   | 9809800  | RZ100ngUHR_i5_A1_01  |
    | 9014005   | HiSeq 2000: TruSeq Stranded Total RNA (MAQC)   | 9809801  | RZ100ngHuBr_i6_F1_02 |
    | 9014005   | HiSeq 2000: TruSeq Stranded Total RNA (MAQC)   | 9809802  | RZ100ngUHR_i5_C1_03  |
    | 9014005   | HiSeq 2000: TruSeq Stranded Total RNA (MAQC)   | 9809803  | RZ100ngUHR_i5_D1_04  |
    | 9014005   | HiSeq 2000: TruSeq Stranded Total RNA (MAQC)   | 9809804  | RZ100ngHuBr_i6_G1_03 |
    | 9014005   | HiSeq 2000: TruSeq Stranded Total RNA (MAQC)   | 9809805  | RZ100ngHuBr_i6_E1_01 |
    | 9014005   | HiSeq 2000: TruSeq Stranded Total RNA (MAQC)   | 9809806  | RZ100ngHuBr_i6_H1_04 |
    | 9014005   | HiSeq 2000: TruSeq Stranded Total RNA (MAQC)   | 9809807  | RZ100ngUHR_i5_B1_02  |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624644 | NA12877              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624645 | NA12882              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624646 | NA12891              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624647 | NA12878              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624648 | NA12892              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624649 | NA12884              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624650 | NA12893              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624651 | NA12883              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624652 | NA12888              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624653 | NA12886              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624654 | NA12881              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624655 | NA12879              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624656 | NA12885              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624657 | NA12887              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624658 | NA12880              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624659 | NA12889              |
    | 18065049  | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) | 19624660 | NA12890              |
    +-----------+------------------------------------------------+----------+----------------------+

<a name="Runs"></a>

####Runs

It is also possible to list runs that have been uploaded by an instrument. For instance:

    $ bs list runs
    +---------+-------------------------------------+------------------------------------------------------+
    | runid   | run_name                            | experiment_name                                      |
    +---------+-------------------------------------+------------------------------------------------------+
    | 277282  | 11-09-15_M11_0199_A-RG1234567-00CDE | 2x151PhiX                                            |
    | 718718  | 120831_D0002_0112_AH00TWADXX        | 2x150 HiSeq 2500 demo NA12878                        |
    | 719719  | 120901_HSQ1003_0152_BH70T4ADXX      | HiSeq 2500 NA12878 demo (2x100)                      |
    | 9363362 | 141121_ST-E00107_0356_AH00C3CCXX    | HiSeq X Ten TruSeq PCR Free (16 NA12878 1 plex) FC_A |
    +---------+-------------------------------------+------------------------------------------------------+


<a name="FormattingOptions"></a>

###Formatting Options
The tables produced by the entity listing commands all come with formatting options to enable scripting. The formatting options are selected with the -f switch and the supported formats are:

- csv
- json
- yaml
- value (space separated - not recommended because many BaseSpace entities contain spaces)

    $ bs list projects -f csv
    "projectid","projectname"
    "9014005","HiSeq 2000: TruSeq Stranded Total RNA (MAQC)"
    "18065049","HiSeq 2000: TruSeq PCR-Free (Platinum Genomes)"
    $ bs list projects -f yaml
    - projectid: '9014005'
      projectname: 'HiSeq 2000: TruSeq Stranded Total RNA (MAQC)'
    - projectid: '18065049'
      projectname: 'HiSeq 2000: TruSeq PCR-Free (Platinum Genomes)'
    $ bs list projects -f json
    [
      {
        "projectid": "9014005",
        "projectname": "HiSeq 2000: TruSeq Stranded Total RNA (MAQC)"
      },
      {
        "projectid": "18065049",
        "projectname": "HiSeq 2000: TruSeq PCR-Free (Platinum Genomes)"
      },
    ]


<a name="ListingIDsOnly"></a>

###Listing IDs Only
To help facilitate chaining bs commands together, the entity listing command comes with a --terse option to allow output of IDs only:

    # without --terse
    $ bs list projects
    +------------+------------------------------------------------+
    | project id | project name                                   |
    +------------+------------------------------------------------+
    | 9014005    | HiSeq 2000: TruSeq Stranded Total RNA (MAQC)   |
    | 18065049   | HiSeq 2000: TruSeq PCR-Free (Platinum Genomes) |
    | 26799780   | TestProject                                    |
    | 26935918   | ATestProject                                   |
    +------------+------------------------------------------------+
    # and with it
    $ bs list projects --terse
    9014005
    18065049
    26799780
    26935918

This can be used to select IDs with the name filtering switches:

    $ bs list samples --sample-name RZ
    +-----------+----------------------+
    | sample id | sample name          |
    +-----------+----------------------+
    | 9809800   | RZ100ngUHR_i5_A1_01  |
    | 9809801   | RZ100ngHuBr_i6_F1_02 |
    | 9809802   | RZ100ngUHR_i5_C1_03  |
    | 9809803   | RZ100ngUHR_i5_D1_04  |
    | 9809804   | RZ100ngHuBr_i6_G1_03 |
    | 9809805   | RZ100ngHuBr_i6_E1_01 |
    | 9809806   | RZ100ngHuBr_i6_H1_04 |
    | 9809807   | RZ100ngUHR_i5_B1_02  |
    +-----------+----------------------+
    $ bs list samples --sample-name RZ --terse
    9809800
    9809801
    9809802
    9809803
    9809804
    9809805
    9809806
    9809807

When the terse option is used for multiple listed entities, it always applies to the first argument provided:

    # listing all sample IDs matching a certain string
    $ bs list samples projects --sample-name RZ --terse
    9809800
    9809801
    9809802
    9809803
    9809804
    9809805
    9809806
    9809807
    # listing all project IDs for the same filter. Note they are all the same project
    $ bs list projects samples --sample-name RZ --terse
    9014005
    9014005
    9014005
    9014005
    9014005
    9014005
    9014005
    9014005

<a name="UsingShellFeatures"></a>

####Using Shell Features

For cases where BaseSpaceCLI requires a single ID, such as a project ID, an appropriate bs list command that returns a single ID can be turned into a variable with `backticks` or in a $(variable substitution) and put directly into the command line. For cases where many IDs are required, such as app launch, newline separated commands can be similarly enclosed as `<(process substitutions)`.


<a name="Recipes"></a>

###Recipes

<a name="ComplexFiltering"></a>

####Complex Filtering
The bs list commands can be used in combination to build lists of IDs for input to other bs commands, such as app launch. In some cases, using name filtering along with --terse will be sufficient to achieve this. However, in other cases you can also use the usual combination of pipes, grep and cut to pull out what is needed:

    # get all the sample IDs from projects/samples with the word "RNA" in them
    # the "--quote none" option removes quotes from the output so it doesn't need to be cleaned up
    $ bs list projects samples -f csv --quote none | grep RNA | grep _[ABCD]1_ | cut -d, -f3
    9809800
    9809802
    9809803
    9809807

<a name="NamesToIDs"></a>

####Names to IDs

If we want to convert a list of sample names into a list of IDs for app launch or similar, there are a few options:

    # assume we have a file containing our sample names
    $ cat /tmp/samplenames.txt
    NA12877
    NA12878
    NA12879
    # method 1: use grep with a file
    $ bs list samples -f csv --quote none | grep -f /tmp/samplenames.txt | cut -d, -f1
    19624644
    19624647
    19624655
    # method 2: loop over the file and call bs each time
    # this method is slower because it makes one API call per sample, but might allow greater control
    $ for sname in $(cat /tmp/samplenames.txt) ; do /home/psaffrey/tmp/basespacecli-installs/bin/bs list samples --sample-name $sname --terse ; done


<a name="BaseSpaceCopy"></a>

## BaseSpace Copy

Copying BaseSpace data is possible in BaseSpaceCLI, via the `bs cp` tool.
This tools allows to copy data from/to BaseSpace instances, as well as the local file system.
It has been designed to copy robustly even with high latency or low bandwidth connections, and it will resume downloads if needed.


<a name="URIs"></a>

### URIs

`bs cp` uses the Uniform Resource Identifier to select the source and destination location of your data. 
Multiple schemas are available for different methods of authenticating to BaseSpace:

- `conf://[name]/`

Use the supplied configuration with a given name.
If the name is not provided then use 'default'.
These configuration files are created by the BaseSpace CLI.
For example, `conf://server/` maps to `~/.basespace/server.cfg`

- `env:///`

Use the environment variables `BASESPACE_API_SERVER` and `BASESPACE_ACCESS_TOKEN`.

- `http[s]://[token@]hostname/`

Used for interactive authentication, authenticate directly to a given API server URL.
A special case is made for `api.basespace.illumina.com` where you can simply use `basespace.illumina.com`.
If a token is supplied then use that for authentication.


<a name="BscpExamples"></a>

###Examples

Copy the local directory dataset to the BaseSpace project `MyUploads` with the AppResult name `MyRun1` using environment variables

    $ bs cp -v dataset env:///Projects/MyUploads/AppResult/MyRun1

Copy the local directory dataset to the BaseSpace project `MyUploads` with the AppResult name `MyRun1` using the default configuration file (needs to be created by bscli)

    $ bs cp -v dataset config:///Projects/MyUploads/AppResult/MyRun1

Copy the local directory dataset to the BaseSpace project `MyUploads` with the AppResult name `MyRun1` using interactive authentication

    $ bs cp -v dataset https://api.basespace.illumina.com/Projects/MyUploads/AppResult/MyRun1

Copy the Run with ID `2777282` into the local directory `2x151PhiX`

    $ bs cp -v env:///Run/277282 2x151PhiX

Copy only InterOp files in the Run with ID `2777282` into the local directory `2x151PhiX_InterOp`

    $ bs cp -v env:///Run/277282/InterOp 2x151PhiX_InterOp


<a name="AccountInformation"></a>

##Account Information

<a name="Whoami"></a>

###whoami
For users working with multiple BaseSpace configurations, it can be useful to see details of the access tokens associated with each. The `bs whoami` command provides this token reflection.

    $ bs whoami -c hoth
    +-----------------+---------------------------------------------------------+
    | key             | value                                                   |
    +-----------------+---------------------------------------------------------+
    | Name            | BaseSpaceCLI Illumina                                   |
    | Id              | 975975                                                  |
    | Email           | BaseSpace.CLI@gmail.com                                 |
    | ApplicationName | BaseSpaceCLI                                            |
    | DateCreated     | 2015-11-12 10:57:52                                     |
    | Scopes          | CREATE GLOBAL,BROWSE GLOBAL,CREATE PROJECTS,READ GLOBAL |
    +-----------------+---------------------------------------------------------+

Again, the `yaml`, `csv` and `json` output options are also supported.

<a name="History"></a>

###history
For users with an Enterprise Tier license, BaseSpace now provides support for examining a user's event history.
BaseSpaceCLI allows access to this stream of events:

    $ bs history -c audit_account | head -10
    Id,DateCreated,ResourceType,ResourceId,ActingUserId,LoggedInUserId,EventType,FieldChanges,Metadata
    837d0834-511a-4d93-a858-5cc9d5ebba91_LoginSession_2149147,2016-06-09T00:24:04.8848931Z,User,3003,3003,3003,Login,loggedinuser :  -> 3003;actinguser :  -> 3003,
    0def522d-1716-460e-a2e3-bae82dc644fc_LoginSession_2144149,2016-06-09T00:23:47.4790952Z,User,3003,3003,3003,Logoff,loggedoffon :  -> 2016-06-09T00:23:47.4165969Z,
    77516765-3200-4ab2-8753-526bbd3ce801_AnalysisResults_236236,2016-06-09T00:15:34.0611534Z,AnalysisResults,236236,3003,3003,Read,,sizeinbytes:183473;projectids:447447;filepath:/A-Ecoli-SName-S12_S1.report.pdf;fileid:4251258;filename:A-Ecoli-SName-S12_S1.report.pdf
    d45789d3-0c21-493a-b4a2-d851e5d4dc1d_Grant_1538538,2016-06-09T00:07:07.1902171Z,Grant,1538538,3003,3003,Create,user :  -> 3003;isactive :  -> True;permissionflags :  -> ROLE_OWNER,user:3003
    ee707a2a-0148-4ddc-88f0-9c3af41bfc64_Grant_1538537,2016-06-09T00:07:07.1120430Z,Grant,1538537,3003,3003,Create,user :  -> 3003;isactive :  -> True;permissionflags :  -> ROLE_OWNER,user:3003
    a17c8c3e-45f2-4156-9364-74fe39bbf4a0_ApiOAuthV2Token_1017018,2016-06-09T00:07:05.7458081Z,ApiOAuthV2Token,1017018,3003,3003,Update,accesstokendisabledreason :  -> AppSession Ended;accesstokendisabledon :  -> 2016-06-09T00:07:05.7301834Z;accesstokendisabled : False -> True,"applicationname:OReport;apiapplication:146148;resourceowneruser:3003;accesstokenissuedon:2016-06-08T23:07:19.0000000;scope:WRITE project 490490,READ sample 389389;applicationslug:illumina-inc.oreport.1.0.0"
    bc3f9938-08bc-4c2d-8925-8c074c851218_Grant_1537536,2016-06-09T00:05:50.1226915Z,Grant,1537536,3003,3003,Create,isactive :  -> True;user :  -> 3003;permissionflags :  -> ROLE_OWNER;analysisresults :  -> 253253,user:3003;analysisresults:253253
    5321b580-aad2-448e-ad4a-90672133f5d7_AnalysisResults_253253,2016-06-09T00:05:50.1226915Z,AnalysisResults,253253,3003,3003,Create,name :  -> truseqI1-8899-Name_S12_L001_R2_001_fastqc;datastatus :  -> METADATA_ACTIVE;owneruser :  -> 3003;storagestatus :  -> Online;appsession :  -> 784794;description :  -> Analysis result,projectids:490490;name:truseqI1-8899-Name_S12_L001_R2_001_fastqc
    923f0daf-537e-455a-b248-6255d18416b3_Project_490490,2016-06-09T00:05:10.3893211Z,Project,490490,3003,3003,Update,description : desc added_now edited -> desc added_now edited_edit,name:accessToken12345

- Users without a Enterprise Tier license would not be able to request the `AUDIT USER` scope, and will receive a warning on authentication
- The FieldChanges column of this output provides a semi-colon separated list of changed fields in the form field_name : start_value -> end_value
- The Metadata column of this output provides a semi-colon separated list of key:value pairs


<a name="KnownBugs"></a>

##Known Bugs

<a name="TwoWordCommands"></a>

###Two-word Commands

If you misspell the second word of a command, the wrong error is returned:

    # error message should say "list sampels is not a bs command"
    $ bs list sampels
    bs: 'list' is not a bs command. See 'bs --help'.
    Did you mean one of these?
      list appresults
      list apps
      list appsessions
      list entities
      list projects
      list samples
      kill app
     
    $ bs app lunch
    bs: 'app' is not a bs command. See 'bs --help'.
    Did you mean one of these?
      app import
      app launch
      appsession kill
      auth
      help
      sample setproperty
      sample upload
