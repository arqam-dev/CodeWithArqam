# Styling

<expand title="Version History (CSS Versions)">
## Version History (CSS Versions)

- CSS1 - 1996
- CSS2 - 1998
- CSS2.1 - 2011
- CSS3 - 1999 (Ongoing modular development)
- CSS4 - Not a single version, features added incrementally

Primary Concepts

</expand>

<expand title="Notes">
## Notes

- Cascading Style Sheets - stylesheet language used to describe presentation of HTML documents
- Separates content (HTML) from presentation (CSS)
- Three ways to add CSS: Inline, Internal (style tag), External (link tag)

</expand>

<expand title="Selectors">
## Selectors

- Element selector: p { }
- Class selector: .classname { }
- ID selector: #idname { }
- Universal selector: * { }
- Attribute selector: [attribute="value"] { }
- Descendant selector: div p { }
- Child selector: div > p { }
- Adjacent sibling: div + p { }
- General sibling: div ~ p { }

</expand>

<expand title="Pseudo-classes">
## Pseudo-classes

- :hover - When mouse hovers over element
- :focus - When element receives focus
- :active - When element is activated
- :visited - For visited links
- :first-child, :last-child - First/last child element
- :nth-child(n) - nth child element
- :not(selector) - Elements not matching selector

</expand>

<expand title="Pseudo-elements">
## Pseudo-elements

- ::before - Insert content before element
- ::after - Insert content after element
- ::first-line - Style first line of text
- ::first-letter - Style first letter of text
- ::selection - Style selected text

</expand>

<expand title="Box Model">
## Box Model

- Content - Actual content of the box
- Padding - Space between content and border
- Border - Border around padding
- Margin - Space outside border
- box-sizing property:
  - content-box (default) - Width/height includes only content
  - border-box - Width/height includes content, padding, and border

</expand>

<expand title="Positioning">
## Positioning

- Static - Default positioning
- Relative - Positioned relative to normal position
- Absolute - Positioned relative to nearest positioned ancestor
- Fixed - Positioned relative to viewport (stays in place on scroll)
- Sticky - Behaves like relative until scroll threshold, then fixed

</expand>

<expand title="Display Property">
## Display Property

- block - Block-level element (takes full width)
- inline - Inline element (takes only content width)
- inline-block - Inline but can have width/height
- flex - Flexbox container
- grid - Grid container
- none - Element not displayed

</expand>

<expand title="Flexbox">
## Flexbox

- Container properties:
  - display: flex
  - flex-direction: row, column, row-reverse, column-reverse
  - justify-content: flex-start, flex-end, center, space-between, space-around
  - align-items: flex-start, flex-end, center, stretch, baseline
  - flex-wrap: nowrap, wrap, wrap-reverse
- Item properties:
  - flex-grow - Ability to grow
  - flex-shrink - Ability to shrink
  - flex-basis - Initial size
  - align-self - Override align-items for specific item

</expand>

<expand title="CSS Grid">
## CSS Grid

- Container properties:
  - display: grid
  - grid-template-columns - Define columns
  - grid-template-rows - Define rows
  - gap / grid-gap - Space between grid items
- Item properties:
  - grid-column - Column placement
  - grid-row - Row placement
  - grid-area - Named grid area

</expand>

<expand title="Transform">
## Transform

- transform: translate(x, y) - Move element
- transform: rotate(deg) - Rotate element
- transform: scale(x, y) - Scale element
- transform: skew(x, y) - Skew element
- transform-origin - Set origin point for transformations
- Multiple transforms can be combined

</expand>

<expand title="Transitions & Animations">
## Transitions & Animations

- transition: property duration timing-function delay
- Common properties: opacity, transform, background-color
- @keyframes - Define animation sequences
- animation: name duration timing-function delay iteration-count direction

</expand>

<expand title="Responsive Design">
## Responsive Design

- Media Queries: @media (condition) { }
- Common breakpoints: 768px (tablets), 1024px (desktops), 1200px (large screens)
- Viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">

</expand>

<expand title="Specificity">
## Specificity

- Calculates which CSS rule applies when multiple rules target same element
- Inline styles > IDs > Classes/Attributes > Elements
- Higher specificity wins
- !important overrides all specificity rules (use sparingly)

</expand>

<expand title="Units">
## Units

- Absolute: px (pixels), pt (points), cm, mm
- Relative: % (percentage), em (relative to font-size), rem (relative to root font-size)
- Viewport: vw (viewport width), vh (viewport height), vmin, vmax

</expand>

<expand title="Common Properties">
## Common Properties

- color, background-color, font-size, font-family, font-weight
- text-align, text-decoration, line-height, letter-spacing
- width, height, max-width, max-height, min-width, min-height
- margin, padding (with shorthand: top right bottom left)
- border, border-radius, box-shadow
- opacity, visibility, display
- z-index - Controls stacking order of positioned elements

Secondary Concepts

AJAX

</expand>

<expand title="Notes">
## Notes

- AJAX stands for Asynchronous JavaScript and XML
- It is a group of related technologies used to display data asynchronously
- It sends and retrieves data without reloading the web page

</expand>

<expand title="Advantages">
## Advantages

- Quick response time
- Better bandwidth utilization
- Non-blocking user experience - user is not blocked until data is retrieved from the server
- Allows sending only important data to the server
- Makes the application interactive and faster

</expand>

<expand title="Disadvantages">
## Disadvantages

- Dependent on JavaScript (needs to be enabled)
- Security concerns (source code is readable, potential for script injection)
- Debugging can be difficult

</expand>

<expand title="Technologies used by AJAX">
## Technologies used by AJAX

- HTML/XHTML and CSS - For displaying content and styling
- DOM - For dynamic display and interaction with data
- XML/JSON - For carrying data to and from server
- XMLHttpRequest - For asynchronous communication between client and server
- JavaScript - For client-side validation and logic

</expand>

<expand title="XMLHttpRequest purpose">
## XMLHttpRequest purpose

- Sends data in the background to the server
- Requests data from the server
- Receives data from the server
- Updates data without reloading the page

</expand>

<expand title="Synchronous vs Asynchronous requests">
## Synchronous vs Asynchronous requests

- Synchronous request - Blocks the user until a response is retrieved
- Asynchronous request - Does not block the user, allows other operations to continue

</expand>

<expand title="Types of postback in AJAX">
## Types of postback in AJAX

- Synchronous Postback - Blocks the client until the operation completes
- Asynchronous Postback - Does not block the client

Bootstrap

</expand>

<expand title="Notes">
## Notes

- Open-source CSS framework for responsive, mobile-first web development
- Provides pre-built components and utilities for faster UI development
- Package contains: Scaffolding, CSS, Components, JavaScript Plugins, Customization

</expand>

<expand title="Container System">
## Container System

- Used to set content margins and handle responsive behaviors
- Contains row elements which contain columns (grid system)
- Container Classes:
  - Container - Fixed width container with responsive margins
  - Container-fluid - Full-width container spanning entire viewport
- Structure:
  - <div class="container">

<div class="row">

<div class="col-md-xx"></div>

</div>

</div>

</expand>

<expand title="Grid System">
## Grid System

- Allows up to 12 columns across the page
- Breakpoints (responsive design):
  - sm (small - tablets, ≥576px)
  - md (medium - desktops, ≥768px)
  - lg (large - larger desktops, ≥992px)
  - xl (extra large - ≥1200px)
  - xxl (extra extra large - ≥1400px)

</expand>

<expand title="Components">
## Components

- Buttons:
  - Classes: btn-primary, btn-success, btn-danger, btn-warning, btn-info, btn-secondary
- Tables:
  - .table - Basic table styling
  - .table-striped - Zebra-striped rows (alternating colors)
  - .table-bordered - Adds borders to table
  - .table-hover - Adds hover effect on rows
- Alerts:
  - Types: alert-success, alert-info, alert-warning, alert-danger
  - Example: <div class="alert alert-success">Message</div>
- Badges:
  - Numerical indicators showing count of items
  - Example: <span class="badge">5</span>
- Cards:
  - Container component with header, body, and footer sections
  - Modern replacement for panels, wells, and thumbnails

</expand>

<expand title="Forms">
## Forms

- Layouts:
  - Vertical form (default)
  - Horizontal form
  - Inline form
- Form Rules:
  - Use <form role="form"> for accessibility
  - Wrap labels and controls in <div class="form-group"> for spacing
  - Add .form-control class to input, textarea, and select elements
- Input Types:
  - Text, Email, Password, Checkbox, Radio, Select, Textarea
  - Form validation classes: .is-valid, .is-invalid

</expand>

<expand title="Navigation">
## Navigation

- Navbar:
  - Navigation header at top of page
  - Collapsible/expandable based on screen size
  - Example: <nav class="navbar navbar-expand-lg">
- Nav Tabs:
  - <ul class="nav nav-tabs"> - Tabbed navigation
- Nav Pills:
  - <ul class="nav nav-pills"> - Pill-shaped navigation
  - Horizontal: nav-pills
  - Vertical: nav-pills nav-stacked
- Breadcrumbs:
  - Indicates current page location in hierarchical navigation
- Pagination:
  - Organize website pages
  - Classes: .pagination, .page-item, .page-link, .disabled, .active

</expand>

<expand title="Components & Plugins">
## Components & Plugins

- Dropdowns:
  - Toggleable contextual menus for displaying links
- Modals:
  - Dialog box/popup window displayed over current page
  - Requires JavaScript
- Carousel:
  - Flexible, responsive slider for rotating content
- Collapse:
  - Toggleable content sections (accordions)
  - Uses data-toggle="collapse" attribute
- Progress Bars:
  - Visual indicators showing completion status
- List Groups:
  - Display series of content in list format
  - Class: .list-group

</expand>

<expand title="Utilities">
## Utilities

- Images:
  - .img-fluid - Responsive images
  - .img-thumbnail - Thumbnail styling
  - .rounded, .rounded-circle - Image border radius
- Spacing:
  - Margin: m-*, mt-*, mb-*, ms-*, me-*
  - Padding: p-*, pt-*, pb-*, ps-*, pe-*
- Display:
  - .d-none, .d-block, .d-flex, .d-grid - Control display
  - Responsive: .d-md-none, .d-lg-block, etc.
- Flexbox:
  - .d-flex, .flex-row, .flex-column, .justify-content-*, .align-items-*

</expand>

