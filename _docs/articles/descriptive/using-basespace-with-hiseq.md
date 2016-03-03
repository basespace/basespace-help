---
layout: article
title: Using BaseSpace with HiSeq
---

The HiSeq features an option to send instrument health and sequencing data to BaseSpace in real time to streamline both instrument quality control and analysis. Real-time monitoring of runs enables fast troubleshooting. BaseSpace facilitates collaboration by enabling you to share results instantly with anyone anywhere in the world. Free alignment and variant calling and the soon to be launched BaseSpace app store provide many easy to use workflows that tailor analysis for diverse biological applications.

BaseSpace is the Illumina analysis cloud environment. Using BaseSpace to store and analyze your run data provides the following benefits:

- Eliminates the need for onsite storage and computing
- Enables web-based data management and analysis
- Provides tools for global collaboration and sharing

In this section, we discuss the different ways to get started with BaseSpace when uploading data and analysis from the HiSeq.

You can reach BaseSpace by going to [basespace.illumina.com](https://basespace.illumina.com). Use your MyIllumina account to log on; the first time you visit you are asked to accept the BaseSpace agreement. After that, you are ready to run BaseSpace.

When you set up the run on the HiSeq, select the option to log in to BaseSpace. If you have a problem with the data upload between HiSeq and BaseSpace, see [HiSeq Connection](/articles/tutorials/hiseq-connection)

{% callout note, NOTE %}
Raw data from the run is also stored on the instrument, or in the location of the output folder that you specified in the Storage screen.
{% endcallout %}

BaseSpace automatically disconnects from the HiSeq at the end of the run or as soon as all primary analysis files have finished uploading. If the internet connection is interrupted, analysis files continue uploading after the connection is restored from the point when the interruption occurred.

As soon as the last base call file is uploaded to BaseSpace, secondary analysis of your data begins. 