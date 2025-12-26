# Mobile

<expand title="Version History (Main Versions)">
## Version History (Main Versions)

- Android 1.0 (API 1) - 2008
- Android 2.0 Eclair (API 5-7) - 2009
- Android 4.0 Ice Cream Sandwich (API 14-15) - 2011
- Android 5.0 Lollipop (API 21-22) - 2014
- Android 6.0 Marshmallow (API 23) - 2015
- Android 7.0 Nougat (API 24-25) - 2016
- Android 8.0 Oreo (API 26-27) - 2017
- Android 9.0 Pie (API 28) - 2018
- Android 10 (API 29) - 2019
- Android 11 (API 30) - 2020
- Android 12 (API 31-32) - 2021
- Android 13 (API 33) - 2022
- Android 14 (API 34) - 2023
- Android 15 (API 35) - 2024

Primary Concepts

</expand>

<expand title="Notes">
## Notes

- Android is an open source and Linux-based operating system
- Led by Google
- Developed primarily in Java/Kotlin using the Android Software Development Kit (SDK)

</expand>

<expand title="Core Components">
## Core Components

- Activities:
  - Dictate the UI and handle user interaction with the screen
  - Represent single screens (e.g., login, register)
  - Implemented as subclass of Activity class
  - Lifecycle callbacks:
  - onCreate: First callback, called when activity is first created
  - onStart: Called when activity becomes visible to the user
  - onResume: Called when user starts interacting with the application
  - onPause: Called when current activity is paused and previous activity is resumed
  - onStop: Called when activity is no longer visible
  - onDestroy: Called before activity is destroyed by the system
  - onRestart: Called when activity restarts after stopping it
- Services:
  - Handle background processing associated with an application
  - Perform long-running operations without UI
  - Implemented as subclass of Service class
- Broadcast Receivers:
  - Handle communication between Android OS and applications
  - Respond to system-wide broadcast announcements
- Content Providers:
  - Handle data and database management issues
  - Manage access to structured data and share data between applications
- Fragments:
  - Represent a portion of user interface in an Activity
  - Allow modular UI design and reuse across activities

</expand>

<expand title="UI Components">
## UI Components

- Views:
  - UI elements drawn on-screen (buttons, lists, forms, etc.)
  - Base class for widgets used to create interactive UI components
- ViewGroups:
  - Subclass of View providing invisible containers
  - Hold other Views or ViewGroups and define their layout properties
- Layouts:
  - View hierarchies that control screen format and appearance
  - Types:
  - LinearLayout - Aligns children in single direction (horizontal/vertical)
  - RelativeLayout - Displays child views in relative positions to sibling elements
  - ConstraintLayout - Flexible layout system with flat view hierarchy
  - GridLayout - Arranges views in a grid
  - CoordinatorLayout - Super-powered FrameLayout for Material Design
- Layout Weight:
  - Assigns "importance" value to views in terms of space occupation
  - Default weight is zero
  - Equal distribution: Set layout_height and layout_width to "0dp"

</expand>

<expand title="UI Controls">
## UI Controls

- TextView, EditText, AutoCompleteTextView
- Button, ImageButton
- CheckBox, ToggleButton
- RadioButton, RadioGroup
- ProgressBar, Spinner
- TimePicker, DatePicker

</expand>

<expand title="Event Handling">
## Event Handling

- Events collect data about user's interaction with interactive components
- Android framework maintains event queue on first-in, first-out (FIFO) basis
- Concepts:
  - Event Listeners: Interface in View class containing callback method
  - Event Listeners Registration: Process of registering Event Handler with Event Listener
  - Event Handlers: Methods that handle events when listeners fire
  - Types: onClick, onLongClick, onFocusChange, onKey, onTouch, onMenuItemClick

</expand>

<expand title="Resources">
## Resources

- External elements such as strings, constants, drawable pictures
- Saved in res/ directory (drawable, layout, values, etc.)
- Accessed from R class using resource IDs (e.g., R.drawable.myimage, R.id.myview)
- Manifest: Configuration file for the application (AndroidManifest.xml)

Secondary Concepts

</expand>

<expand title="Advanced Concepts">
## Advanced Concepts

- Notifications
- Location Based Services
- Drag/Drop functionality
- Sending Email/SMS
- Phone Calls

</expand>

