---
layout: article
title: How to import Libraries
hide_welcome_banner: true
---

To import new Libraries, do the following:
<br />
<br />
{% step 1, /images/tutorials/prep-libraries-tab.png, Select libraries %}
Click on the Prep tab and click on Libraries.
{% endstep %}

{% step 2, /images/tutorials/prep-libraries-import.png, Click on Import %}
Click the Import button.
{% endstep %}

{% step 3, /images/tutorials/import-sample-libraries-template.png, Generate and import file %}
If you have not generated an import file yet, click the template link, fill out the samples and store it in .csv file format. Click the Choose File button. Browse to the import file and click Open to Import. 
{% endstep %}

{% callout note, NOTE %}
Please note the following when filling out the template:

-	User Sample ID and sample name can only exist of alphanumeric characters, dash, or underscore. Sample ID has to be unique and short; sample name can be more descriptive to provide a human-readable identifier.
-	The Species field is optional.
-	The Project field is optional, but if you do not specify it here, you must set it later, because the output data gets stored to the project.
-	Fill out the Nucleic Acid column with DNA or RNA

{% endcallout %}

When finished, do one of the following:

-	If you only want to select the newly created samples, click the Pool Libraries button. Continue with [Pool Libraries](/articles/descriptive/pool-libraries/).
-	If you want to select other libraries, click the Save & Continue Later. This selection takes you back to the Libraries list, with the recently created sample at the top of the list.

{% screenshot /images/tutorials/libraries-next.png %}