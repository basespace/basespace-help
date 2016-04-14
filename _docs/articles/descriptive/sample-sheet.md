---
layout: article
title: Sample sheet
---

##What is it
The sample sheet is a comma-delimited file (SampleSheet.csv) that stores the information to set up and analyze a sequencing experiment. The file includes a list of samples and their index sequences, as well as the workflow to be employed.

	[Header]
	Date,09/11/2014
	Workflow,Amplicon
	[Manifests]
	A,truseq_amplicon_cancer_panel_manifest_afp1_pn15032433_b.txt
	[Settings]
	AnalysisName,TruSeq Amplicon v1.1 09/11/2014 4:45:37
	VariantCaller,Somatic
	IndelRepeatFilterCutoff,8
	AppVersion,1.1.0.0
	AppName,TruSeq Amplicon
	VariantAnnotation,IAS
	IAS,refseq
	AnnotationConfig,/opt/App/Plugin/IAS/ProductionAnnotateVCF.exe.config
	[Data]
	Sample_ID,Sample_Name,Manifest,GenomeFolder,RunFolder,Lane,Flowcell
	A1_NA12891_AFP1,NA12891_AFP1,A,/genomes/Homo_sapiens/UCSC/hg19/Sequence/WholeGenomeFasta,/data/scratch/workspace/10634638_S1_1,1,1

##When to use it
Every run in BaseSpace Hub requires an associated sample sheet to define projects and samples, assign indexes, and run sample sheet driven workflow apps.

##When not to use it
Not applicable; you always employ a sample sheet with BaseSpace Hub.

##How to use it
The following table is for reference purposes only. For details about creating or modifying a sample sheet, see the MiSeq Reporter User Guide, MiSeq Sample Sheet Quick Reference Guide, or HiSeq User Guide. You can create a sample sheet using the Illumina Experiment Manager Software.

**Table** :  Sample Sheet Fields

<table class="table table-bordered">
	<tr>
		<th>Row</th>
		<th>Description</th>
	</tr>
	<tr>
		<th>Investigator Name</th>
		<td>(Optional) The name of the investigator.</td>
	</tr>
	<tr>
		<th>Project Name</th>
		<td>(Optional) A descriptive name of the run.</td>
	</tr>
	<tr>
		<th>Experiment Name</th>
		<td>(Optional) A descriptive name of the experiment.</td>
	</tr>
	<tr>
		<th>Date</th>
		<td>The date the sequencing run was performed.</td>
	</tr>
	<tr>
		<th>Workflow</th>
		<td>The analysis workflow for the run.</td>
	</tr>
	<tr>
		<th>Manifests</th>
		<td>This section is only for the Amplicon workflow and is the name of the file (provided by Illumina or created by IEM) used in the Amplicon Workflow. It is required for the Amplicon workflow and ignored by other workflows. The file specifies the alignments to a reference and the targeted reference regions used in the Amplicon workflow.</td>
	</tr>
	<tr>
		<th>Site Reports</th>
		<td>This section is optional and only for the Resequencing and Custom Amplicon workflows. Each line below the SiteReports section header is the name of a SiteReport Input File. This file designates positions on a given chromosome to report the genotype found at that position.</td>
	</tr>
	<tr>
		<th>Data</th>
		<td>
			<ul>
				<li>Contaminants – The path to the folder containing FASTA files of contaminants (used only for SmallRNA)</li>
				<li>GenomePath – The reference genome folder containing the FASTA files to be used in the alignment step</li>
				<li>Index – Represents the sequence string of the first index. Valid characters in this string are A, C, G, T, and N. 'N' matches any base.</li>
				<li>Index2 – Represents the sequence string of the second index. Valid characters in this string are A,C,G,T, and N. 'N' matches any base.</li>
				<li>MiRNA – The path to the folder containing FASTA files of mature miRNAs (used only for SmallRNA)</li>
				<li>RNA – The path to the folder containing FASTA files of small RNAs (used only for SmallRNA)</li>
				<li>SampleID – A string identifier for the sample, which is usually a bar code but can have any value. Letters and numbers only; some special characters can be detrimental for file creation.</li>
				<li>Manifest – The manifest file letter as designated by the manifest field.</li>
				<li>Name – A string identifier for the sample, which is used in the reporting web page.</li>
			</ul>
		</td>
	</tr>
</table>