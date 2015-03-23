---
layout: article
title: Isaac App Results page
---

The Isaac App Results Page consists of three panes.

##Isaac Alignment Statistics

Isaac Alignment Statistics display alignment information for the sample.

<table border="1">
	<tr>
		<th>Column</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Number of Reads</td>
		<td>Isaac Alignment Statistics display alignment information for the sample</td>
	</tr>
	<tr>
		<td>Coverage</td>
		<td>Median coverage (number of bases aligned to a given reference position) averaged over all positions.</td>
	</tr>
	<tr>
		<td>Fragment Length Median</td>
		<td>The median fragment length for the sample.</td>
	</tr>
	<tr>
		<td>Fragment Length Standard Deviation</td>
		<td>The standard deviation of the fragment length for the sample</td>
	</tr>
	<tr>
		<td>Aligned %</td>
		<td>The total count of PF clusters aligning for the sample (Read 1/Read 2)</td>
	</tr>
	<tr>
		<td>Mismatch</td>
		<td>The percentage mismatch to reference averaged over cycles per read (Read 1/Read 2)</td>
	</tr>
</table>

---

##Isaac Variants Statistics

The variants table shows three tables of variant statistics, for Single Nucleotide Variants (SNVs), insertions, and deletions. The rows contain the following information.

<table border="1">
	<tr>
		<th>Column</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Total number</td>
		<td>Total numbers of the specific variant.</td>
	</tr>
	<tr>
		<td>Het/Hom Ratio</td>
		<td>The ratio between heterozygote and homozygote variants.</td>
	</tr>
	<tr>
		<td>% in dbSNP 131</td>
		<td>The percentage of the specific variants found in dbSNP 131</td>
	</tr>
	<tr>
		<td>Transitions / Transversions</td>
		<td>The ratio of transitions (A-G or C-T changes) to transversions (other changes)</td>
	</tr>
</table>

---

##Isaac Coverage Graph

<table border="1">
	<tr>
		<th>Y Axis</th>
		<th>X Axis</th>
		<th>Description</th>
	</tr>
	<tr>
		<td># Reference Bases</td>
		<td>Read Depth</td>
		<td>The coverage graph shows the number of bases that are covered at each read depth</td>
	</tr>
</table>