# HTML

<expand title="Version History (Main Versions)">
## Version History (Main Versions)

- HTML 1.0 - 1993
- HTML 2.0 - 1995
- HTML 3.2 - 1997
- HTML 4.0 - 1997
- HTML 4.01 - 1999
- XHTML 1.0 - 2000
- HTML5 - 2014
- HTML5.1 - 2016
- HTML5.2 - 2017
- HTML5.3 - Ongoing

Primary Concepts

</expand>

<expand title="Notes">
## Notes

- HyperText Markup Language - standard markup language for creating web pages
- Defines structure and content of web documents
- HTML5 is the current version
- Text Editors: Notepad, VS Code, Sublime Text, Atom, etc.

</expand>

<expand title="Document Structure">
## Document Structure

- <!DOCTYPE html>: Document type declaration, informs browser about HTML version
- <html>: Root element containing entire HTML document
- <head>: Contains metadata, links to external resources
- <body>: Contains visible content of the document

</expand>

<expand title="HTML5 Semantic Tags">
## HTML5 Semantic Tags

- <article>: Independent piece of content (blog post, article, etc.)
- <aside>: Content tangentially related to main content
- <header>: Introductory content or navigation
- <footer>: Footer for document or section
- <nav>: Navigation links
- <main>: Main content of document
- <section>: Thematic grouping of content
- <figure>: Self-contained content (photos, diagrams, etc.)
- <figcaption>: Caption for figure element
- <mark>: Highlighted/marked text
- <time>: Represents time or date
- <progress>: Represents progress of a task
- <details>: Additional information or controls
- <summary>: Summary/caption for <details> element
- <dialog>: Creates popup dialog on webpage
- <audio>: Embeds audio content
- <video>: Embeds video content
- <canvas>: Used for drawing graphics via JavaScript

</expand>

<expand title="Form Elements">
## Form Elements

- <form action="url" method="get|post">: Container for form elements
- <input>: Various input types (text, email, password, checkbox, radio, submit, etc.)
- <textarea>: Multi-line text input
- <select>: Dropdown list
- <option>: Option in select dropdown
- <button>: Clickable button
- <label>: Label for form control
- <fieldset>: Groups related form elements
- <legend>: Caption for fieldset
- <datalist>: Provides autocomplete feature for input fields

</expand>

<expand title="Table Elements">
## Table Elements

- <table>: Container for table
- <thead>: Table header section
- <tbody>: Table body section
- <tfoot>: Table footer section
- <tr>: Table row
- <th>: Table header cell
- <td>: Table data cell
- <colgroup>: Groups columns for styling
- <col>: Specifies properties for columns

</expand>

<expand title="Lists">
## Lists

- Ordered List (<ol>): Numbered list with <li> items
- Unordered List (<ul>): Bulleted list with <li> items
- Description List (<dl>):
  - <dt>: Definition term
  - <dd>: Definition description

</expand>

<expand title="Text Formatting">
## Text Formatting

- <b> or <strong>: Bold text (strong is semantic, preferred)
- <i> or <em>: Italic text (em is semantic, preferred)
- <u>: Underlined text
- <mark>: Highlighted text
- <small>: Smaller text
- <sub>: Subscript text
- <sup>: Superscript text
- <del>: Deleted text (strikethrough)
- <ins>: Inserted text
- <code>: Computer code
- <pre>: Preformatted text (preserves whitespace)
- <blockquote>: Block quotation from another source
- <cite>: Citation or reference
- <q>: Short inline quotation

</expand>

<expand title="Links and Media">
## Links and Media

- <a href="url">: Hyperlink to another page/resource
- <img src="url" alt="text">: Embeds image
- <iframe src="url">: Embeds another HTML page
- <embed>: Embeds external document/multimedia
- <object>: Embeds multimedia files (video, audio, PDF, etc.)
- <audio>: Embeds audio content
- <video>: Embeds video content

</expand>

<expand title="Metadata and Resources">
## Metadata and Resources

- <head>: Contains document metadata
- <title>: Page title (shown in browser tab)
- <meta>: Metadata (charset, description, keywords, etc.)
- <link rel="stylesheet" href="url">: Links external stylesheet
- <script src="url">: Links external JavaScript file
- <style>: Internal CSS styles
- <base href="url">: Base URL for all relative URLs in document

</expand>

<expand title="Other Important Tags">
## Other Important Tags

- <div>: Generic block-level container
- <span>: Generic inline container
- <br>: Line break
- <hr>: Horizontal rule (thematic break)
- <p>: Paragraph
- <h1> to <h6>: Heading levels (h1 is highest/most important)
- <abbr title="full form">: Abbreviation with full form on hover
- <address>: Contact information
- <bdo dir="rtl|ltr">: Overrides text direction (bidirectional override)
- <bdi>: Bidirectional isolate element
- <template>: Holds client-side content (rendered at runtime via JavaScript)
- <noscript>: Content displayed when JavaScript is disabled

Secondary Concepts

</expand>

<expand title="Block-level vs Inline Elements">
## Block-level vs Inline Elements

- Block-level Elements:
  - Take full width, start on new line
  - Examples: <div>, <p>, <h1>-<h6>, <section>, <article>, <header>, <footer>, <nav>, <form>, <table>, <ul>, <ol>, <li>
- Inline Elements:
  - Take only necessary width, stay in same line
  - Examples: <span>, <a>, <img>, <strong>, <em>, <code>, <button>, <input>, <label>, <select>

</expand>

<expand title="Deprecated Tags (Not in HTML5)">
## Deprecated Tags (Not in HTML5)

- <applet>: Use <object> or <embed> instead
- <basefont>: Use CSS instead
- <big>: Use CSS instead
- <dir>: Use <ul> instead
- <marquee>: Non-standard, avoid using

</expand>

<expand title="Form Methods">
## Form Methods

- GET: Data appended to URL, visible in address bar, limited data size
- POST: Data sent in request body, not visible in URL, larger data size

</expand>

<expand title="Attributes">
## Attributes

- id: Unique identifier for element
- class: CSS class selector (can be multiple)
- src: Source URL for media elements
- href: Hyperlink reference
- alt: Alternative text for images (accessibility)
- title: Tooltip text
- data-*: Custom data attributes
- aria-*: Accessibility attributes
- role: ARIA role for accessibility

</expand>

<expand title="Best Practices">
## Best Practices

- Use semantic HTML5 elements when possible
- Always include alt attribute for images
- Use proper heading hierarchy (h1 → h2 → h3)
- Ensure proper document structure
- Use meaningful id and class names
- Validate HTML markup
- Separate content (HTML), presentation (CSS), and behavior (JavaScript)

</expand>

