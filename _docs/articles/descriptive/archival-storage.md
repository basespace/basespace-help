---
layout: article
title: Archival Storage
hide_welcome_banner: true
---

# Archival Storage

Archival storage moves data into long-term archives with lower data storage rates. It is intended for data that must be retained and do not require immediate access.

Data transfer to and from archival storage incurs additional fees per TB transferred in the move. Restoring data that have been archived for a short period of time can result in higher storage costs. 

| Storage Product | Cost| Details |
|-----------------------------------------------|---|---|
|Standard Storage | 22.5 iCredits per TB per month | Default, instant free access |
| Archive Storage | 2.0 Credits per TB per month | Around 2 days to restore, costs below |  
| Transfer to Archive | 20.0 iCredit per TB per transfer | Cost to move 1 TB from Standard to Archive  |  
| Restore from Archive| 30.0 iCredit per TB per restore | Cost to move 1 TB from Archive back to Standard | 

For more information about storage costs, see the [iCredits information page](https://www.illumina.com/products/by-type/informatics-products/icredits.html).

The following data can be archived:

-	Runs—Includes all files within the Data folder.
-	FASTQ and data set files—Includes all files within the data set.

> **NOTE** Archived data appear in the run and data set lists. Filter the run or FASTQ lists to view only active or archived data.

## Requirements
-	The run must be in a terminal (Complete, Stopped, or Failed) state.
-	BaseSpace Sequence Hub must be configured for New mode. Contact your workgroup owner or administrator if your workgroup is using Classic mode.
-	Data that are shared, in the trash, already archived, or files-only deleted are not eligible to be archived.

## Archive Data
Archive data that you do not need immediate access to. Archiving can take several days to complete and incurs additional costs.

1.	Open the page for the data you want to archive. To archive multiple items, select the items on the Runs list, FASTQs tab, or Other Datasets tab. You can select up to 250 items at one time.
2.	From the File menu, point to Archive, and then select **Archive Data**.
BaseSpace Sequence Hub reviews the selections and excludes ineligible data.

3.	In the Archive Data dialog, verify the items, and then select **Archive Data**.
BaseSpace Sequence Hub moves the data to archival storage. Data are not available and cannot be restored until archiving is complete.

## Restore Data
Data are available to restore when the archive process is complete. Restoration can take several days to complete and incurs additional costs.

1.	Open the page for the data you want to restore. To restore multiple runs, select the items on the Runs list, FASTQs tab, or Other Datasets tab. You can select up to 250 items at one time.
2.	From the File menu, point to Archive, and then select **Restore Data**.
3.	In the Restore Data dialog, verify the items, and then select **Restore Data**.
The restored data are available for use and charged at standard storage rates.

> **NOTE** Sharing and transferring restored data or assets that contain restored data are currently disabled. These functions are intended for a future update.

## Archived Data
BaseSpace Sequence Hub provides some read-only information about archived data.

-	For archived runs, only the summary, metrics, and sample sheet details are available.
-	Archived files cannot be downloaded.
-	Biosample data and yield calculations exclude archived data.
-	Projects that include archived data cannot be shared or transferred.

## CLI
The CLI supports archive and restore using the commands `bs archive` and `bs unarchive`.

Use the following commands to archive and restore data.

    bs archive run -i :id

    bs archive dataset -i :id

    bs unarchive run -i :id

    bs unarchive dataset -i :id
