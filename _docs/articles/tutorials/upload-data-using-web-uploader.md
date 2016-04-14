---
layout: article
title: How to Upload data using the Web Uploader
hide_welcome_banner: true
---

BaseSpace Hub recently made a data upload feature available to upload data that was previously generated on Illumina sequencing instruments. This simple-to-use feature is accessible from any project to which you have write access. The following steps explain the process:
<br />
<br />
{% step 1, /images/tutorials/web-uploader-import-button_767x270.png, Choose Project %}
You can choose any desired Project that you have write access to or [create a new project](/tutorials/create-a-new-project) by clicking on **New Project...** 
Once the Project has been chosen, simply click on the 'Import' button at the top.
{% endstep %}  

{% step 2, /images/tutorials/web-uploader-file-selector-window_767x378.png, Upload Files %}
You can then either “Drag and drop” one or more files (of the same type) into the webpage or click on “select file” and select which file(s) you would like to upload from a file browser. **For one upload session, only one kind of files can be uploaded.**
{% endstep %}

{% callout note, NOTE %}
FASTQ files need to adhere to Illumina standards, as specified below:

 - Data for a single sample can constitute multiple files. The total number of files per sample and their combined size are limited to 16 and 25 GB respectively.
 - The uploader will only support gzipped FASTQ files generated on Illumina instruments.
 - The name of the FASTQ files must conform the following convention:
	 `SampleName_SampleNumber_Lane_Read_FlowCellIndex.fastq.gz`
	 (i.e. `SampleName_S1_L001_R1_001.fastq.gz` / `SampleName_S1_L001_R2_001.fastq.gz`)
 - The read descriptor in the FASTQ files must conform to the following convention:
	@Instrument:RunID:FlowCellID:Lane:Tile:X:Y ReadNum:FilterFlag:0:SampleNumber:
	- Read 1 descriptor would look like this:
	    	@M00900:62:000000000-A2CYG:1:1101:18016:2491 1:N:0:13
	- Read 2 would have a 2 in the ReadNum field, like this:
	    	@M00900:62:000000000-A2CYG:1:1101:18016:2491 2:N:0:13

{% endcallout %}

{% step 3, /images/tutorials/web-uploader-progress-bar_767x463.png, Monitor Upload Progress %}
You will then see a progress bar as the file/s are uploaded. If there are any problems with the upload, respective notification will be displayed soon after the operation is completed. The upload progress can be cancelled at any point as shown below. Also, all the details pertaining to the upload session can be viewed at the bottom left.
{% endstep %}  

{% step 4, /images/tutorials/web-uploader-import-success_767x406.png, Add to Basespace Hub %}
Once the progress bar completes, you can add additional files. Also, before completing the import, you can set the sample name and associate a genome with the sample in the upper left hand side of the screen. Once you have imported all of the files and the files complete uploading, you will need to click on the  “Add to Basespace Hub” button (shown above) to complete the session.
{% endstep %}  

{% callout note, NOTE %}
You can also click the "Add to Basespace Hub" button at any point (even before all the files complete uploading).Once you have added all the files and are satisfied with the name and other metadata (genome, etc.) of the sample, you can click the "Add to Basespace Hub" button. This "locks down" the import. You can no longer make any changes to it (i.e. change name, add/remove files) but the import will complete the second the last file is uploaded and there are no errors with any of the files and no further interaction on your part is required. Also, even if you never click the button the upload will auto-complete after five minutes of inactivity after the last file is uploaded.
You are still required to stay on this page (leave it open) the entire time files are uploading.
{% endcallout %}


{% callout troubleshoot, Quality considerations %}
- The number of base calls for each read must equal the number of quality scores
- The number of entries for Read 1 must equal the number of entries for Read 2
- The uploader will determine if files are paired-end based on the matching file names in which the only difference is the ReadNum
- For paired-end reads, the descriptor must match for every entry for both reads 1 and 2
- Each read has passed filter
{% endcallout %}