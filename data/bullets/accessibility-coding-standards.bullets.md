- Key Goals:
  - Create an inclusive strategy considering accessibility needs during site architecture.
  - Incorporate accessible coding using best practices to ensure content can be navigated and read by all.
  - Follow normalized testing to ensure code is accessible.

- General Best Practices:
  - Provide text alternatives (alt text) for non-text content.
  - Provide accurate transcripts, captions, and descriptions for video content.
  - Ensure color choices have sufficient contrast for users with visual impairments.
  - Test to ensure the website is keyboard-navigable.
  - Use semantic HTML tags to structure content for assistive technologies.
  - Default to using HTML whenever possible and use WAI-ARIA modestly.
  - Regularly check your work using automated checkers and manual testing.

- Technical Standards:
  - Public-facing code should strive to meet Web Content Accessibility Guidelines (WCAG) 2.2 AA.
  - Author-facing interfaces should strive to meet the Authoring Tool Accessibility Guidelines (ATAG) 2.0.

- Implementation:
  - Use WAI-ARIA attributes to add semantic meaning to markup and markup patterns.
  - Announce changes to content on a page following user input to screen reader users with aria-live.
  - Ensure any feature that can be operated using a mouse can also work using a keyboard.
  - Use Drupal's CSS classes to hide content in various ways depending on the need.

- Inline Form Errors:
  - Highlight errors next to the input field to make it easier for users to locate and correct their errors.

- Related Form Elements:
  - Use a <fieldset> with a <legend> element to make visually grouped form inputs machine-readable.

- Using animation responsibly:
  - Consider how animation will improve the user experience before adding it.
  - Respect user preferences for animation.

- Testing Your Work:
  - Use automated accessibility checkers to start an accessibility test.
  - Test that your module/theme is keyboard accessible.
  - Test with assistive technology like the NVDA Screen Reader or Apple’s VoiceOver.
  - Test the accessibility of your forms to ensure a non-visual user will be alerted to the error.