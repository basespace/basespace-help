---
layout: article
title: VCF files
---

##Introduction

###What is it
VCF is a text file format that contains information about variants found at specific positions in a reference genome. The file format consists of meta-information lines, a header line, and then data lines. Each data line contains information about a single variant.

###When to use it
Use it for direct interpretation or as a starting point for tertiary analysis with downstream analysis that is compatible with VCF, such as IGV or the UCSC Genome Browser.

###When not to use it
Do not use it with tools that are not compatible with the VCF format.
{% callout note, NOTE %}
Windows recognizes VCF files as an Outlook contact file. Do not open VCF files in Outlook.
{% endcallout %}

###How to use it
If you use an app in BaseSpace Hub that uses VCF files as input, the app locates the file when launched. If using VCF files in other tools, download the file to use it in the external tool.

---
##Detailed Description
The file naming convention for VCF files is as follows: SampleName_S#.vcf (where # is the sample number determined by ordering in the sample sheet).

The header of the VCF file describes the tags used in the remainder of the file and has the column header:

	##fileformat=VCFv4.1
	##fileDate=20120317
	##source=SequenceAnalysisReport.vshost.exe
	##reference=
	##phasing=none
	##INFO=<ID=DP,Number=1,Type=Integer,Description="Total Depth">
	##INFO=<ID=TI,Number=.,Type=String,Description="Transcript ID">
	##INFO=<ID=GI,Number=.,Type=String,Description="Gene ID">
	##INFO=<ID=CD,Number=0,Type=Flag,Description="Coding Region">
	##FILTER=<ID=q20,Description="Quality below 20">
	##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">
	##FORMAT=<ID=GQ,Number=1,Type=Integer,Description="Genotype Quality">
	#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	SAMPLE

A sample line of the VCF file, with the data that is used to populate each column described:

	chr22	16285888	rs76548004	T	C	17	d15;q20	DP=11;TI=NM_001136213;GI=POTEH;CD	GT:GQ	1/0:17

Additional entries are described in [Analysis VCF Entries](/articles/descriptive/analysis-vcf-entries/).

---
### Field descriptions

- **ALT**: The alleles that differ from the reference read. For example, an insertion of a single T could show reference A and alternate AT.
- **CHROM**: The chromosome of the reference genome. Chromosomes appear in the same order as the reference FASTA file (generally karyotype order)
- **FILTER**: If all filters are passed, the' PASS' is written. The possible filters are as follows:
	- q20 – The variant score is less than 20. (Configurable using the VariantFilterQualityCutoff setting in the config file)
	- r8 – For an Indel, the number of repeats in the reference (of a one- or two-base repeat) is greater than 8. (Configurable using the - IndelRepeatFilterCutoff setting in the config file)
	- Additional entries are described in [Analysis VCF Entries](/articles/descriptive/analysis-vcf-entries/).
- **FORMAT**: The format column lists fields (separated by colons), for example, "GT:GQ". The list of fields provided depends on the variant caller used. The available fields are as follows:
	- _AD_ – Entry of the form X,Y where X is the number of reference calls, Y the number of alternate calls
	- _GQ_ – Genotype quality
	- _GT_ – Genotype. 0 corresponds to the reference base, 1 corresponds to the first entry in the ALT column, 2 corresponds to the second entry in the ALT column, etc. The '/' indicates that there is no phasing information.
	- _NL_ – Noise level; an estimate of base calling noise at this position
	- _SB_ – Strand bias at this position. Larger negative values indicate more bias; values near zero indicate little strand bias.
	- _VF_ – Variant frequency. The percentage of reads supporting the alternate allele.
- **ID**: The rs number for the SNP obtained from dbSNP. If there are multiple rs numbers at this location, the list is semi-colon delimited. If no dbSNP entry exists at this position, the missing value ('.') is used.
- **INFO**: The possible entries in the INFO column:
	
	- _AD_ – Entry of the form X,Y where X is the number of reference calls, Y the number of alternate calls.
	- _CD_ – A flag indicating that the SNP occurs within the coding region of at least one RefGene entry
	- _DP_ – The depth (number of base calls aligned to this position)
	- _GI_ – A comma-separated list of gene IDs read from RefGene
	- _NL_ – Noise level; an estimate of base calling noise at this position.
	- _TI_ – A comma-separated list of transcript IDs read from RefGene
	- _SB_ – Strand bias at this position.
	- _VF_ – Variant frequency. The number of reads supporting the alternate allele.

	Illumina Annotation Service (IAS) provided annotations are:

	- _CSQT_ – Transcript consequence as predicted by Variant Effect Predictor (www.ensembl.org/info/docs/tools/vep/index.html) version 72. Only canonical transcripts are included in the VCF file to maintain readability. The ANT file contains consequences for all affected transcripts. This binary file can be loaded into VariantStudio for viewing; see www.illumina.com/clinical/clinical_informatics/illumina-variantstudio.ilmn.
	
	A comma-separated list for each affected gene is provided. Each entry in the list includes the HGNC gene symbol (when available), transcript ID, and functional consequences in a delimited format: HGNC|TranscriptID|Consequence. If the annotation source selected was RefSeq, then many of the TranscriptIDs will begin with NM_. If the selected annotation source was Ensembl, then the TranscriptIDs begin with ENST. The consequences are indicated using valid Sequence Ontology (SO) terms (www.ensembl.org/info/genome/variation/predicted_data.html#consequences).
	- _CSQR_ – Regulatory consequence as predicted by Variant Effect Predictor (www.ensembl.org/info/docs/tools/vep/index.html) version 72. A comma-separated list for each affected regulatory region (including transcription factor binding sites) is provided using the following delimited format: RegulatoryID|Consequence. The annotations provided in this field come from the Ensembl database of regulatory features even if RefSeq was selected as the annotation source. Many of the RegulatoryIDs begin with ENSR. The consequences are indicated using valid Sequence Ontology (SO) terms (www.ensembl.org/info/genome/variation/predicted_data.html#consequences) and typically are either regulatory_region_variant or TF_binding_site_variant.
	- _AF_ – The allele frequency from all populations of 1000 genomes data
	- _AA_ – The inferred allele ancestral to the chimpanzee/human lineage
	- _GMAF_ – Global minor allele frequency (GMAF); technically, the frequency of the second most frequent allele. Format: GlobalMinorAllele|AlleleFreqGlobalMinor
	- _EVS_ – Allele frequency, sample count, and coverage taken from the Exome Variant Server (EVS). Format: AlleleFreqEVS|EVSCoverage|EVSSamples
	- _cosmic_ – The numeric identifier for the variant in the Catalogue of Somatic Mutations in Cancer (COSMIC) database (cancer.sanger.ac.uk/cancergenome/projects/cosmic/).
	- _clinvar_ – Clinical significance from the ClinVar database (www.ncbi.nlm.nih.gov/clinvar/).
	- _phastCons_ – Denotes if the variant is an identical or similar sequence that occurs between species and maintained between species throughout evolution.
- **POS**: The one-based position of this variant in the reference chromosome. The convention for VCF files is that, for SNPs, this base is the reference base with the variant. For indels or deletions, this base is the reference base **immediately before** the variant. Variants are in order of position.
- **QUAL**: A Phred-scaled quality score assigned by the variant caller. Higher scores indicate higher confidence in the variant (and lower probability of errors). For a quality score of Q, the estimated probability of an error is 10-(Q/10). For example, the set of Q30 calls has a 0.1% error rate. Many variant callers assign quality scores (based on their statistical models) which are high relative to the error rate observed in practice.
- **REF**: The reference genotype. For example, a deletion of a single T can read reference TT and alternate T.
- **SAMPLE**: The sample column gives the values specified in the FORMAT column. One MAXGT sample column is provided for the normal genotyping (assuming the reference). For reference, a second column is provided for genotyping assuming the site is polymorphic. See the Starling documentation for more details.

{% callout note, NOTE %}
Variant files for Isaac also contain off-target variant calls, with filter.
{% endcallout %}