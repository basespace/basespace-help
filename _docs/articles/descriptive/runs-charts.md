---
layout: article
title: Understanding Run Charts in BaseSpace Hub
hide_welcome_banner: true
---
-----------------------

# Runs Charts

This article covers the different charts found in the **Charts** section for a Run.  The charts are updated in real-time as the Run is sequenced on the machine and streamed up to BaseSpace Hub, they allow you to easily monitor your Run's quality.  There are five charts that are available in the Runs Charts section:

* Flow Cell Chart
* Data by Cycle Plot
* QScore Distribution Plot
* Data by Lane Plot
* QScore Heatmap

Each of these charts will be described in detail below.  You can expand any chart by clicking the expand button. 

## Flow Cell Chart

**What is it?**

The Flow Cell Chart shows color-coded graphical quality metrics per tile for the entire flow cell.

{% screenshot /images/articles/flowcell-chart.png %}

**When to use it.**

Use the Flow Cell Chart to judge local differences per cycle, per lane, or per read in sequencing metrics on a flow cell. It is also an easy way to see the %Q30 metric, which is an excellent single metric to judge a run.

**When not to use it.**

Do not use the Flow Cell Chart to look at secondary or tertiary analysis metrics.

**How to use it.**

The Flow Cell Chart has the following features:

* You can select the displayed metric, surface, cycle, and base through the drop-down lists.
* The color bar to the right of the chart indicates the values that the colors represent.
* The chart is displayed with tailored scaling by default.
* Tiles that have not been measured or are not monitored are gray.

You can monitor the following quality metrics with this chart:

<table class="table table-bordered">
  <tr>
    <td><b>Intensity</b></td>
    <td>This chart shows the intensity by color and cycle of the 90% percentile of the data for each tile.</td>
  </tr>
  <tr>
    <td><b>FWHM</b></td>
    <td>The average full width of clusters at half maximum (in pixels). Used to display focus quality.</td>
  </tr>
  <tr>
    <td><b>% Base</b></td>
    <td>The percentage of clusters for which the selected base (A, C, T, or G) has been called.</td>
  </tr>
  <tr>
    <td><b>%Q>20, %Q>30</b></td>
    <td>The percentage of bases with a quality score of > 20 or > 30, respectively. These charts are generated after the 25<sup>th</sup> cycle, and the values represent the current scored cycle.</td>
  </tr>
  <tr>
    <td><b>Median Q-Score</b></td>
    <td>The median Q-Score for each tile over all bases for the current cycle. These charts are generated after the 25<sup>th</sup> cycle. This plot is best used to examine the Q-scores of your run as it progresses. Bear in mind that the %Q30 plot can give an over simplified view due to its reliance on a single threshold.</td>
  </tr>
  <tr>
    <td><b>Density</b></td>
    <td>The density of clusters for each tile (in thousands per mm<sup>2</sup>).</td>
  </tr>
  <tr>
    <td><b>Density PF</b></td>
    <td>The density of clusters passing filter for each tile (in thousands per mm<sup>2</sup>).</td>
  </tr>
  <tr>
    <td><b>Clusters</b></td>
    <td>The number of clusters for each tile (in millions).</td>
  </tr>
    <tr>
    <td><b>Clusters PF</b></td>
    <td>The number of clusters passing filter for each tile (in millions).</td>
  </tr>
  <tr>
    <td><b>Error Rate</b></td>
    <td>The calculated error rate, as determined by a spiked in PhiX control sample. If no PhiX control sample is run in the lane, this chart is not available.</td>
  </tr>
  <tr>
    <td><b>% Phasing, %Prephasing</b></td>
    <td>The estimated percentage of molecules in a cluster for which sequencing falls behind (phasing) or jumps ahead (prephasing) the current cycle within a read.</td>
  </tr>
  <tr>
    <td><b>% Aligned</b></td>
    <td>The percentage of reads from clusters in each tile that aligned to the PhiX genome.</td>
  </tr>
  <tr>
    <td><b>Perfect Reads</b></td>
    <td>The percentage of reads that align perfectly, as determined by a spiked in PhiX control sample. If no PhiX control sample is run in the lane, this chart is all gray.</td>
  </tr>
  <tr>
    <td><b>Corrected Intensity</b></td>
    <td>The intensity corrected for cross talk between the color channels by the matrix estimation and phasing and prephasing.</td>
  </tr>
  <tr>
    <td><b>Called Intensity</b></td>
    <td>The intensity for the called base.</td>
  </tr>
  <tr>
    <td><b>Signal to Noise</b></td>
    <td>The signal to noise ratio is calculated as mean called intensity divided by standard deviation of non-called intensities.</td>
  </tr>
</table>

{% callout note, Note %} There are variable scales used on these different parameters. {% endcallout %}

## Data by Cycle Plot

**What is it?**

The Data by Cycle plot shows the progression of quality metrics during a run as a line graph.

{% screenshot /images/articles/data-by-cycle-plot.png %}

**When to use it.**

Use the Data By Cycle Plot to judge the progression of quality metrics during a run on a cycle by cycle basis.

**When not to use it.**

Do not use the Data By Cycle Plot to look at secondary or tertiary analysis metrics, or aggregate analysis for a whole lane regardless of cycle.

**How to use it.**

The Data by Cycle plots allow you to follow the progression of quality metrics during a run. These plots have the following features:

* You can select the displayed metric and base through the drop-down lists.
* The symbol in the top right-hand corner toggles the plot between pane view and full screen view.

You can monitor the following quality metrics with this table:

<table class="table table-bordered">
  <tr>
    <td><b>Intensity</b></td>
    <td>This chart shows the intensity by color and cycle of the 90% percentile of the data for each tile.</td>
  </tr>
  <tr>
    <td><b>FWHM</b></td>
    <td>The average full width of clusters at half maximum (in pixels). Used to display focus quality.</td>
  </tr>
    <tr>
    <td><b>% Base</b></td>
    <td>The percentage of clusters for which the selected base (A, C, T, or G) has been called.</td>
  </tr>
    <tr>
    <td><b>%Q>20, %Q>30</b></td>
    <td>The percentage of bases with a quality score of > 20 or > 30, respectively. These charts are generated after the 25<sup>th</sup> cycle, and the values represent the current scored cycle.</td>
  </tr>
    <tr>
    <td><b>Median Q-Score</b></td>
    <td>The median Q-Score for each tile over all bases for the current cycle. These charts are generated after the 25<sup>th</sup> cycle. This plot is best used to examine the Q-scores of your run as it progresses. Bear in mind that the %Q30 plot can give an over simplified view due to its reliance on a single threshold.</td>
  </tr>
    <tr>
    <td><b>Error Rate</b></td>
    <td>The calculated error rate, as determined by a spiked in PhiX control sample. If no PhiX control sample is run in the lane, this chart is not available.</td>
  </tr>
    <tr>
    <td><b>Perfect Reads</b></td>
    <td>The percentage of reads that align perfectly, as determined by a spiked in PhiX control sample. If no PhiX control sample is run in the lane, this chart is all gray.</td>
  </tr>
    <tr>
    <td><b>Corrected Intensity</b></td>
    <td>The intensity corrected for cross talk between the color channels by the matrix estimation and phasing and prephasing.</td>
  </tr>
    <tr>
    <td><b>Called Intensity</b></td>
    <td>The intensity for the called base.</td>
  </tr>
    <tr>
    <td><b>Signal to Noise</b></td>
    <td>The signal to noise ratio is calculated as mean called intensity divided by standard deviation of non-called intensities.</td>
  </tr>                  
</table>

You can expand a chart by clicking the expand button.

## QScore Distribution Chart

**What is it?**

The QScore Distribution Plot shows a bar graph that allows you to view the number of bases by quality score. The quality score is cumulative for current cycle and previous cycles, and only bases from reads that pass the quality filter are included.

{% screenshot /images/articles/qscore-distribution-chart.png %}

**When to use it.**

Use it to judge the QScore distribution for a run, which is an excellent indicator for run performance.

**When not to use it.**

Do not use the QScore Distribution Plot to look at secondary or tertiary analysis metrics, or metrics other than quality scores.

**How to use it.**

The QScore Distribution pane shows plots that allow you to view the number of reads by quality score. The quality score is cumulative for current cycle and previous cycles, and only reads that pass the quality filter are included.

These plots have the following features:

* You can select the displayed read, and cycle through the drop-down lists.
* The symbol in the top right-hand corner toggles the plot between pane view and full screen view.

The QScore is based on the Phred scale. The following list shows Q-scores and the corresponding chance that the base call is wrong:

* Q10: 10% chance of wrong base call
* Q20: 1% chance of wrong base call
* Q30: 0.1% chance of wrong base call
* Q40: 0.01% chance of wrong base call

You can slide the threshold (set at >=Q30 by default) to examine the proportion of bases at or above any particular Q-score. When using Q-score binning, this plot reflects the subset of Q-scores used.

## Data by Lane Plot

**What is it?**

The Data by Lane plots allow you to view quality metrics per lane.

{% screenshot /images/articles/data-by-lane-chart.png %}

**When to use it.**

Use the Data By Lane Plot to judge the difference in quality metrics between lanes.

**When not to use it.**

Do not use the Data By Lane Plot to look at secondary or tertiary analysis metrics.

**How to use it.**

The Data by Lane plots have the following features:

* You can select the displayed metric through the drop-down lists.
* The symbol in the top right-hand corner toggles the plot between pane view and full screen view.

The plots share a number of characteristics:

* The plots show the distribution of mean values for a given parameter across all tiles in a given lane.
* The red line indicates the median tile value for the parameter displayed.
* Blue boxes are for raw clusters, green boxes for clusters passing filter.
* The box outlines the interquartile range (the middle 50% of the data) for the tiles analyzed for the data point.
* The error bars delineate the minimum and maximum without outliers.
* The outliers are the values that are more than 1.5 times the interquartile range below the 25<sup>th</sup> percentile, or more than 1.5 times the interquartile range above the 75<sup>th</sup> percentile. Outliers are indicated as dots.

You can monitor the following quality metrics with this plot:

* The density of clusters for each tile (in thousands per mm2).
* The number of clusters for each tile (in millions).
* The estimated percentage of molecules in a cluster for which sequencing falls behind (phasing) or jumps ahead (prephasing) the current cycle within a read.
* The percentage of reads from clusters in each tile that aligned to the PhiX genome.

You can expand a chart by clicking the expand button. 

## QScore Heatmap

**What is it?**

A heatmap of the Q-scores.

{% screenshot /images/articles/qscore-heatmap.png %}

**When to use it.**

For a quick overview of the Q-scores over the cycles.

**When not to use it.**

Do not use the QScore Distribution Plot to look at secondary or tertiary analysis metrics, or metrics other than quality scores.

**How to use it.**

The QScore Heatmap shows plots that allow you to view the QScore by cycle. These plots have the following features:

* The color bars to the right of each chart indicate the values that the colors represent. The charts are displayed with tailored scaling; the scale is always 0 to 100% of maximum value.
* The symbol in the top right-hand corner toggles the plot between pane view and full screen view.

You can expand a chart by clicking the expand button. 