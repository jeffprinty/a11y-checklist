const colorLink = (url, type) => `https://www.toptal.com/designers/colorfilter?orig_uri=${url}&process_type=${type}`;

export const toolData = {
  tenon: {
    url: 'http://tenon.io'
  },
  JAWS: {
    url: 'http://www.freedomscientific.com/Products/Blindness/JAWS'
  },
  NVDA: {
    url: 'https://www.nvaccess.org/'
  },
  ColorContrastAnalyzer: {
    url: 'https://www.paciellogroup.com/resources/contrastanalyser/'
  }
};

export function customData(key, url) {
  const dataHash = {
    '1-1-1': {
      summary: 'Provide text alternatives for non-text content',
      responsibility: [ 'editorial', 'production' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon', 'JAWS', 'NVDA' ],
        checklist: [
          'Make sure placeholder attributes are NOT being used in place of label tags.',
          'If non-text content is a control or accepts user input, then it has a name that describes its purpose.',
          'If non-text content is decorative, it is implemented in a way that can be ignored by screen readers'
        ]
      },
      phase2: 'Form Field Labels:<br/>Tie each user input control (e.g. text field, radio button, pull-down menu) to text that describes the purpose of the control, using conventions for the media type. It should be noted that placeholder text by itself is not an adequate labeling technique.',
      phase3: `Images that Provide Info: If an image provides information, provide the same information in a text alternative.
  Image Buttons and Links If an image represents a control or a link, provide text that can serve the same purpose when images are not available.
  Decorative and Redundant Images: Allow screen reading software to ignore features that are purely decorative, including images whose meaning is fully expressed through adjacent text.`
    },
    '1-2-1': {
      summary: 'Provide an alternative to video-only and audio-only content',
      responsibility: [ 'editorial', 'production' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          'Provide alternatives for any time-based media'
        ]
      },
      phase4: 'Transcripts and Visual Alerts: When audio provides information: Provide the same information in a text transcript OR in the case of audio used to indicate status (e.g. a beep, "You\'ve got mail"), provide a visual indication of status as well'
    },
    '1-2-2': {
      summary: 'Provide captions for videos with audio',
      responsibility: [ 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          'Videos with audio have accessible captions'
        ]
      },
      phase4: 'Captions When movies, animations, slideshows or games use synchronized visuals and sound to provide information, use captions to provide all important auditory information. '
    },
    '1-2-3': {
      summary: 'Video with audio has a second alternative',
      responsibility: [ 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          'Provide audio description or alternative for prerecorded video content'
        ]
      },
      phase3: 'Complete Narration and Audio Description: When multimedia (e.g. video, narrated animation) includes important visual and auditory information, provide spoken description of any significant visual elements that would be missed when listening to the audio alone.'
    },
    '1-2-4': {
      summary: 'Live Video with audio has a second alternative',
      responsibility: [ 'editorial', 'live' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          'Captions are provided for live video'
        ]
      }
    },
    '1-2-5': {
      summary: 'Users have access to audio description for video content',
      responsibility: [ 'dev', 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          'Provide audio description for prerecorded video content'
        ]
      },
      phase3: 'Complete Narration and Audio Description: When multimedia (e.g. video, narrated animation) includes important visual and auditory information, provide spoken description of any significant visual elements that would be missed when listening to the audio alone.'
    },
    '1-2-6': {
      summary: 'Provide sign language translations for videos',
      responsibility: [ 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '1-2-7': {
      summary: 'Provide extended audio description for videos',
      responsibility: [ 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      },
      phase3: 'Complete Narration and Audio Description: When multimedia (e.g. video, narrated animation) includes important visual and auditory information, provide spoken description of any significant visual elements that would be missed when listening to the audio alone.'
    },
    '1-2-8': {
      summary: 'Provide a text alternative to your videos',
      responsibility: [ 'editorial', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '1-2-9': {
      summary: 'Provide alternatives for live audio',
      responsibility: [ 'live', 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '1-3-1': {
      summary: 'Structure your website logically',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          `Required <a href="${url}">form fields</a> are labelled accordingly`,
          'Checkboxes can be programmatically determined',
          'Information displayed through color is also accessible in text',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/ARIA11.html">ARIA11: Using ARIA landmarks to identify regions of a page</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/ARIA12.html">ARIA12: Using role=heading to identify headings</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/ARIA13.html">ARIA13: Using aria-labelledby to name regions and landmarks</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/ARIA16.html">ARIA16: Using aria-labelledby to provide a name for user interface controls</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/ARIA17.html">ARIA17: Using grouping roles to identify related form controls</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/ARIA20.html">ARIA20: Using the region role to identify a region of the page</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/G115.html">G115: Using semantic elements to mark up structure</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/H49.html">H49: Using semantic markup to mark emphasized or special text</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/G117.html">G117: Using text to convey information that is conveyed by variations in presentation of text</a>'
        ]
      },
      phase1: 'Identify roles (e.g. heading, numbered list, bulleted list, data table, paragraph, emphasized text) of page elements using conventions for the media type. (And do not misidentify roles by using those conventions solely for their visual effects.)<br/>When text formatting (e.g. italic, underline, bold, font size) is used to provide information that goes beyond emphasis, also provide the information through an additional method.',
      phase2: 'Do not use presentation layers (e.g. css, styles) to provide information unless the information is also presented through content or through semantic markup. (And do not use presentation layers to hide content that would be disruptive or misleading if shown.)',
      phase4: "Hidden or Dimmed Content Ensure screen readers will ignore content that has been hidden or dimmed as part of the media's functionality if the inclusion of that content would be confusing or misleading.<br/>Mirroring Source Materials When creating alternative versions (e.g. alt-text for an image, e-book alternative to a printed text), keep content divisions (e.g. page numbers, learning unit divisions) and user interface elements (e.g. text label for a button, whether a list is numbered or bulleted) consistent with the standard version."
    },
    '1-3-2': {
      summary: 'Present your website content in a meaningful order',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon', 'JAWS', 'NVDA' ],
        checklist: [
          'Use tabindex responsibly',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/C27.html">C27: Making the DOM order match the visual order</a>'
        ]
      },
      phase1: 'Ensure that current screen reading software (screen readers) can read the media in a sensible order.',
      phase2: 'User Interface Instructions  When identifying features of user interfaces in instructions and help content, include semantic information and labels as opposed to exclusively referring to visual formatting (e.g. "the option furthest to the right", "in the blue area") or to auditory information (e.g. "when you hear a beep").',
      phase4: "Hidden or Dimmed Content Ensure screen readers will ignore content that has been hidden or dimmed as part of the media's functionality if the inclusion of that content would be confusing or misleading."
    },
    '1-3-3': {
      summary: 'Use more than one sense for instructions',
      responsibility: [ 'dev', 'UX', 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/G96.html">G96: Providing textual identification of items that otherwise rely only on sensory information to be understood</a>'
        ]
      }
    },
    '1-4-1': {
      summary: 'Don’t use presentation that relies solely on colour',
      responsibility: [ 'dev', 'UX', 'editorial', 'production' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          `<a href="${colorLink(url, 'deutan')}" target="_new">Check your site for deutanopia</a>`,
          `<a href="${colorLink(url, 'protan')}" target="_new">Check your site for protanopia</a>`,
          `<a href="${colorLink(url, 'tritan')}" target="_new">Check your site for tritanopia</a>`,
          'Use your site with the <a href="http://daltonize.appspot.com/" target="_new">Daltonize bookmarklets</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/G14.html">G14: Ensuring that information conveyed by color differences is also available in text</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/C15.html">C15: Using CSS to change the presentation of a user interface component when it receives focus</a>'
        ]
      },
      phase3: `Don’t Rely on Color Coding<br/>
When color is used to provide information, also provide the information through another visual method.
Color Contrast in Key Images  Design graphics so that pertinent content will not be lost from lack of contrast when viewed with common variations in color-vision (color-blindness).`
    },
    '1-4-2': {
      summary: 'Don’t play audio automatically',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [ 'ColorContrastAnalyzer' ],
        checklist: [
          'Audio does not play automatically'
        ]
      },
      phase4: 'If audio plays longer than three seconds, either only play the audio on user request or allow it to be stopped easily using a screen reader. Allow users to restart and replay any audio that provides information.'
    },
    '1-4-3': {
      summary: 'Contrast ratio between your text and background is at least 4.5:1',
      responsibility: [ 'dev', 'UX', 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [ 'ColorContrastAnalyzer' ],
        checklist: [
          'Use <a href="https://macmillanlearning.atlassian.net/wiki/display/CDL/Accessible+Combinations">CDL Accessible Combinations</a>',
          'Check website contrast with <a href="http://www.checkmycolours.com/">checkmycolours.com</a>.'
        ]
      },
      phase3: `Contrast for Text Readability
Using a contrast ratio tool, choose text color and text background color so that the contrast ratio between the colors is at least:
<ul><li>4.5:1 for small text</li>
<li>3:1 for text that is at least 18 points or bold 14 points (it should be noted that font sizes for this particular guideline are measured in points, not pixels, presenting a challenge in accurately measuring “large” text, thus we do not recommend using this exception).</li>
<li>7:1 when one of the colors is red (or nearly red) and other color is black (or nearly black)</li>
<li>3:1 for link text vs. surrounding text when color is the only differentiating characteristic of link text (e.g. no underline).</li>
</ul>`
    },
    '1-4-4': {
      summary: 'Text can be resized to 200% without loss of content or function',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [ 'browser' ],
        checklist: [
          'Increase the text size of the content by 200% and check that no text is clipped, truncated, or obscured.'
        ]
      },
      phase2: 'Text Resize: Ensure that text size (except for captions) can be increased to at least 200% using controls in either the user agent (e.g. Web browser, PDF reader, Flash player) or the media. No content or functionality should be lost.'
    },
    '1-4-5': {
      summary: "Don't use images of text",
      responsibility: [ 'dev', 'editorial', 'production' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          'Test your site to make sure it still works when zoomed up to 200%'
        ]
      },
      phase2: `Encoded Text:<br/>
  Use encoded text instead of images of text except:
  <ul><li>Where the particular presentation is essential (e.g. image of an ancient manuscript, hand writing sample, screen capture, logo); or</li>
  <li>Where the text in question is not the main body copy and images of text are the only way to achieve the design goals (e.g. special font, anti-aliasing)</li></ul>`
    },
    '1-4-6': {
      summary: 'Contrast ratio between your text and background is at least 7:1',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          'Check website contrast with <a href="http://www.checkmycolours.com/">checkmycolours.com</a>.'
        ]
      }
    },
    '1-4-7': {
      summary: 'Your audio is clear for listeners to hear',
      responsibility: [ 'editorial' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          'Listen to all audio sources to ensure clarity'
        ]
      },
      phase4: 'Audio Clarity/Contrast: When you have the opportunity to set the volume of speech relative to volume of background sound: Allow the user to access the foreground speech without the background sound (e.g. control to turn off background sound, separate volume controls) OR Set the background sound to be 20 decibels lower than the foreground speech'
    },
    '1-4-8': {
      summary: 'Offer users a range of presentation options',
      responsibility: [ 'dev' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [

        ]
      }
    },
    '1-4-9': {
      summary: "Don't use images of text",
      responsibility: [ 'dev', 'UX', 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '2-1-1': {
      summary: 'Accessible by keyboard only',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          'Site structure makes sense without a mouse',
          'Hide your mouse and use your app'
        ]
      },
      phase1: 'Ensure that keyboard keys (instead of a mouse and instead of touch screen gestures that require eye-hand coordination) can be used to: Reach and operate all controls AND Navigate through active elements, following the reading order '
    },
    '2-1-2': {
      summary: 'Your website must not trap keyboard users',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          'Navigate to all modal dialogs and ensure that they can be used exclusively with a keyboard'
        ]
      },
      phase1: 'Provide instructions describing the keys (or gestures) needed for keyboard access if your media uses keys or techniques that differ from user agent (e.g. Web browser, PDF reader) or mobile device defaults.'
    },
    '2-1-3': {
      summary: 'Your website is accessible by keyboard only, without exception',
      responsibility: [ 'dev' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [

        ]
      }
    },
    '2-2-1': {
      summary: 'Time limits have user controls',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [

        ]
      },
      phase1: `If Macmillan Guideline 2 would invalidate a timed activity:<br/>
  <ul><li>Allow instructors or administrators to adjust time limits for particular students OR</li>
  <li>Allow students to adjust the time or just complete the activity after the time limit is reached. And, record the time spent with the results.</li></ul>`
    },
    '2-2-2': {
      summary: 'Provide user controls for moving content',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          'All moving information can be paused',
          'Information that updates automatically can be paused'
        ]
      },
      phase3: `Ability to Stop Motion:
  <ul><li>Allow users to stop any content that moves for more than five seconds or that updates automatically</li>
  <li>Stationary View of Moving Content: Allow the user to read text, equations & diagrams while they are not moving, auto scrolling or being automatically changed/replaced.</li>
  </ul>`
    },
    '2-2-3': {
      summary: 'No time limits on your website',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '2-2-4': {
      summary: "Don't interrupt your users",
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [

        ]
      }
    },
    '2-2-5': {
      summary: 'Save user data when re-authenticating',
      responsibility: [ 'dev' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '2-3-1': {
      summary: 'No content flashes more than three times per second',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [

        ]
      },
      phase3: 'No Blinking/No Flickering  Design e-learning so that it does not cause blink, flash or flicker.'
    },
    '2-3-2': {
      summary: 'No content flashes more than three times per second',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [

        ]
      },
      phase3: 'No Blinking/No Flickering  Design e-learning so that it does not cause blink, flash or flicker.'
    },
    '2-4-1': {
      summary: 'Provide a ‘Skip to Content’ link',
      responsibility: [ 'dev', 'UX', 'production' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon', 'JAWS', 'NVDA' ],
        checklist: [
          '<a href="http://www.w3.org/TR/WCAG20-TECHS/G1.html">G1: Adding a link at the top of each page that goes directly to the main content area</a>'
        ]
      },
      phase1: 'When distinguishable features or sections (e.g. navigation, main content, individual news articles) appear on a page or in a document, provide a way to navigate to the features or sections using a screen reader and the keyboard.'
    },
    '2-4-10': {
      summary: 'Break up content with headings',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          'Test your site with JAWS',
          'Test your site with NVDA',
          'Test your site with Mac VoiceOver'
        ]
      }
    },
    '2-4-2': {
      summary: 'Use helpful and clear page titles',
      responsibility: [ 'dev', 'UX', 'editorial', 'production' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          '<a href="http://www.w3.org/TR/WCAG20-TECHS/G88.html">G88: Providing descriptive titles for Web pages</a>'
        ]
      },
      phase2: `Page and Frames Titles:<br/>
  For each frame and for each primary media file (e.g. HTML page, Flash movie, PDF document) provide a title that:
  <ul><li>Reflects the purpose or topic of the frame or file; and,</li>
  <li>Differentiates the frame or file from the others in your site</li></ul>`
    },
    '2-4-3': {
      summary: 'Keyboard focus moves in a logical order in the page',
      responsibility: [ 'dev', 'UX', 'production' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/H4.html">Create a logical tab order through links, form controls, and objects</a>',
          'Use tabindex properly',
          '<a href="http://www.w3.org/TR/WCAG20-TECHS/C27.html">C27: Making the DOM order match the visual order</a>'
        ]
      }
    },
    '2-4-4': {
      summary: "Every link's purpose is clear from its context",
      responsibility: [ 'dev', 'UX', 'editorial' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          'Make sure link text is descriptive'

        ]
      },
      phase2: `Meaningful Link Text:<br/>
  Write links so that a user who is aware of the topic of the page will understand the purpose of the link when reading one of the following:
  <ul><li>Link Text Alone: Link text out of context (preferred if possible without awkwardness or redundant text. This is a WCAG 2.0 AAA success criteria, and while it’s the best practice, it’s not a requirement.)</li>
  <li>Nearest Heading, Nearest Parent List Item, or Table Headers: Link text and the nearest heading above the link, OR link text and the nearest parent list item in a nested list, OR link text in a data table cell and the cell's table headers (These options are only available where semantic markup is possible as in HTML.)</li>
  <li>Sentence: Link text and the sentence that contains the link.</li>
  <li>Link Pattern: Link text within the context of other links preceding the link on the same page.</li>
  </ul>`
    },
    '2-4-5': {
      summary: 'Offer several ways to find pages on your website',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '2-4-6': {
      summary: 'Use clear headings and labels',
      responsibility: [ 'dev', 'UX', 'editorial', 'production' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/G130.html">G130: Providing descriptive headings</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/G131.html">G131: Providing descriptive labels</a>'
        ]
      }
    },
    '2-4-7': {
      summary: 'Ensure keyboard focus is visible and clear',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/G149.html">G149: Using user interface components that are highlighted by the user agent when they receive focus</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/C15.html">C15: Using CSS to change the presentation of a user interface component when it receives focus</a>'
        ]
      },
      phase1: "Ensure that the user's location on the page will be visually apparent when keyboard keys are used to move from item to item."
    },
    '2-4-8': {
      summary: 'Let users know where they are on your website',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '2-4-9': {
      summary: "Every link's purpose is clear from its text",
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [

        ]
      },
      phase2: "Meaningful Link Text: Write links so that a user who is aware of the topic of the page will understand the purpose of the link when reading one of the following: Link Text Alone: Link text out of context (preferred if possible without awkwardness or redundant text. This is a WCAG 2.0 AAA success criteria, and while it’s the best practice, it’s not a requirement.) Nearest Heading, Nearest Parent List Item, or Table Headers: Link text and the nearest heading above the link, OR link text and the nearest parent list item in a nested list, OR link text in a data table cell and the cell's table headers (These options are only available where semantic markup is possible as in HTML.) Sentence: Link text and the sentence that contains the link. Link Pattern: Link text within the context of other links preceding the link on the same page."
    },
    '3-1-1': {
      summary: 'Every page of your website has a language assigned',
      responsibility: [ 'dev', 'production' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/H57.html">H57: Using language attributes on the html element</a>'
        ]
      },
      phase2: 'Human Language: Indicate human language (e.g. Arabic, Chinese, English) following conventions for the media type.'
    },
    '3-1-2': {
      summary: 'Tell users when the language on a page changes',
      responsibility: [ 'dev', 'production' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      },
      phase2: 'Human Language:<br/>Indicate human language (e.g. Arabic, Chinese, English) following conventions for the media type.'
    },
    '3-1-3': {
      summary: 'Explain any strange words',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '3-1-4': {
      summary: 'Explain any abbreviations',
      responsibility: [ 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '3-1-5': {
      summary: 'Users with nine years of school can read your content',
      responsibility: [ 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '3-1-6': {
      summary: 'Explain any words that are hard to pronounce',
      responsibility: [ 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '3-2-1': {
      summary: 'Elements do not change when they receive focus',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/G107.html">G107: Using &quot;activate&quot; rather than &quot;focus&quot; as a trigger for changes of context</a>'
        ]
      },
      phase1: `Do not change the user's location (e.g. place on the page, page/url, frame, window or user agent) as follows:<br/>
  <ul><li>When the user moves to (on focus, on mouse over, on touch start) or away from (on blur, on mouse out, on touch end) any element including form control options OR</li>
  <li>When the user changes the setting of a UI control, unless each option can be reached by the keyboard without selecting it and it is clear what will happen when the setting is changed</li>
  </ul>`
    },
    '3-2-2': {
      summary: 'Elements do not change when they receive input',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/G80.html">G80: Providing a submit button to initiate a change of context</a>',
          '<a target="_new" href="http://www.w3.org/TR/WCAG20-TECHS/G13.html">G13: Describing what will happen before a change to a form control that causes a change of context to occur is made</a>'
        ]
      }
    },
    '3-2-3': {
      summary: 'Provide navigation in the same place across your website',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '3-2-4': {
      summary: 'Identify components appearing in multiple places in a consistent way',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '3-2-5': {
      summary: 'Don’t change elements on your website until users ask',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [

        ]
      }
    },
    '3-3-1': {
      summary: 'Clearly identify input errors',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '3-3-2': {
      summary: 'Label elements and give instructions',
      responsibility: [ 'dev', 'UX', 'editorial' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [

        ]
      }
    },
    '3-3-3': {
      summary: 'Suggest fixes when users make errors',
      responsibility: [ 'dev', 'UX', 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '3-3-4': {
      summary: 'Reduce the risk of input errors for sensitive data',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '3-3-5': {
      summary: 'Your website has detailed help and instructions',
      responsibility: [ 'UX', 'editorial' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '3-3-6': {
      summary: 'Reduce the risk of all input errors',
      responsibility: [ 'dev', 'UX' ],
      testing: {
        description: '',
        automatable: false,
        tools: [],
        checklist: [

        ]
      }
    },
    '4-1-1': {
      summary: 'Your website has no major code errors',
      responsibility: [ 'dev' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon' ],
        checklist: [
          'Use eslint or similar to check your code for errors'
        ]
      },
      phase2: 'Valid Markup and Spelling  When using markup languages (e.g. HTML, XHTML, SMIL) follow the specifications for the language and test for errors using a validator. When using human languages (e.g. English, Hindi, Japanese) test for spelling errors using a spell checker. '
    },
    '4-1-2': {
      summary: 'Build all elements for accessibility',
      responsibility: [ 'dev', 'editorial', 'production' ],
      testing: {
        description: '',
        automatable: true,
        tools: [ 'tenon', 'JAWS', 'NVDA' ],
        checklist: [
          'Use and contribute to the <a href="https://github.com/mlazul/ml-a11y-cdl-components" target="_new">Macmillan a11y Component Library</a>'
        ]
      },
      phase1: 'Ensure that screen reader users can find new dynamically-added content (e.g. expanding menus, alerts, error messages, hints that appear on rollover).',
      phase2: 'UI Control Role, Name, State & Options Use standard user input controls (e.g. HTML form controls, Flash accessible components) for their intended purpose or, if no appropriate standard controls exist, create or repurpose controls so 130 that screen readers present the role, name, current state (including changes in state) and available options.'
    }
  };
  return dataHash[key];
}
