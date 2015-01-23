---
layout: article
title: How to plan runs
hide_welcome_banner: true
---

On the Planned Runs page, you can set up the parameters for the sequencing run on your NextSeq instrument following the steps below.
<br />
<br />
{% step 1, /images/tutorials/plan-runs-step1.png, Enter Run information %}

- Enter a name for your planned run.
- [Optional] Enter the reagent barcode you plan to use, which links a reagent kit to this run.

{% endstep %}

{% step 2, /images/tutorials/plan-runs-step2.png, Enter Cycles information %}

- Fill out the Enter Cycles section:
- Single-end vs. paired-end
- Number of cycles per read

{% endstep %}

{% step 3, /images/tutorials/plan-runs-step3.png, Verify Review Indexes %}

Verify the Review Indexes section for the indexing strategy. 

- For indexing, it is set according to the index/library prep type chosen previously. If you choose to override this default indexing scheme, you are required to select the Index type (Single, Dual, or No Index). Make sure that you enter the number of index cycles accordingly. If you have selected multiple libraries, you cannot specify No Index.
- SSM automatically checks if the indexes chosen all start with two Gs; if so, it warns you that you should change your index strategy.
- Verify the pool that is included in the planned run.

{% endstep %}

{% step 4, /images/tutorials/plan-runs-step4.png, Complete and Proceed %}
When your settings are complete, choose one of these options to continue:

- Click the Sequence button, which opens the Planned Runs list, and sets the state of the recently planned run to Ready to Sequence.
- Click the Save & Continue Later button, which opens the Planned Runs list, and sets the state of the recently planned run to Planning.

{% endstep %}

{% callout note, NOTE %}
A planned run must be in the Ready to Sequence state in order for it to show up in the Planned Runs list in the control software on the instrument.
If you want to change a planned run to the Ready to Sequence state, select the planned run from the list. Click the Sequence arrow link in the top navigation bar on the Planned Runs list page.
{% endcallout %}

{% screenshot /images/tutorials/plan-runs-sequence.png %}

Your run now shows up in the Planned Runs list in the control software on your NextSeq sequencing system. Complete the run from your sequencing instrument. A sample sheet is not required. SSM automatically generates FASTQ files when the sequencing run is complete.

{% callout note, Tip %}
You can connect as many instruments as you have SSM nodes installed, up to a maximum of six.
{% endcallout %}

