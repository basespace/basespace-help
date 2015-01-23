---
layout: article
title: How to requeue analysis for Run 
hide_welcome_banner: true
---

To set up a new analysis for requeue is also nothing but fixing a Sample sheet. This option is often used to fix errors in the sample sheet, to change analysis parameters and to change indexing details. Errors in the sample sheet can prevent BaseSpace from processing a run. This option allows BaseSpace to finish the analysis.The first analysis was suboptimal. You can resubmit the sample sheet and requeue the run with new analysis parameters one time.	The index settings for samples were wrong. This option allows you to correct the settings.

{% callout note, NOTE %}
You can only submit a corrected sample sheet and requeue the run one time.
{% endcallout %}
<br />

{% step 1, /images/tutorials/requeue-analysis-for-run-selector_1240x331.png, Choose Run %}
Go to 'Runs' page and if a run has a 'Needs Attention' state, open the run. Or, open the run which needs fixing in a sample sheet.
{% endstep %}

{% step 2, /images/tutorials/requeue-fix-sample-sheet-link_885x348.png, Click on Fix Sample sheet %}
A run can have a Needs Attention state. Click the Fix Sample Sheet link.
{% endstep %}

**Alternatively**,

{% step 2, /images/tutorials/requeue-fix-sample-sheet-link-alternate_796x402.png, Click on Fix Sample sheet %}
Go to a run, select the More drop-down list, and then select Fix Sample Sheet.
{% endstep %}

{% step 3, /images/tutorials/requeue-fix-sample-sheet-edit-options_1351x461.png, Edit Sample sheet %}
The Fix Sample Sheet page opens. If BaseSpace has detected an error, it shows the issue above the black sample sheet editor. Depending on the complexity of the change, you have two options:
	1. Easy fix: edit the sample sheet in the sample sheet editor. BaseSpace keeps validating the sample sheet as you edit; any remaining issues are displayed above the sample sheet editor.
	2. More complex change: use Illumina Experiment Manager (IEM).
{% endstep %}

If you have not installed IEM yet, click the Illumina Experiment Manager (IEM) link, and install IEM.

- Open IEM.
- Import the original sample sheet from your system in IEM and edit it, or generate a new sample sheet. See the Illumina Experiment Manager User Guide for instructions.
- Copy and paste the sample sheet into the Sample Sheet Editor in BaseSpace.
BaseSpace validates the sample sheet; any issues are displayed above the sample sheet editor.

<br />

{% step 4, /images/tutorials/requeue-analysis-success-notification_475x101.png, Success Notification %}
When you are done editing and the sample sheet is valid, click the Queue Analysis button, and BaseSpace starts analyzing the run using the new sample sheet. You can only resubmit a sample sheet and requeue the run one time.
{% endstep %}

{% callout troubleshoot, Troubleshooting %}
If your edits result in an invalid sample sheet, the Queue Analysis button is not available. You can return to the original using the Load Original button.
{% endcallout %}

{% callout code, Path code %}
If a sample sheet is invalid, it could be because the genome path is not set up correctly. This situation is indicated through the Genome Path Unknown Genome warning (as in the example). The paths of the standard BaseSpace genomes have to conform to the following relative paths:

	Arabidopsis_thaliana\NCBI\build9.1\Sequence\WholeGenomeFASTA
	Bos_taurus\Ensembl\UMD3.1\Sequence\WholeGenomeFASTA
	Escherichia_coli_K_12_DH10B\NCBI\2008-03-17\Sequence\WholeGenomeFASTA
	Homo_sapiens\UCSC\hg19\Sequence\WholeGenomeFASTA
	Mus_musculus\UCSC\mm9\Sequence\WholeGenomeFASTA
	PhiX\Illumina\RTA\Sequence\WholeGenomeFASTA
	Rattus_norvegicus\UCSC\rn4\Sequence\WholeGenomeFASTA
	Saccharomyces_cerevisiae\UCSC\sacCer2\Sequence\WholeGenomeFASTA
	Staphylococcus_aureus_NCTC_8325\NCBI\2006-02-13\Sequence\WholeGenomeFASTA

{% endcallout %}