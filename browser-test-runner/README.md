BROWSER TEST RUNNER
=====================

### Usage

```
npm install
npm start
open http://localhost:3000
```

###Tech Stack
* React and Webpack
* I used some boilerplate to get up and running quickly: https://github.com/gaearon/react-hot-boilerplate

###Design Considerations
* It should support an arbitrary number of tests.
* The tests should be isolated so they can be modified, commented out, or removed entirely separately. An alternative is simply including each test within the actual frontend code, but this will make it harder to understand where the tests are coming from. Furthermore, isolating the tests creates a clear separation of concerns between test writing and test execution.
* The "Start Tests" button should be the most visible UI on the screen before the tests are running. While the tests are running, the "Start Tests" button should be disabled to communicate the functionality.

###Components and Layout
* There will be one primary component that contains all other components called App.
* Within App, there will be a component including the overall status of the test runner and the start button.
  * I considered separating the button into a separate component to better support additional actions in the future; however, this is hard to predict and I think we're better off putting the action alongside the overall status of the test runner because it directly affects this.
* In addition, App will have a component containing the tests, TestViewContainer.
* Within TestViewContainer I will render multiple TestViewEntry components, which represent a single test. In addition, each TestViewEntry should contain the following information:
  * Meta-information (title/description, other static information)
  * Status (dynamic information)
  * I considered placing the meta-information and status in separate components, but decided it is only useful without sorting. Since TestViewEntry components will presumably change location when the status changes, the entire TestViewEntry component will need to be re-rendered. If we didn't sort, then we could improve performance by including the status in a separate component.