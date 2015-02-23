---
layout: article
title: How to download data from BaseSpace programmatically using Python
hide_welcome_banner: true
---

This tutorial will take you through the steps on how to download data from BaseSpace programmatically using a Python script.  

There are a few sections for this tutorial:

- Obtaining an Access Token for your account
- Download Runs from BaseSpace

<!--
- Download Projects from BaseSpace
- Download Samples from BaseSpace
- Download Analyses or Results from BaseSpace
-->

## Obtaining an Access Token for your account

Before you can begin interacting with BaseSpace programmatically, you will need to obtain an access token for your account.  An [access token](http://en.wikipedia.org/wiki/Access_token) is something that is used to grant applications and programs access to user data in BaseSpace.  

{% step 1, null, Login to Developer Portal %} Go to [https://developer.basespace.illumina.com/](https://developer.basespace.illumina.com/) and login with your BaseSpace credentials {% endstep %}

{% step 2, null, My Apps %}
Click on the **My Apps** link in the tool bar
{% endstep %}

{% step 3, null, Create a New App (or Select an Existing App) %}
In the applications tab, click on the **Create New Application** button (or select an existing application if you have already created one)
{% endstep %}

{% step 4, null, Enter Application Details %}
If you are creating a new application, fill out the Application Details and then click the **Create Application** button.  If you have already created an application, please skip this step.
{% endstep %}

{% step 5, null, Get Access Token %}
In the **Credentials** tab for the app, you will find an **Access Token** which you will need in order to run the Python script.  
{% endstep %}

{% callout note, Note %} Please do not share your access token with anyone, this access token has full access to your user account in BaseSpace.  If the access token is compromised, you can expire the old access token and get a new one by visiting the **Credentials** tab for the app then click on the **Reset** button. {% endcallout %}

## Download Runs from BaseSpace

Now, in order to download a Run from BaseSpace:

{% step 1, null, Download the script %}
Download the Python Script: [BaseSpace Run Downloader](https://da1s119xsxmu0.cloudfront.net/sites/knowledgebase/API/08052014/Script/BaseSpaceRunDownloader_v2.zip)
{% endstep %}

{% callout note, Note %} The script was run using Python version 2.7.8 on Linux, Windows, and Mac OSX {% endcallout %}

{% step 2, null, Unzip file %}
Unzip the contents of the file and save them locally
{% endstep %}

{% step 3, null, Run the script %}

For Windows Users: Modify the **Run_BaseSpaceRunDownloader.bat** and replace **<RunID>** and **<AccessToken>** with corresponding values and run the batch file

For Linux and Mac OSX: Run the following command in a terminal window: `python BaseSpaceRunDownloader_v2.py -r <RunId> -a <AccessToken>`

{% callout note, Note %} The RunId value can be found from the URL when cicking on the desired Run.  For example, for the following Run: [https://basespace.illumina.com/run/101102/BacillusCereus](https://basespace.illumina.com/run/101102/BacillusCereus), the RunId is **101102**.{% endcallout %}

{% endstep %}

## Further Documentation

If you have any further inquiries about working with BaseSpace programmatically, please view the [BaseSpace Developer Portal](https://developer.basespace.illumina.com/).  If the documentation available there is insufficient or you have any further questions, comments, or feedback about this mechanism please feel free to reach out to us directly using the Contact Us feature in BaseSpace.

<!--
<br />
<br />
{% step 1, /images/articles/biological-samples-tab_767x321.png, Select Biological Samples %}
Click on the Prep tab and click on Biological samples.  For more information here please view [Prep Libraries](/articles/descriptive/libraries/).
{% endstep %}

{% step 2, /images/tutorials/use-existing-samples-selector.png, Choose samples and Prep %}
To select existing samples, do one of the following in the Biological Samples list:

-	Select the checkboxes.
-	Click the sample. If you want to select multiple samples, hold the Ctrl button.
-	Select all samples by selecting the checkbox next to the SampleID header.

Click the Prep Libraries button in the top navigation bar.

{% endstep %}
-->