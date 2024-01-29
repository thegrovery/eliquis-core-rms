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

	/* LEARN TAB */
	{ text: 'Introduction', header: true, type: 'learn', key: 'startHere' },
		{ text: 'Introduction', slug: 'introduction', key: 'introduction' },
		{ text: 'How to use CORE', slug: 'introduction/how-to-use-e360-ffn', key: 'how-to-use-e360-ffn' },
		{ text: 'About Grovery Support', slug: 'introduction/about-eliquis-360', key: 'about-eliquis-360' },
		{ text: 'Frequently Asked Questions', slug: 'introduction/faqs', key: 'faqs' },
		{ text: 'Glossary of Terms', slug: 'introduction/glossary', key: 'glossary' },

	{ text: 'Meeting Prep', header: true, type: 'learn', key: 'meeting-prep' },
		{ text: 'ASCO Conference', slug: 'meeting-prep/asco-conference', key: 'ASCO-Conference' },

	{ text: 'Program in Practice', header: true, type: 'learn', key: 'program-in-practice' },
		{ text: 'About Program in Practice', slug: 'program-in-practice/about-program-in-practice', key: 'about-program-in-practice' },
		{ text: 'How 1-800-GROVERY Works', slug: 'program-in-practice/how-1-855-eliquis-works', key: 'how-1-855-eliquis-works' },
		{ text: 'Provider expresses that patient is concerned about high out-of-pocket costs', slug: 'program-in-practice/provider-expresses-that-patient-is-concerned-about-high-out-of-pocket-costs', key: 'provider-expresses-that-patient-is-concerned-about-high-out-of-pocket-costs ' },
		{ text: 'Provider Expresses That Patient Unable To Get Prescription Filled', slug: 'program-in-practice/provider-expresses-that-patient-unable-to-get-prescription-filled', key: 'provider-expresses-that-patient-unable-to-get-prescription-filled' },
		{ text: 'Pharmacist says Medicare, Medicaid, DOD, TRICARE, Veterans Affairs (VA) and CHAMPUS Patients are not eligible For co-pay assistance', slug: 'program-in-practice/pharmacist-says-medicare-medicaid-dod-tricare-va-champus-patients-are-not-eligible-for-co-pay-assistance' },
		{ text: 'Co-pay Backdate Request', slug: 'program-in-practice/co-pay-backdate-request', key: 'co-pay-backdate-request' },
		{ text: 'Provider Expresses That Patient Unaware Of Co-pay Program And/or Hasn’t Been Using Co-pay Card', slug: 'program-in-practice/provider-expresses-that-patient-unaware-of-co-pay-program-andor-hasnt-been-using-co-pay-card', key: 'provider-expresses-that-patient-unaware-of-co-pay-program-andor-hasnt-been-using-co-pay-card' },
		{ text: 'Mail-Order Pharmacy', slug: 'program-in-practice/mail-order-pharmacy', key: 'mail-order-pharmacy' },

	{ text: 'Terms & Conditions', header: true, type: 'learn', key: 'terms-and-conditions' },
		{ text: 'Co-pay Terms and Conditions and Eligibility Requirements for Patients', slug: 'terms-and-conditions/co-pay-terms-and-conditions-and-eligibility-requirements-for-patients', key: 'co-pay-terms-and-conditions-and-eligibility-requirements-for-patients' },
		{ text: 'FTO Terms and Conditions and Eligibility Requirements for Patients', slug: 'terms-and-conditions/fto-terms-and-conditions-and-eligibility-requirements-for-patients', key: 'fto-terms-and-conditions-and-eligibility-requirements-for-patients' },
		


	/* RESOURCES TAB */

	{ text: 'Internal Resources', header: true, type: 'api', key: 'internal-resources' },
		{ text: 'Internal Resources Overview', slug: 'internal-resources/internal-resources-overview', key: 'internal-resources/internal-resources-overview' },
		{ text: 'Collateral Materials', slug: 'internal-resources/collateral-materials', key: 'internal-resources/collateral-materials' },
		{ text: 'Digital Collateral', slug: 'internal-resources/digital-collateral', key: 'internal-resources/digital-collateral' },
		{ text: 'Grovery Patient Support Services FAQ', slug: 'internal-resources/eliquis-360-patient-support-services-faq', key: 'internal-resources/eliquis-360-patient-support-services-faq' },
		{ text: 'Training Deck', slug: 'internal-resources/track-ii-training-deck', key: 'internal-resources/track-ii-training-deck' },


	{ text: 'External Resources', header: true, type: 'api', key: 'external-resources' },
		{ text: 'External Resources Overview', slug: 'external-resources/external-resources-overview', key: 'external-resources/external-resources-overview' },
		{ text: 'Websites', slug: 'external-resources/websites', key: 'external-resources/websites' },
		{ text: 'Downloads', slug: 'external-resources/downloads', key: 'external-resources/downloads' },
		{ text: 'Forms', slug: 'external-resources/forms', key: 'external-resources/forms' },
		{ text: 'Other/Additional Support', slug: 'external-resources/additional-support', key: 'external-resources/additional-support' },



] as const;
