---
layout: article
title: Run Indexing QC
---

##What is it
The Indexing QC page lists count information for indexes used in the run as designated in the sample sheet. The Indexing QC is only available if the run is an index run.

{% screenshot /images/articles/runs-indexing-qc_767x338.png %}

##When to use it
Look at this page when you want to see indexing information for a lane after the index read is completed.

##When not to use it
This page only provides indexing information. Do not use it for runs that were not indexed, or to look at other primary, secondary, or tertiary analysis metrics. This information is a quick estimation and can vary slightly from final output.

##How to use it
You can select the displayed lane through the drop-down list.
The first table provides an overall summary of the indexing performance for that lane, including:

<table class="table table-bordered">
	<tr>
		<td>Total Reads</td>
		<td>The total number of reads for this lane</td>
	</tr>
	<tr>
		<td>PF Reads</td>
		<td>The total number of passing filter reads for this lane</td>
	</tr>
	<tr>
		<td>% Reads Identified (PF)</td>
		<td>The total fraction of passing filter reads assigned to an index</td>
	</tr>
	<tr>
		<td>CV</td>
		<td>The coefficient of variation for the number of counts across all indexes</td>
	</tr>
	<tr>
		<td>Min</td>
		<td>The lowest representation for any index</td>
	</tr>
	<tr>
		<td>Max</td>
		<td>The highest representation for any index</td>
	</tr>
</table>

Further information is provided regarding the frequency of individual indexes in both table and graph form. The table contains several columns, including

<table class="table table-bordered">
	<tr>
		<td>Index Number</td>
		<td>A unique number assigned to each index by BaseSpace Hub for display purposes</td>
	</tr>
	<tr>
		<td>Sample ID</td>
		<td>The sample ID assigned to an index in the sample sheet</td>
	</tr>
	<tr>
		<td>Project</td>
		<td>The project assigned to an index in the sample sheet</td>
	</tr>
	<tr>
		<td>Index 1 (I7)</td>
		<td>The sequence for the first index read</td>
	</tr>
	<tr>
		<td>Index 2 (I5)</td>
		<td>The sequence for the second index read</td>
	</tr>
	<tr>
		<td>% Reads Identified (PF)</td>
		<td>The number of reads (only includes Passing Filter reads) mapped to this index</td>
	</tr>
</table>

This information is also displayed in graphical form. In the graphical display, indexes are ordered according to the unique Index Number assigned by BaseSpace Hub.