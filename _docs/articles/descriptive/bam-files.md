---
layout: article
title: BAM files
---

##What is it
The Sequence Alignment/Map (SAM) format is a generic alignment format for storing read alignments against reference sequences, supporting short and long reads (up to 128 Mb) produced by different sequencing platforms. SAM is a text format file that is human-readable. The Binary Alignment/Map (BAM) keeps the same information as SAM, but in a compressed, binary format that is only machine readable.

##When to use it
Allows you to see alignments. Use it for direct interpretation or as a starting point for tertiary analysis with downstream analysis tools that are compatible with BAM. BAM files are suitable for viewing with an external viewer such as IGV or the UCSC Genome Browser.

##When not to use it
Do not use it with tools that are not compatible with the BAM format. Do not use with applications that cannot handle large files, as BAM files can get large, depending on the application and data.

##How to use it
If you use an app in BaseSpace Hub that uses BAM files as input, the app locates the file when launched. If using BAM files in other tools, download the file to use it in the external tool.

##Detailed Description
Go to [this link](http://samtools.github.io/hts-specs/SAMv1.pdf) to see the exact SAM specification.