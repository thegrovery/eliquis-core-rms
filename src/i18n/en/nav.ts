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
		{ text: 'Introduction | Main', slug: 'introduction', key: 'introduction' },
		{ text: 'How to use E360 Field Force Navigator', slug: 'introduction/how-to-use-e360-ffn', key: 'how-to-use-e360-ffn' },
		{ text: 'About ELIQUIS 360 Support', slug: 'introduction/about-eliquis-360', key: 'about-eliquis-360' },
		{ text: 'Frequently Asked Questions', slug: 'faqs', key: 'faqs' },
		{ text: 'Glossary of Terms', slug: 'glossary', key: 'glossary' },

	{ text: 'Program in Practice', header: true, type: 'learn', key: 'program-in-practice' },
		{ text: 'About Program in Practice', slug: 'program-in-practice/about-program-in-practice', key: 'about-program-in-practice' },
		{ text: 'How 1-855-ELIQUIS Works', slug: 'program-in-practice/how-1-855-eliquis-works', key: 'how-1-855-eliquis-works' },
		{ text: 'Provider expresses that patient is concerned about high out-of-pocket costs', slug: 'program-in-practice/provider-expresses-that-patient-is-concerned-about-high-out-of-pocket-costs', key: 'provider-expresses-that-patient-is-concerned-about-high-out-of-pocket-costs ' },
		{ text: 'Provider Expresses That Patient Unable To Get Prescription Filled', slug: 'program-in-practice/provider-expresses-that-patient-unable-to-get-prescription-filled', key: 'provider-expresses-that-patient-unable-to-get-prescription-filled' },
		{ text: 'Pharmacist Says Medicare, Medicaid, DOD, TRICARE, Veterans Affairs (VA) And CHAMPUS Patients Are Not Eligible For Copay Assistance', slug: 'program-in-practice/pharmacist-says-medicare-medicaid-dod-tricare-veterans-affairs-va-and-champus-patients-are-not-eligible-for-copay-assistance', key: 'pharmacist-says-medicare-medicaid-dod-tricare-veterans-affairs-va-and-champus-patients-are-not-eligible-for-copay-assistance' },
		{ text: 'Co-Pay Backdate Request', slug: 'program-in-practice/co-pay-backdate-request', key: 'co-pay-backdate-request' },
		{ text: 'Provider Expresses That Patient Unaware Of Co-pay Program And/or Hasn’t Been Using Co-pay Card', slug: 'program-in-practice/provider-expresses-that-patient-unaware-of-co-pay-program-andor-hasnt-been-using-co-pay-card', key: 'provider-expresses-that-patient-unaware-of-co-pay-program-andor-hasnt-been-using-co-pay-card' },
		{ text: 'Mail-Order Pharmacy', slug: 'program-in-practice/mail-order-pharmacy', key: 'mail-order-pharmacy' },
		{ text: 'E-Sign', slug: 'program-in-practice/e-sign', key: 'e-sign' },
		{ text: 'Digital Assistant', slug: 'program-in-practice/digital-assistant', key: 'digital-assistant' },

	{ text: 'Terms & Conditions', header: true, type: 'learn', key: 'terms-and-conditions' },
		{ text: 'Co-Pay Terms and Conditions and Eligibility Requirements for Patients', slug: 'terms-and-conditions/co-pay-terms-and-conditions-and-eligibility-requirements-for-patients', key: 'co-pay-terms-and-conditions-and-eligibility-requirements-for-patients' },
		{ text: 'FTO Terms and Conditions and Eligibility Requirements for Patients', slug: 'terms-and-conditions/fto-terms-and-conditions-and-eligibility-requirements-for-patients', key: 'fto-terms-and-conditions-and-eligibility-requirements-for-patients' },
		{ text: 'Master T&Cs', slug: 'terms-and-conditions/master-terms-and-conditions', key: 'master-terms-and-conditions' },

	/*{ text: 'Page Templates', header: true, type: 'learn', key: 'pageTemplates' },
		{ text: 'Basic Page Template', slug: 'page-templates/basic-page-template', key: 'page-templates/basic-page-template' },
		{ text: 'Component Page Template', slug: 'page-templates/component-page-template', key: 'page-templates/component-page-template' },
		{ text: 'Video Page Template', slug: 'page-templates/video-page-template', key: 'page-templates/video-page-template' },
		{ text: 'Directory Page Template', slug: 'page-templates/directory-page-template', key: 'page-templates/directory-page-template' },
		{ text: 'Resource Page Template', slug: 'page-templates/resource-page-template', key: 'page-templates/resource-page-template' },
		{ text: 'Tutorial Page Template', slug: 'page-templates/tutorial-page-template/1-step-1', key: 'page-templates/tutorial-page-template/1-step-1' },
		{ text: 'Tutorial Page Template - New', slug: 'page-templates/tutorial-alt/step-1', key: 'page-templates/tutorial-alt/step-1' },*/

	/*{ text: 'Misc.', header: true, type: 'learn', key: 'tutorials' },
		{ text: 'Our Brand Partners', slug: 'our-brand-partners', key: 'our-brand-partners' },
		{ text: 'Recent Achievements', slug: 'recent-achievements', key: 'recent-achievements' },
		{ text: 'FAQ’s', slug: 'faqs', key: 'faqs' },*/


	//RESOURCES TAB
	{ text: 'External Resources', header: true, type: 'api', key: 'external-resources' },
		{ text: 'External Resources Overview', slug: 'external-resources/external-resources-overview', key: 'external-resources/external-resources-overview' },
		{ text: 'Websites', slug: 'external-resources/websites', key: 'external-resources/websites' },
		{ text: 'Downloads', slug: 'external-resources/downloads', key: 'external-resources/downloads' },
		{ text: 'Forms', slug: 'external-resources/forms', key: 'external-resources/forms' },
		{ text: 'Other/Additional Support', slug: 'external-resources/additional-support', key: 'external-resources/additional-support' },

	{ text: 'Rep Resources', header: true, type: 'api', key: 'rep-resources' },
		{ text: 'How To Use E360 Playbook 2.0 (CORE RMS)', slug: 'rep-resources/how-to-use-e360-playbook', key: 'rep-resources/how-to-use-e360-playbook' },
		{ text: 'About ELIQUIS 360 Support', slug: 'rep-resources/about-eliquis-360-support', key: 'rep-resources/about-eliquis-360-support' },
		{ text: 'How To Use E360 Playbook 2.0 (CORE RMS)', slug: 'rep-resources/how-to-use-e360-playbook-alt', key: 'rep-resources/how-to-use-e360-playbook-alt' },
		{ text: 'Eliquis 360 Patient Support Services', slug: 'rep-resources/eliquis-360-patient-support-services', key: 'rep-resources/eliquis-360-patient-support-services' },
		{ text: 'Track II Training Deck', slug: 'rep-resources/track-ii-training-deck', key: 'rep-resources/track-ii-training-deck' },

	/*{ text: 'Misc.', header: true, type: 'api', key: 'misc-resources' },
		{ text: 'Forms', slug: 'misc-resources/forms', key: 'misc-resources/forms' },
		{ text: 'Templates', slug: 'misc-resources/templates', key: 'misc-resources/templates' },*/
] as const;
