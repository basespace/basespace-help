---
layout: article
title: How to import biological samples
hide_welcome_banner: true
---

To import new biological samples, do the following:
<br />
<br />
{% step 1, /images/articles/biological-samples-tab_767x321.png, Select Biological Samples %}
Click on the Prep tab and click on Biological samples.
{% endstep %}

{% step 2, /images/tutorials/import-samples-button.png, Click on Import %}
Click the Import button.
{% endstep %}

{% step 3, /images/tutorials/import-samples-template.png, Generate import file %}
If you have not generated an import file yet, click the template link, fill out the samples and store it in .csv file format.
{% endstep %}

{% callout note, NOTE %}
Please note the following when filling out the template:

-	User Sample ID and sample name can only exist of alphanumeric characters, dash, or underscore. Sample ID has to be unique and short; sample name can be more descriptive to provide a human-readable identifier.
-	The Organism (species) field is optional.
-	The Project field is optional, but if you do not specify it here, you must set it later, because the output data gets stored to the project.
-	Fill out the Nucleic Acid column with DNA or RNA.

{% endcallout %}

{% step 4, /images/tutorials/import-samples-preview.png, Choose file to import %}
Click the Choose File button. Browse to the import file and click Open to Import. The preview of the imported samples is shown in this screenshot.
{% endstep %}
	
When finished, do one of the following:

-	If you only want to select the newly created sample, click the Next: Prep Libraries button. Continue with [Prep Libraries](/articles/descriptive/libraries/).
-	If you want to select multiple samples, click the Save & Continue Later. This selection takes you back to the Biological Samples list, with the recently created sample at the top of the list. Continue with [Use Existing Biological Samples](/articles/tutorials/use-existing-biological-samples/).

{% screenshot /images/tutorials/biological-samples-next.png %}