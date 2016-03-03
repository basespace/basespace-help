---
layout: article
title: HiSeq Connection
---

If the HiSeq data are not uploaded to BaseSpace, check the following things:

1. Make sure that you have a stable internet connection of at least 10 Mbps upload speed from the HiSeq.

2. The Storage screen during run configuration on the HiSeq enables you to define where your run data are output and stored. Select the options:
	- **Connect to BaseSpace**—When you select this option you are prompted to enter your MyIllumina account information. Zip BCL files is selected by default. Illumina recommends that you also save files locally. To save files locally, select Save to an output folder and enter a path, usually to a local network folder.
	- **Storage and analysis**—This option enables the HiSeq to send run data as well as system health information to BaseSpace.

3. If BaseSpace is not available, open Windows Services and start or restart Illumina BaseSpace Broker:
	a. Click the Windows Start button.
	b. Right-click Computer, select Manage.
	c. On the left, under Services and Applications, choose Services.
	d. Scroll down the list to find Illumina BaseSpace Broker.
	e. Right-click Illumina BaseSpace Broker and do one of the following:
		- Click Start if this option is not grayed out
		- If the Start option is grayed out, click Restart
	   The service starts, or closes then restarts.
	f. Close the Computer Management window.

{% callout note, NOTE %}
To use BaseSpace, you have to load a sample sheet at the start of your run.
{% endcallout %}

When you begin your sequencing run on the HiSeq, the BaseSpace icon changes to indicate that the HiSeq is connected to BaseSpace and data files are being transferred.
