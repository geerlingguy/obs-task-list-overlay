# OBS Task List / Checklist Overlay

[![CI](https://github.com/geerlingguy/obs-task-list-overlay/actions/workflows/ci.yml/badge.svg?branch=master&event=push)](https://github.com/geerlingguy/obs-task-list-overlay/actions/workflows/ci.yml)

An HTML and Node.js-based task list overlay for OBS.

<img src="https://raw.githubusercontent.com/geerlingguy/obs-task-list-overlay/master/example" width="700" height="394" alt="OBS Task List Overlay Example with Jeff Geerling" />

I was frustrated with the lack of plugins that added a simple task list (with current task highlighted) to OBS, so I built this solution, which relies on OBS' 'Browser' source.

There are two components to this project:

  1. An HTML file (`index.html`), which lays out a stream title and checklist/current status overlay.
  2. A Node.js HTTP server (`server.js`), which serves the HTML file to OBS, and allows you to control which step is highlighted in the display.

I am using this for a technical live stream, where I have a set list of milestones, and I want to indicate to viewers which task is currently being worked on.

To see it in practice, check out my [16 Drives, 1 Pi](https://www.youtube.com/watch?v=afnszOuWt74) livestream.

The design is inspired by the [NASASpaceflight](https://www.youtube.com/c/NASASpaceflightVideos) live stream overlay, which I enjoy for it's simplicity and elegance.

## Customizing the overlay

All the styling for the overlay is embedded in the `index.html` file. If you want to tweak the appearance, it should be easy enough if you know basic CSS + JS.

You can modify the stream title inside the `title-wrapper` div, and the list of tasks inside the `todo-list` unordered list.

Note that if you change the length of the stream title, you may also need to adjust the `width` property in the `.left, .right` CSS class property list to match the new width of text.

I use Myriad Pro for the title (which I have through an Adobe Fonts subscription), but you can also adjust the fonts used via CSS.

## Node.js App setup

After you add your own task list and title, you need to get the little Node.js app running.

First, make sure you [install Node.js](https://nodejs.org/en/download/) on your computer.

Once Node is installed, you need to run the following command in this project directory to install Express.js and its dependencies:

```
npm install
```

Then start the local server:

```
node server.js
```

## Adding the browser source in OBS

  1. In an OBS Scene, add a new 'Browser' Source.
  2. For the URL, enter `http://localhost:8080/` (use the port you have configured in `config.json`).
  3. Set the width to `1920` and height to `1080`.
  4. Check the 'Refresh browser when scene becomes active' option.
  5. Click 'OK', and the overlay should appear.

## Advancing to the next step

To control which task is highlighted, there are two paths the Node.js app responds to:

```
/up - Increase the current step by 1
/down - Decrease the current step by 1
```

You can also check what the current step is by requesting `/current`.

When you have the browser source open, OBS will change the highlighted step within one second of you requesting `localhost/up` or `localhost/down`.

The count can increase above the maximum number of items in your list, or below `1`, so you are responsible for making sure you don't go crazy calling `/up` or `/down` too many times :)

### Using an Elgato Stream Deck to advance steps

TODO.
