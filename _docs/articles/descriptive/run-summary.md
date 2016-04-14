---
layout: article
title: Description of the Run Summary section for a Sequencing Run
---
-----------------------

# Run Summary

The Run Summary page can be accessed by first selecting a Run in BaseSpace Hub then clicking on the **Run Summary** button in the left-hand navigation pane.

{% screenshot /images/articles/runs-summary_767x366.png %}

## What is it?
The Run Summary page shows tables with basic data quality metrics that are summarized per lane and per read. All the statistics are given as means and standard deviations over the tiles used in the lane.

## When to use it.
When looking at basic data quality metrics for a run from primary analysis.

## When not to use it.
The tables do not contain information about samples or projects. The tables also do not contain app-generated information (secondary or tertiary analysis).

## How to use it.

The following metrics are displayed in the top table, split out by read and total:

<table class="table table-bordered">
  <tr>
    <td>Level</th>
    <td>The sequencing read number</th>
  </tr>
  <tr>
    <td>Cycles</td>
    <td>The number of cycles in the read</td>
  </tr>
  <tr>
    <td>Yield Total</td>
    <td>The number of bases sequenced, which is updated as the Run progresses</td>
  </tr>
  <tr>
    <td class=>Projected Total Yield</td>
    <td class=>The projected number of bases expected to be sequenced at the end of the Run</td>
  </tr>
  <tr>
    <td>Yield Perfect</td>
    <td>The number of bases in reads that align perfectly, as determined by alignment to PhiX of reads derived from a spiked in PhiX control sample. If no PhiX control sample is run in the lane, this chart is not available</td>
  </tr>
  <tr>
    <td>Yield &lt;=3 errors</td>
    <td>The number of bases in reads that align with three errors or less, as determined by a spiked in PhiX control sample. If no PhiX control sample is run in the lane, this chart is not available, and shows a zero value. This value is not calculated for NextSeq two-channel sequencing, and the value shown is always zero</td>
  </tr>
  <tr>
    <td>Aligned</td>
    <td>The percentage of the sample that aligned to the PhiX genome, which is determined for each level or read independently</td>
  </tr>
  <tr>
    <td>% Perfect [Num Usable Cycles]</td>
    <td>The percentage of bases in reads that align perfectly, as determined by a spiked in PhiX control sample, at the cycle indicated in the brackets. If no PhiX control sample is run in the lane, this chart shows 0% and the number of cycles used. This value is not calculated for NextSeq two-channel sequencing, and the value shown is always zero</td>
  </tr>
  <tr>
    <td>% &lt;=3 errors [Num Usable Cycles]</td>
    <td>The percentage of bases in reads that align with three errors or less, as determined by a spiked in PhiX control sample, at the indicated cycle. If no PhiX control sample is run in the lane, this chart shows 0% and the number of cycles used. This value is not calculated for NextSeq two-channel sequencing, and the value shown is always zero</td>
  </tr>
  <tr>
    <td>Error Rate</td>
    <td>The calculated error rate of the reads that aligned to PhiX</td>
  </tr>
  <tr>
    <td>Intensity Cycle 1</td>
    <td>The average of the A channel intensity measured at the first cycle averaged over filtered clusters</td>
  </tr>
  <tr>
    <td>% Intensity Cycle 20</td>
    <td>The corresponding intensity statistic at cycle 20 as a percentage of that value at the first cycle. 100%x(Intensity at cycle 20)/(Intensity at cycle 1)</td>
  </tr>
  <tr>
    <td>%Q&gt;=30</td>
    <td>The corresponding intensity statistic at cycle 20 as a percentage of that value at the first cycle. 100%x(Intensity at cycle 20)/(Intensity at cycle 1).</td>
  </tr>
</table>


The following metrics are available in the Read tables, split out by lane:

<table class="table table-bordered">
  <tr>
    <td>Tiles</th>
    <td>The number of tiles per lane</th>
  </tr>
  <tr>
    <td>Density</td>
    <td>The density of clusters (in thousands per mm2) detected by image analysis, +/- one standard deviation.</td>
  </tr>
  <tr>
    <td>Clusters PF</td>
    <td>The percentage of clusters passing filtering, +/- one standard deviation.</td>
  </tr>
  <tr>
    <td>Phasing/Prephasing</td>
    <td>The value used by RTA for the percentage of molecules in a cluster for which sequencing falls behind (phasing) or jumps ahead (prephasing) the current cycle within a read.<br><br>For MiSeq and NextSeq, RTA generates phasing and prephasing estimates empirically for every cycle. The value displayed here is therefore not used in the actual phasing/prephasing calculations, but is an aggregate value determined from the first 25 cycles. For most applications, the value reported is very close to the value that is applied. For low diversity samples or samples with unbalanced base composition, the reported value can diverge from the values being applied because the value changes from cycle to cycle.</td>
  </tr>
  <tr>
    <td>Reads</td>
    <td>The number of clusters (in millions).</td>
  </tr>
  <tr>
    <td>Reads PF</td>
    <td>The number of clusters (in millions) passing filtering.</td>
  </tr>
  <tr>
    <td>%Q&gt;=30</td>
    <td>The percentage of bases with a quality score of 30 or higher, respectively. This chart is generated after the 25th cycle, and the values represent the current cycle.</td>
  </tr>
  <tr>
    <td>Yield</td>
    <td>The number of bases sequenced which passed filter.</td>
  </tr>
  <tr>
    <td>Cycles Err Rated</td>
    <td>The number of cycles that have been error rated using PhiX, starting at cycle 1.</td>
  </tr>
  <tr>
    <td>Aligned</td>
    <td>The percentage that aligned to the PhiX genome.</td>
  </tr>
  <tr>
    <td>Error Rate</td>
    <td>The calculated error rate, as determined by the PhiX alignment. Subsequent columns display the error rate for cycles 1–35, 1–75, and 1–100.</td>
  </tr>
  <tr>
    <td>Intensity Cycle 1</td>
    <td>The average of the A channel intensity measured at the first cycle averaged over filtered clusters.</td>
  </tr>
  <tr>
    <td>%Intensity Cycle 20</td>
    <td>The corresponding intensity statistic at cycle 20 as a percentage of that value at the first cycle. 100%x(Intensity at cycle 20)/(Intensity at cycle 1).</td>
  </tr>
</table>