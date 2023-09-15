# README

## Project-Specific Notes
* Project-specific notes go here.

### Server Links
* Local: http://127.0.0.1:3000/
* Staging: https://core-template-staging.netlify.app/
* Live: https://core-rms.com
* Netlify: https://app.netlify.com/sites/grovery-core-toolkit-template/overview


---


## In-Progress Dev Notes
Delete this section when no longer needed.

Current active dev branches:
* feature--search
* feature--pwa
* template--placeholder-content


---


## Framework: Grovery CORE Toolkit


### Initialize
* Use Node v16.13.0 - you can just run "npm run nvm" to set
* run 'npm install'
* run 'npm run dev' (start and serve commands are the same as this by default, customize them if you need to)

<br/>

### Initial Server Deploy, Updating Test/Staging Server
This site uses Netlify's auto-deploy functions.  Every time you push to your main or staging branch, Netlify will do a new deploy.  

Since this site is being shown to potential clients, try to always push to the `staging` branch first to test any new updates, then push to main once everything is finished and confirmed to be client-ready.

`feature--update > staging > main`

<br/>

### Git Guidelines - Branching & Merging
Try to keep all updates isolated to their own branch, and then open a pull request (PR) when you're ready to push the update live.  This will keep the git timeline clean and allow for easier collaboration.

All branches should follow the naming scheme of `category--subject`, for example: `template--basic-page-template`, `package--astro-icon`, or `component--MasterComponent`.  

<br/>

>**Avoiding Merge Errors**: 
>
>Before you open your PR, re-merge `main` into your branch to get any updates that have happened in the meantime, and then run `pnpm run build` to make sure your updates build properly.  

<br/>

### Feature Controls & Keys
Major features can be turned off and on from the `.env` file at the project's root.  Feature Control variables should follow the naming scheme of `PUBLIC_FEATURE_NAME` and only be set to 'true' or 'false'.  The associated feature's component should then be wrapped in an IF statement as shown below.

[How to use .env vars in Astro.](https://docs.astro.build/en/guides/environment-variables/)

Feature Control example:
```
{import.meta.env.PUBLIC_FEATURE_SEARCH=="true" &&
	<Search {lang} labels={docsearchStrings} />
}
```

Key example:
```
	prop=import.meta.env.PUBLIC_KEY_SEARCH
```

### Assets Checklist
When you start the project, check in with the team for the following:
* Font files
* Logo(s) - as PNGs or SVGs
* Favicon - you can usually resize the logo for this
* Adobe Xd project link
* Legal copy/links
* Social links

<br/>

### Code Libraries
* Framework: [Astro Docs](https://github.com/withastro/docs)
* Icons: [astro-icon](https://github.com/natemoo-re/astro-icon#readme)
* Sliders/Carousels: [swiper](https://swiperjs.com/)

<br/>

## Markdown Syntax Guide
* https://www.markdownguide.org/basic-syntax/#overview

## Vars File
This project uses a vars file to control the general style of the site.  Colors, fonts, font sizes, spacing , etc. are all set from this location and referenced throughout the projet as variables.  For example, setting the variable `$black` to `#000000` will update all instances of $black throughout the project to your new color.  

You can take this a step further by using "theme variables".  Instead of naming a variable something direct like `$black`, create a variable named something like `$primaryColor` and then set that equal to another variable like `$black`.  This cascading method will give you the best experience with modifying the project's theme, and you should try your best to always use variables instead of directly referencing these styles.


### Articles / Documentation for later
- [Custom PWA Install Experience ](https://web.dev/customize-install/)