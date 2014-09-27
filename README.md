# Gmail Templates from Google Spreadsheets

This extension allows you to insert email templates into Gmail, using templates stored in a Google Spreadsheet.

## Getting Started

1. Create a Google Spreadsheet with four columns. The headers must be: `title | description | subject | body`
2. Publish your spreadsheet. **THIS DOCUMENT IS NOW PUBLICLY AVAILABLE (FOR PERSONAL ACCOUNTS)** If you want to restrict to just your organization (avialable for business users only), check the `Require viewers to sign in with their ..... account.` box.
3. Copy the full url of the Google Spreadsheet into the url field on the Options page. The url may look something like: `https://docs.google.com/a/<your-company-if-business-user>/spreadsheets/d/<some-big-long-random-mix-of-letters>/edit#gid=0`
4. Click on the Chrome Extension button and you should see a list of templates.

## Limitations

** Basic html Only **
This extension grabs the text from the spreadsheet cell, inserts line breaks and the inserts the text into the message compose box. Since spreadsheet cells do not support formatting, you can use basic html to format your email body, such as: `<strong>, <em>, <span style="font-size:15px; color:blue;">Blue Text</span>`. I have tested more complex html and it does not work, I think due to the way I am inserting line breaks dynamically. I may look at supporting full html email templates in the future.

** Linebreaks **
You must add the linebreaks in the actual spreadsheet cell. Then the script will dynamically insert `<br>` tags for each linebreak. To do this on a Mac, hit cmd+option+enter. On a PC, hit alt+enter.

Any questions, tweet me [@ciaransm](https://twitter.com/ciaransm).
Created by [Ciaran Mahoney](http://ciaranmahoney.me). 



