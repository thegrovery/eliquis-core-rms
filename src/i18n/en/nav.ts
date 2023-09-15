/**
 * This configures the navigation sidebar.
 * All other languages follow this ordering/structure and will fall back to
 * English for any entries they haven’t translated.
 *
 * - All entries MUST include `text` and `key`
 * - Heading entries MUST include `header: true` and `type`
 * - Link entries MUST include `slug` (which excludes the language code)
 */
export default [

	//LEARN TAB
	{ text: 'Introduction', header: true, type: 'learn', key: 'startHere' },
		{ text: 'Getting Started', slug: 'getting-started', key: 'getting-started' },
		{ text: 'How To Use The Toolkit', slug: 'how-to-use-the-toolkit', key: 'how-to-use-the-toolkit' },
		{ text: 'Announcements', slug: 'announcements', key: 'announcements' },
		{ text: 'What Is A Brand Toolkit?', slug: 'what-is-a-brand-toolkit', key: 'what-is-a-brand-toolkit' },
		{ text: 'Playbook In Practice', slug: 'playbook-in-practice', key: 'playbook-in-practice' },
		{ text: 'Test Your Knowledge', slug: 'test-your-knowledge', key: 'test-your-knowledge' },

	{ text: 'Onboarding', header: true, type: 'learn', key: 'onboarding' },
		{ text: 'About our team', slug: 'onboarding/about-our-team', key: 'about-our-team' },
		{ text: 'What we use', slug: 'onboarding/what-we-use', key: 'what-we-use' },
		{ text: 'Introduction video', slug: 'onboarding/introduction-video', key: 'introduction-video' },

	{ text: 'Page Templates', header: true, type: 'learn', key: 'pageTemplates' },
		{ text: 'Basic Page Template', slug: 'page-templates/basic-page-template', key: 'page-templates/basic-page-template' },
		{ text: 'Component Page Template', slug: 'page-templates/component-page-template', key: 'page-templates/component-page-template' },
		{ text: 'Video Page Template', slug: 'page-templates/video-page-template', key: 'page-templates/video-page-template' },
		{ text: 'Directory Page Template', slug: 'page-templates/directory-page-template', key: 'page-templates/directory-page-template' },
		{ text: 'Resource Page Template', slug: 'page-templates/resource-page-template', key: 'page-templates/resource-page-template' },
		{ text: 'Tutorial Page Template', slug: 'page-templates/tutorial-page-template/1-step-1', key: 'page-templates/tutorial-page-template/1-step-1' },
		{ text: 'Tutorial Page Template - New', slug: 'page-templates/tutorial-alt/step-1', key: 'page-templates/tutorial-alt/step-1' },

		{ text: 'Integrations', header: true, type: 'learn', key: 'integrations' },
			{ text: 'Salesforce', slug: 'page-templates/basic-page-template', key: 'page-templates/basic-page-template' },
			{ text: 'Hubspot', slug: 'page-templates/basic-page-template', key: 'page-templates/basic-page-template' },
			{ text: 'Sharepoint', slug: 'page-templates/basic-page-template', key: 'page-templates/basic-page-template' },
			{ text: 'Servlet', slug: 'page-templates/basic-page-template', key: 'page-templates/basic-page-template' },
			{ text: 'Veeva', slug: 'page-templates/basic-page-template', key: 'page-templates/basic-page-template' },
			/*{ text: 'CMSs &amp; CMRs', slug: 'page-templates/basic-page-template', key: 'page-templates/basic-page-template' },*/

	/*{ text: 'Tutorials', header: true, type: 'learn', key: 'tutorials' },
		{ text: 'Build a Blog', slug: 'tutorial/0-introduction', key: 'blog-tutorial' },*/
		// { text: 'Thinking with Islands', slug: 'tutorial/0-introduction', key: 'island-tutorial' },

	{ text: 'Misc.', header: true, type: 'learn', key: 'tutorials' },
		{ text: 'Our Brand Partners', slug: 'our-brand-partners', key: 'our-brand-partners' },
		{ text: 'Recent Achievements', slug: 'recent-achievements', key: 'recent-achievements' },
		{ text: 'FAQ’s', slug: 'faqs', key: 'faqs' },


	//RESOURCES TAB
	{ text: 'Brand Resources', header: true, type: 'api', key: 'brand-resources' },
		{ text: 'View All', slug: 'brand-resources/view-all', key: 'brand-resources/view-all' },
		{ text: 'Style Guide', slug: 'brand-resources/style-guide', key: 'brand-resources/style-guide' },
		{ text: 'Icon Library', slug: 'brand-resources/icon-library', key: 'brand-resources/icon-library' },
		{ text: 'Infographics', slug: 'brand-resources/infographics', key: 'brand-resources/infographics' },
		{ text: 'Customer Personas', slug: 'brand-resources/customer-personas', key: 'brand-resources/customer-personas' },
		{ text: 'Print Collateral', slug: 'brand-resources/print-collateral', key: 'brand-resources/print-collateral' },
		{ text: 'Decks', slug: 'brand-resources/decks', key: 'brand-resources/decks' },
		{ text: 'Product Training', slug: 'brand-resources/product-training-module1', key: 'brand-resources/product-training-module1' },

	{ text: 'Program Resources', header: true, type: 'api', key: 'program-resources' },
		{ text: 'Online Support', slug: 'program-resources/online-support', key: 'program-resources/online-support' },
		{ text: 'User Assistance', slug: 'program-resources/user-assistance', key: 'program-resources/user-assistance' },
		{ text: 'Order Forms', slug: 'program-resources/order-forms', key: 'program-resources/order-forms' },
		{ text: 'Rate Cards', slug: 'program-resources/rate-cards', key: 'program-resources/rate-cards' },

	{ text: 'Misc.', header: true, type: 'api', key: 'misc-resources' },
		{ text: 'Forms', slug: 'misc-resources/forms', key: 'misc-resources/forms' },
		{ text: 'Templates', slug: 'misc-resources/templates', key: 'misc-resources/templates' },
] as const;
