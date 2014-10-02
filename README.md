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
  + The name of the file should appropriately describe the content of the file.
  + Hyphens should be used between two consecutuve words.

   Format:    **description-of-file.md**
   
   Eg: share-run-using-email.md

2. File format: Files shall be stored in *markdown (.md)* format. Please refer to [this link](http://daringfireball.net/projects/markdown/syntax) to follow the markdown syntax.

###Image convention

1. Image name: Image names shall be in the following format, 
  + The name should reflect the clear description of the image.
  + It should contain the folder hierarchy of the folder it belongs to. 
  + It should contain the image width and height in pixels. 
  + All lower case letters should be used. Numbers may be included if necessary. 
  + Underscores are used as separators between *folder name, description and size*. Hyphens are used to separate multiple words in folder names/image names.

   Format:    **folder-name_description-of-image_widthxheight.png**
   
   Eg: tutorials_share-run-using-email-step-1_672x320.png

2. Image file format: All static images shall be in,
  + *.PNG (Portable Network Graphics)* format. 
  + In case of photos or animated GIFs .JPG or .JPEG and .GIF formats can be used.

3. Image size: The size of the images shall be within the following range,

  + Width : between 411px (min) and 767px (max) 
  + Height : between 154px (min) and 485px (max)