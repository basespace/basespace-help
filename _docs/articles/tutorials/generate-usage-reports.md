---
layout: article
title: Generate Usage Reports
hide_welcome_banner: true
---


Enterprise subscription accounts include usage history reports. Users and administrators can download detailed reports for selected billing periods.

+ Domain administrators can view and download usage history for all workgroups in the domain.
+ Workgroup administrators can view and download usage history for their workgroups.
+ All users can view and download their personal usage history.
 
----------------
##View Reports

1. Use one of the following methods to view the usage report.
	- From the Dashboard iCredits panel, select **Details.** {% screenshot /images/articles/icredits-dashboard.png %}
	- Select the Account drop-down arrow, and then select **Settings**. In the Settings page, select **Usage**. 
	
The usage report contains the following information.

+ **Billing Cycle**—The billing cycle in which the usage was logged. Only the last 6 billing cycles are listed.   
+ **Total iCredits**—The total number of iCredits accrued in the billing cycle.    
+ **Workgroup/User**—The name of the personal account or workgroup that incurred charges during the billing period. 
+ **Storage iCredits**—The storage iCredit charges accrued for the workgroup or personal account. Storage charges are recomputed daily.
+ **App iCredits**—The app iCredit charges accrued for the workgroup or personal account.
+ **Compute iCredits**—The compute iCredit charges accrued for the workgroup or personal account.


	{% screenshot /images/articles/icredit-usage-report.png %}
    
-------------
## Download Reports

1. Use either of the following methods to view the usage report.
	- Select the Account drop-down arrow, and then select **Settings**. In the Settings page, select **Usage**. 
	- From the Dashboard iCredits panel, select **Details.** {% screenshot /images/articles/icredits-dashboard.png %}
2. Select the **Download** icon, and then select a billing period. 
 {% screenshot /images/articles/icredit-usage-download.png %}
3. Select **Save** and save the CSV file in the designated folder. By default, the file is named Workgroup-[Workgroup-Name]-Usage-[YYYY-MM].csv.


**Applications iCredit Consumption**

+ **Date**—The date and time of the activity, in Coordinated Universal Time (UTC).
+ **App Name**—The name of the app used.
+ **iCredits Consumption**—The total number of iCredits charged for the activity.
+ **App Fee**—The app license fee charge, in iCredits.
+ **Compute Time Rate**—The compute time rate, in number of iCredits per node hour.
+ **Compute Time Used**—The compute time, in fractional hours, for the activity.
+ **Compute Time Consumption**—The calculated compute charges for the activity, in iCredits.
+ **User**—The login email of the user.
+ **App Session ID**—The session ID of the application

**Daily Storage Overage iCredit Consumption**

+ **Overage Amount**—The storage amount exceeding your storage allotment. 
+ **iCredits Consumption**—The storage charge, in iCredits, for the activity. 
