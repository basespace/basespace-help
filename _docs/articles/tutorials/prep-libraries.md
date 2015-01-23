---
layout: article
title: How to Prep Libraries
hide_welcome_banner: true
---

On the Prep Libraries page, you assign indexes to biological samples, based on the indexes available in the library preparation chosen. Every used well or tube contains a separate library. Best practice is to set up the libraries in SSM first. then you export a file of your library settings, and use that to pipet the biological samples into the proper wells or tubes.

{% callout note, NOTE %}
If you do not want to use indexed sequencing, you still have to assign your biological sample to an index. Only when you set up your sequencing run, you specify that you do not sequence the index.
{% endcallout %}

<br />
{% step 1, /images/tutorials/prep-libraries-button.png, Inititate Prep libraries %}
Select a Biological sample whose library is to be prepped and click on Prep Libraries button at the bottom right.
{% endstep %}

{% step 2, /images/tutorials/prep-libraries-enter-details.png, Enter details %}
Select the library prep type. SSM now automatically assigns indexes to wells or tubes, depending on the format of the library prep type. Enter the plate ID. The ID has to be unique.
{% endstep %}

**Library prep type formats**

- Tube Set Up for Single Index Library Preparation Kit
{% screenshot /images/tutorials/single-index-lp-kit.png %}

<br />

- Plate Set Up for Dual Index Library Preparation Kit
{% screenshot /images/tutorials/dual-index-lp-kit.png %}

<br />

{% step 3, /images/tutorials/prep-libraries-auto-prep.png, Auto Prep %}
Click the Auto Prep button to fill the plate or tubes automatically with all samples listed.
{% endstep %}

{% callout note, NOTE %}
You can also manually drag the samples to wells or tubes:

1.	Select one or more samples. To multiselect, hold Shift. To multiselect on Firefox or Internet Explorer 9, click the well twice.
2.	Drag selected samples to a position.
3.	Check whether the indexes have been assigned to the proper samples. Hovering over a position reveals the sample that is assigned to that position. You can drag samples from position to position.

{% endcallout %}

{% step 4, /images/tutorials/prep-libraries-export.png, Export %}
Save a file of your library settings by clicking the Export button and downloading a .csv file. Use this file in the lab to indicate which biological samples get pipetted into specific wells.
{% endstep %}

When finished, do one of the following:

-	If you want to select the new plate or tubes, click the Pool Libraries button. Continue with [Pool Libraries](/articles/descriptive/pools/).

-	If you want to select multiple library preps or plates, do the following:

	a. Click the Save & Continue Later. This selection takes you to the Libraries list, with the recently created set-up at the top of the list.
	b. Select the checkboxes in the Libraries list.
	c. Click the Pool Libraries button in the top navigation bar.

{% callout note, NOTE %}
If one of your samples is not assigned to a project, you cannot continue. Select the sample, click the Set Project button, and assign it to a project. You can also generate a new project.
{% endcallout %}

{% callout troubleshoot, Nextera Rapid Capture Considerations %}
If you are performing Nextera Rapid Capture, do the following:

-	Choose Nextera Enrichment as library prep.
-	Put biological samples belonging to the same enrichment on a row next to each other.
-	Change the index in the drop-down menu to the left of the rows to the proper index, probably the same indexes for the different rows (enrichments).
-	Name your plate in such a way that makes clear multiple enrichments are on the plate, or add a note to that effect in the Note field.

{% endcallout %}