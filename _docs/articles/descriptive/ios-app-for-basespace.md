---
layout: article
title: The iOS App for BaseSpace
hide_welcome_banner: true
---

The iOS app for BaseSpace Hub makes it easier for you to browse through your Runs and Analyses in BaseSpace Hub.  You can review metrics, charts, and other information about Runs and Analyses.  This article will cover the features available in the current version of the app.  The BaseSpace iOS app is available in the  [iTunes App Store](https://itunes.apple.com/us/app/keynote/id942794217?mt=8), try it out for yourself!

##Log in to the iOS App

When you first launch the app, you will be asked to log in using your BaseSpace Hub credentials.  Once you have logged in, you will be taken directly to the Runs list page.

To log in as a different user, you'll need to log out of the app first.

##Log out of the iOS App

At some point, you may want to log out of the BaseSpace Hub iOS app and even log into a different account.  In order to do this, simply: 

* Tap the **Settings** icon ![Settings Icon](/images/mobile-ios/settings.png) in the top right corner of the app, then
* Tap the large red **Log out** button to log out of your BaseSpace Hub account in the app

##Turn push notifications on/off

The iOS app for BaseSpace Hub comes preconfigured with push notifications enabled.  Follow these instructions to turn off push notifications:

* On your device, tap **Settings**.
* Tap **Notifications** and find the BaseSpace Hub app in the list.
* Open the app, then turn **Allow Notifications** on or off.

##View your list of Runs

![Runs List Icon](/images/mobile-ios/runs-unselected.png)

Tap the **Runs** sequencing system icon to view the list of runs in your account and monitor overall status.  Select any run in the list to view details about that run.

* Run Name - The name of the run that the user specified in the Sample Sheet or in the Prep Tab (NextSeq).
* Status - The status of the run. Possible states are Complete, Running, Aborted, or NeedsAttention.
* Date Started - The date the run was started.
* Username - The name of the user who owns the run.
* Instrument Name - The name of the instrument on which the run was performed.

{% screenshot /images/mobile-ios/runs-list.png %}

##See details about the Run

Select a run in the Runs list to view a detailed page about that Run. 

* Status - The status of the Run. Possible states are Running, Complete, and Aborted.
* Owner User - The name of the user that owns the Run.
* Instrument - The name of the instrument on which the Run was performed.
* Run Summary Information - Includes summary information about the Run, including **Number of Cycles** and **%>=Q30**.
* Run Charts - SAV charts from the Run.  Swipe left and right to scroll through the charts on the page.

{% screenshot /images/mobile-ios/runs-details.png %}

##View a list of your Analyses

![Analysis List Icon](/images/mobile-ios/analysis-unselected.png)

Tap the **Analysis** icon to view the Analyses list page. Select any Analysis in the list to view more details about that particular Analysis. 

This page includes:

* Name of the Analysis - The name of the analysis; by default, the name includes the app name, followed by the date and time the analysis session started.
* Status - Overall status of the analysis.
* Status Summary - A message to accompany the status of the analysis.

{% screenshot /images/mobile-ios/analysis-list.png %}

##See details about your Analysis

Select an Analysis from the Analysis list to view details of your analysis.

This page includes:

- Analysis Name - Name of the analysis.
- Status - Overall status of the analysis.
- Project - The project where the results from this analysis are stored.
- Application - The name of the application used in the analysis.
- Total Size - The total size of the output data that was generated from the analysis.
- Duration - The duration of the analysis.
- Multi-Node Details - Details about the different nodes used for the analysis; displayed when the app is configured to use multiple nodes for analysis.

{% screenshot /images/mobile-ios/analysis-details.png %}


## Notifications

![Notifications Icon](/images/mobile-ios/notifications-unselected.png)

Tap the **Notifications** icon to view notifications related to your Runs and Analyses.

{% screenshot /images/mobile-ios/notifications.png %}


##Supported Version(s)

The iOS BaseSpace Hub App is supported on any device running iOS version 8.4 or newer.  This includes the iPhone 4S and later, and iPad 2 and later devices.
