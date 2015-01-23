---
layout: article
title: How to pool Libraries
hide_welcome_banner: true
---

The Pool Libraries page allows you to pool samples and sequence them in the same run, using the same analysis parameters.
<br />
<br />
{% step 1, /images/tutorials/pool-runs-step1.png, Create Pools %}
Fill out the first pool ID. Pool ID has to be unique. If needed, you can create additional pools on the right by clicking the + Add Pool button and filling out the pool IDs.

-	Colors of the wells correspond to the colors of the pools.
-	You can hover over the wells to see the library IDs.

{% endstep %}

{% step 2, /images/tutorials/pool-runs-drag-drop.png, Add Samples %}
Drag and drop individual samples from their well on the plate to a pool. You can multiselect by holding Shift. To multiselect on Firefox or Internet Explorer 9, click the well twice.
{% endstep %}

{% step 3, /images/tutorials/pool-runs-step3.png, Choose multiple samples %}
If you want to pool libraries from multiple plates, use the Plate drop-down menu to specify the plate.
{% endstep %}

{% callout note, NOTE %}
You can also merge pools the following way:

- Select the checkboxes in the Pools list.
- Click the Merge Pools button in the top navigation bar.

{% endcallout %}

{% step 4, /images/tutorials/pool-runs-next.png, Plan Runs %}
When finished, do one of the following:

- Click the Save & Continue Later. This selection takes you to the Pools list, with the recently created plate at the top of the list. 
- Click the Plan Run button.
{% endstep %}

{% callout troubleshoot, Nextera Rapid Capture Considerations %}
If you are performing Nextera Rapid Capture, make sure to assign only samples from the same enrichment to one pool, and note it in the pool name.
{% endcallout %}
