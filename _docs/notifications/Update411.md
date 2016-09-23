#H2 Important Message

2016-09-02, San Diego CA.

BaseSpace Sequence Hub will be down for planned maintenance on Tuesday, September 6, 2016, to prepare for some new features. 
Both the website and services will be taken down for approximately two hours  between 21:30 UTC and 23:30. 

Any apps running during this maintenance window may have issues contacting BaseSpace Sequence Hub, which could possibly lead to failure. 
To minimize potential app failures, we will place any native apps, including FASTQ Generation, in to a queue starting at 
8 hours before the maintenance, at 13:30 UTC.  Once services return (estimated time is 23:30 UTC ) we will start 
executing the jobs in the queue in the order in which they were submitted. 
This may take some time before they are all processed, and during this time the apps 
will be shown with the status of “PendingExecution”.
 
Instruments that are streaming data will be able to upload data up until the planned maintenance starts, and then again afterwards. 
Our instrument control software has been designed to be accommodate to such outages.

The previously announced plan to discontinue MiSeq Reporter workflows on BaseSpace will also happen at 13:30 Tuesday. From that time, 
MiSeq runs on BaseSpace will automatically trigger FASTQ Generation, and from there you can run any of the more than 
100 published BaseSpace apps for analysis. We will also be depreciating some legacy applications which have suggested replacements according 
to the table below.

<table>
<tr><th>Software to be Retired</th><th>Replacement BaseSpace Sequence Hub Application</th></tr>
<td>MiSeq Reporter Assembly</td><td>SPAdes Genome Assembler, Velvet de novo Assembly</td></tr>
<tr><td>MiSeq Reporter Enrichment</td><td>Enrichment (Human only)</td></tr>
<tr><td>MiSeq Reporter Generate FASTQ</td><td>FASTQ Generation</td></tr>
<tr><td>MiSeq Reporter Library QC</td><td>Whole Genome Sequencing</td></tr>
<tr><td>MiSeq Reporter Metagenomics</td><td>16S Metagenomics</td></tr>
<tr><td>MiSeq Reporter PCR Amplicon</td><td>Enrichment (Human only)</td></tr>
<tr><td>MiSeq Reporter Resequencing</td><td>Whole Genome Sequencing</td></tr>
<tr><td>MiSeq Reporter Small RNA</td><td>Small RNA</td></tr>
<tr><td>MiSeq Reporter Targeted RNA</td><td>TruSeq Targeted RNA</td></tr>
<tr><td>MiSeq Reporter TruSeq Amplicon</td><td>TruSeq Amplicon</td></tr>
<tr><td>BWA Enrichment v1</td><td>BWA Enrichment 2.1.1</td></tr>
<tr><td>HiSeq Isaac Human WGS Workflow</td><td>Whole Genome Sequencing v4</td></tr>
<tr><td>Isaac Enrichment v1</td><td>Enrichment 3.0</td></tr>
</table>
