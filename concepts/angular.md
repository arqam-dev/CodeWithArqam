# Angular

## Primary Concepts

<expand title="Version History (Main Versions)">
## Version History (Main Versions)

- AngularJS (Angular 1.x) - 2010
- Angular 2 - 2016
- Angular 4 - 2017
- Angular 5 - 2017
- Angular 6 - 2018
- Angular 7 - 2018
- Angular 8 - 2019
- Angular 9 - 2020
- Angular 10 - 2020
- Angular 11 - 2020
- Angular 12 - 2021
- Angular 13 - 2021
- Angular 14 - 2022
- Angular 15 - 2022
- Angular 16 - 2023
- Angular 17 - 2023
- Angular 18 - 2024
- Angular 19 - 2024

</expand>

<expand title="General Points">
## General Points

- Development platform built on TypeScript
- Component-based framework for building scalable web applications
- Collection of libraries, supports workspaces with multiple projects
- When redirecting to a component from the same component, ngOnInit will not be called because component doesn't destroy
  - Use this.route.params.subscribe() to detect changes in the route (where 'route' is 'ActivatedRoute')
- Interpolation = {{}} = used in one-way data binding
- Property binding = [] = used in one-way data binding
- Flow: main.ts -> app.module.ts -> AppComponent (app.component.ts + html)
- Decorators are always added with @ sign
- [ngIf] = *ngIf (same functionality)
- Event binding: "change" event in select and "Click" event in buttons

</expand>

<expand title="AngularJS VS Angular">
## AngularJS VS Angular

- Architecture: MVC design => Components and directives
- Language: JavaScript => TypeScript (superset of ECMAScript 6)
- Mobile support: Does not support => Supports
- Routing: $routerprovider.when() => @RouteConfig{()}
- Dependency Injection: Does not use => Uses hierarchical DI system with unidirectional tree-based change detection
- Structure: Less manageable => Better structure, easy to manage and maintain
- Speed: Reduced development effort => Faster performance, optimized change detection

</expand>

<expand title="TypeScript">
## TypeScript

- Superset of JavaScript - layer around JS with more methods
- Features: Type annotations, arrow functions, interfaces, classes, constructors, access modifiers, strong typing, OO features
- Catches errors at compile time (not all but maximum), great tooling (IntelliSense)
- TS transpiles to JS (ES5 by default for browser compatibility)
- Type Assertion: let name = (<string>message).endsWith('c') OR let name = (message as string).endsWith('c')

</expand>

<expand title="Key Files & Architecture">
## Key Files & Architecture

- main.ts: Entry point of application
- angular.json: Defines project configuration, build settings
- Webpack: Build automation tool, bundles and minifies scripts/stylesheets
- HMR (Hot Module Replacement): Automatically refreshes browser without full page reload

</expand>

<expand title="Components">
## Components

- Overview: Component = HTML file + TS file + Style file
- Component LifeCycle:
  - ngOnChanges: Respond when Angular sets or resets data-bound input properties (runs very frequently)
  - ngOnInit: Initialize directive/component after Angular displays data-bound properties (called once)
  - ngDoCheck: Detect and act upon changes Angular can't detect on its own
  - ngAfterContentInit: Called after Angular projects external content into component's view
  - ngAfterContentChecked: Called after Angular checks the content projected into component
  - ngAfterViewInit: Called after Angular initializes component's views and child views
  - ngAfterViewChecked: Called after Angular checks component's views and child views
  - ngOnDestroy: Cleanup before Angular destroys directive/component (unsubscribe Observables, detach event handlers)
- View Encapsulation: Component CSS styles are encapsulated into component's view and don't affect rest of application
- Component Interaction:
  - Parent to Child: Use "@Input" or property binding [name]='name'
  - @Input with alias: @Input('is-favourite') isFavourite: boolean;
  - Child to Parent: Use "@Output" with EventEmitter
  - @Output with alias: @Output('changeVarAlias') changeVar = new EventEmitter();
  - Parent interacts with child using local variable (template reference variable)
  - Parent calls an @ViewChild() when parent class requires access to child component
  - Parent and children communicate using a service (shared service for bi-directional communication)
- Component Styles: Standard CSS, component-scoped styles, special selectors, styles in metadata, template inline styles
- Data Sharing: @Input, @Output, Shared services
- Content Projection: Insert/project content inside another component (Single-slot, Multi-slot, Conditional)
- Dynamic Components: Load new components at runtime using Angular API

</expand>

<expand title="Templates">
## Templates

- HTML in Angular
- Text interpolation: {{ currentCustomer }}
- Template statements: Methods/properties to respond to user events (e.g., (click)="deleteHeroFunc()")
- Property Binding: Syntax = [] (e.g., <img [src]="itemImageUrl">, [ngClass], [disabled])
- Attribute, class, and style bindings: [attr.attribute-name]="expression"
- Event binding: Syntax = () (e.g., (click), (change), (keyup), (blur))
- Two-way binding: Syntax = [()] (combination of property binding [] and event binding ())
  - Example: <input type="text" [(ngModel)]='username' />
- Template variables: #variable_name (refer to DOM element, directive, TemplateRef)

</expand>

<expand title="Directives">
## Directives

- Classes that add additional behavior to elements
- Types:
  - Component: Directives with a template (most common)
  - Attribute Directives: Change appearance or behavior (ngClass, ngStyle, ngModel)
  - [class] VS [ngClass]: Same functionality, ngClass has shorter syntax
  - [style] VS [ngStyle]: Same functionality, ngStyle has shorter syntax
  - Structural Directives: Change DOM layout by adding/removing elements
  - *ngIf: Doesn't render element in DOM when condition is false (better for large trees)
  - *ngFor: With trackBy for performance
  - *ngSwitch
  - Leading asterisk (*): Syntactic sugar that rewrites directive to ng-template
  - *ngIf VS [hidden]: Use *ngIf for conditional load/unload, use [hidden] for simple show/hide

</expand>

<expand title="Dependency Injection">
## Dependency Injection

- Dependencies are services or objects that a class needs to perform its function
- DI: Design pattern where class requests dependencies from external sources rather than creating them
- Angular's DI framework provides dependencies to class upon instantiation
- Example: constructor(private http: HttpClient, private messageService: MessageService) { ... }

</expand>

<expand title="Services">
## Services

- Should be reusable and follow single responsibility principle
- Component handles view, service handles everything not related to view
- Works on Singleton design pattern
  - Two ways: Set providedIn to "root" OR include in AppModule
- Static Variable: Preserves value even after out of scope (variables in services are static by default)

</expand>

<expand title="Routing and Navigation">
## Routing and Navigation

- Routes: Definitions (objects) with at least path and component attributes
- Path: Part of URL that determines unique view
- Component: Angular component associated with path
- Getting route information:
  - Import "ActivatedRoute" and "ParamMap"
  - this.route.paramMap.subscribe(param => {}) // subscribe to detect param changes
  - this.route.snapshot.paramMap.get('id') // snapshot when user cannot navigate back
  - this.route.queryParamMap.subscribe() // for query parameters
- paramMap VS queryParamMap:
  - paramMap: Required/optional route-specific parameters (e.g., /users/:id)
  - queryParamMap: Optional query parameters available to all routes (e.g., ?page=1&order=newest)
- RouterLink: <a routerLink="route-path">Link Text</a>
- RouterLinkActive: Shows active class dynamically
- Programmatic navigation: this.router.navigate(['/followers'], {queryParams: {page: 1}})
- RouterModule.forRoot(): Define root routes in app module
- RouterModule.forChild(): Define routes in feature modules
- Router terminology: Router, RouterModule, Routes, Route, RouterOutlet, RouterLink, ActivatedRoute, RouterState

</expand>

<expand title="Route Guards">
## Route Guards

- canActivate: Guard route to check authentication/authorization before activation
- canActivateChild: Guard child routes
- canDeactivate: Guard before leaving route (e.g., unsaved changes warning)
- canMatch: Conditionally match routes based on custom logic
- resolve: Pre-fetch data before route activation
- canLoad: Guard lazy-loaded feature modules
- Use "@Injectable({ providedIn: 'root' })" for guard services
- Note: Never use [AuthGuardService] with app route (basic/default route)

</expand>

<expand title="Forms">
## Forms

- Types:
  - Template-Driven: Available for FormsModule, most work done in template, good for simple forms
  - Data flow: Asynchronous, Form validation: Directives (ngModel, ngForm, ngModelGroup)
  - Reactive Form: Available for ReactiveModule, direct explicit access to forms object model
  - More robust: scalable, reusable, testable, unit testable
  - Data flow: Synchronous, Form validation: Functions
  - Provides FormBuilder with FormGroup and FormControls
  - Supports async validation, nested FormGroups
- FormControl/FormGroup properties: value, touched, untouched, dirty, pristine, valid, errors, status, disabled
- Building Dynamic Forms: Based on reactive forms

</expand>

<expand title="HTTP Client">
## HTTP Client

- Introduced in Angular 6+, recommended for all new projects
- Uses RxJS Observables for handling responses
- Better error handling and typing support
- Returns Observable by default
- HTTP Service: Legacy service from AngularJS/early Angular, deprecated in favor of HttpClient

</expand>

<expand title="Interceptors">
## Interceptors

- Used to alter HTTP requests by including various functions (kind of middleware)
- Uses: Authentication (handle tokenization), Caching, Profiling, Error handling, Notifications, Headers manipulation, Converting formats, Loader management, URL manipulation

</expand>

<expand title="JWT (JSON Web Token)">
## JWT (JSON Web Token)

- Received after successful login from server, contains user info
- Usually stored in localStorage
- Sent in header with APIs for server validation
- JWT Structure: header.payload.signature
- Digital Signature = base64UrlEncoded(header) + "." + base64UrlEncoded(payload) + secret key
- Secret key prevents malicious attacks - signature changes on payload change
- JwtHelper methods: decodeToken, getTokenExpirationDate, isTokenExpired, urlBaseDecode

</expand>

<expand title="Observables and RxJS">
## Observables and RxJS

- Observables: Provide support for passing messages between parts of application
- Observer pattern: Object maintains list of dependents (observers) and notifies them of state changes
- Subscribing: Observable begins publishing values only when someone subscribes
- Subject VS BehaviorSubject VS ReplaySubject VS Observable:
  - Subject: Doesn't hold value, subscribers receive only upcoming values
  - BehaviorSubject: Holds one value (must initialize default), emits immediately on subscribe, keeps last value
  - ReplaySubject: Holds all previous values (expensive)
- RxJS: Reactive Extensions for JavaScript
- RxJS operators: from, Observable, interval, fromEvent, of, pipe, map, filter, catchError, retry
- Of: Emits whole array at once
- From: Emits values one by one
- Observer VS Observable: Observer (Subject) wishes to be notified, Observable (object) state of interest

</expand>

<expand title="Promise VS Observable">
## Promise VS Observable

- Promise handles single event when async operation completes or fails
- Observable provides operators like map, forEach, filter, similar to array
- Observables preferable: Multiple functions (subscribe, map, filter), supports cancellation, can emit multiple values over time

</expand>

<expand title="NgModule">
## NgModule

- Class marked by @NgModule decorator
- Metadata object describes how to compile component's template and create injector at runtime
- Identifies module's components, directives, pipes, makes some public through exports property
- NgModule metadata: declarations, imports, providers, bootstrap, exports
- JS-Module VS Ng-Module: JS-Module = Files containing code, Ng-Module = Classes with metadata for compiling

</expand>

<expand title="Decorators">
## Decorators

- Add extra functionality to already existing thing, add metadata to class/method/accessor/property/parameter
- TS feature, not in JS
- Types: Class Decorator (@Component, @NgModule, @Injectable, @Directive, @Pipe), Property decorators (@Input, @Output, @ViewChild, @ContentChild), Method decorators (@HostListener), Parameter decorators (@Inject, @Optional)
- Custom Decorator: Function that attaches metadata to class/method/property (e.g., Validation decorator, Logging decorator)

</expand>

<expand title="Providers">
## Providers

- Angular Providers allows registration of classes, functions, or values (dependencies) with DI system
- Register in NgModule providers array or use providedIn property of @Injectable decorator
- Types: Class Provider (useClass), Value Provider (useValue), Factory Provider (useFactory), Aliased Class Provider (useExisting)
- Provider VS Services: Service is JavaScript object, Provider is way to gain access to that object

</expand>

<expand title="@Injectable">
## @Injectable

- Decorator attached to class, informs Angular that class has dependencies that need to be injected
- Angular identifies tokens by type specified
- @Injectable({ providedIn: 'root' }) // service accessible/injectable at root level (complete app)

</expand>

<expand title="@ViewChild and @ViewChildren">
## @ViewChild and @ViewChildren

- Used to get DOM elements in component
- @ViewChild: Types of decorators to access child component class and properties into parent component
- Use afterViewInit lifecycle hook
- ViewChild returns first matching element, ViewChildren returns all matching DOM elements
- Substitute of "getElementById"

</expand>

<expand title="Pipes">
## Pipes

- Use for data transformation (or formatting)
- Built-in pipes: DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, DecimalPipe, PercentPipe (supports i18n)
- Example: {{ birthday | date:"MM/dd/yy" }}

</expand>

<expand title="Reactive Programming">
## Reactive Programming

- Design paradigm that relies on asynchronous programming logic to handle real-time updates
- Concerned with data streams and propagation of events
- Subscribe to something that continuously runs or observes change in subject and reacts immediately

</expand>

<expand title="Virtual DOM VS Shadow DOM">
## Virtual DOM VS Shadow DOM

- Angular doesn't have Virtual DOM, uses Change Detection combined with Zones
- Virtual DOM: Creates copy of whole DOM object for efficient rendering (React uses this)
- Shadow DOM: Creates small isolated pieces of DOM with scoped styles (Angular uses Shadow/Incremental DOM)
- Shadow DOM allows scoped styles without bleeding to outer world and enables View Encapsulation

</expand>

<expand title="Angular VS Vue VS React">
## Angular VS Vue VS React

- Angular: Structured, enterprise-ready, TypeScript-based, suitable for complex applications
- React: Lightweight library, high traffic websites, needs additional libraries for routing
- Vue: Lightweight, modular, flexible, smallest framework
- Angular's drawback: Larger size, startup time, memory allocation compared to Vue
- React mostly used in high traffic websites, Angular unsuitable for lightweight applications

</expand>

<expand title="zone.js">
## zone.js

- Provides global zone that can be forked and extended to encapsulate/isolate asynchronous behaviour
- Angular does this in NgZone service by creating fork and extending it with its own behaviours

</expand>

## Secondary Concepts

<expand title="Service Worker">
## Service Worker

- Script that runs in web browser and manages caching for application
- Adding service worker to Angular application is step for turning application into Progressive Web App (PWA)
- Service workers function as network proxy

</expand>

<expand title="Custom Pipes & Directives">
## Custom Pipes & Directives

- Custom Pipes: Create reusable data transformation functions
- Custom Directive: Create reusable behavior (e.g., add color based on student marks in multiple places)
- Renderer2: Allows manipulation of DOM elements without accessing DOM directly

</expand>

<expand title="ng-container VS ng-template VS ng-content">
## ng-container VS ng-template VS ng-content

- ng-container: Group elements in template without interfering with styles/layout (Angular doesn't put it in DOM)
- ng-template: Group elements that render conditionally (cannot use without structural directives like *ngIf, *ngFor)
- ng-content: Used to project content into Angular components

</expand>

<expand title="TrackBy VS Async-Pipe">
## TrackBy VS Async-Pipe

- TrackBy: Used with ngFor directive to optimize rendering of lists, prevents re-rendering entire list when items change
  - Example: <li *ngFor="let item of items; trackBy: trackByFn">
  - trackByFn(index: number, item: any): number { return item.id; }
- Async-Pipe: Subscribe to Observable or Promise and automatically update view when data is received
  - Example: <div *ngIf="data$ | async as data"> OR <div>{{ data$ | async }}</div>

</expand>

<expand title="Cache">
## Cache

- HTTP Interceptor: Check if response is cached, return cached response instead of making network request
- Local Storage/Session Storage: Store API responses in browser storage, check before making new requests
- In-Memory Caching: InMemoryWebApi module for development/static data
- Service-level Caching: Custom cache object in services, check cache before API calls
- Third-Party Libraries: ngx-cache, Angular Universal Cache for advanced features (expiration, invalidation)

</expand>

<expand title="Static variable VS Constant variable">
## Static variable VS Constant variable

- Static variables: Common across all instances of type, values can be changed at runtime
- Constant variables: Specific to each instance but values known and fixed at compile time, cannot be changed at runtime
- Variables defined in services are static by default

</expand>

<expand title="Design Patterns in Angular">
## Design Patterns in Angular

- MVC Pattern, Dependency Injection Pattern, SOLID Pattern, Strategy Pattern, Visitor Pattern, Model-Adapter Pattern, Composition Pattern, Lazy Pattern, Singleton Pattern, Factory pattern, Command pattern, Decorator pattern, forRoot and forChild

</expand>

<expand title="Multiple Router Outlets">
## Multiple Router Outlets

- Yes, can have multiple router-outlet in same template by configuring router and providing name to router-outlet

</expand>

<expand title="Error Handling">
## Error Handling

- Create class implementing "ErrorHandler" interface
- Inject it in providers of module: @NgModule({ providers: [{provide: ErrorHandler, useClass: MyErrorHandler}] })

</expand>

<expand title="Change Detection Strategy">
## Change Detection Strategy

- ngrx subscribers, ngOnChanges for @Input and @Output

</expand>

<expand title="Angular Hooks VS React Hooks">
## Angular Hooks VS React Hooks

- Closest thing to hooks in Angular is Decorators, but they're not equivalent
- React Hooks allow reuse of stateful logic between components

Angular 17 Features

</expand>

<expand title="General Points">
## General Points

- Updated syntax close to JS, reduces running time

</expand>

<expand title="Features">
## Features

- Deferrable views: Lazy loading for components and dependencies
- New Control Flow Syntax:
  - Conditional: OLD: <div *ngIf="loggedIn"> NEW: @if (loggedIn) {} @else {}
  - Switch: OLD: <div [ngSwitch]="accessLevel"> NEW: @switch (accessLevel) { @case ('admin') { <admin-dashboard/> } }
  - For loop: OLD: *ngFor NEW: @for (user of users; track user.id) { {{ user.name }} } @empty { Empty list of users }
- Server-side rendering (SSR) and static-site generation (SSG) improvements

Ionic Angular

</expand>

<expand title="Notes">
## Notes

- Open-source UI toolkit for building performant mobile and desktop apps using web technologies
- Built on top of Angular, React (and Vue in development)
- With one codebase, build for iOS, Android, desktop, and web as Progressive Web App (PWA)
- Built on standardized web technologies (HTML, CSS, JavaScript)
- Pre-designed components, typography, interactive paradigms, and extensible base theme
- Released under MIT license
- Ionic 4+ removed hard requirement on single framework - can use as standalone library
- Official Angular integration: @ionic/angular library

</expand>

<expand title="Key Features">
## Key Features

- Cross-platform development (iOS, Android, Desktop, Web)
- Native look and feel with platform-specific styling
- Pre-built UI components (buttons, cards, lists, modals, etc.)
- Navigation system optimized for mobile
- Built-in gestures and animations
- Capacitor integration for native device features

</expand>

<expand title="Capacitor">
## Capacitor

- Cross-platform app runtime created by Ionic team
- Enables web apps to run natively on iOS, Android, Electron, and Web
- Replaces Cordova in modern Ionic apps
- Provides access to native device APIs (camera, GPS, etc.)
- Easier build and deployment process

</expand>

<expand title="Appflow">
## Appflow

- Commercial CI/CD platform for Ionic development teams
- Continuous integration and deployment for iOS, Android, and web apps
- Live updates and hotfixes to user devices without app store updates
- Separate from open-source Ionic Framework

</expand>

<expand title="Integration with Angular">
## Integration with Angular

- Deep integration through @ionic/angular library
- Ionic components work seamlessly with Angular
- Uses Angular routing and dependency injection
- Follows Angular patterns and best practices

</expand>

