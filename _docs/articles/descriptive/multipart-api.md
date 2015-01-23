---
layout: article
title: Multipart API
---

A file may be uploaded to an AppResult to which your application has WRITE access. There are two APIs for uploading files to an AppResult. This guide for multipart file upload describes a robust alternative for file upload over the simpler POST:appresults/{id}/files. Some of the advantages of using the multi-part upload API include:  

- Increased reliability as each part may be retried without needing to restart the full upload in case of a connection or application problem  
- Increased performance as parts may be uploaded in parallel  
- Ability to pause and resume uploads  
- Ability to start uploading before knowing the complete file size  

As part of initiating the file upload, you're telling the API some basics about the file including its filename, Content- Type, and directory.  

{% callout code, Code to access Token %}
<pre>
curl -v -H "x-access-token: {access token}" \
-H "Content-Type: application/zip" \
-X POST https://api.basespace.illumina.com/v1pre3/appresults/38040/files?name=reportarchive.zip\&multipart=true
</pre>
{% endcallout %}

This will initiate a multipart upload of a file named reportarchive.zip having a mimetype of application/zip to app result id 38040. Make sure you include the query parameter multipart=true to initiate the multipart upload. An optional directory query parameter may also be included.  

If successful, a 200 OK is returned with a JSON file object. The UploadStatus should be pending.  

{% callout code, HTTP Connection Code %}
<pre>
HTTP/1.1 200 OK  
Content-Type: application/json  
Date: Wed, 18 Jul 2012 14:51:50 GMT  
Content-Length: 304  
{  
  "Response":{  
  "UploadStatus":"pending",  
  "HrefContent":"v1pre3/files/7094087/content",  
  "Id":"7094087",  
  "Href":"v1pre3/files/7094087",  
  "Name":"reportarchive.zip",  
  "ContentType":"application/zip",  
  "Size":0,  
  "Path":"reportarchive.zip",  
  "DateCreated":"2012-07-18T14:51:50.0475813Z"  
},  
"ResponseStatus":{},  
"Notifications":[]  
}  
</pre>
{% endcallout %}

{% callout troubleshoot, HTTP Connection Code %}
While downloading data you may encounter a known issue. Please follow the steps given below to resolve this:  

1. Download the data in Excel Format  
2. Save with a .xls extension  

{% endcallout %}
