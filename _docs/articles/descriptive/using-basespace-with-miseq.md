---
layout: article
title: Using BaseSpace with MiSeq
---

##Overview
BaseSpace is the Illumina analysis cloud environment. Using BaseSpace to store and analyze your run data provides the following benefits:

-	Eliminates the need for onsite storage and computing
-	Enables web-based data management and analysis
-	Provides tools for global collaboration and sharing

In this section, we discuss the different ways to get started with BaseSpace when uploading data and analysis from the MiSeq.

You can reach BaseSpace by going to [basespace.illumina.com](https://basespace.illumina.com). Use your MyIllumina account to log on; the first time you visit you are asked to accept the BaseSpace agreement. After that, you are ready to run BaseSpace.

{% callout note, NOTE %}
Raw data from the run is also stored on the instrument, or in the location of the output folder that you specified in Run Options.
{% endcallout %}

BaseSpace automatically disconnects from the MiSeq at the end of the run or as soon as all primary analysis files have finished uploading. If the internet connection is interrupted, analysis files continue uploading after the connection is restored from the point when the interruption occurred.
As soon as the last base call file is uploaded to BaseSpace, secondary analysis of your data begins. The same analysis workflows are supported on BaseSpace as with on-instrument analysis using MiSeq Reporter.

##MiSeq Connection
When you set up the run on the MiSeq, select the option to log in to BaseSpace. If you have a problem with the data upload between MiSeq and BaseSpace or if the MiSeq data are not uploaded to BaseSpace, check the following things :

1. Make sure that you have a stable internet connection of at least 10 Mbps upload speed from the MiSeq.
2. When setting up runs on the MiSeq, you can log in to BaseSpace, and use BaseSpace for storage and analysis. Make sure that option is checked.

When you begin your sequencing run on the MiSeq, the BaseSpace icon changes to indicate that the MiSeq is connected to BaseSpace and data files are being transferred.