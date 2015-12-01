basespace-help
==============

BaseSpace Docs Repo

Conventions
------------

- `_docs` -- all documentation files go here.  
- `_includes` -- all html includes go here.  
- `_layouts` -- all Liquid templates go here.  
- `_less` -- all LESS partials go here.

- `_config.yml` --  

_config.yml
-------------
`_config.yml` stores configuration data. See [HydeTower docs](https://github.com/basespace/SpaceAcademy/blob/master/README.md#hyde-tower).


| Variable					| Description														|
| --------------------- | -----------------------------------------------|
| gitrepo						| URL to the project's GitHub repo. *Used to build the edit on GitHub link.*				|
| gitbranch				| Git branch name. *Used to build the edit on GitHub link.*											|


Naming Conventions
------------------

###File convention

1. File name: File names shall follow the rules below,
  + Only lower case letters can be used.
  + The name of the file should appropriately describe the content of the file. Abbrevations for words are not allowed (Eg. proj for project or dwnld for download, etc.).
  + Hyphens should be used between two consecutuve words.

   Format:    **description-of-file.md**
   
   For Eg: share-run-using-email.md

2. File format: Files shall be stored in *markdown (.md)* format. 

   Following are some of the links that are good sources of reference for understanding the markdown syntax.
   + Github articles [Link1](https://help.github.com/articles/github-flavored-markdown/) and [Link2](https://help.github.com/articles/markdown-basics/).
   + [Daring Fireball](http://daringfireball.net/projects/markdown/syntax).
   + Content writers are also advised to install [MarkdownPad](http://markdownpad.com/)(for WIndows) and [LightPaper](http://www.ashokgelal.com/lightpaper-for-mac/) or [Macdown](http://macdown.uranusjr.com/)(for Mac OS X).

###Image convention

1. Image name: Image names shall be in the following format, 
  + The name should reflect the clear description of the image. Abbrevations for words are not allowed (Eg. proj for project or dwnld for download, etc.).
  + Only lower case letters should be used. Numbers may be included if necessary. 
  + Hyphens shall be used to separate multiple words in image names.
  + [optional] The name might contain the image width and height in pixels, if that is necessary. If so, underscores should be used as separators between *description and size*.

   Format:    **description-of-image[_widthxheight].png**
   
   For Eg: share-run-using-email-step-1_672x320.png
  
  + Images shall be saved under appropriate folders under the "images" folder of the site. This folder should be a high level category for the image like 'projects' or 'app-store'.

    For Eg: */images/runs/share-run-using-email-step-1.png*
            */images/projects/share-project-using-getlink-steps.png*

2. Image file format: All static images should be in,
  + *.PNG (Portable Network Graphics)* format. 
  + In case of photos or animated GIFs .JPG or .JPEG and .GIF formats can be used.

3. Image size: The size of the images is suggested to keep within 800px(width) for optimization purposes.

 
Guidelines for writing articles
-------------------------------

All the articles are stored under the '_docs' folder in their respective categories. Each articles can belong to one of the two categories: 

+ Descriptive : Articles which are descriptive in nature, not having any kind of walk through tuorials, but only text and images/screenshots supporting it.
+ Tutorials : Articles that are clearly walkthrough tutorials, with step by step description along with screenshots/images.

Though all articles are written in 'markdown(.md)' format, the following are some of the additional points to keep in mind:

1. Headings and sub-headings must have the following format.
    
  + Title of the article : Should mention it in the YAML front matter in the beginning of the article.
  + Main Headings : H2
  + Sub heading 1 : H3
  + Sub heading 2 : H4

2. All images/screenshots should be enclosed in the following liquid tag format:

  {% screenshot full-image-path/myscreenshot.png %}

3. In case of tutorial articles, each step must follow this format:

  {% step 1, images/myimage.png, This is The title %}
    This is the description
  {% endstep %}

4. If there is a callout like a special note or tip, there are some ready call-outs to use.

  Code: 
        {% callout code, Title Here %}
          // Your code here
        {% endcallout %}

  Troubleshooting:
        {% callout troubleshoot, Title Here %}
          This is description
        {% endcallout %}

  Note/Tips:
        {% callout note, Title Here %}
          This is description
        {% endcallout %}

5. While writing the articles of descriptive type (without using any custom liquid tags for steps), make sure that each section starting with a h2 or h3 MUST have a horizontal rule marking the separation between the sections. Horizontal rule should also be used in places appropriately since by default markdown doesn't leave gaps between the previous paragraph and the title [Line can be drawn using three or more '---'].  
