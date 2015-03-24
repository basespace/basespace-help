---
layout: article
title: Instrument/Sample-Sheet Workflow Graphs
---

The workflow graphs provide metrics that allow you to judge the success of the sequencing run for that sample. The following topics provide information about these charts.

---
##Low Percentage Graph

###What is it
The workflow graphs provide metrics that allow you to judge the success of the sequencing run for that sample. The following topics provide information about these charts.
{% screenshot /images/articles/prep-tab_121x128.png %}
You can expand a chart by clicking the expand button at the top right corner. 

###When to use it
Use the Low Percentage Graph to judge sequencing metrics for a sample. This graph can also be used when troubleshooting unexpected results.

###When not to use it
This graph is not a good predictor of yields or quality of final results.

###How to use it
<table border="1">
	<tr>
		<th>Metric</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Phasing 1</td>
		<td>The percentage of molecules in a cluster that fall behind the current cycle within Read 1.</td>
	</tr>
	<tr>
		<td>Phasing 2</td>
		<td>The percentage of molecules in a cluster that fall behind the current cycle within Read 2.</td>
	</tr>
	<tr>
		<td>PrePhasing 1</td>
		<td>The percentage of molecules in a cluster that run ahead of the current cycle within Read 1.</td>
	</tr>
	<tr>
		<td>PrePhasing 2</td>
		<td>The percentage of molecules in a cluster that run ahead of the current cycle within Read 2.</td>
	</tr>
	<tr>
		<td>Mismatch 1</td>
		<td>The average percentage of mismatches for Read 1 over all cycles.</td>
	</tr>
	<tr>
		<td>Mismatch 2</td>
		<td>The average percentage of mismatches for Read 2 over all cycles.</td>
	</tr>
</table>

---

##High Percentage Graph

###What is it
The High Percentage Graph represents run statistics that are generally near 100% in an ideal run. These graphs are metrics of the sequencing run or the analysis step.
{% screenshot /images/articles/prep-tab_121x128.png %}
You can expand a chart by clicking the expand button at the top right corner. 

###When to use it
Use the High Percentage Graph to judge sequencing metrics for a sample. This graph can also be used when troubleshooting unexpected results.

###When not to use it
Do not use the High Percentage Graph to look at tertiary analysis metrics.

###How to use it
<table border="1">
	<tr>
		<th>Metric</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>|20/|1 1</td>
		<td>The ratio of intensities at cycle 20 to the intensities at cycle 1 for Read 1.</td>
	</tr>
	<tr>
		<td>|20/|1 2</td>
		<td>The ratio of intensities at cycle 20 to the intensities at cycle 1 for Read 2.</td>
	</tr>
	<tr>
		<td>Align 1</td>
		<td>The percentage of clusters that aligned to the reference in Read 1.</td>
	</tr>
	<tr>
		<td>Align 2</td>
		<td>The percentage of clusters that aligned to the reference in Read 2.</td>
	</tr>
	<tr>
		<td>PE Orienation</td>
		<td>The percentage of paired-end alignments with the expected orientation.</td>
	</tr>
	<tr>
		<td>PE Resynthesis</td>
		<td>The ratio of first cycle intensities for Read 1 to first cycle intensities for Read 2.</td>
	</tr>
	<tr>
		<td>PF</td>
		<td>The percentage of clusters passing filters.</td>
	</tr>
</table>

---

##Clusters Graph

###What is it
The Clusters graph provides information about the number of clusters that are detected during sequencing, split out by the following groups:

- Total
- Passing filter
- Unaligned
- Unindexed
- Duplicates

{% screenshot /images/articles/prep-tab_121x128.png %}
You can expand a chart by clicking the expand button at the top right corner.

###When to use it
Use the Clusters Graph to judge clustering success and relative cluster density between lanes (for flow cells with multiple lanes), and as a snap shot of the overall run. Can assist with identifying overclustering issues.

###When not to use it
Do not use the Clusters Graph to look at tertiary analysis metrics.

###How to use it
A cluster represents a clonal spot on the flow cell that contains the amplified DNA strands to be sequenced.

<table border="1">
	<tr>
		<th>X axis</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Raw</td>
		<td>The total number of clusters detected in the run.</td>
	</tr>
	<tr>
		<td>PF</td>
		<td>The total number of clusters passing filter in the run.</td>
	</tr>
	<tr>
		<td>Unaligned</td>
		<td>The total number of clusters passing filter that did not align to the reference genome, if applicable. Clusters that are unindexed are not included in the unaligned count.</td>
	</tr>
	<tr>
		<td>Unindexed</td>
		<td>The total number of clusters passing filter that were not associated with any index sequence in the run.</td>
	</tr>
	<tr>
		<td>Duplicate</td>
		<td>The total number of clusters for a paired-end sequencing run that are considered to be PCR duplicates. PCR duplicates are defined as two clusters from a paired-end run where both clusters have the exact same alignment positions for each read.</td>
	</tr>
</table>

---

##Mismatch Graph

###What is it
The Mismatch Graph plots the mismatches between a sequence read and a reference genome after alignment.

{% screenshot /images/articles/prep-tab_121x128.png %}
You can expand a chart by clicking the expand button at the top right corner.

###When to use it
To judge the quality of the sequencing run. Poor sequencing runs usually lead to high numbers of mismatches.

###When not to use it

- When you are using a reference genome that has many errors or low confidence stretches.
- When sample and reference differ too much.
- In de novo applications.
- In Methyl-Seq applications

###How to use it

Mismatch refers to any mismatch between sequence read and a reference genome after alignment.

- Cycle: Plots the % mismatches for all clusters in a run versus cycle

Mismatches can be due to two main causes:

-	Sequencing errors (non-specific, random)
-	Differences between your sample and the reference genomes

Make sure to keep in mind these causes when interpreting the mismatch rates.

---

##Trimmed Lengths

<table border="1">
	<tr>
		<th>Y axis</th>
		<th>X axis</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Clusters</td>
		<td>Trimmed Lengths</td>
		<td>Histogram of reads indicating length at trimming because they reached adapter.</td>
	</tr>
</table>


